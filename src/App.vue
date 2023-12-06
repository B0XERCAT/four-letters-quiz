<template>
  <div id="wrapper">
    <AdfitTop></AdfitTop>
    <TheTitle></TheTitle>
    <main>
      <RouterView></RouterView>
    </main>
  </div>
  <footer><AdfitBottom></AdfitBottom></footer>
</template>

<script>
import TheTitle from "./components/TheTitle.vue";
import AdfitTop from "./components/AdfitTop.vue";
import AdfitBottom from "./components/AdfitBottom.vue";

export default {
  name: "App",
  components: { TheTitle, AdfitTop, AdfitBottom },
};
</script>

<style>
@import "./assets/reset.css";

html {
  background-color: rgba(0, 0, 0, 0.932);
  height: 100%;
}
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#wrapper {
  position: relative;
  min-height: 100vh;
}
footer{
  position: fixed;
  width: 100%;
  transform: translate(0, -50px);
}
</style>
