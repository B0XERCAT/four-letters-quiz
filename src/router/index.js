import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import GameView from "@/views/GameView.vue";
import ResultView from "@/views/ResultView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/game",
    name: "game",
    component: GameView,
  },
  {
    path: "/result",
    name: "result",
    component: ResultView,
    props: true
  },
];
const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
