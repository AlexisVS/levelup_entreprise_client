<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-container style="max-height: 450px; overflow-y: scroll">
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
// import Echo from 'laravel-echo'
import axios from 'axios';
import Message from '../components/message.vue';
import AddMessage from '../components/addMessage.vue';
export default {
  data: () => ({
    messages: null,
    socket: null
  }),
  methods: {
    getMessages () {
      axios.get("/api/v1/messages", {
        headers: {
          Authorization: localStorage.getItem('bearerToken')
        }
      })
        .then(res => {
          this.messages = [...new Set(res.data.data.messages)]
        });
    },
    sendMessage (message) {
      let formData = new FormData();
      formData.append('message', message)
      axios.post('/api/v1/messages', formData, {
        headers: {
          Authorization: localStorage.getItem('bearerToken')
        }
      })
        .then(() => { this.getMessages(); });
    },
  },
  components: { Message, AddMessage },
  created () {
    this.getMessages()
  },
  mounted () {
    window.Echo.channel('messages')
      .listen('SendMessageEvent', e => {
        if (this.messages.find(el => el.id == e.data.message.id) != Object) {
          this.messages = [...new Set([...this.messages, e.data.message])];
        }
      });
  },
}
</script>

<style>
</style>