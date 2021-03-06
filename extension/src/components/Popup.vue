<template>
  <div class="bg-blue-300 w-64 h-auto p-1">
    <div class="flex w-full">
      <div class="flex flex-1">
        <h3 class="flex flex-row items-center m-0 text-xl">
          open <img src="icons/48.png" class="w-4 " alt="" />evD
        </h3>
        <span class="text-sm italic flex items-end ml-1">v0.1</span>
      </div>
      <span class="flex"
        ><img
          src="icons/code.svg"
          class="w-7 hover:bg-blue-500 rounded hover:text-white px-1"
          alt="code icon"
          title="Let me checkout the code!"
          @click="goToSourceCode"/>
        <img
          src="icons/help.svg"
          alt="help icon"
          title="I need help!"
          class="w-8 hover:bg-blue-500 rounded hover:text-white px-1"
          @click="loadFirstTime"/>
        <img
            src="icons/settings.svg"
            alt="settings icon"
            title="Settings"
            class="w-8 hover:bg-blue-500 rounded hover:text-white px-1"
            @click="openSettings"
        />
      </span>
    </div>
    <ul class="list-none" v-if="links != null">
      <li
        v-for="link in links"
        :key="link.id"
        class="flex"
      >
        <a
          :href="'https://' + link.link"
          class="hover:text-white flex-1  block flex px-1 text-base flex hover:border-blue-800 hover:bg-blue-400 rounded-sm border my-1 border-solid border-blue-600"
        >
          <span class=" flex-1">{{ link.name }}</span>
          <span>
            <img
              src="icons/home.svg"
              class="w-4 mx-1 inline"
              title="Local"
              v-if="link.local"
            />
            <img
              src="icons/arrow-circle-up.svg"
              class="w-4 inline"
              title="Website up"
              alt=""
            /> </span
        ></a>
        <img v-if="settingsEnabled" class="hover:bg-blue-400 ml-1 w-8 p-1" src="icons/trash.svg" alt="trash icon">
      </li>

      <li
        v-if="settingsEnabled"
        class="text-base flex hover:border-blue-800 hover:bg-blue-400 rounded-sm border my-1 border-solid border-blue-600"
      >
        <input
          type="text"
          v-model="newLink"
          :placeholder="newLinkPlaceholder"
          @keyup="nextStepOfLinkAdding"
          class="w-full px-1"
          ref="newLinkInput"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {
    msg: String,
  },
  data() {
    return {
      settingsEnabled: false,
      addingElementInRun: false,
      newLink: "",
      links: null,
      setFocus: false,
      newLinkPlaceholder: "New Link + Enter",
      newLinkStep: 0,
      newLinkData: {}
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
      this.settingsEnabled = !this.settingsEnabled;
      if (this.settingsEnabled == true){
        setTimeout( ()=>{this.$refs.newLinkInput.focus()}, 50)  //leave the component the time to load before focus
        this.newLinkStep = 1
      }
    },
    nextStepOfLinkAdding(e) {
      var key = e.key;
      console.log(key);
      console.log(this.newLinkStep)
      if (key == "Enter" && (this.newLink != "" || this.newLinkStep == 3)) {

        //Depending on the step of the link creation, change placeholder, save value and go to next step
        switch (this.newLinkStep){
          case 1: //link is entered
            this.newLinkData.id = this.links.length + 1
            this.newLinkData.link = this.newLink
            this.newLinkPlaceholder = "Placeholder + Enter"
            this.newLink = ""
          break;
            case 2: //placeholder is entered
              this.newLinkData.name = this.newLink
              this.newLink = ""
              this.newLinkPlaceholder = "local ? default true"
          break;
          case 3: //local or not is given
            this.newLinkData.local = this.newLink === ""
            this.newLink = ""
            this.links.push(this.newLinkData);
            this.saveItemsInStorage();
            this.newLinkPlaceholder = "New Link + Enter"
              this.newLinkData = Object.assign({}, {});
              this.newLinkStep = 0  //0+1=1
                break;
        }
        this.newLinkStep++
      }
    },
    saveItemsInStorage() {
      browser.storage.local.set({
        links: JSON.parse(JSON.stringify(this.links)),  //Stringify and parse to have a new independant object
      }).then(()=> {
        this.getItemsFromStorage()
      })
    },
    getItemsFromStorage() {
      browser.storage.local.get().then((raw) => {
        return raw.links;
      });
    },
    loadItemsFromStorage() {
      browser.storage.local.get().then((raw) => {
        if (raw != {}) {
          this.links = raw.links;
        }
      });
    },
    loadFirstTime(){
        browser.storage.local.set({
          links: [
          { id: 1, name: "DevDashboard", link: "localhost:8008", local: true },
          {
            id: 2,
            name: "GitHub Profile",
            link: "github.com/samuelroland",
            local: false,
          },
          { id: 3, name: "KanFF", link: "localhost:8084/index.php", local: true },
          { id: 4, name: "KanFF.org", link: "kanff.org", local: false },
        ],
      });
        console.log(this.getItemsFromStorage())
    }
  },
  mounted() {
    this.loadItemsFromStorage();  //when open extension, load saved links
  },
};
</script>
