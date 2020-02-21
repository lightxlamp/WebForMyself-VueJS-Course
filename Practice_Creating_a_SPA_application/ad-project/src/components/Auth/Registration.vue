<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>{{$t('text.registrationForm')}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="Email"
                :placeholder="$t('text.yourEmail')"
                name="email"
                prepend-icon="mdi-account"
                type="email"
                v-model="email"
                :rules="emailRules"
              />

              <v-text-field
                id="password"
                :label="$t('text.password')"
                :placeholder="$t('text.yourPassword')"
                name="password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                counter
                :rules="[passwordRules.required, passwordRules.min]"
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                id="confirm-password"
                :label="$t('text.passwordAgain')"
                name="confirm-password"
                prepend-icon="mdi-lock"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                counter
                :rules="confirmPasswordRules"
                @click:append="showConfirmPassword = !showConfirmPassword"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              @click="onSubmit"
              :disabled="!valid || loading === true"
              :loading="loading"
              color="primary"
            >
            {{ $t("text.register") }}
              
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false, 
      showConfirmPassword: false,
      emailRules: [
        v => !!v || this.$t("text.emailIsRequiredField"),
        v => /.+@.+/.test(v) || this.$t("text.emailIncorrectFormat")
      ],
      passwordRules: {
        required: v => !!v || this.$t("text.passwordIsRequiredField"),
        min: v => v.length >= 6 || this.$t("text.passwordShouldBeAtLeast") 
      },
      confirmPasswordRules: [
        v => !!v || this.$t("text.passwordConfirmationIsRequired"),
        v => v === this.password || this.$t("text.passwordsShouldMatch"),
      ]
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("registerUser", user)
          .then(() => {
            // to avoid - Uncaught (in promise) NavigationDuplicated
            if (this.$router.path !== '/') {
                this.$router.push('/')
            }
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style scoped></style>
