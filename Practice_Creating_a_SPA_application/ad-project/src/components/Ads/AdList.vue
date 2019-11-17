<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Список объявлений</h1>

                <v-card
                        class="elevation-10 mb-5"
                        v-for="ad in ads"
                        :key="ad.id"
                >
                    <v-layout row>
                        <v-flex xs4>
                            <v-card-media
                                :src="require(ad.imageSrc)"
                                height="175px"
                            >
                            </v-card-media>
                        </v-flex>

                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primary">{{ad.title}}</h2>
                                <p>{{ad.description}}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        class="info"
                                        :to="'/ad/' + ad.id"
                                >Открыть</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                ads: [
                    {
                        title: 'Third Ad',
                        description: 'Babbles',
                        promo: true,
                        imageSrc: 'https://livewallpaperhd.com/wp-content/' +
                            'uploads/2017/05/Blue-Wallpaper-For-Computer.jpg',
                        id: '12345'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>