<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" class="d-flex">
        <v-form
          @submit.prevent="validate"
          v-model="valid"
          ref="formSendMessage"
          class="d-flex justify-center align-center"
          style="width:100%"
        >
          <v-textarea
            no-resize
            :rules="messageRules"
            v-model="message"
            autofocus
            clearable
            dense
            rows="1"
          ></v-textarea>
          <v-btn icon type="submit">
            <v-icon color="primary" v-text="'mdi-send'"></v-icon>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    message: null,
    messageRules: [
      v => (!!v && v.length > 0) || 'Please write a message',
    ],
  }),
  props: {
    sendMessage: { type: Function },
  },
  methods: {
    validate () {
      this.sendMessage(this.message);
      this.$refs.formSendMessage.reset(); this.message = null;
      this.$refs.formSendMessage.resetValidation()
    }
  }
}
</script>

<style>
</style>