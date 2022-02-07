<template>
  <v-list-item style="width: min-content">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          plain
          :color="$vuetify.theme.dark ? 'white' : 'black'"
          class="pr-10 pl-2 mr-0"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar size="30px" class="pl-5 pr-0">
            <img class="pl-1 pr-2 mr-3" :src="require('@/assets/logo.svg')" />
          </v-avatar>
          {{ profile.contact.name }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout" dense>
          <v-list-item-content>
            <v-list-item-subtitle>Logout</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$emit('openEditProfileOverlay', false)" dense>
          <v-list-item-content>
            <v-list-item-subtitle>Edit profile</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-list-item>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Profile',
  props: {
    profile: { type: Object, required: true },
  },
  data: () => ({}),
  methods: {
    logout () {
      axios.get("/api/v1/logout", {
        headers: {
          Authorization: localStorage.getItem('bearerToken')
        }
      })
      localStorage.clear()
      this.$emit('logoutSuccess', false)
      this.$router.push('/');
    },
  }

}
</script>

<style>
</style>