import { createApp } from "vue"
import App from "./App.vue"
import { createRouter, createWebHistory } from "vue-router"

import HomePage from "./pages/HomePage.vue"

const router = createRouter({
  routes: [
    {
      path: "/",
      component: HomePage,
    },
  ],
  history: createWebHistory(),
})

const app = createApp(App)

app.use(router)

app.mount("#app")
