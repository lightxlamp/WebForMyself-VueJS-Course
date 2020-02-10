import Vue from "vue";
import App from "./App_by_Stas.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import * as firebase from "firebase";
import store from "./store";
import BuyModalComponent from "./components/Shared/BuyModal";
//import colors from 'vuetify/lib/util/colors'

Vue.config.productionTip = true; // Set this to false to prevent the production tip on Vue startup.
Vue.component("app-buy-modal", BuyModalComponent);
Vue.use(vuetify);

new Vue({
  router,
  store,
  vuetify,

  created() {
    // My web app's Firebase configuration
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
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    });

    this.$store.dispatch("fetchAds");
  },
  render: h => h(App)
}).$mount("#app");
