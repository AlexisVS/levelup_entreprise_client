<template>
  <v-alert
    class="my-1"
    v-model="displayed"
    width="310px"
    dismissible
    transition="fade-transition"
    elevation="9"
    icon="mdi-account"
    type="success"
    v-text="message.message == null ? 'You have received a new todo task' : 'Your have received a new message'"
  ></v-alert>
</template>

<script>
export default {
  props: {
    message: { type: Object },
  },
  data: () => ({
    displayed: true,
  }),
  created () {
    setTimeout(() => {
      this.displayed = false
    }, 3000);
  }
}
</script>

<style>
</style>