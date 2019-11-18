<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>Форма регистрации</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-text-field
                                    label="Email"
                                    name="email"
                                    prepend-icon="mdi-account"
                                    type="email"
                                    v-model="email"
                                    :rules="emailRules"
                            />

                            <v-text-field
                                    id="password"
                                    label="Пароль"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="password"
                                    :counter="6"
                                    :rules="passwordRules"
                            />
                            <v-text-field
                                    id="confirm-password"
                                    label="Пароль повторно"
                                    name="confirm-password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="confirmPassword"
                                    :counter="6"
                                    :rules="confirmPasswordRules"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                                @click="onSubmit"
                                :disabled="!valid"
                                color="primary">
                            Зарегестрироваться
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data ()
        {
            return {
                valid: false,
                email: '',
                password: '',
                confirmPassword: '',
                emailRules: [
                    v => !!v || 'Электронный адрес - обязательное поле',
                    v => /.+@.+/.test(v) || 'Некоректный формат адреса',
                ],
                passwordRules: [
                    v => !!v || 'Пароль - обязательное поле',
                    v => v.length >= 6 || 'Пароль должен быть не меньше 6ти символов',
                ],
                confirmPasswordRules: [
                    v => !!v || 'Подтверждающий пароль - обязательное поле',
                    v => v === this.password || 'Пароли должны совпадать'
                ]
            }
        },
        methods: {
            onSubmit(){
                if(this.$refs.form.validate()){
                    const user = {
                        email: this.email,
                        password: this.password
                    }
                    this.$store.dispatch('registration', user)
                }
            }
        }
    }
</script>

<style scoped>

</style>