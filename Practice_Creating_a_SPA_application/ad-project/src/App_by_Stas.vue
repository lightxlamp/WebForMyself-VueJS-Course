<template>
    <div id="app">
        <v-app id="inspire">
            <v-app-bar app color="indigo" dark>

                <v-app-bar-nav-icon @click.stop="drawer = ! drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>AD Project</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-items>
                    <v-btn
                            v-for="link in links"
                           :key="link.title"
                            :to="link.url"
                            text >
                        <v-icon left>{{link.icon}}</v-icon>
                        {{link.title}}
                    </v-btn>
                    <!--<v-btn text>
                        <v-icon left>mdi-fingerprint</v-icon>
                        Fingerprint
                    </v-btn>

                    <v-btn text>
                        <v-icon left>mdi-signal</v-icon>
                        Signal
                    </v-btn>

                    <v-btn text>
                        <v-icon left>mdi-mushroom</v-icon>
                        Mushroom
                    </v-btn> -->
                </v-toolbar-items>

                <template v-if="$vuetify.breakpoint.smAndUp">
                    <v-btn icon>
                        <v-icon>mdi-export-variant</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-delete-circle</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                </template>
            </v-app-bar>

            <v-content style="background-color: #272727 !important; color: white">
                Stas test
            </v-content>

            <v-navigation-drawer
                    v-model="drawer"
                    absolute
                    temporary
                    src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                    width="300px"
                    height="100%"
            >
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img
                            src="https://i.ibb.co/VjrK66B/ava.png">
                        </v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Stanislav Sheveliukhin</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list>
                    <v-list-item
                            v-for="link in links"
                            :key="link.title"
                            :to="link.url"
                            link
                    >
                        <v-list-item-icon>
                            <v-icon>{{link.icon}}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ link.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>
            </v-navigation-drawer>

            <v-footer color="indigo" app>
                <span class="white--text">&copy; 2019</span>
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
        links: [
            {title: 'Login', icon: 'mdi-lock', url: '/login'},
            {title: 'Registration', icon: 'mdi-face', url: '/registration'},
            {title: 'Orders', icon: 'mdi-bookmark', url: '/orders'},
            {title: 'New ad', icon: 'mdi-note', url: '/new'},
            {title: 'My ads', icon: 'mdi-clipboard-list', url: '/list'},
        ],
    }),
}
</script>
