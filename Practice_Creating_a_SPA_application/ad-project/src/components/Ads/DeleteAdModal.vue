<template>
  <div>
    <!-- <v-btn class="error" :to="'/ad/' + ad.id">{{ $t("text.delete") }}</v-btn> -->

    <v-btn class="error" @click="dialog = true">{{ $t("text.delete") }}</v-btn>

    <v-dialog v-model="dialog" persistent max-width="900">
      <v-card>
        <v-container>
          <v-layout row>
            <v-flex xs12>
              <v-card-title>
                <h3 class="text--primary">{{ $t("text.deleteThisAd") }}</h3>
              </v-card-title>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary" @click="onMyDelete">{{
                  $t("text.delete")
                }}</v-btn>
                <v-btn text class="openButton" @click="onMyCancel">{{
                  $t("text.cancel")
                }}</v-btn>
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
      dialog: false
    };
  },
  methods: {
    onMyCancel() {
      this.dialog = false;
    },
    onMyDelete() {
      this.$store.dispatch("deleteAd", {
        id: this.ad.id,
        imageSrc: this.ad.imageSrc
      });
      //   this.$router.push("/");
      this.dialog = false;
    }
  }
};
</script>
