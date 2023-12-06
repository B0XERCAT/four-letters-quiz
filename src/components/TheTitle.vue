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
  text-shadow: -3px -3px 0 #313131, 3px -3px 0 #313131, -3px 3px 0 #313131,
    3px 3px 0 #313131;
  font-size: 45px;
  font-weight: 900;
}
.white {
  color: rgb(240, 240, 240);
}
.yellow {
  color: rgb(250, 190, 30);
}
div {
  margin-top: 20px;
}
@media screen and (min-width: 376px) {
  span {
    font-size: 60px;
  }
}
</style>
