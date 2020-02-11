<template>
  <div>
    <v-btn class="primary mr-2" @click="dialog = true">{{
      $t("text.buy")
    }}</v-btn>

    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-container>
          <v-layout row>
            <v-flex xs12>
              <v-card-title class="text--primary">
                {{ $t("text.doYouWannaBuyThis") }}
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>

          <v-layout row>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  name="name"
                  :label="$t('text.yourName')"
                  type="text"
                  v-model="name"
                ></v-text-field>

                <v-text-field
                  name="phone"
                  :label="$t('text.yourPhone')"
                  type="text"
                  v-model="phone"
                ></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :aria-disabled="localLoading"
                  :loading="localLoading"
                  class="success"
                  @click="onMyBuy"
                >
                  {{ $t("text.buy") }}
                </v-btn>

                <v-btn :aria-disabled="localLoading" text @click="onMyCancel">
                  {{ $t("text.cancel") }}
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["ad"],

  data() {
    return {
      dialog: false,
      name: "",
      phone: "",
      localLoading: false
    };
  },
  methods: {
    onMyCancel() {
      this.name = "";
      this.phone = "";
      this.dialog = false;
    },
    onMyBuy() {
      if (this.name !== "" && this.phone !== "") {
        this.localLoading = true;
        this.$store
          .dispatch("createOrder", {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId
          })
          .finally(() => {
            this.name = "";
            this.phone = "";
            this.localLoading = false;
            this.dialog = false;
          });
      }
    }
  }
};
</script>
