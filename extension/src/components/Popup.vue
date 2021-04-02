<!--
    openDevApps - Open quickly local or remote development-related apps, through a small list of links.
    Copyright (C) 2021 Samuel Roland

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<template>
  <div
    class="bg-blue-300 w-80 overflow-hidden overscroll-none p-1"
    style="min-height: 75px"
  >
    <!-- Header DIV -->
    <div class="flex w-full mb-2">
      <div class="flex flex-1 min-w-max">
        <h3
          class="flex flex-row items-center m-0 text-lg cursor-help"
          title="Open quickly local or remote development-related apps, through a small list of links. An opensource web extension licensed under GPLv3."
        >
          open <img src="icons/D.png" class="w-4" alt="D" />evApps
        </h3>
        <span
          class="text-xs cursor-help italic flex items-end ml-1 w-10"
          :title="'Released the ' + versionDate + '.'"
          >{{ version }}</span
        >
      </div>
      <div class="flex items-end min-w-max overflow-hidden overflow-ellipsis">
        <img
          v-if="settingsEnabled && currentCategory != null"
          :class="{
            'hover:bg-red-300':
              (redTrashId === stepIndexForCategoryDeletion) == 0,
            'bg-red-300':
              redTrashId == 'category-' + currentCategory &&
              stepIndexForCategoryDeletion == 1,
            'hover:bg-red-400':
              redTrashId === 'category-' + currentCategory &&
              stepIndexForCategoryDeletion == 1,
            'bg-red-400':
              redTrashId === 'category-' + currentCategory &&
              stepIndexForCategoryDeletion == 2,
            'hover:bg-red-500':
              redTrashId === 'category-' + currentCategory &&
              stepIndexForCategoryDeletion == 2
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
          class="rounded-sm overflow-hidden overflow-ellipsis"
          style="max-width: 110px"
          v-model="currentCategory"
          @change="
            saveItemsInStorage();
            resetTrashData();
          "
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

    <!-- Message zone -->
    <div>
      <Message
        @messageclose="msg.open = false"
        :message="msg.text"
        :open="msg.open"
        :success="msg.success"
      ></Message>
    </div>

    <!-- Field to create a new category - Only if settings enabled -->
    <ul class="list-none">
      <div v-if="settingsEnabled">
        <hr class="mt-2" />
        <span class="text-xs text-blue-700 flex mt-2 mb-1"
          >Create a new category</span
        >
      </div>
      <li v-if="settingsEnabled" class="mb-2 text-base flex my-1">
        <input
          maxlength="15"
          type="text"
          v-model="inpCreateCategory"
          :placeholder="inpCreateCategoryPlaceholder"
          @keyup="createCategory($event.key)"
          class="input-standard"
          ref="inpCreateCategory"
          @click="resetTrashData"
        />
      </li>
    </ul>

    <!-- The list of links for the current category - Always displayed (with icons at right if settings enabled) -->
    <ul class="list-none" v-if="links.length != 0">
      <div v-if="settingsEnabled">
        <hr class="mt-2" />
        <span class="text-xs text-blue-700 flex mt-2 mb-1">
          <span v-if="currentCategory != null">
            Manage links added to
            <span class="italic ml-1">{{ currentCategoryName }}</span>
          </span>
          <span v-else>Manage all links</span>
        </span>
      </div>
      <li v-for="link in linksForCurrentCategory" :key="link.id" class="flex">
        <a
          @click="
            resetTrashData();
            closePopup();
          "
          :href="formatLink(link.link)"
          :title="link.link"
          class="hover:text-white flex-1 w-full h-7 flex px-1 text-base overflow-hidden overflow-ellipsis hover:border-blue-800 hover:bg-blue-400 rounded-sm border mt-1 border-solid border-blue-600"
        >
          <span class="flex-1 overflow-hidden overflow-ellipsis">{{
            link.name
          }}</span>
          <span>
            <img
              src="icons/home.svg"
              class="w-5 mx-1 inline"
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
            'bg-red-300': redTrashId == 'link-' + link.id,
            'hover:bg-red-400': redTrashId === 'link-' + link.id,
            'hover:bg-red-300': !(redTrashId === 'link-' + link.id)
          }"
          src="icons/trash.svg"
          alt="trash icon"
          title="Delete permanently the link (1 confirmation)."
          @click="deleteALink(link.id)"
        />
        <img
          v-if="settingsEnabled && currentCategory != null"
          class="w-8 p-1 cursor-pointer hover:bg-red-300"
          src="icons/link-variant-remove.svg"
          alt="trash icon"
          title="Remove the link from this category."
          @click="removeALinkFromCurrentCategory(link.id)"
        />
      </li>
    </ul>

    <!-- "No link" mention if there is no link -->
    <ul
      class="list-none"
      :hidden="!(this.linksForCurrentCategory.length === 0)"
    >
      <li class="text-sm rounded-sm my-1 text-center italic text-gray-500">
        No link {{ currentCategory == null ? "at all" : "here" }}...<span
          class="text-xs"
          ><span v-if="settingsEnabled == false"> -> Open settings</span></span
        >
      </li>
    </ul>

    <!-- Add a link zone, with a list of links not added to the current category - Only if category is not "All" and settings enabled -->
    <ul class="list-none" :hidden="!settingsEnabled || currentCategory == null">
      <div class="">
        <hr class="mt-2" />
        <span class="text-xs text-blue-700 whitespace-nowrap flex mt-2 mb-1">
          <span
            class="text-xs text-blue-700 overflow-hidden overflow-ellipsis"
            :title="'Add a link to ' + currentCategoryName"
            >Add a link to
            <span class="italic">{{ currentCategoryName }}</span></span
          >
        </span>
      </div>
      <li v-if="settingsEnabled && currentCategory != null" class="flex">
        <select
          name="sltAddLink"
          class="input-standard"
          ref="inpCreateLink"
          @click="resetTrashData"
          v-model="linkToAdd"
        >
          <option :value="null" class="italic text-gray-500">Choose...</option>
          <option
            v-for="link in linksNotInCurrentCategory"
            :value="link.id"
            :key="link.id"
          >
            {{ link.name }}
          </option>
        </select>
        <button
          class="px-1 border-solid border border-blue-100 mx-1 rounded-sm hover:border-blue-800 hover:bg-blue-400"
          @click="addALinkToCurrentCategory(linkToAdd)"
        >
          Add
        </button>
      </li>
    </ul>

    <!-- Create a link zone, with one input to fill 2 needed informations - Only if settings enabled -->
    <ul class="list-none" :hidden="!settingsEnabled">
      <div class="">
        <hr class="mt-2" />
        <span class="text-xs text-blue-700 whitespace-nowrap flex mt-2 mb-1">
          <span class="text-xs text-blue-700 overflow-hidden overflow-ellipsis"
            >Create a new link
            <span v-if="currentCategory != null">
              and add to
              <span class="italic">{{ currentCategoryName }}</span></span
            ></span
          >
        </span>
      </div>
      <li v-if="links.length < NB_MAX_LINKS" class="text-base flex mb-1">
        <!-- Text input to enter link and name at step 1 and 2 -->
        <input
          v-if="inpCreateStep != 3"
          type="text"
          v-model="inpCreate"
          :placeholder="inpCreatePlaceholder"
          @keyup="nextStepOfLinkCreation"
          class="input-standard"
          ref="inpCreateLink"
          @click="resetTrashData"
        />

        <!-- Checkbox input to enter local at step 3 -->
        <span class="flex w-full px-1" v-if="inpCreateStep == 3">
          <span class="flex-1"
            >Local ? <span class="text-xs">(Check + Enter)</span>
          </span>
          <input
            type="checkbox"
            class="mx-3 p-1"
            ref="inpCreateCheckbox"
            @keyup="nextStepOfLinkCreation"
            @click="$refs.inpCreateCheckbox.focus()"
            v-model="inpCreateChecked"
          />
        </span>
      </li>
      <li
        v-if="links.length >= NB_MAX_LINKS"
        class="text-base rounded-sm my-1 text-center italic text-gray-500"
      >
        <span class="text-xs"
          >the maximum is {{ NB_MAX_LINKS }} links in total</span
        >
      </li>
    </ul>

    <!-- Footer with 3 icons: link to source code, link to manual and settings button - Always displayed -->
    <div class="flex flex-1 mt-2 justify-end">
      <img
        src="icons/github.svg"
        class="w-7 hover:bg-blue-500 rounded hover:text-white p-1"
        alt="code icon"
        title="Checkout the code on GitHub, it's opensource !"
        @click="goToSourceCode"
      />
      <img
        src="icons/help-circle-outline.svg"
        alt="help icon"
        title="See the manual."
        class="w-7 hover:bg-blue-500 rounded hover:text-white px-1"
        @click="goToManual"
      />
      <img
        src="icons/settings.svg"
        alt="settings icon"
        title="Open/Close settings"
        class="w-7 hover:bg-blue-500 rounded hover:text-white px-1"
        @click="openSettings"
      />
    </div>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";
