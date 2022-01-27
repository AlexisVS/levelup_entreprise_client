<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" class="d-flex">
        <v-textarea no-resize v-model="message" hide-details autofocus clearable dense rows="1"></v-textarea>
        <v-btn icon @click="sendMessage(message); message = null">
          <v-icon color="primary" v-text="'mdi-send'"></v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    message: null,
  }),
  props: {
    sendMessage: { type: Function },
  }
}
</script>

<style>
</style>