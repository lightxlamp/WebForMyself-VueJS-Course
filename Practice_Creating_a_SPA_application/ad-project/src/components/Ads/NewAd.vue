<template>
  <v-container>
    <v-layout row>
      <v-flex
        xs10
        sm8
        md8
        lg8
        xl6
        offset-xs1
        offset-sm2
        offset-md2
        offset-lg2
        offset-xl3
      >
        <h1 class="text--secondary mb-3">{{ $t("text.addAd") }}</h1>

        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            name="title"
            :label="$t('text.title')"
            type="text"
            v-model="title"
            required
            :rules="titleRules"
          />

          <v-textarea
            id="password"
            name="desctiption"
            :label="$t('text.description')"
            type="text"
            v-model="description"
            multiline
            :rules="descRules"
          />
        </v-form>

        <v-layout row>
          <v-flex xs12>
            <v-btn
              color="blue-grey"
              class="ma-2 white--text"
              @click="triggerUpload"
            >
              {{ $t("text.uploadImage") }}
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="onFileChange"
            />
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <img
              :src="imageSrc"
              height="300px"
              class="ma-2"
              alt=""
              v-if="imageSrc"
            />
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-switch
              class="pl-2"
              :label="$t('text.addToPromo')"
              v-model="promo"
            ></v-switch>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="!valid || !image || loading"
              class="success ml-2"
              @click="createAd"
              >{{ $t("text.createAd") }}</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      promo: false,
      description: "",
      valid: false,
      image: false,
      imageSrc: ""
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    //https://stackoverflow.com/questions/57883281/i18n-vue-is-not-working-when-changing-locale-using-rules-in-text-field-of-vueti
    titleRules() {
      return [v => !!v || this.$t("text.titleIsMandatoryField")];
    },
    descRules() {
      return [v => !!v || this.$t("text.descIsMandatoryField")];
    }
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        };

        this.$store
          .dispatch("createAd", ad)
          .then(() => {
            //alert('we are here')
            this.$router.push("/list");
          })
          .catch(() => {});
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    }
  }
};
</script>

<style scoped></style>
