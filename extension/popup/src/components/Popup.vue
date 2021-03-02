<template>
  <div>
    <div class="flex">
      <div class="flex">
        <h3 class="flex flex-row items-center m-0">
          open<img src="icons/icon-48.png" alt="" />evD
        </h3>
        <span>v0.1</span>
      </div>
      <span
        ><img src="icons/code.svg" alt=""/> <img src="icons/help.svg" alt=""
      /></span>
    </div>
    <ul class="list-none pl-5">
      <li v-for="item in items" :key="item.id">
        <a :href="item.link">{{ item.name }}</a>
      </li>
      <li>
        DevDashboard
        <span
          ><img src="icons/home.svg" alt=""/><img
            src="icons/arrow-circle-up.svg"
            alt=""
        /></span>
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
