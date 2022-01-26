<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <AlertPane />
  </div>
</template>

<script>
import AlertPane from "@/components/AlertPane.vue";

export default {
  name: "App",
  components: {
    AlertPane,
  },
};
</script>

<style>
/* TODO: themes take over general styling
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
