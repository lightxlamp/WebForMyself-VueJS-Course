<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h1>Объявление</h1>
                <v-card v-if="!loading">

                    <v-img
                        :src="ad.imageSrc"
                        height="300"
                    ></v-img>

                    <v-card-text>
                        <h1 class="text--primary">{{ad.title}}</h1>
                        <p>{{ad.description}}</p>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <edit-ad-modal :ad="ad" v-if="isOwner"></edit-ad-modal>
                        <app-buy-modal :ad="ad"></app-buy-modal>
                    </v-card-actions>
                </v-card>
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
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import EditAdModal from './EditAdModal'

    export default {
        props: ['id'],
        computed: {
            ad () {
                const id = this.id
                return this.$store.getters.adById(id);
            },
            loading (){
                return this.$store.getters.loading
            },
            isOwner (){
                if(this.$store.getters.user !== null)
                    return this.ad.ownerId === this.$store.getters.user.id
                else
                    return false
            }
        },
        components: {
            EditAdModal
        }
    }
</script>

<style scoped>

</style>