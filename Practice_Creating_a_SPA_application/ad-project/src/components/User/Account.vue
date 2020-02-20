<!-- https://alligator.io/vuejs/vuetify-validate-empty-fields/ -->
<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm4 offset-sm4>
        <h1 class="text--secondary mb-3">{{$t('text.myAccount')}}</h1>

        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            name="userName"
            :label="$t('text.yourName')"
            type="text"
            v-model="userName"
            required
            :rules="[
              v =>
                (v && v.length <= 20) ||
                $t('text.nameShouldBelessThan')
            ]"
          />

         <v-img
          height="200px"
          :src="currentUserAvatar"
        >
        </v-img>
                                    <!-- <v-text-field-->
        <!--                            name="userPhone"-->
        <!--                            label="Телефон"-->
        <!--                            type="text"-->
        <!--                            v-model="userPhone"-->
        <!--                            :rules="[(v) => v && v.length <= 13 || 'Телефон не должен превышать 13 символов',-->
        <!--                                    (v) => v && v.length >= 10 || 'Телефон должен иметь минимум 10 цифр'-->
        <!--                            ]" -->
        <!--                    /> -->
        </v-form>

        <v-layout row>
          <v-flex xs12>
            <v-btn
              color="blue-grey"
              class="ma-2 white--text"
              @click="triggerUpload"
            >
              {{$t('text.uploadNewAvatar')}}
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>

            <v-btn
              :loading="loading"
              :disabled="!valid || !avatarSrc || loading"
              class="ma-2 success"
              @click="updateUser"
              >
                {{$t('text.saveChanges')}}
              </v-btn
            >

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
              :src="avatarSrc"
              height="300px"
              class="ma-2"
              alt=""
              v-if="avatarSrc"
            />
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
      valid: false,
      avatarSrc: false,
      image: false,
      userName: this.$store.getters.currentUserName
      // userPhone: ''
    };
  },
  mounted() {
    // this.userName = this.$store.getters.firebaseUserObject.user.displayName
    // this.userPhone = "+996755410078";
  },

  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  
    currentUserAvatar() {
      return this.$store.getters.currentUserAvatar;
    },

    currentUserName() {
      return this.$store.getters.currentUserName;
    },

    currentUserFirebaseObject(){
      return this.$store.getters.firebaseUserObject;
    }

  },
  methods: {
    updateUser() {
      if (this.$refs.form.validate() && this.avatarSrc) {
        const updatedUserInfo = {
          newUserName: this.userName,
          newAvatar: this.image
        };

        this.$store
          .dispatch("updateUser", updatedUserInfo)
          .then(() => {
            // eslint-disable-next-line no-console
            console.log('- Account UPDATED');
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
        this.avatarSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    }
  }
};
</script>

