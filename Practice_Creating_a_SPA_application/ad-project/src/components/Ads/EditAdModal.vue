<template>
  <div>
    <v-btn class="primary mr-2" @click="dialog = true">{{
      $t("text.edit")
    }}</v-btn>

    <v-dialog v-model="dialog" persistent max-width="900">
      <v-card>
        <v-container>
          <v-layout row>
            <v-flex xs12>
              <v-card-title>
                <h3 class="text--primary">{{ $t("text.editAd") }}</h3>
              </v-card-title>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>

          <v-layout row>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  :label="$t('text.title')"
                  name="title"
                  type="text"
                  v-model="editedTitle"
                />
                <v-textarea
                  :label="$t('text.description')"
                  name="description"
                  type="text"
                  v-model="editedDescription"
                  rows="14"
                />
                <v-text-field
                  name="price"
                  :label="$t('text.price')"
                  type="number"
                  v-model="editedPrice"
                />
              </v-card-text>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>

          <v-layout row>
            <v-flex xs12>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary" @click="onMySave">{{
                  $t("text.save")
                }}</v-btn>
                <v-btn text @click="onMyCancel">{{ $t("text.cancel") }}</v-btn>
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
      editedDescription: this.ad.description,
      editedTitle: this.ad.title,
      editedPrice: this.ad.price
    };
  },
  methods: {
    onMyCancel() {
      this.editedDescription = this.ad.description;
      this.editedTitle = this.ad.title;
      this.editedPrice = this.ad.price;
      this.dialog = false;
    },
    onMySave() {
      if (this.editedDescription !== "" && this.editedTitle !== "" && this.editedPrice !== "") {
        this.$store.dispatch("updateAd", {
          title: this.editedTitle,
          description: this.editedDescription,
          price: this.editedPrice,
          id: this.ad.id
        });
      }

      this.dialog = false;
    }
  }
};
</script>
