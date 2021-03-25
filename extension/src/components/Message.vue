<!--
Component: Message
Description: a message displayed to inform the user about the last action success or fail
 -->

<template>
  <div
    class="text-sm max-h-5 transition-opacity duration-400 ease-out flex px-2 mt-1 rounded-sm w-full"
    :class="{
      'bg-blue-200': success,
      'bg-red-200': !success,
      invisible: !open
    }"
  >
    <span class="flex-1 overflow-hidden overflow-ellipsis">{{ message }}</span>
    <span @click="closeMessage" class="flex ml-1 items-center cursor-pointer"
      >X</span
    >
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    message: {
      required: true,
      type: String
    },
    success: {
      required: false,
      default: true,
      type: Boolean
    },
    open: {
      required: false,
      default: true,
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {
    //Message can be closed with the cross
    closeMessage() {
      this.$emit("messageclose");
    },
    //Message is automatically closed after 4 seconds - WIP
    closeIn4Seconds() {
      setTimeout(() => {
        console.log("emitted closeIn4Seconds");
        this.$emit("messageclose");
      }, 4000);
    }
  }
};
</script>
