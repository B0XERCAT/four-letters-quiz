<template>
  <div>
    <span class="white">네 글자</span>
    <span class="yellow"> 퀴즈</span>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
span {
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  font-size: 45px;
  font-weight: 900;
}
.white {
  color: white;
}
.yellow {
  color: yellow;
}
div {
  margin: 30px;
}
@media screen and (min-width: 376px) {
  span {
    font-size: 60px;
  }
  div {
    margin: 40px;
  }
}
</style>
