<template>
  <div>
    <div class="flex">
      <div style=" display: flex;">
        <h3
          style="display: flex;flex-direction: row;align-items: center; margin:0;"
        >
          open<img src="icons/icon-48.png" alt="" />evD
        </h3>
        <span>v0.1</span>
      </div>
      <span
        ><img src="icons/code.svg" alt=""/> <img src="icons/help.svg" alt=""
      /></span>
    </div>
    <ul>
      <li>
        DevDashboard
        <span
          ><img src="icons/home.svg" alt=""/><img
            src="icons/arrow-circle-up.svg"
            alt=""
        /></span>
      </li>
      <li>E-commerce in dev</li>
      <li>localhost:8085</li>
      <li>GitHub Profile</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {
    msg: String,
  },
};
</script>
