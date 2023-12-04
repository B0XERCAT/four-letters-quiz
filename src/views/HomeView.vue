<template>
  <div id="explanation">
    <div>
      <p>앞의 두 글자만 보고 단어를 완성하세요 !</p>
    </div>
    <img id="notice" src="../assets/images/notice.png" />
  </div>
  <RouterLink to="/game"><VButton text="게임 시작"></VButton></RouterLink>
</template>

<script>
import VButton from "../components/VButton.vue";
export default {
  components: { VButton },
};
</script>

<style scoped>
* {
  color: rgb(240, 240, 240);
}
p {
  padding: 20px;
  font-size: 14px;
}
@media screen and (min-width: 376px) {
  p {
    font-size: 16px;
  }
}
#explanation {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#notice {
  width: 80%;
  max-width: 500px;
  margin-bottom: 40px;
  margin-top: 40px;
}
</style>
