<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        app
        v-model="drawer"
        absolute
        temporary
        src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        width="300px"
        dark
      >
        <v-card class="mx-auto" max-width="300" tile>
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="currentUserAvatar"> </v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title style="color: white">{{
                    currentUserName
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                v-for="link in links"
                :key="link.title"
                :to="link.url"
              >
                <v-list-item-icon>
                  <v-icon v-text="link.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="link.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-if="isUserLoggedIn" @click="onLogout">
                <v-list-item-icon>
                  <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> {{ $t("text.signOut") }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-divider></v-divider>
      </v-navigation-drawer>

      <v-app-bar app color="rgb(14,117,189)" dark>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        >
        </v-app-bar-nav-icon>

        <!--                <v-icon id="siteLogo">siteLogo</v-icon>-->
        <router-link to="/">
          <v-img :src="require('@/assets/my_vss_logo_1.png')" height="40" />
        </router-link>

        <v-toolbar-title>
          <router-link to="/" tag="span" class="pointer"
            >vue-stas-store.com</router-link
          >
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <div style="width: 50px" @click="clickOnLocaleChangeDiv">
          XYZXYZXYZ
        </div> -->
        <!-- https://stackoverflow.com/questions/46652315/dynamically-open-dropdown-in-vue IMPORTANT =) Spent so much time (~2 hours on select issue)-->
        <!-- <div class="locale-changer" id="locale-changer">
          <v-icon left>mdi-earth</v-icon>
          <select v-model="$i18n.locale" id="language-selector">
            <option
              v-for="(lang, i) in langs"
              :key="`Lang${i}`"
              :value="lang"
              >{{ lang }}</option
            >
          </select>
        </div> -->

        <v-toolbar-items class="hidden-sm-and-down">
          <div class="userInfoDiv">
            <p>{{ currentUserInfo }}</p>
          </div>

          <div class="locale-changer" @click="showSelect()">
            <v-select
              :items="langs"
              v-model="$i18n.locale"
              prepend-icon="mdi-earth"
            ></v-select>
          </div>

          <v-btn v-for="link in links" :key="link.title" :to="link.url" text>
            <v-icon left>
              {{ link.icon }}
            </v-icon>
            {{ link.title }}
          </v-btn>

          <v-btn v-if="isUserLoggedIn" @click="onLogout" text>
            <v-icon left>mdi-exit-to-app</v-icon>
            {{ $t("text.signOut") }}
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <v-content>
        <router-view></router-view>
      </v-content>

      <template v-if="error">
        <v-snackbar
          :timeout="timeout"
          multi-line
          color="error"
          @input="closeError"
          top
          :value="true"
        >
          {{ error }}
          <v-btn dark text @click.native="closeError">Закрыть</v-btn>
        </v-snackbar>
      </template>

      <v-footer color="rgb(14,117,189)" app>
        <span class="white--text"
          >&copy; 2011–2020, «Lightxlamp», Inc or its affiliates</span
        >
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "locale-changer",
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    timeout: 5000,
    langs: ["RU", "EN"]
  }),
  computed: {
    error() {
      // // eslint-disable-next-line no-console
      // console.log("Stas this", this)
      // // eslint-disable-next-line no-console
      // console.log("Stas store", this.$store)
      // // eslint-disable-next-line no-console
      // console.log("Stas getters", this.$store.getters)
      // // eslint-disable-next-line no-console
      // console.log("Stas error", this.$store.getters.error)
      return this.$store.getters.error;
    },
    currentUserAvatar() {
      return this.$store.getters.currentUserAvatar;
    },

    currentUserName() {
      return this.$store.getters.currentUserName;
    },

    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },

    links() {
      if (this.isUserLoggedIn) {
        return [
          {
            title: this.$t("text.orders"),
            icon: "mdi-bookmark",
            url: "/orders"
          },
          { title: this.$t("text.newAd"), icon: "mdi-note", url: "/new" },
          {
            title: this.$t("text.myAds"),
            icon: "mdi-clipboard-list",
            url: "/list"
          },
          {
            title: this.$t("text.myAccount"),
            icon: "mdi-account",
            url: "/account"
          }
        ];
      }
      return [
        { title: this.$t("text.signIn"), icon: "mdi-lock", url: "/login" },
        {
          title: this.$t("text.registration"),
          icon: "mdi-face",
          url: "/registration"
        }
      ];
    },
    currentUserInfo() {
      // eslint-disable-next-line no-console
      console.log("this.$store.getters.user: ", this.$store.getters.user);

      if (this.$store.getters.user !== null && this.$store.getters.currentUserName != 'Unauthorized user')
        return (
          this.$t("text.hello") + ", " + this.$store.getters.currentUserName
        );
      //else return "No user logged in";
      else return "";
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
    },
    showSelect() {
      this.$refs.selectLanguage.click();
    }
    // clickOnLocaleChangeDiv() {
    //   document.getElementById("language-selector").click();
    //   this.$refs.langSelectField.click();
    //   // eslint-disable-next-line no-console
    //   console.log("HEY");
    // }
  },
  // https://stackoverflow.com/questions/50382185/how-to-detect-page-is-refreshed-in-vue-js
  created() {
    window.addEventListener("beforeunload", this.onLogout);
  }
};
</script>

<style>
html {
  overflow: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: #ff0000;
}

.pointer {
  cursor: pointer;
}

.userInfoDiv {
  padding-top: 18px;
  margin-right: 15px;
  margin-left: 15px;
  color: #ccc;
  font-size: 18px;
}

.locale-changer {
  width: 120px;
  height: 64px;
  padding: 15px 10px 0 10px;
}

.locale-changer:hover {
  background-color: #2180c2;
}

/* .locale-changer select {
  background-color: #0e75bd;
}
.locale-changer select:hover {
  background-color: #2180c2;
}

select#language-selector {
  vertical-align: 0;
}

.locale-changer:hover select {
  background-color: #2180c2;
}

.locale-changer i {
  margin-top: -2px;
} */
</style>
