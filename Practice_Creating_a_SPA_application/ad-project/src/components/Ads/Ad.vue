<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters v-if="!loading">
      <v-col cols="12" sm="6">
        <v-img :src="ad.imageSrc"></v-img>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card-text class="AdDescription" outlined tile>
          <h1 class="text--primary">{{ ad.title }}</h1>
          <p>{{ ad.description }}</p>
        </v-card-text>

        <v-card-actions>
          <edit-ad-modal :ad="ad" v-if="isOwner"></edit-ad-modal>
          <app-buy-modal :ad="ad" v-if="!isOwner"></app-buy-modal>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-row v-else justify="center">
      <v-col md="auto">
        <v-progress-circular
          :size="80"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditAdModal from "./EditAdModal";

export default {
  props: ["id"],
  computed: {
    ad() {
      const id = this.id;
      return this.$store.getters.adById(id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isOwner() {
      if (this.$store.getters.user !== null)
        return this.ad.ownerId === this.$store.getters.user.id;
      else return false;
    }
  },
  components: {
    EditAdModal
  }
};
</script>

<style scoped>
.AdDescription {
  white-space: pre-wrap;
}
h1 {
  padding-bottom: 10px;
}

h1.text--primary {
  line-height: 2rem;
}
</style>
