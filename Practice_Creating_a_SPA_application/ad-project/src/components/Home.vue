<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel cycle interval="4000" show-arrows-on-hover>
            <v-carousel-item
              v-for="ad in promoAds"
              :key="ad.id"
              :src="ad.imageSrc"
              contain
            >
              <div class="car-link">
                <v-btn class="positiveBtn" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="ad in ads" :key="ad.id">
          <v-card class="mx-auto pt-5">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="ad.imageSrc"
              contain
            >
              <v-card-title>{{ ad.title }}</v-card-title>
            </v-img>

            <!-- <v-card-subtitle class="pb-1 price">$34.99</v-card-subtitle> -->
            <v-card-subtitle class="pb-1 price">${{ad.price}}</v-card-subtitle>
            <!-- {{ad.id}} -->

            <v-card-text class="text--primary">
              <div>{{ ad.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn class="openBtn openButton" text :to="'/ad/' + ad.id">
                {{ $t("text.open") }}
              </v-btn>

              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-sm-center pt-5">
          <v-progress-circular
            :size="80"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    promoAds() {
      // eslint-disable-next-line no-console
      console.log("this.$store.getters.promoAds", this.$store.getters.promoAds)
      return this.$store.getters.promoAds;
    },
    ads() {
      // eslint-disable-next-line no-console
      console.log("this.$store.getters.ads", this.$store.getters.ads)
      return this.$store.getters.ads;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>
.car-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.3);
  transform: translate(-50%, 0);
  padding: 10px 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.price {
  color: #b12704 !important;
  font-weight: 500;
  line-height: 19px;
}

.v-card__title {
  text-shadow: 0px 0px 5px #000000;
}

.openBtn{
  margin-right: 5px;
}
</style>
