<template>
  <div id="app" class="app">
    <h3>App component</h3>
    <p>{{carName}}</p>
    <app-car
      :carName="carName"
      :carYear="carYear"
      :counter="counter"
      :changeFromParentFunc="changeCarNameFromParent"
      v-on:carNameChanged="carName = $event"
      v-on:counterUpdated="counter = $event"
    >
    </app-car>
    <app-counter :counter="counter"></app-counter>
  </div>
</template>

<script>
import Car from './Car.vue'
import Counter from './Counter.vue'

export default {
  name: 'app',
  data () {
    return {
      carName: 'Toyota Prius - passed from parent component to Car component',
      carYear: 2006,
      counter: 0
    }
  },
  methods: {
    changeCarNameFromParent(){
      this.carName = "Audi";
    }
  },
  components:{
    AppCar: Car,
    AppCounter: Counter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app {
  border: 1px solid black;
  width: 1100px;
  border-radius: 10px;
  background-color: mistyrose;
  margin: auto;
  padding: 0px 20px 20px 20px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
