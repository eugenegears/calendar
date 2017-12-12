import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify, {
  theme: {
    primary: "#36BE00",
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
