<template>
    <div>
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                                v-for="(color, i) in colors"
                                :key="color"
                        >
                            <v-sheet
                                    :color="color"
                                    height="100%"
                                    tile
                            >
                                <v-row
                                        class="fill-height"
                                        align="center"
                                        justify="center"
                                >
                                    <div class="display-3">Slide {{ i + 1 }}</div>
                                </v-row>
                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>

                    <v-carousel>
                        <v-carousel-item
                                v-for="(ad, i) in ads"
                                :key="ad.id"
                                :src="ad.imageSrc"
                        >
                        <div class="display-3">Slide {{ i + 1 }}</div>

                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container>
            <v-layout row>
                <v-flex
                        xs12
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

                        <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

                        <v-card-text class="text--primary">
                            <div>{{ad.description}}</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                    color="orange"
                                    text
                            >
                                Share
                            </v-btn>

                            <v-btn
                                    color="orange"
                                    text
                            >
                                Explore
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                colors: [
                    'primary',
                    'secondary',
                    'yellow darken-2',
                    'red',
                    'orange',
                ],
                ads: [
                    {
                        title: 'First Ad',
                        description: 'Hello I am a desc for the first image',
                        promo: true,
                        imageSrc: 'https://149366088.v2.pressablecdn.com/' +
                            'wp-content/uploads/2019/03/fedora-30-wallpaper.jpg',
                        id: '123'
                    },
                    {
                        title: 'Second Ad',
                        description: 'Description for the second image',
                        promo: true,
                        imageSrc: 'https://i.ibb.co/VjrK66B/ava.png',
                        id: '1234'
                    }
                ]
            }
        },
    }
</script>

<style scoped>

</style>