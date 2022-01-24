<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <Navigation />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Levelup_entreprise_client</v-toolbar-title>

      <!-- App bar -->
      <v-row>
        <v-col cols="12" class="text-end">
          <v-btn @click="toggleOverlayLogin = true">Sign in</v-btn>
          <v-btn @click="toggleOverlayRegister = true" class="ml-2" color="primary">Inscription</v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <router-view :key="$router.fullPath"></router-view>
          </v-col>
        </v-row>
      </v-container>
      <Login
        :toggleOverlayLogin="toggleOverlayLogin"
        @toggleOverlayLogin="toggleOverlayLogin = false"
      />
      <Register
        :toggleOverlayRegister="toggleOverlayRegister"
        @toggleOverlayRegister="toggleOverlayRegister = false"
      />
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./components/layout/Navigation.vue";
import Login from "./components/layout/overlay/Login.vue";
import Register from "./components/layout/overlay/Register.vue";
export default {
  data: () => ({
    drawer: null,
    toggleOverlayLogin: false,
    toggleOverlayRegister: false,
  }),
  components: { Navigation, Login, Register }
}
</script>