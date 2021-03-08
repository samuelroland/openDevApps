<template>
  <div class="bg-blue-300 w-64 overflow-hidden overscroll-none p-1" style="min-height: 75px">
    <div class="flex w-full">
      <div class="flex flex-1">
        <h3 class="flex flex-row items-center m-0 text-lg" title="Open quickly in the browser some local or remote dev apps.">
          open <img src="icons/D.png" class="w-4 " alt="D" />evD
        </h3>
        <span class="text-xs italic flex items-end ml-1">{{ version }}</span>
      </div>
      <span class="flex"
        ><img
          src="icons/code.svg"
          class="w-7 hover:bg-blue-500 rounded hover:text-white px-1"
          alt="code icon"
          title="Checkout the code on GitHub, it's opensource !"
          @click="goToSourceCode"
        />
        <img
          src="icons/help.svg"
          alt="help icon"
          title="I need help!"
          class="w-8 hover:bg-blue-500 rounded hover:text-white px-1"
          @click="loadFirstTime"
        />
        <img
          src="icons/settings.svg"
          alt="settings icon"
          title="Settings"
          class="w-8 hover:bg-blue-500 rounded hover:text-white px-1"
          @click="openSettings"
        />
      </span>
    </div>
    <ul class="list-none" v-if="links.length != 0">
      <li v-for="link in links" :key="link.id" class="flex">
        <a
            @click="this.redTrashId = null"
          :href="'https://' + link.link"
          class="hover:text-white flex-1 w-full block flex px-1 text-base flex hover:border-blue-800 hover:bg-blue-400 rounded-sm border my-1 border-solid border-blue-600"
        >
          <span class="flex-1 overflow-hidden overflow-ellipsis">{{ link.name }}</span>
          <span>
            <img
              src="icons/home.svg"
              class="w-4 mx-1 inline"
              title="Hosted in local."
              v-if="link.local"
            />
            <!--<img
              src="icons/arrow-circle-up.svg"
              class="w-4 inline"
              title="Website up"
              alt=""
            />-->
          </span
        ></a>
        <img
          v-if="settingsEnabled"
          class=" ml-1 w-8 p-1"
          :class="{'bg-red-300': redTrashId == link.id, 'hover:bg-red-400': redTrashId === link.id, 'hover:bg-blue-400':  ! redTrashId === link.id}"
          src="icons/trash.svg"
          alt="trash icon"
          @click="deleteALink(link.id)"
        />
      </li>
    </ul>
    <ul class="list-none" :hidden="!(this.links.length === 0)">
      <li
          class="text-base rounded-sm my-1 text-center italic text-gray-500"
      > No links<span class="text-xs"> -> Add in settings</span>
      </li>
    </ul>
    <ul class="list-none" :hidden="!settingsEnabled">
      <li v-if="links.length < 10"
          class="text-base flex hover:border-blue-800 hover:bg-blue-400 rounded-sm border my-1 border-solid border-blue-600"
      >
        <input

            type="text"
            v-model="inpCreate"
            :placeholder="inpCreatePlaceholder"
            @keyup="nextStepOfLinkAdding"
            class="w-full px-1 rounded-sm"
            ref="inpCreateInput"
            @click="this.redTrashId = null"
        />
      </li>
      <li
          v-if="links.length >= 10"
          class="text-base rounded-sm my-1 text-center italic text-gray-500"
      > <span class="text-xs">10 links is the maximum</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {
    version: String
  },
  data() {
    return {
      settingsEnabled: false,
      addingElementInRun: false,
      inpCreate: "",
      links: [],
      inpCreatePlaceholder: "New Link + Enter",
      inpCreateStep: 0,
      newLinkData: {},
      redTrashId: null
    };
  },
  methods: {
    goToSourceCode() {
      window.open("https://github.com/samuelroland/openDevD", "_blank");
    },
    goToManual() {
      window.open(
        "https://github.com/samuelroland/openDevD/blob/develop/manual.md",
        "_blank"
      );
    },
    openSettings() {
      this.redTrashId = null
      this.settingsEnabled = !this.settingsEnabled; //invert settings status
      if (this.settingsEnabled === true && this.links.length < 10) {  //can focus the field only if displayed
        setTimeout(() => {
         this.$refs.inpCreateInput.focus();
        }, 50); //leave the component the time to load before focus
        this.inpCreateStep = 1; //set the creation step to 1
      }
    },
    nextStepOfLinkAdding(e) {
      var key = e.key;
      console.log(key);
      console.log(this.inpCreateStep);
      if (key == "Enter" && (this.inpCreate != "" || this.inpCreateStep == 3)) {
        //Depending on the step of the link creation, change placeholder, save value and go to next step
        switch (this.inpCreateStep) {
          case 1: //link is entered
            this.newLinkData.id = this.links.length + 1;
            this.newLinkData.link = this.inpCreate;
            this.inpCreatePlaceholder = "Set a name + Enter";
            this.inpCreate = "";
            break;
          case 2: //placeholder is entered
            this.newLinkData.name = this.inpCreate;
            this.inpCreate = "";
            this.inpCreatePlaceholder = "local ? default true";
            break;
          case 3: //local or not is given
            this.newLinkData.local = this.inpCreate === "";
            this.inpCreate = "";
            this.links.push(this.newLinkData);
            this.saveItemsInStorage();
            this.inpCreatePlaceholder = "New Link + Enter";
            this.newLinkData = Object.assign({}, {});
            this.inpCreateStep = 0; //0+1=1
            break;
        }
        this.inpCreateStep++;
      }
    },
    saveItemsInStorage() {
      browser.storage.local
        .set({
          links: JSON.parse(JSON.stringify(this.links)), //Stringify and parse to have a new independent object
        })
        .then(() => {
          this.getItemsFromStorage();
        });
    },
    getItemsFromStorage() {
      browser.storage.local.get().then((raw) => {
        return raw.links;
      });
    },
    loadItemsFromStorage() {
      browser.storage.local.get().then((raw) => {
        if (raw.links != null) {
          this.links = raw.links;
        }else{
          this.links = []
        }
        console.log(this.links)
      });
    },
    loadFirstTime() {
      //for debug only
      browser.storage.local.set({
        links: [
          { id: 1, name: "DevDashboard", link: "localhost:8008", local: true },
          {
            id: 2,
            name: "GitHub Profile",
            link: "github.com/samuelroland",
            local: false,
          },
          {
            id: 3,
            name: "KanFF",
            link: "localhost:8084/index.php",
            local: true,
          },
          { id: 4, name: "KanFF.org", link: "kanff.org", local: false },
        ],
      });
      console.log(this.getItemsFromStorage());
    },
    //Delete a link given by id
    deleteALink(id) {
      console.log("delete item at id " + id)
      if (this.redTrashId != id){
        this.redTrashId = id  //put the current trash red
      } else {  //if equal, the red trash is already red (so this is the second click)
        //Delete the link by filtering the list
        this.links = this.links.filter(function(item) {
          return item.id !== id
        })
        this.saveItemsInStorage()
      }

    }
  },
  mounted() {
    this.loadItemsFromStorage(); //when open extension, load saved links
  },
};
</script>
