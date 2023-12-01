<template>
  <div class="container">
    <div class="quiz-board">
      <div class="score">
        <span>{{ wordTimerDisplay.toFixed(2) }}</span>
        <span>{{ score }} / 10</span>
      </div>
      <p>
        <span class="white">{{ currentWordStart }}</span>
        <input
          ref="wordInput"
          v-model="inputWordEnd"
          maxlength="2"
          class="yellow"
          @keyup.enter="checkAnswer"
        />
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import router from "../router/index.js";
import words from "@/assets/words.js";

const timeLimit = 3.2;
export default {
  setup() {
    const allWords = ref(words);
    const wordsList = ref(words);
    const currentIndex = ref(0);
    const inputWordEnd = ref("");
    const score = ref(0);
    const timer = ref(0);
    const wordInput = ref(null);
    let wordTimer = null;
    const wordTimerDisplay = ref(timeLimit);
    let animationFrameId = null;

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
        router.push({
          path: "/result",
          query: { score: score.value },
        });
      }
    };

    const showNextWord = () => {
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
        query: { score: score.value, timer: timer.value },
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
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.quiz-board {
  width: 300px;
  height: 300px;
  margin-top: 30px;
  padding: 20px;
  background-color: rgb(31, 31, 31);
  border-radius: 15px;
}
span {
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  font-size: 60px;
  font-weight: 900;
}
.white {
  color: rgb(240, 240, 240);
}
input.yellow {
  font-size: 60px;
  width: 120px;
  border: none;
  outline: none;
  background-color: transparent;
  color: rgb(250, 190, 30);
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  font-weight: 900;
}
.score {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}
.score span {
  font-size: 20px;
  color: rgb(240, 240, 240);
}
</style>
