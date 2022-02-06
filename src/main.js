import Pusher from 'pusher-js'
import Echo from 'laravel-echo';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false
window.axios = require('axios');
window.axios.defaults.baseURL = 'http://127.0.0.1:8000'
window.axios.defaults.headers['Access-Control-Allow-Credentials'] = true
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.withCredentials = true

Pusher.logToConsole = true;
window.Pusher = require('pusher-js');

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '13c1d8f7e9b85177c5f7',
    cluster: 'eu',
    wsHost: window.location.hostname,
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: false,
    enableStats: false,
    authEndpoint: '/api/broadcasting/auth',
    authorizer: (channel) => { // param: options
      return {
        authorize: (socketId, callback) => {
          axios
            .post(`/api/broadcasting/auth`, {
              socket_id: socketId,
              channel_name: channel.name,
            },
            { 
              headers: {
              'Authorization': window.localStorage.getItem('bearerToken'),
              }
              }
            )
            .then((response) => {
              callback(false, response.data);
            })
            .catch((error) => {
              callback(true, error);
            });
        },
      };
    },
  })

  new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

