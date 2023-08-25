import { createApp } from "vue"
import App from "./App.vue"
import { createRouter, createWebHashHistory } from "vue-router";

// Vuetify
import { createVuetify } from "vuetify"
import { aliases, mdi } from "vuetify/iconsets/mdi"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

/* Page Components */
const HomePage = () => import("@/components/pages/HomePage.vue");
const AboutPage = () => import("@/components/pages/AboutPage.vue");
const PageNotFound = () => import("@/components/pages/PageNotFound.vue");
const DashboardPage = () => import("@/components/pages/DashboardPage.vue");
const LoginPage = () => import("@/components/pages/LoginPage.vue");
const RegisterPage = () => import("@/components/pages/RegisterPage.vue");

import AuthRoute from "@/AuthRoute";

const routes = [
  {
    path: "/",
    component: HomePage
  },
  {
    path: "/about",
    component: AboutPage
  },
  {
    path: "/dashboard",
    component: DashboardPage,
    beforeEnter: async() => {
      return await AuthRoute()
    }
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/register",
    component: RegisterPage
  },
  {
    path: "/:catchAll(.*)",
    component: PageNotFound
  }
]

const vuetify = createVuetify({
  components,
  directives,
  icon: {
    aliases,
    sets: {
      mdi,
    }
  },
})

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

const app = createApp(App)

app.use(vuetify)

app.use(router)

app.mount("#app")
