<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Добавить объявление</h1>

                <v-form v-model="valid" ref="form" lazy-validation>
                    <v-text-field
                            name="title"
                            label="Название"
                            type="text"
                            v-model="title"
                            required
                            :rules="[v => !!v || 'Название - обязательное поле']"
                    />

                    <v-textarea
                            id="password"
                            name="desctiption"
                            label="Описание"
                            type="text"
                            v-model="description"
                            multiline
                            :rules="[v => !!v || 'Описание - обязательное поле']"
                    />
                </v-form>

                <v-layout row>
                    <v-flex xs12>
                        <v-btn
                                color="blue-grey"
                                class="ma-2 white--text"
                        >
                            Загрузить изображение
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <img
                                src="https://data.whicdn.com/images/304947669/original.jpg"
                                height="300px"
                                class="ma-2"
                                alt=""
                        >
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <v-switch
                                label="Добавить в промо?"
                                v-model="promo"
                        ></v-switch>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn
                                :disabled="!valid"
                                class="success"
                                @click="createAd"
                        >Создать объявление</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                title: '',
                promo: false,
                description: '',
                valid: false
            }
        },
        methods: {
            // createAd(){
            //     if(this.$refs.form.validate()){
            //         const ad = {
            //             title: this.title,
            //             description: this.description,
            //             promo: this.promo
            //         }
            //     }
            // }
        }
    }
</script>

<style scoped>

</style>