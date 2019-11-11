<template>
  <div>
    <h1>Car id:  {{ id }}</h1>
    <button class="btn btn-sm btn-default mb-2" @click="goBackToCars">Back</button>
    <br>
    <router-link
      class="btn btn-info mt-2"
      tag="button"
      :to="'/car/' + id +  '/info'"
    >Car Info
    </router-link>

    <router-link
      class="btn btn-info mt-2"
      tag="button"
      :to="{name: 'carInfo', params: {id: id}}"
    >Car Info - Easier Way
    </router-link>

    <router-link
      class="btn btn-info mt-2"
      tag="button"
      :to="{name: 'carInfo', params: {id: id}, query: {car: 'Toyota', year: 2000}}"
    >Car Info - With parameters
    </router-link>

    <router-link
      class="btn btn-info mt-2"
      tag="button"
      :to="{name: 'carInfo', params: {id: id}, query: {car: 'Toyota', year: 2000}, hash: '#scroll'}"
    >Test Hash
    </router-link>

    <hr>

    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            // id: this.$router.currentRoute.params['id']
            // or this can be done this way
            id: this.$route.params['id']
          }
        },
      watch: {
          $route(toR, fromR){
            this.id = toR.params['id']
          }
      },
      methods: {
        goBackToCars(){
          this.$router.push('/cars') // We a "pushing" to browser's history
        }
      },
      beforeRouteLeave(to, fromR, next){
        console.log('beforeRouterLeave')

        if(window.confirm('Are you sure you want to leave?')){
          next()
        }
        else{
          next(false)
        }
      }
    }
</script>

<style scoped>

</style>
