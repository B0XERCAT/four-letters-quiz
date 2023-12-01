<template>
  <div id="container">
    <div id="result">
      <p v-if="score == '10'" class="comment">🎉</p>
      <p id="score">점수: {{ score }} / 10</p>
      <div id="timer" v-if="score == 10">
        <p>시간: {{ timer }}초</p>
      </div>
      <div v-else-if="score >= 8">
        <p class="comment">😣</p>
        <p>조금만 더 했으면 됐는데....!</p>
      </div>
      <div v-else-if="score >= 6">
        <p class="comment">🔥</p>
        <p>우리 조금 더 분발해 보아요..!</p>
      </div>
      <div v-else>
        <p class="comment">🦅</p>
        <p>독수리 타법을 고칠 필요가 있군요!</p>
      </div>
      <img
        src="../assets/images/kakaotalk_sharing_btn_medium_ov.png"
        alt="카카오톡으로 공유하기"
        @click="sendKakao"
      />
      <img
        src="../assets/images/link.png"
        alt="링크 복사하기"
        style="background-color: white"
        @click="copyToClipboard"
      />
    </div>
  </div>
  <RouterLink to="/"><VButton text="다시 시작"></VButton></RouterLink>

  <div class="contact"><p>데이터 추가 요청: seojin3154@naver.com</p></div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import VButton from "../components/VButton.vue";

export default {
  components: { VButton },
  setup() {
    const route = useRoute();
    const score = computed(() => route.query.score || "error");
    const timer = computed(() => route.query.timer || "측정불가");
    let result = "";

    if (score.value === "10") {
      result = `하핫! 10문제 모두 맞췄다!\n${route.query.timer}초만에 클리어 했어!`;
    } else {
      result = `나는 ${route.query.score}문제 맞췄어! 너도 도전해볼래!?`;
    }
    
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.VUE_APP_LOCAL_API_KEY);
    }
    const sendKakao = () => {
      window.Kakao.Link.sendScrap({
        requestUrl: "http://localhost:8080/",
        templateId: 101423,
        templateArgs: {
          RESULT: result,
        },
      });
    };

    const copyToClipboard = () => {
      navigator.clipboard
        .writeText("https://fourlettersquizz.web.app/")
        .then(() => {
          alert("링크를 클립보드에 복사했습니다!");
        })
        .catch(() => {
          alert("클립보드 복사 실패!");
        });
    };

    return {
      score,
      timer,
      sendKakao,
      copyToClipboard,
    };
  },
};
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
}
p {
  color: white;
}
#result {
  width: 300px;
  height: 300px;
  background-color: rgb(31, 31, 31);
  padding: 30px 15px;
  border-radius: 15px;
  margin-bottom: 30px;
}
#score {
  font-size: 38px;
  font-weight: 700;
  margin-bottom: 30px;
}
#timer {
  font-size: 36px;
  font-weight: 700;
}
span {
  font-size: 30px;
}
.comment {
  margin-bottom: 30px;
  font-size: 80px;
}
img {
  cursor: pointer;
  width: 40px;
  border-radius: 30%;
  margin: 30px 10px;
}
.contact {
  margin-top: 40px;
}
.contact p {
  color: grey;
  font-size: 12px;
}
</style>
