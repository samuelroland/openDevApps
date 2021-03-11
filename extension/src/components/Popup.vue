<template>
  <div
    class="bg-blue-300 w-80 overflow-hidden overscroll-none p-1"
    style="min-height: 75px"
  >
    <div class="flex w-full mb-2">
      <div class="flex flex-1 min-w-max">
        <h3
          class="flex flex-row items-center m-0 text-lg"
          title="Open quickly in the browser some local or remote dev apps."
        >
          open <img src="icons/D.png" class="w-4" alt="D" />evD
        </h3>
        <span class="text-xs italic flex items-end ml-1" :title="'Released the ' + versionDate + '.'">{{ version }}</span>
      </div>
      <div class="flex items-end max-w-full overflow-hidden overflow-ellipsis ml-2">
      <img
          v-if="settingsEnabled && currentCategory != null"
          :class="{
            'hover:bg-red-300': redTrashId === stepIndexForCategoryDeletion == 0,
            'bg-red-300': redTrashId == 'category-'+ currentCategory && stepIndexForCategoryDeletion == 1,
            'hover:bg-red-400': redTrashId === 'category-'+ currentCategory && stepIndexForCategoryDeletion == 1,
            'bg-red-400': (redTrashId === 'category-'+ currentCategory && stepIndexForCategoryDeletion == 2),
            'hover:bg-red-500': redTrashId === 'category-'+ currentCategory && stepIndexForCategoryDeletion == 2,
          }"
          src="icons/trash.svg"
          alt="trash icon"
          title="Delete permanently the category (2 confirmations)."
          class="inline-block max-w-6 mx-1 rounded hover:text-white"
          @click="deleteCategory(currentCategory)"
      />
      <select
          name="category"
          id="sltCategory"
          ref="sltCategory"
          class="rounded-sm"
          v-model="currentCategory"
          @change="saveItemsInStorage(); resetTrashData();"
          title="Choose a category or All."
      >
        <option :value="null">All</option>
        <option
            v-for="category in categories"
            :value="category.id"
            :key="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      </div>
    </div>
    <ul class="list-none">
      <!-- Input to create a new category -->
      <li
        v-if="settingsEnabled"
        class="mb-4 text-base flex hover:border-blue-800 hover:bg-blue-400 rounded-sm border my-1 border-solid border-blue-600"
      >
        <input
          type="text"
          v-model="inpCreateCategory"
          :placeholder="inpCreateCategoryPlaceholder"
          @keyup="createCategory($event.key)"
          class="w-full px-1 rounded-sm"
          ref="inpCreateCategory"
          @click="resetTrashData"
        />
      </li>
    </ul>
    <ul class="list-none" v-if="links.length != 0">
      <li v-for="link in linksForCurrentCategory" :key="link.id" class="flex">
        <a
          @click="resetTrashData"
          :href="'https://' + link.link"
          :title="link.link"
          class="hover:text-white flex-1 w-full block flex px-1 text-base hover:border-blue-800 hover:bg-blue-400 rounded-sm border my-1 border-solid border-blue-600"
        >
          <span class="flex-1 overflow-hidden overflow-ellipsis">{{
            link.name
          }}</span>
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
          </span></a
        >
        <img
          v-if="settingsEnabled"
          class="ml-1 w-8 p-1 cursor-pointer"
          :class="{
            'bg-red-300': redTrashId == 'link-'+ link.id,
            'hover:bg-red-400': redTrashId === 'link-'+ link.id,
            'hover:bg-red-300': !(redTrashId === 'link-'+ link.id),
          }"
          src="icons/trash.svg"
          alt="trash icon"
          title="Delete permanently the link (1 confirmation)."
          @click="deleteALink(link.id)"
        />
        <img
          v-if="settingsEnabled && currentCategory != null"
          class="w-8 p-1 cursor-pointer hover:bg-red-300"
          src="icons/removelink.svg"
          alt="trash icon"
          title="Remove the link from this category."
          @click="removeALinkFromCurrentCategory(link.id)"
        />
      </li>
    </ul>
    <ul class="list-none" :hidden="!(this.links.length === 0)">
      <li class="text-base rounded-sm my-1 text-center italic text-gray-500">
        No links<span class="text-xs"> -> Add in settings</span>
      </li>
    </ul>
    <ul class="list-none" :hidden="!settingsEnabled">
      <li
        v-if="settingsEnabled && currentCategory != null"
        class="text-base flex rounded-sm my-1"
      >
        <select
          name="sltAddLink"
          class="rounded-sm flex-1"
          ref="inpCreateInput"
          @click="resetTrashData"
          v-model="linkToAdd"
        >
          <option :value="null">Add a link...</option>
          <option
            v-for="link in linksNotInCurrentCategory"
            :value="link.id"
            :key="link.id"
          >
            {{ link.name }}
          </option>
        </select>

        <button
          class="px-1 border-solid border border-blue-100 mx-1 rounded-sm hover:border-blue-800 hover:bg-blue-400 border-solid border-blue-600"
          @click="addALinkToCurrentCategory(linkToAdd)"
        >
          Add
        </button>
      </li>
      <li
        v-if="links.length < 10"
        class="text-base flex hover:border-blue-800 hover:bg-blue-400 rounded-sm border my-1 border-solid border-blue-600"
      >
        <input
          type="text"
          v-model="inpCreate"
          :placeholder="inpCreatePlaceholder"
          @keyup="nextStepOfLinkAdding"
          class="w-full px-1 rounded-sm"
          ref="inpCreateInput"
          @click="resetTrashData"
        />
      </li>
      <li
        v-if="links.length >= 10"
        class="text-base rounded-sm my-1 text-center italic text-gray-500"
      >
        <span class="text-xs">10 links is the maximum</span>
      </li>
    </ul>
    <div class="flex flex-1 mt-2 justify-end"
    ><img
        src="icons/code.svg"
        class="w-6 hover:bg-blue-500 rounded hover:text-white px-1"
        alt="code icon"
        title="Checkout the code on GitHub, it's opensource !"
        @click="goToSourceCode"
    />
        <img
            src="icons/help.svg"
            alt="help icon"
            title="I need help!"
            class="w-7 hover:bg-blue-500 rounded hover:text-white px-1"
            @click="loadFirstTime"
        />
        <img
            src="icons/settings.svg"
            alt="settings icon"
            title="Settings"
            class="w-7 hover:bg-blue-500 rounded hover:text-white px-1"
            @click="openSettings"
        />
      </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {
    version: String,
    versionDate: String
  },
  data() {
    return {
      settingsEnabled: false,
      addingElementInRun: false,
      currentCategory: null,
      inpCreateCategory: "",
      inpCreate: "",
      linkToAdd: null,
      links: [],
      categories: [],
      inpCreateCategoryPlaceholder: "New Category + Enter",
      inpCreatePlaceholder: "New Link + Enter",
      inpCreateStep: 0,
      stepIndexForCategoryDeletion: 0,
      newLinkData: {},
      redTrashId: null,
      config: {
        lang: "en",
        lastLinkInsertedId: 0,
        lastCategoryInsertedId: 0
      }
    };
  },
  computed: {
    linksNotInCurrentCategory() {
      return this.getLinksNotInCurrentCategory();
    },
    linksForCurrentCategory() {
      return this.getLinksForCurrentCategory();
    }
  },
  methods: {
    //reset all data concerning trash (id and steps):
    resetTrashData(){
      this.redTrashId = null
      this.stepIndexForCategoryDeletion = 0
    },
    getLinksNotInCurrentCategory() {
      var linksIn = this.getLinksForCurrentCategory();
      return this.links.filter(link => linksIn.indexOf(link) == -1);
    },
    //Get the array of the links that will be displayed, depending on the current selected category
    getLinksForCurrentCategory() {
      if (this.currentCategory == null) {
        //"All" option is selected
        return this.links;
      }

      //Get the category with id in sltCategory value
      var categoryId = this.currentCategory;
      var category = this.categories.filter(cat => cat.id == categoryId)[0]; //filter the array and take the alone element

      if (category != undefined) {
        //if there is a bug with category
        return this.links.filter(link => category.links.indexOf(link.id) != -1); //return all the links that are present in the category.links list of ids
      }
      return []; //else, no links will be shown
    },
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
      this.resetTrashData()
      this.settingsEnabled = !this.settingsEnabled; //invert settings status
      if (this.settingsEnabled === true && this.links.length < 10) {
        //can focus the field only if displayed
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
            this.newLinkData.id = this.config.lastLinkInsertedId + 1;

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
            console.log(this.newLinkData);
            this.config.lastLinkInsertedId++
            this.saveItemsInStorage();
            this.inpCreatePlaceholder = "New Link + Enter";
            this.newLinkData = Object.assign({}, {});
            this.inpCreateStep = 0; //0+1=1
            break;
        }
        this.inpCreateStep++;
      }
    },
    //Create a new category
    createCategory(key) {
      console.log(key);
      console.log(this.inpCreateCategory.trim());
      if (key == "Enter" && this.inpCreateCategory.trim() != "") {
        var newId = this.config.lastCategoryInsertedId + 1; //get the next id
        var newCategory = { id: newId, name: this.inpCreateCategory, links: [] };
        this.categories.push(newCategory);
        this.config.lastCategoryInsertedId++
        console.log(newCategory)

        this.inpCreateCategory = ""; //empty the field
        this.currentCategory = newId; //select the created category
        this.saveItemsInStorage();
        this.$refs.inpCreateCategory.blur();
      }
    },
    //Delete a category
    deleteCategory(id) {
      this.redTrashId = "category-" + id
      if (this.stepIndexForCategoryDeletion < 2) { //increase step index for deletion (move from 0 to 2 = 2 confirmations)
        this.stepIndexForCategoryDeletion++
      } else {  //delete the category after the 2 confirmations
        this.categories = this.categories.filter(function(cat) {
          return cat.id !== id;
        }); //deletion by filtering categories to exclude the category to delete
        this.currentCategory = null;
        this.saveItemsInStorage()
        this.resetTrashData()
      }
    },
    saveItemsInStorage() {
      browser.storage.local
        .set({
          config: JSON.parse(JSON.stringify(this.config)),
          links: JSON.parse(JSON.stringify(this.links)), //Stringify and parse to have a new independent object
          categories: {
            current: this.currentCategory,
            list: JSON.parse(JSON.stringify(this.categories))
          }
        })
        .then(() => {
          this.getItemsFromStorage();
        });
    },
    getItemsFromStorage() {
      browser.storage.local.get().then(raw => {
        return raw.categories.list;
      });
    },
    loadItemsFromStorage() {
      browser.storage.local.get().then(raw => {
        if (raw.links != null && raw.categories != null && raw.config != null) {
          this.links = raw.links;
          this.categories = raw.categories.list;
          this.currentCategory = raw.categories.current;
          this.config = raw.config
        } else {
          this.links = [];
          this.categories = [];
          this.currentCategory = null;
          this.config = JSON.parse(JSON.stringify({
            lang: "en",
            lastLinkInsertedId: 0,
            lastCategoryInsertedId: 0
          }))
        }
        console.log(this.links);
        console.log(this.categories);
        console.log(this.currentCategory);
        console.log(this.config);
      });
    },
    loadFirstTime() {
      //for debug only
      browser.storage.local.set({
        config: {
          lang: "en",
          lastLinkInsertedId: 11,
          lastCategoryInsertedId: 2
        },
        categories: {
          current: 2,
          list: [
            { id: 1, name: "KanFF", links: [1, 3, 5, 8] },
            { id: 2, name: "School", links: [2, 8] },
            { id: 4, name: "Sport", links: [4, 9, 1, 8] }
          ]
        },
        links: [
          { id: 1, name: "DevDashboard", link: "localhost:8008", local: true },
          {
            id: 2,
            name: "GitHub Profile",
            link: "github.com/samuelroland",
            local: false
          },
          {
            id: 3,
            name: "KanFF",
            link: "localhost:8084/index.php",
            local: true
          },
          { id: 4, name: "test.org", link: "test.org", local: false },
          { id: 5, name: "test2.org", link: "test2.org", local: false },
          { id: 6, name: "test3.org", link: "test3.org", local: false },
          { id: 7, name: "test4.org", link: "test4.org", local: false },
          { id: 8, name: "test5.org", link: "test5.org", local: false },
          { id: 9, name: "test6.org", link: "test6.org", local: false },
          { id: 10, name: "test7.org", link: "test7.org", local: false },
          { id: 11, name: "test8.org", link: "test8.org", local: false }
        ]
      });
      console.log(this.getItemsFromStorage());
      this.loadItemsFromStorage();
    },
    //Delete a link given by id
    deleteALink(id) {
      console.log("delete item at id " + id);
      if (this.redTrashId != 'link-' + id) {
        this.redTrashId = 'link-'+ id; //put the current trash red
      } else {
        //if equal, the red trash is already red (so this is the confirmation click/second time)
        this.links = this.links.filter(function(item) {
          return item.id !== id;
        });//Delete the link by filtering the list
        this.saveItemsInStorage();
        this.resetTrashData()
      }
    },
    //Add a link to a category
    addALinkToCurrentCategory(id) {
      if (id != null) {
        console.log("add a link " + id + " at category " + this.currentCategory);
        var category = this.categories.filter(
          cat => cat.id == this.currentCategory
        )[0];
        console.log(category.links);
        category.links.push(id);
        this.saveItemsInStorage();
        this.linkToAdd = null; //set again to "Add a link..." because the item has disappear
      }
    },
    //Remove a link from a category
    removeALinkFromCurrentCategory(id) {
      console.log("delete a link " + id + " at category " + this.currentCategory);
      var category = this.categories.filter(
        cat => cat.id == this.currentCategory
      )[0];
      console.log(category.links);
      delete category.links[category.links.indexOf(id)];
      this.saveItemsInStorage();
    }
  },
  mounted() {
    this.loadItemsFromStorage(); //when open extension, load saved data
  }
};
</script>
