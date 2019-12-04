<!-- https://alligator.io/vuejs/vuetify-validate-empty-fields/ -->
<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm4 offset-sm4>
                <h1 class="text--secondary mb-3">Аккаунт</h1>

                <v-form v-model="valid" ref="form" lazy-validation>
                    <v-text-field
                            name="userName"
                            label="Имя"
                            type="text"
                            v-model="userName"
                            required
                            :rules="[(v) => v && v.length <= 15 || 'Извините. Имя не должно превышать 15 символов']"
                    />

                    <v-text-field
                            name="userPhone"
                            label="Телефон"
                            type="text"
                            v-model="userPhone"
                            :rules="[(v) => v && v.length <= 13 || 'Телефон не должен превышать 13 символов',
                                    (v) => v && v.length >= 10 || 'Телефон должен иметь минимум 10 цифр'
                            ]"
                    />
                </v-form>

                <v-layout row>
                    <v-flex xs12>
                        <v-btn
                                color="blue-grey"
                                class="ma-2 white--text"
                                @click="triggerUpload"
                        >
                            Загрузить новый аватар
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>

                        <v-btn
                                :loading="loading"
                                :disabled="(!valid || !image) || loading"
                                class="success"
                                @click="updateUser"
                        >Сохранить изменения</v-btn>

                        <input
                                ref="fileInput"
                                type="file"
                                style="display: none"
                                accept="image/*"
                                @change="onFileChange"
                        >
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <img
                                :src="avatarSrc"
                                height="300px"
                                class="ma-2"
                                alt=""
                                v-if="avatarSrc"
                        >
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
                valid: false,
                image: false,
                avatarSrc: '',
                userName: '',
                userPhone: ''
            }
        },
        mounted() {
            this.userName = "Анатолий";
            this.userPhone = "+996755410078";
        },

        computed: {
            loading () {
                return this.$store.getters.loading
            }
        },
        methods: {
            updateUser(){
                if(this.$refs.form.validate() && this.image){
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        image: this.image
                    }

                    this.$store.dispatch('updateUser', ad)
                        .then(() => {
                            //alert('we are here')
                            this.$router.push('/list')
                        })
                        .catch(() => {})
                }
            },
            triggerUpload () {
                this.$refs.fileInput.click()
            },
            onFileChange (event) {
                const file = event.target.files[0]
                const reader = new FileReader()
                reader.onload = () => {
                    this.avatarSrc = reader.result
                }
                reader.readAsDataURL(file)
                this.image = file
            }
        }
    }
</script>

<style scoped>

</style>