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
        <v-spacer></v-spacer>
        <v-col v-if="!isConnected" cols="12" class="text-end">
          <v-btn @click="toggleOverlayLogin = true">Sign in</v-btn>
          <v-btn @click="toggleOverlayRegister = true" class="ml-2" color="primary">Inscription</v-btn>
        </v-col>
        <v-col v-else-if="profile" cols="12" class="text-end d-flex justify-end">
          <v-spacer></v-spacer>
          <Profile
            class="d-flex justify-end"
            :profile="profile"
            @logoutSuccess="isConnected = false;"
            @openEditProfileOverlay="toggleOverlayEditProfile = true"
          />
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col v-if="isConnected" cols="12">
            <router-view :key="$router.fullPath"></router-view>
          </v-col>
          <v-col v-else cols="12">
            <h1>Welcome to levelUp enterprise</h1>
            <p>Register us before for watching the content</p>
          </v-col>
        </v-row>
      </v-container>
      <div
        v-if="notifications"
        class="d-flex flex-column"
        style="position: fixed; top: 10px; right: 10px; z-index: 9999999;"
      >
        <Notifications
          v-for="item in notifications"
          :key="`notification-${item.id}-${item.message}`"
          :message="item"
        />
      </div>
      <Login
        :toggleOverlayLogin="toggleOverlayLogin"
        @toggleOverlayLogin="toggleOverlayLogin = false"
        @loginSuccess="getProfile()"
      />
      <Register
        :toggleOverlayRegister="toggleOverlayRegister"
        @toggleOverlayRegister="toggleOverlayRegister = false"
        @registrationComplete="isConnected = true; getProfile()"
      />
      <EditProfile
        v-if="profile"
        :profile="profile"
        :toggleOverlayEditProfile="toggleOverlayEditProfile"
        @editProfileSuccess="toggleOverlayEditProfile = false; getProfile()"
        @closeOverlayEditProfile="toggleOverlayEditProfile = false"
      />
    </v-main>
  </v-app>
</template>

<script>
// import Echo from 'laravel-echo'
import axios from 'axios'
import Navigation from "./components/layout/Navigation.vue";
import Login from "./components/overlay/Login.vue";
import Register from "./components/overlay/Register.vue";
import Profile from "./components/Profile.vue";
import EditProfile from './components/overlay/EditProfile.vue';
import Notifications from './components/Notifications.vue';
export default {
  name: "App",
  data: () => ({
    isConnected: false,
    drawer: null,
    toggleOverlayLogin: false,
    toggleOverlayRegister: false,
    toggleOverlayEditProfile: false,
    profile: null,
    notifications: null,
  }),
  methods: {
    getProfile () {
      axios.get('/api/v1/profile', {
        headers: {
          Authorization: localStorage.getItem('bearerToken')
        }
      })
        .then(res => { this.profile = res.data.data; localStorage.setItem('userId', res.data.data.user.id) })
    },
    getNotifications () {
      window.Echo.private('App.Models.User.' + localStorage.getItem('userId'))
        .listen('MessageReceivedEvent', (e) => { // ? message notification
          if (this.notifications) {
            if (this.notifications.find(el => el.id == e.data.id) != {}) {
              this.notifications = [...this.notifications, e.data]
            }
          }
          else {
            this.notifications = [e.data]
          }
        })
        .listen('TodoReceivedEvent', (e) => { // ? todo notification
          if (this.notifications) {
            if (this.notifications.find(el => el.id == e.id) != {}) {
              this.notifications = [...this.notifications, e]
            }
          }
          else {
            this.notifications = [e.data]
          }
        });
    },
    destroyNotification (notificationId) {
      this.notifications.filter(e => e.id != notificationId)
    }
  },
  components: { Navigation, Login, Register, Profile, EditProfile, Notifications },
  mounted () {
    // If the user has a bearerToken 
    // Load their profile and launch the Notification system
    if (localStorage.getItem('bearerToken')) {
      this.getProfile()
      this.isConnected = true
      this.getNotifications();
    }
  }
}
</script>