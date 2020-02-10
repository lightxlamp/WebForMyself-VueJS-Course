import Vue from "vue";
import App from "./App_by_Stas.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import * as firebase from "firebase";
import store from "./store";
import BuyModalComponent from "./components/Shared/BuyModal";
import firebaseConfig from "./keys";
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
