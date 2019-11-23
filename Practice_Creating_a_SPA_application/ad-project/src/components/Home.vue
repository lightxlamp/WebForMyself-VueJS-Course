<template>
    <div v-if="!loading">
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                                v-for="ad in promoAds"
                                :key="ad.id"
                                :src="ad.imageSrc"
                        >
                        <div class="car-link">
                            <v-btn class="error" :to="'/ad/' + ad.id">{{ad.title}}</v-btn>
                        </div>

                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex
                    xs12
                    sm6
                    md4
                    v-for="ad in ads"
                    :key="ad.id"
                >
                    <v-card
                        class="mx-auto"
                        max-width="400"
                    >
                        <v-img
                            class="white--text align-end"
                            height="200px"
                            :src="ad.imageSrc"
                        >
                            <v-card-title>{{ad.title}}</v-card-title>
                        </v-img>

                        <v-card-subtitle class="pb-0">{{ad.id}}</v-card-subtitle>

                        <v-card-text class="text--primary">
                            <div>{{ad.description}}</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                    text
                                    :to="'/ad/' + ad.id"
                            >
                                Открыть
                            </v-btn>

                            <v-btn
                                    raised
                                    class="primary"
                                    text
                            >
                                Купить
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else>
        <v-container>
            <v-layout row>
                <v-flex xs12 class="text-sm-center pt-5">
                    <v-progress-circular
                            :size="80"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        computed: {
            promoAds(){
                return this.$store.getters.promoAds
            },
            ads(){
                return this.$store.getters.ads
            },
            loading(){
                return this.$store.getters.loading
            }
        },

        data () {
            return {
                // ads: [
                //     {
                //         title: 'First Ad',
                //         description: 'Hello I am a desc for the first image',
                //         promo: false,
                //         imageSrc: 'https://149366088.v2.pressablecdn.com/' +
                //             'wp-content/uploads/2019/03/fedora-30-wallpaper.jpg',
                //         id: '123'
                //     },
                //     {
                //         title: 'Second Ad',
                //         description: 'Description for the second image',
                //         promo: true,
                //         // imageSrc: 'https://i.ibb.co/VjrK66B/ava.png',
                //         imageSrc: 'https://data.whicdn.com/images/304947669/original.jpg',
                //         id: '1234'
                //     },
                //     {
                //         title: 'Third Ad',
                //         description: 'Babbles',
                //         promo: true,
                //         imageSrc: 'https://livewallpaperhd.com/wp-content/' +
                //             'uploads/2017/05/Blue-Wallpaper-For-Computer.jpg',
                //         id: '12345'
                //     }
                // ]
            }
        },
    }
</script>

<style scoped>
    .car-link{
        position: absolute;
        bottom: 50px;
        left: 50%;
        background: rgba(0, 0, 0, .3);
        transform: translate(-50%, 0);
        padding: 10px 15px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
</style>