export default {
  name: "Popup",
  props: {
    //Version information
    version: String,
    versionDate: String
  },
  data() {
    return {
      //Constants:
      NB_MAX_LINKS: 15,
      //Regex to validate links
      //Source of the Regex: https://regexr.com/3grae --> modified to add possibility to have nothing before domain or IP
      //Versions managed here: https://regexr.com/5pus0
      LINK_REGEX:
        "^(((https?:\\/\\/)|(www\\.)|())((([A-Z\\d_-]+\\.)+)([A-Z\\d]+)|(localhost))((:\\d{1,4})?))(([\\/\\?].*)?)$",
      //Attributes
      settingsEnabled: false,
      addingElementInRun: false,
      currentCategory: null,
      inpCreateCategory: "",
      inpCreate: "",
      inpCreateChecked: true,
      linkToAdd: null,
      links: [],
      categories: [],
      inpCreateCategoryPlaceholder: "Category name + Enter",
      inpCreatePlaceholder: "HTTP Link + Enter",
      inpCreateStep: 1,
      stepIndexForCategoryDeletion: 0,
      newLinkData: {},
      redTrashId: null,
      config: {
        lang: "en",
        lastLinkInsertedId: 0,
        lastCategoryInsertedId: 0
      },
      msg: {
        open: false,
        success: false,
        text: "??"
      }
    };
  },
  computed: {
    //Filtered list of this.links that are NOT added to the current category
    linksNotInCurrentCategory() {
      return this.getLinksNotInCurrentCategory();
    },
    //Filtered list of this.links that ARE in the current category
    linksForCurrentCategory() {
      return this.getLinksForCurrentCategory();
    },
    currentCategoryName() {
      if (this.currentCategory != null) {
        return this.categories.filter(cat => {
          return cat.id == this.currentCategory;
        })[0].name;
      }
      return " no category...";
    }
  },
  methods: {
    //Open a message and plan closing after 4 seconds
    openMessage(text, success) {
      if (text == "") {
        text = "...";
      }
      //Set given values for the message and open it
      this.msg.text = text;
      this.msg.success = success;
      this.msg.open = true;
    },
    //Close the message
    closeMessage() {
      this.msg.open = false;
    },
    //Validate a link with a Regex
    validateLink(link) {
      var pattern = new RegExp(this.LINK_REGEX, "i"); //flag "i" for case insentitive
      return pattern.test(link);
    },
    //Format a link (add http prefix) before rendering in <a> markup
    formatLink(link) {
      if (link == undefined) {
        return null;
      }
      if (
        link.toLowerCase().indexOf("http://") == 0 ||
        link.toLowerCase().indexOf("https://") == 0
      ) {
        return link; //the link is already an absolute path
      } else {
        return "http://" + link; //prefix http to the start to say to the browser that it's not a relative path
      }
    },
    //Close the popup, just after the link creation but not immediatly
    closePopup() {
      setInterval(() => {
        window.close();
      }, 10);
    },
    //Reset all data concerning trash (id and steps):
    resetTrashData() {
      this.redTrashId = null;
      this.stepIndexForCategoryDeletion = 0;
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
    //Go to source code button (icon with anchor) on GitHub
    goToSourceCode() {
      window.open("https://github.com/samuelroland/openDevApps", "_blank");
    },
    //Go to manual of the extension (interrogation mark icon) on GitHub
    goToManual() {
      window.open(
        "https://github.com/samuelroland/openDevApps/blob/develop/manual/manual-en.md#opendevapps---manual",
        "_blank"
      );
    },
    //Open settings and focus on create link input
    openSettings() {
      this.resetTrashData();
      this.settingsEnabled = !this.settingsEnabled; //invert settings status
      if (
        this.settingsEnabled === true &&
        this.links.length < this.NB_MAX_LINKS
      ) {
        //can focus the field only if displayed
        setTimeout(() => {
          this.$refs.inpCreateLink.focus();
        }, 50); //leave the component the time to load before focus
        this.inpCreateStep = 1; //set the creation step to 1
      }
    },
    //Execute next step of link creation
    nextStepOfLinkCreation(e) {
      var error = false;
      var key = e.key; //get the key entered (that has launched the event)
      if (
        key == "Enter" &&
        (this.inpCreate.trim() != "" || this.inpCreateStep == 3)
      ) {
        //key must be enter and input must not be empty (except for step 3)

        //Depending on the step of the link creation, change placeholder, save value and go to next step. Values are saved in this.newLinkData.
        switch (this.inpCreateStep) {
          case 1: //link is entered
            if (this.validateLink(this.inpCreate.trim())) {
              this.closeMessage(); //close to message to remove last message
              this.newLinkData.id = this.config.lastLinkInsertedId + 1;
              this.newLinkData.link = this.inpCreate.trim();
              this.inpCreatePlaceholder = "Set a name + Enter"; //placeholder for next step
              this.inpCreate = "";
            } else {
              this.openMessage("The URL is not valid...", false);
              error = true;
            }

            break;
          case 2: //placeholder is entered
            this.newLinkData.name = this.inpCreate.trim();
            this.inpCreateChecked = true;
            setTimeout(() => {
              this.$refs.inpCreateCheckbox.focus();
            }, 50);
            break;
          case 3: //local or not is given
            this.newLinkData.local = this.inpCreateChecked;
            this.links.push(this.newLinkData); //create the link
            console.log(this.newLinkData);
            this.config.lastLinkInsertedId++; //increment last inserted id

            //After creation, add the link to the current category:
            if (this.currentCategory != null) {
              this.addALinkToCurrentCategory(this.newLinkData.id);
            }

            //Save items after this action
            this.saveItemsInStorage();

            //Final config
            this.inpCreatePlaceholder = "HTTP Link + Enter"; //placeholder for next step
            this.inpCreate = "";
            this.newLinkData = Object.assign({}, {}); //destroy reference to the object
            this.inpCreateStep = 0; //0+1=1

            //Focus the input for next link creation
            setTimeout(() => {
              this.$refs.inpCreateLink.focus();
            }, 50);
            break;
        }

        //Go to next step only if no error has been found
        if (error == false) {
          this.inpCreateStep++;
        }
      }
    },
    //Create a new category
    createCategory(key) {
      if (key == "Enter" && this.inpCreateCategory.trim() != "") {
        var newId = this.config.lastCategoryInsertedId + 1; //get the next id
        var newCategory = {
          id: newId,
          name: this.inpCreateCategory,
          links: []
        };
        this.categories.push(newCategory);
        this.config.lastCategoryInsertedId++;

        this.inpCreateCategory = ""; //empty the field
        this.currentCategory = newId; //select the created category
        this.saveItemsInStorage();
        this.$refs.inpCreateCategory.blur();
      }
    },
    //Delete a category
    deleteCategory(id) {
      this.redTrashId = "category-" + id;
      if (this.stepIndexForCategoryDeletion < 2) {
        //increase step index for deletion (move from 0 to 2 = 2 confirmations)
        this.stepIndexForCategoryDeletion++;
      } else {
        //delete the category after the 2 confirmations
        this.categories = this.categories.filter(function(cat) {
          return cat.id !== id;
        }); //deletion by filtering categories to exclude the category to delete
        this.currentCategory = null;
        this.saveItemsInStorage();
        this.resetTrashData();
      }
    },
    //Save items from attributes in storage (config, links and categories)
    saveItemsInStorage() {
      browser.storage.sync
        .set({
          config: JSON.parse(JSON.stringify(this.config)),
          links: JSON.parse(JSON.stringify(this.links)), //Stringify and parse to have a new independent object
          categories: {
            current: this.currentCategory,
            list: JSON.parse(JSON.stringify(this.categories))
          }
        })
        .then(console.log("Items saved in storage."));
    },
    //Load items from storage to attributes (config, links and categories)
    loadItemsFromStorage() {
      browser.storage.sync.get().then(raw => {
        if (raw.links != null && raw.categories != null && raw.config != null) {
          this.links = raw.links;
          this.categories = raw.categories.list;
          this.currentCategory = raw.categories.current;
          this.config = raw.config;
        } else {
          this.links = [];
          this.categories = [];
          this.currentCategory = null;
          this.config = JSON.parse(
            JSON.stringify({
              lang: "en",
              lastLinkInsertedId: 0,
              lastCategoryInsertedId: 0
            })
          );
        }
        console.log(this.links);
        console.log(this.categories);
        console.log(this.currentCategory);
        console.log(this.config);
      });
    },
    //Delete a link given by id
    deleteALink(id) {
      console.log("delete item at id " + id);
      if (this.redTrashId != "link-" + id) {
        this.redTrashId = "link-" + id; //put the current trash red
      } else {
        //if equal, the red trash is already red (so this is the confirmation click/second time)
        this.links = this.links.filter(function(item) {
          return item.id !== id;
        }); //Delete the link by filtering the list
        this.saveItemsInStorage();
        this.resetTrashData();
      }
    },
    //Add a link to a category
    addALinkToCurrentCategory(id) {
      if (id != null) {
        console.log(
          "add a link " + id + " at category " + this.currentCategory
        );
        var category = this.categories.filter(
          cat => cat.id == this.currentCategory
        )[0];
        console.log(category.links);
        category.links.push(id);
        this.saveItemsInStorage();
        this.linkToAdd = null; //set again to "Choose..." because the item has disappear
      }
    },
    //Remove a link from a category
    removeALinkFromCurrentCategory(id) {
      var category = this.categories.filter(
        cat => cat.id == this.currentCategory
      )[0];
      console.log(category.links);
      delete category.links[category.links.indexOf(id)];
      this.saveItemsInStorage();
    }
  },
  components: { Message },
  mounted() {
    this.loadItemsFromStorage(); //when open extension, load saved data
  }
};
</script>
