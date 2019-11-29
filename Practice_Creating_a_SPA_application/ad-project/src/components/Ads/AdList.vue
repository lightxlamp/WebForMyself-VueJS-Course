<template>
    <v-container>
        <v-layout row v-if="!loading && myAds.length !== 0">
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Список объявлений</h1>

                <v-card
                        class="elevation-10 mb-5"
                        v-for="ad in myAds"
                        :key="ad.id"
                >
                    <v-layout row>
                        <v-flex xs4>
                            <v-img
                                    height="200"
                                    :src="ad.imageSrc"
                            ></v-img>
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
        <v-layout row v-else-if="!loading && myAds.length === 0">
            <v-flex xs12 class="text-xs-center">
                <h2 class="text--primary">У вас нет объявлений</h2>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex>
                <v-progress-circular
                        :size="80"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            myAds (){
                return this.$store.getters.myAds
            },
            loading (){
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>

</style>