import Vue from 'vue'
import App from './App_by_Stas.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import * as firebase from 'firebase'
import store from './store'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  created (){
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyC-_fL99SRDOwRlcAvoDZsM58d2jTlBbNM",
      authDomain: "vue-ad-project-stas.firebaseapp.com",
      databaseURL: "https://vue-ad-project-stas.firebaseio.com",
      projectId: "vue-ad-project-stas",
      storageBucket: "vue-ad-project-stas.appspot.com",
      messagingSenderId: "83442067408",
      appId: "1:83442067408:web:5d9bc204b127dbe08c7bd5",
      measurementId: "G-8WP2EQKSYX"
    };
    firebase.initializeApp(firebaseConfig)
  },
  render: h => h(App)
}).$mount('#app')
