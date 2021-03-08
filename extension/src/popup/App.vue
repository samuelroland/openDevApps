<template>
  <Popup :version="version" />
</template>

<script>
import Popup from "@/components/Popup.vue";

export default {
  name: "App",
  data() {
    return {
      version: "v0.1"
    }
  },
  components: { Popup },
};
</script>
