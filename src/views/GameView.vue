<template>
  <div id="container">
    <div id="quiz-board" ref="quizBoard">
      <div id="score">
        <span>{{ wordTimerDisplay.toFixed(2) }}</span>
        <span>{{ score }} / 10</span>
      </div>
      <span>
        <span id="white" :style="{ right: whiteRight, top: whiteTop }">{{
          currentWordStart
        }}</span>
        <span>
          <input
            :style="{ left: whiteRight, top: yellowTop }"
            ref="wordInput"
            v-model="inputWordEnd"
            id="yellow"
            @keyup.enter="checkAnswer"
          />
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import router from "../router/index.js";
import words from "@/assets/words.js";
import cryptoJs from "crypto-js";
import { randomKey } from "@/main";

const timeLimit = 3.2;

export default {
  setup() {
    const whiteRight = ref("");
    const whiteTop = ref("");
    const yellowTop = ref("");
    const quizBoard = ref(null);

    const allWords = ref(words);
    const wordsList = ref(words);
    const indexList = ref([]);

    const currentIndex = ref(0);
    const inputWordEnd = ref("");

    const wordInput = ref(null);

    const score = ref(0);
    const timer = ref(0);

    let wordTimer = null;
    const wordTimerDisplay = ref(timeLimit);

    let animationFrameId = null;

    const calculatePosition = () => {
      if (quizBoard.value) {
        const quizBoardRect = quizBoard.value.getBoundingClientRect();
        whiteRight.value = `${quizBoardRect.right - 170}px`;
        whiteTop.value = `${quizBoardRect.top + 104}px`;
        yellowTop.value = `${quizBoardRect.top + 90}px`;
      }
    };

    onMounted(() => {
      calculatePosition();
      window.addEventListener("resize", calculatePosition);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", calculatePosition);
    });

    onMounted(() => {
      if (wordInput.value) {
        wordInput.value.focus();
      }
      startGame();
    });

    const startGame = () => {
      generateWordsList();
      startTimer();
      setWordTimer();
    };

    const startTimer = () => {
      let startTime = performance.now();
      const animate = (now) => {
        const elapsedTime = now - startTime;
        timer.value = (elapsedTime / 1000).toFixed(2);
        animationFrameId = requestAnimationFrame(animate);
      };
      animationFrameId = requestAnimationFrame(animate);
    };

    const formattedTimer = computed(() => {
      return timer.value;
    });

    const getRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const generateWordsList = () => {
      const numberOfWordsToPick = 10;
      const totalWords = allWords.value.length;
      const selectedWords = new Set();

      while (selectedWords.size < numberOfWordsToPick) {
        const randomIndex = getRandomNumber(0, totalWords - 1);
        const selectedWord = allWords.value[randomIndex];

        if (!selectedWords.has(selectedWord)) {
          selectedWords.add(selectedWord);
          indexList.value.push(randomIndex);
        }
      }
      wordsList.value = Array.from(selectedWords);
    };

    const setWordTimer = () => {
      let countdown = setInterval(() => {
        if (wordTimerDisplay.value > 0) {
          wordTimerDisplay.value -= 0.01;
        } else {
          clearInterval(countdown);
          endGame();
        }
      }, 10);
    };

    const currentWord = computed(() => {
      return wordsList.value[currentIndex.value];
    });

    const currentWordStart = computed(() => {
      return currentWord.value.front;
    });

    const onInput = (event) => {
      inputWordEnd.value = event.target.innerText;
    };

    const encryptData = (data) => {
      const textToEncrypt = JSON.stringify(data);
      const encryptedData = cryptoJs.AES.encrypt(
        textToEncrypt,
        randomKey
      ).toString();
      return encryptedData;
    };

    const checkAnswer = () => {
      const enteredWordEnd = inputWordEnd.value.toLowerCase();
      const targetWordBack = currentWord.value.back;

      if (
        (Array.isArray(targetWordBack) &&
          targetWordBack.includes(enteredWordEnd)) ||
        (!Array.isArray(targetWordBack) &&
          enteredWordEnd === targetWordBack.toLowerCase())
      ) {
        inputWordEnd.value = "";
        score.value++;
        wordTimerDisplay.value = timeLimit;
        showNextWord();
      } else {
        endGame();
      }
    };

    const showNextWord = () => {
      inputWordEnd.value = "";
      if (currentIndex.value < wordsList.value.length - 1) {
        currentIndex.value++;
      } else {
        endGame();
      }
    };

    const endGame = () => {
      clearTimeout(wordTimer);
      cancelAnimationFrame(animationFrameId);
      router.push({
        path: "/result",
        query: {
          score: encryptData(score.value),
          timer: encryptData(timer.value),
          front: String(
            wordsList.value[score.value == 10 ? 9 : score.value].front
          ),
          back: String(
            wordsList.value[score.value == 10 ? 9 : score.value].back
          ),
        },
      });
    };

    return {
      currentWordStart,
      inputWordEnd,
      wordInput,
      score,
      formattedTimer,
      checkAnswer,
      wordTimerDisplay,
      onInput,
      whiteRight,
      whiteTop,
      yellowTop,
      quizBoard,
    };
  },
};
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
}
#quiz-board {
  width: 340px;
  height: 260px;
  margin-top: 30px;
  background-color: rgb(31, 31, 31);
  border-radius: 15px;
}
#score {
  margin: 20px;
}
span {
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  font-size: 60px;
  font-weight: 900;
  line-height: 1;
}
#white {
  position: absolute;
  color: rgb(240, 240, 240);
}
#yellow {
  position: absolute;
  margin: 0;
  display: inline;
  font-size: 60px;
  width: 120px;
  border: none;
  outline: none;
  background-color: transparent;
  color: rgb(250, 190, 30);
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  font-weight: 900;
  text-decoration: none;
  outline: none;
  box-shadow: none;
}
#score {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}
#score span {
  font-size: 20px;
  color: rgb(240, 240, 240);
}
</style>
