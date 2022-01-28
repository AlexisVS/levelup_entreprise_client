<template>
  <v-row v-if="message">
    <v-col
      cols="12"
      class="d-flex pa-0"
      :class="message.author_messsage_user_id == message.user_id ? 'justify-end' : 'justify-start'"
    >
      <div
        class="message"
        :class="message.author_messsage_user_id == message.user_id ? 'message--user' : 'message--admin'"
        v-html="message.message"
      ></div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    message: { type: Object, required: true },
  }
}
</script>

<style scoped>
.message {
  max-width: 70%;
  padding: 10px 25px;
  margin: 10px 0;
  font-size: 0.9rem;
}


.message--admin {
  border-top-right-radius: 9999px;
  border-bottom-right-radius: 9999px;
  background-color: deepskyblue;
  color: white;
}

.message--user {
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.9);
  color: black;
}
</style>