<script setup>
import Cookies from "universal-cookie";
import Redirect from "@/Redirect";

defineProps({
  msg: {
    type: String,
    required: false
  }
})
</script>

<script>
import AuthRoute from "@/AuthRoute";

export default {
  data: () => ({
    drawer: false,
    group: null,
    is_authenticated: false,
    normal_routes: [
      {
        title: "Home",
        route: "#/",
      },
      {
        title: "About",
        route: "#/about",
      },
      {
        title: "Login",
        route: "#/login",
      },
      {
        title: "Register",
        route: "#/register",
      }
    ],
    auth_routes: [
      {
        title: "Home",
        route: "#/",
      },
      {
        title: "About",
        route: "#/about",
      },
      {
        title: "Dashboard",
        route: "#/dashboard",
      },
    ],
  }),

  watch: {
    async group() {
      this.drawer = false
    },
  },

  methods: {
    navigate(route) {
      location.href = route;
      this.drawer = false;
    },
    logout() {
      const cookies = new Cookies();
      cookies.remove("token");

      Redirect("/");
    }
  },

  async mounted() {
    // bug: this is not returning a boolean
    this.is_authenticated = await AuthRoute();
    console.log(this.is_authenticated);
  },
}

</script>

<template>
  <div>
    <v-layout>
      <v-app-bar color="#39AE6D" prominent>
        <v-app-bar-nav-icon variant="text" aria-label="navigation hamburger menu"
          @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Learn Vue</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn id="logout" v-if="is_authenticated" variant="elevated" @click="$event => logout()">Logout</v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" location="left" temporary>
        <v-list flat dense nav class="py-1" aria-label="list of navigation links" role="tablist">
          <v-list-item-group v-model="authenticated" color='primary' mandatory>
            <!-- User is Authenticated -->
            <div v-if="is_authenticated">
              <v-list-item v-for="route in auth_routes" :key="route.title" dense @click="navigate(route.route)"
              aria-label="link item" role="tab">
              <v-list-item-content>
                <v-list-title>{{ route.title }}</v-list-title>
              </v-list-item-content>
              </v-list-item>
            </div>
            <!-- User is not Authenticated -->
            <div v-if="!is_authenticated">
              <v-list-item v-for="route in normal_routes" :key="route.title" dense @click="navigate(route.route)"
              aria-label="link item" role="tab">
              <v-list-item-content>
                <v-list-title>{{ route.title }}</v-list-title>
              </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

.navbar {
  background-color: rgb(69, 69, 69);
  color: white;
}

#logout {
  background-color: rgb(17, 53, 255) !important;
  color: white;
}
</style>
