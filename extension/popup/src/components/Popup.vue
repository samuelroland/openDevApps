<template>
  <div class="bg-blue-300 w-64 h-auto p-1">
    <div class="flex w-full">
      <div class="flex flex-1">
        <h3 class="flex flex-row items-center m-0 text-xl">
          open <img src="icons/icon-48.png" class="w-4 " alt="" />evD
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
          @click="goToManual"/>
        <img
          src="icons/help.svg"
          alt="help icon"
          title="try to store!"
          class="w-8 hover:bg-blue-500 rounded hover:text-white px-1"
          @click="tryToStore"
      /></span>
    </div>
    <ul class="list-none">
      <li
        v-for="item in items"
        :key="item.id"
        class="text-base flex hover:border-blue-800 hover:bg-blue-400 rounded-sm border my-1 border-solid border-blue-600"
      >
        <a
          :href="'http://' + item.link"
          class="hover:text-white w-full block flex px-1"
        >
          <span class=" flex-1">{{ item.name }}</span>
          <span>
            <img
              src="icons/home.svg"
              class="w-4 mx-1 inline"
              title="Local"
              v-if="item.local"
            />
            <img
              src="icons/arrow-circle-up.svg"
              class="w-4 inline"
              title="Website up"
              alt=""
            /> </span
        ></a>
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
      items: [
        { id: 1, name: "DevDashboard", link: "localhost:8008", local: true },
        {
          id: 2,
          name: "GitHub Profile",
          link: "github.com/samuelroland",
          local: false,
        },
        { id: 3, name: "KanFF", link: "localhost:8084/index.php", local: true },
        { id: 3, name: "KanFF.org", link: "kanff.org", local: false },
      ],
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
    tryToStore() {
      browser.storage.sync.set({ test: "salut" });
      console.log(browser.storage.sync);
    },
  },
};
</script>
