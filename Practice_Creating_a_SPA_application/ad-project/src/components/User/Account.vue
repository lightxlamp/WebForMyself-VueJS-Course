<template>
    <v-content>
        <v-container
                class="fill-height"
                fluid
        >
            <v-row v-if="loading"
               align="center"
               justify="center">
                <v-col class="text-center">
                    <v-progress-circular
                            :size="80"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-col>
            </v-row>

            <v-row
                align="center"
                justify="center"
            >
                <v-col class="text-center">
                    <p>Аккаунт</p>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        methods: {

        },
        computed: {
            loading (){
                return this.$store.getters.loading
            },
        },
        created (){
            this.$store.dispatch('fetchUser')
        }
    }
</script>

<style scoped>

</style>