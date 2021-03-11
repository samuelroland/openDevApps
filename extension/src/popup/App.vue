<template>
  <Popup :version="version" :versionDate="versionDate" />
</template>

<script>
import Popup from "@/components/Popup.vue";

export default {
  name: "App",
  data() {
    return {
      version: "v0.1",
      versionDate: "xx.xx.2021"
    }
  },
  components: { Popup },
};
</script>
