<template>
    <v-container>
        <v-layout row v-if="loading" justify-center id="loading">
            <div class="ma-12">
                <v-progress-circular
                    :size="80"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
            </div>
        </v-layout>
        <v-layout row v-else-if="!loading && myAds.length !== 0">
            <v-flex xs12 sm10 md10 lg10 xl8 offset-sm1 offset-md1 offset-lg1 offset-xl2>
                <h1 class="text--secondary mb-3">Список ваших объявлений</h1>

                <v-card
                        class="elevation-10 mb-5 pl-7 pt-5 pb-5"
                        v-for="ad in myAds"
                        :key="ad.id"
                >
                    <v-layout row wrap>
                        <v-flex xs11 sm11 md6 lg6>
                            <v-img
                                :src="ad.imageSrc"
                            ></v-img>
                        </v-flex>

                        <v-flex xs11 sm12 md6 lg6>
                            <v-card-text class="pr-sm-8 pr-md-8 pr-lg-10">
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
#loading{
    /*border: 1px solid red;*/
    /*margin: auto;*/
    /*padding-left: 70px;*/
}
</style>