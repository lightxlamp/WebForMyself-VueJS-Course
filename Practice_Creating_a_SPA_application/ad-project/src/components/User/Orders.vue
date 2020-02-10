<template>
  <v-container>
    <v-layout row v-if="loading" justify-center id="loading">
      <div class="ma-12">
        <v-progress-circular
          :size="80"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-layout>
    <v-layout row v-else-if="!loading && orders.length !== 0">
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Заказы</h1>
        <v-list subheader two-line flat>
          <v-list-item-group multiple>
            <v-list-item v-for="order in orders" :key="order.id">
              <template>
                <v-list-item-action>
                  <v-checkbox
                    color="success"
                    :input-value="order.done"
                    @change="markDone(order)"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{ order.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn :to="'/ad/' + order.adId" class="primary"
                    >Открыть</v-btn
                  >
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout row v-else>
      <v-flex xs12 class="text-xl-start">
        <h1 class="text--secondary">У Вас нет заказов</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    markDone(order) {
      this.$store
        .dispatch("markOrderAsDone", order.id)
        .then(() => {
          order.done = true;
        })
        .catch(() => {});
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    orders() {
      return this.$store.getters.allOrders;
    }
  },
  created() {
    this.$store.dispatch("fetchOrders");
  }
};
</script>

<style scoped></style>
