<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-container>
          <Message v-for="item in messages" :key="'message-id-' + item.id" :message="item" />
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <AddMessage :sendMessage="sendMessage" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Echo from 'laravel-echo'
import axios from 'axios';
import Message from '../components/message.vue';
import AddMessage from '../components/addMessage.vue';
export default {
  data: () => ({
    messages: null,
  }),
  methods: {
    getMessages () {
      axios.get("/api/v1/messages", {
        headers: {
          Authorization: localStorage.getItem('bearerToken')
        }
      })
        .then(res => { console.log(res); this.messages = res.data.data.messages; });
    },
    sendMessage (message) {
      let formData = new FormData();
      formData.append('message', message)
      axios.post('/api/v1/messages', formData, {
        headers: {
          Authorization: localStorage.getItem('bearerToken')
        }
      })
        .then(res => { console.log(res); this.getMessages(); });
    },
  },
  components: { Message, AddMessage },
  mounted () {
    this.getMessages()
  },
  created () {
    let userId = localStorage.getItem('bearerToken')[7]
    Echo.channel('messages.' + userId)
      .listen('SendMessageEvent', e => console.log(['brodcast bjr', e]));
  }
}
</script>

<style>
</style>