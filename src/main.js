import { createApp } from "vue"
import App from "./App.vue"
import { createRouter, createWebHistory } from "vue-router"

import { createStore } from "vuex"

import HomePage from "./pages/HomePage.vue"
import ProjectPage from "./pages/ProjectPage.vue"
import ErrorPage from "./pages/ErrorPage.vue"

import img1 from "./assets/chat.png"
import img2 from "./assets/e-shop.png"
import img3 from "./assets/nintendo-game-info-page.png"
import img4 from "./assets/countries-app.png"
import img5 from "./assets/pomodoro-app.png"
import img6 from "./assets/simon-says.png"
import img7 from "./assets/mwebrtc.png"

const router = createRouter({
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/projects/:id",
      component: ProjectPage,
    },
    {
      path: "/:notFound(.*)",
      component: ErrorPage,
    },
  ],
  history: createWebHistory(),
})

const store = createStore({
  state() {
    return {
      imgs: [
        {
          img: img7,
          title: "Talk-fuse",
          id: "talk-fuse",
          info: `
            Built a video chat app (think Omegle). Users can hop in for spontaneous video chats, making new connections inreal-time, all within their browser.
        `,
          tenchologies: ["HTML", "CSS", "JavaScript","TypeScript", "WebRTC", "Next.js","Sockets"],
          href: "",
          github: "https://github.com/moXq1/webRTC-app",
        },
        {
          img: img1,
          title: "Chatterino",
          id: "chatterino",
          info: `
          A chat app with simple authentication. By default, you are in the chat group with all people whoever created own account.
          Also, you can see all members of the app and can start a conversation with any of them. 
        `,
          tenchologies: ["HTML", "CSS", "JavaScript", "Vue", "MongoDB","Socket.IO"],
          href: "",
          github: "https://github.com/moXq1/chatApp",
        },
        {
          img: img2,
          title: "E-Shop",
          id: "e-shop",
          info: `
Simple e-commerce web application built with Vue JS and Firebase. Features include firebase authentication, firebase auth provider authentication and account/articles creation and editing.
        `,
          tenchologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "SASS",
            "Vue",
            "Firebase",
          ],
          href: "https://e-shop-azure.vercel.app/",
          github: "https://github.com/moXq1/e-shop",
        },
        {
          img: img3,
          title: "Game info page",
          id: "game_info_page",
          info: `Recreation Nintendo game info page. Includes the image lightbox gallery and the search bar's dropdown panel.`,
          tenchologies: ["HTML", "CSS", "JavaScript", "SASS", "Webpack"],
          href: "https://nintendo-game-info-page.vercel.app/",
          github: "https://github.com/moXq1/nintendo-game-info-page",
        },
        {
          img: img4,
          title: "Countries app",
          id: "countries_app",
          info: `
         Countries app with REST API allows to see all countries on the homepage. You may search for country or use filter. Also, can see more detailed information on separate page.

        `,
          tenchologies: ["HTML", "CSS", "JavaScript", "SASS", "Vue"],
          href: "https://countries-app-ten.vercel.app/",
          github: "https://github.com/moXq1/countries-app",
        },
        {
          img: img5,
          title: "Pomodoro",
          id: "pomodoro",
          info: `
        Pomodoro timer app.Let to set timer and break timers. Customize how long each timer runs for and appearance of the app with ability to set preferences for colors and fonts.
        `,
          tenchologies: ["HTML", "CSS", "JavaScript", "SASS"],
          href: "https://pomodoro-app.vercel.app/",
          github: "https://github.com/moXq1/pomodoro-app",
        },
        {
          img: img6,
          title: "Simon says",
          id: "simon_says",
          info: `Simon Says is a small game.
          The game consists of a device that illuminates one or more buttons in a random order. Then the player must reproduce this order by pressing the buttons. As soon as you played the sequence successfully, you move to the next round.
        `,
          tenchologies: ["HTML", "CSS", "JavaScript", "Vue"],
          href: "https://simon-says-psi.vercel.app/",
          github: "https://github.com/moXq1/SimonSays",
        },
      ],
      currendProjectId: null,

      isLoading: false,
      percent: 0,
    }
  },

  mutations: {
    setProjectId(state, payload) {
      state.currentProjectId = payload
    },

    setLoading(state, payload) {
      state.isLoading = payload
    },

    setPercent(state, payload) {
      state.percent = payload
    },
  },

  getters: {
    getImgs(state) {
      return state.imgs
    },

    getProjectId(state) {
      const [im] = state.imgs.filter((img) => img.id === state.currentProjectId)

      return im
    },

    getLoading(state) {
      return state.isLoading
    },

    getPercent(state) {
      return state.percent
    },
  },

  actions: {
    setProjectId(context, payload) {
      context.commit("setProjectId", payload)
    },

    setLoading(context, payload) {
      context.commit("setLoading", payload)
    },

    setPercent(context, payload) {
      console.log(context.state.percent)
      context.commit("setPercent", payload)
      // let c = setInterval(() => {
      //   let i = context.state.percent + 1
      //   context.commit("setPercent", i)
      //   if (i === payload) {
      //     clearInterval(c)
      //     context.commit("setLoading", false)
      //   }
      // })
    },
  },
})

const app = createApp(App)

app.use(router)

app.use(store)

app.mount("#app")
