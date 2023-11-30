<template>
  <TheTitle></TheTitle>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<script>
import TheTitle from "./components/TheTitle.vue";
export default {
  name: "App",
  components: { TheTitle },
};
</script>

<style>
@import "./assets/reset.css";
body {
  background-color: rgba(0, 0, 0, 0.932);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
