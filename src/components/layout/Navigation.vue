<template>
  <v-list>
    <v-list-item
      v-for="item in navigation"
      :key="'navigation-item-' + item.text.toLowerCase()"
      :to="item.link"
    >
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    navigation: [
      {
        text: 'Home',
        link: '/',
        icon: 'mdi-home',
      },
      {
        text: 'Todolist',
        link: '/todolist',
        icon: 'mdi-note-check',
      },
        {
          text: 'Messenger',
          link: '/messenger',
          icon:'mdi-message',
        },
      // {
      //   text: '',
      //   link: '',
      //   icon:'',
      // },
    ]
  })
}
</script>

<style>
</style>