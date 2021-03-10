<template>
  <div
    class="bg-blue-300 w-64 overflow-hidden overscroll-none p-1"
    style="min-height: 75px"
  >
    <div class="flex w-full">
      <div class="flex flex-1">
        <h3
          class="flex flex-row items-center m-0 text-lg"
          title="Open quickly in the browser some local or remote dev apps."
        >
          open <img src="icons/D.png" class="w-4" alt="D" />evD
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
    <ul class="list-none">
      <li class="text-base rounded-sm my-1">
        <select
          name="project"
          id="sltProject"
          ref="sltProject"
          class="rounded-sm"
          v-model="currentProject"
          @change="saveItemsInStorage"
          title="Choose a project or All."
        >
          <option :value="null">All</option>
          <option
            v-for="project in projects"
            :value="project.id"
            :key="project.id"
          >
            {{ project.name }}
          </option>
        </select>
      </li>
      <!-- Input to create a new project -->
      <li
        v-if="settingsEnabled"
        class="mb-4 text-base flex hover:border-blue-800 hover:bg-blue-400 rounded-sm border my-1 border-solid border-blue-600"
      >
        <input
          type="text"
          v-model="inpCreateProject"
          :placeholder="inpCreateProjectPlaceholder"
          @keyup="createProject($event.key)"
          class="w-full px-1 rounded-sm"
          ref="inpCreateProject"
          @click="this.redTrashId = null"
        />
      </li>
    </ul>
    <ul class="list-none" v-if="links.length != 0">
      <li v-for="link in linksForCurrentProject" :key="link.id" class="flex">
        <a
          @click="this.redTrashId = null"
          :href="'https://' + link.link"
          :title="link.link"
          class="hover:text-white flex-1 w-full block flex px-1 text-base flex hover:border-blue-800 hover:bg-blue-400 rounded-sm border my-1 border-solid border-blue-600"
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
          class="ml-1 w-8 p-1"
          :class="{
            'bg-red-300': redTrashId == link.id,
            'hover:bg-red-400': redTrashId === link.id,
            'hover:bg-blue-400': !redTrashId === link.id,
          }"
          src="icons/trash.svg"
          alt="trash icon"
          title="Delete permanently the link."
          @click="deleteALink(link.id)"
        />
        <img
          v-if="settingsEnabled && currentProject != null"
          class="w-8 p-1"
          src="icons/removelink.svg"
          alt="trash icon"
          title="Remove the link from this project."
          @click="removeALinkFromCurrentProject(link.id)"
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
        v-if="settingsEnabled && currentProject != null"
        class="text-base flex rounded-sm my-1"
      >
        <select
          name="sltAddLink"
          class="rounded-sm flex-1"
          ref="inpCreateInput"
          @click="this.redTrashId = null"
          v-model="linkToAdd"
        >
          <option :value="null">Add a link...</option>
          <option
            v-for="link in linksNotInCurrentProject"
            :value="link.id"
            :key="link.id"
          >
            {{ link.name }}
          </option>
        </select>

        <button
          class="px-1 border-solid border border-blue-100 mx-1 rounded-sm"
          @click="addALinkToCurrentProject(linkToAdd)"
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
          @click="this.redTrashId = null"
        />
      </li>
      <li
        v-if="links.length >= 10"
        class="text-base rounded-sm my-1 text-center italic text-gray-500"
      >
        <span class="text-xs">10 links is the maximum</span>
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
      currentProject: null,
      inpCreateProject: "",
      inpCreate: "",
      linkToAdd: null,
      links: [],
      projects: [],
      inpCreateProjectPlaceholder: "New Project + Enter",
      inpCreatePlaceholder: "New Link + Enter",
      inpCreateStep: 0,
      newLinkData: {},
      redTrashId: null
    };
  },
  computed: {
    linksNotInCurrentProject() {
      return this.getLinksNotInCurrentProject();
    },
    linksForCurrentProject() {
      return this.getLinksForCurrentProject();
    }
  },
  methods: {
    getLinksNotInCurrentProject() {
      var linksIn = this.getLinksForCurrentProject();
      return this.links.filter(link => linksIn.indexOf(link) == -1);
    },
    //Get the array of the links that will be displayed, depending on the current selected project
    getLinksForCurrentProject() {
      if (this.currentProject == null) {
        //"All" option is selected
        return this.links;
      }

      //Get the project with id in sltProject value
      var projectId = this.currentProject;
      var project = this.projects.filter(proj => proj.id == projectId)[0]; //filter the array and take the alone element

      if (project != undefined) {
        //if there is a bug with project
        return this.links.filter(link => project.links.indexOf(link.id) != -1); //return all the links that are present in the project.links list of ids
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
      this.redTrashId = null;
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
    //Create a new project
    createProject(key) {
      console.log(key);
      console.log(this.inpCreateProject.trim());
      if (key == "Enter" && this.inpCreateProject.trim() != "") {
        var newId = 10; //get the next id
        var newProject = { id: 10, name: this.inpCreateProject, links: [] };
        this.projects.push(newProject);

        this.inpCreateProject = ""; //empty the field
        this.currentProject = newId; //select the created project
        this.saveItemsInStorage();
      }
    },
    saveItemsInStorage() {
      browser.storage.local
        .set({
          links: JSON.parse(JSON.stringify(this.links)), //Stringify and parse to have a new independent object
          projects: {
            current: this.currentProject,
            list: JSON.parse(JSON.stringify(this.projects))
          }
        })
        .then(() => {
          this.getItemsFromStorage();
        });
    },
    getItemsFromStorage() {
      browser.storage.local.get().then(raw => {
        return raw.projects.list;
      });
    },
    loadItemsFromStorage() {
      browser.storage.local.get().then(raw => {
        if (raw.links != null) {
          this.links = raw.links;
          this.projects = raw.projects.list;
          this.currentProject = raw.projects.current;
        } else {
          this.links = [];
          this.projects = [];
          this.currentProject = null;
        }
        console.log(this.links);
        console.log(this.projects);
        console.log(this.currentProject);
      });
    },
    loadFirstTime() {
      //for debug only
      browser.storage.local.set({
        projects: {
          current: 2,
          list: [
            { id: 1, name: "KanFF", links: [1, 3, 5, 8] },
            { id: 2, name: "School", links: [2, 8] }
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
      if (this.redTrashId != id) {
        this.redTrashId = id; //put the current trash red
      } else {
        //if equal, the red trash is already red (so this is the second click)
        //Delete the link by filtering the list
        this.links = this.links.filter(function(item) {
          return item.id !== id;
        });
        this.saveItemsInStorage();
      }
    },
    //Add a link to a project
    addALinkToCurrentProject(id) {
      if (id != null) {
        console.log("add a link " + id + " at project " + this.currentProject);
        var project = this.projects.filter(
          proj => proj.id == this.currentProject
        )[0];
        console.log(project.links);
        project.links.push(id);
        this.saveItemsInStorage();
        this.linkToAdd = null; //set again to "Add a link..." because the item has disappear
      }
    },
    //Remove a link from a project
    removeALinkFromCurrentProject(id) {
      console.log("delete a link " + id + " at project " + this.currentProject);
      var project = this.projects.filter(
        proj => proj.id == this.currentProject
      )[0];
      console.log(project.links);
      delete project.links[project.links.indexOf(id)];
      this.saveItemsInStorage();
    }
  },
  mounted() {
    this.loadItemsFromStorage(); //when open extension, load saved links
  }
};
</script>
