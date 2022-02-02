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
    v-text="'You have received a new message from userId:' + message.user_id + ' msg: ' + message.message"
  ></v-alert>
</template>

<script>
export default {
  props: {
    message: {type: Object},
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