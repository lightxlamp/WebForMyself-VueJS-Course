import Vue from "vue";
import App from "./App_by_Stas.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import * as firebase from "firebase";
import store from "./store";
import BuyModalComponent from "./components/Shared/BuyModal";
import firebaseConfig from "./keys";
import VueI18n from "vue-i18n";
import { ENGLISH_TRANSLATIONS } from "./../translations/en";
import { RUSSIAN_TRANSLATIONS } from "./../translations/ru";
//import colors from 'vuetify/lib/util/colors'

Vue.config.productionTip = false; // Set this to false to prevent the production tip on Vue startup.
Vue.component("app-buy-modal", BuyModalComponent);
Vue.use(vuetify);
Vue.use(VueI18n);

const TRANSLATIONS = {
  en: ENGLISH_TRANSLATIONS,
  ru: RUSSIAN_TRANSLATIONS
};
const i18n = new VueI18n({
  locale: "en",
  messages: TRANSLATIONS
});

new Vue({
  router,
  store,
  vuetify,
  i18n,

  created() {
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
