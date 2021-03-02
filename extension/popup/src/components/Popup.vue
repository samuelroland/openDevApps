<template>
  <div class="bg-blue-300 w-40 p-1">
    <div class="flex w-full">
      <div class="flex flex-1">
        <h3 class="flex flex-row items-center m-0">
          open <img src="icons/icon-48.png" class="w-4 " alt="" />evD
        </h3>
        <span class="text-xs flex items-end ml-1">v0.1</span>
      </div>
      <span class="flex"
        ><img
          src="icons/code.svg"
          class="w-5 hover:bg-blue-500 rounded hover:text-white px-1"
          alt=""/>
        <img
          src="icons/help.svg"
          alt=""
          class="w-5 hover:bg-blue-500 rounded hover:text-white px-1"
      /></span>
    </div>
    <ul class="list-none">
      <li
        v-for="item in items"
        :key="item.id"
        class="text-xs hover:bg-blue-400 rounded-sm border my-1 border-solid border-blue-600"
      >
        <a
          :href="'http://' + item.link"
          class="hover:text-white w-full block px-1"
          >{{ item.name }}
          <span>
            <img
              src="icons/home.svg"
              class="w-2 inline"
              alt=""
              v-if="item.local"
            />
            <img
              src="icons/arrow-circle-up.svg"
              class="w-2 inline"
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
        { id: 2, name: "GitHub Profile", link: "github.com", local: false },
        { id: 3, name: "KanFF", link: "localhost:8084", local: true },
        { id: 3, name: "KanFF.org", link: "kanff.org", local: false },
      ],
    };
  },
};
</script>
