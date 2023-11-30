<template>
  <div class="explanation">
    <div>
      <p>네 글자 단어의 첫번째, 두번째 글자만 표시됩니다.</p>
      <p>뒤의 두 글자를 입력한 뒤, '엔터' 키를 눌러주세요.</p>
    </div>
    <div class="notice">
      <h2>주의 사항</h2>
      <p>1. 문제는 랜덤으로 출제되며 총 10문제입니다.</p>
      <p>2. 각 문제마다 입력 제한 시간은 3초입니다.</p>
      <p>3. 시간을 초과하거나 오답 제출 시 종료됩니다.</p>
      <p>4. 10문제를 모두 맞춰야 시간 기록이 표시됩니다.</p>
    </div>
  </div>
  <RouterLink to="/game"><VButton text="게임 시작"></VButton></RouterLink>
</template>

<script>
import VButton from "../components/VButton.vue";
export default {
  components: { VButton },
  setup() {
    return {};
  },
};
</script>

<style scoped>
* {
  color: white;
}
p {
  padding: 5px;
  margin: 0;
  font-size: 12px;
}
.explanation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
h2 {
  color: red;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  font-size: 22px;
  font-weight: 900;
  margin-bottom: 15px;
}
.notice {
  width: 300px;
  background-color: rgb(31, 31, 31);
  padding: 20px 15px;
  border-radius: 15px;
  margin-bottom: 40px;
}
.notice p {
  font-size: 11px;
  text-align: left;
}
@media screen and (min-width: 376px) {
  p {
    font-size: 15px;
  }
  .explanation {
    gap: 40px;
  }
  h2 {
    font-size: 36px;
    margin-bottom: 30px;
  }
  .notice {
    width: 360px;
    padding: 40px 18px;
    margin-bottom: 40px;
  }
  .notice p {
    font-size: 14px;
    padding: 7px;
  }
}
</style>
