<template>
    <div id="app">
        <v-app id="inspire">
            <v-navigation-drawer app
                v-model="drawer"
                absolute
                temporary
                src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                width="300px"
                dark
            >
                <v-card
                    class="mx-auto"
                    max-width="300"
                    tile

                >
                    <v-list dense>
                        <v-list-item-group color="primary">
                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-img
                                            src="https://i.ibb.co/VjrK66B/ava.png">
                                    </v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title style="color: white">Stanislav Sheveliukhin</v-list-item-title>
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

                            <v-list-item
                                    v-if="isUserLoggedIn"
                                    @click="onLogout"
                            >
                                <v-list-item-icon>
                                    <v-icon>mdi-exit-to-app</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Выйти</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
                <v-divider></v-divider>
            </v-navigation-drawer>

            <v-app-bar app color="rgb(14,117,189)" dark>

                <v-app-bar-nav-icon
                    @click.stop="drawer = ! drawer"
                    class="hidden-md-and-up">
                </v-app-bar-nav-icon>

                <v-toolbar-title>
                    <router-link to="/" tag="span" class="pointer">mashina.kg</router-link>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn
                        v-for="link in links"
                       :key="link.title"
                        :to="link.url"
                        text >
                        <v-icon left>
                            {{link.icon}}
                        </v-icon>
                        {{link.title}}
                    </v-btn>

                    <v-btn
                        v-if="isUserLoggedIn"
                        @click="onLogout"
                        text >
                            <v-icon left>mdi-exit-to-app</v-icon>
                        Выйти
                    </v-btn>
                </v-toolbar-items>
            </v-app-bar>

            <v-content>
                <div class="userInfoDiv" v-if="isUserLoggedIn">
                    Current user ID : {{currentUserInfo}}
                </div>
                <div class="userInfoDiv" v-else>
                    {{currentUserInfo}}
                </div>
                <router-view></router-view>
            </v-content>

            <template v-if="error" >
                    <v-snackbar
                        :timeout=timeout
                        multi-line
                        color="error"
                        @input="closeError"
                        top
                        :value="true"
                >
                    {{error}}
                    <v-btn dark text @click.native="closeError">Закрыть</v-btn>
                </v-snackbar>
            </template>

            <v-footer color="rgb(14,117,189)" app>
                <span class="white--text">&copy; 2013–2019 ОcОО «ESPIRU»</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>

export default {
    props: {
        source: String,
    },
    data: () => ({
        drawer: null,
        timeout: 5000
    }),
    computed: {
        error () {
            // // eslint-disable-next-line no-console
            // console.log("Stas this", this)
            // // eslint-disable-next-line no-console
            // console.log("Stas store", this.$store)
            // // eslint-disable-next-line no-console
            // console.log("Stas getters", this.$store.getters)
            // // eslint-disable-next-line no-console
            // console.log("Stas error", this.$store.getters.error)
            return this.$store.getters.error
        },
        isUserLoggedIn (){
            return this.$store.getters.isUserLoggedIn
        },
        links () {
            if(this.isUserLoggedIn){
                return [
                    {title: 'Заказы', icon: 'mdi-bookmark', url: '/orders'},
                    {title: 'Новое объявление', icon: 'mdi-note', url: '/new'},
                    {title: 'Мои объявления', icon: 'mdi-clipboard-list', url: '/list'}
                ]
            }
            return [
                {title: 'Вход', icon: 'mdi-lock', url: '/login'},
                {title: 'Регистрация', icon: 'mdi-face', url: '/registration'}
            ]
        },
        currentUserInfo (){
            // eslint-disable-next-line no-console
            console.log('this.$store.getters.user: ', this.$store.getters.user)

            if(this.$store.getters.user !== null)
                return this.$store.getters.user.id
            else return "No user logged in"
        }
    },
    methods: {
        closeError () {
            this.$store.dispatch('clearError')
        },
        onLogout (){
            this.$store.dispatch('logoutUser')
            this.$router.push('/')
        }
    },
}
</script>

<style>
    html {
        overflow: scroll;
        overflow-x: hidden;
    }
    ::-webkit-scrollbar {
        width: 0px;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }
    /* Optional: show position indicator in red */
    ::-webkit-scrollbar-thumb {
        background: #FF0000;
    }

    .pointer{
        cursor: pointer;
    }

    .userInfoDiv{
        padding-top: 10px;
        padding-left: 10px;
        color: grey;
        font-size: 12px;
    }
</style>