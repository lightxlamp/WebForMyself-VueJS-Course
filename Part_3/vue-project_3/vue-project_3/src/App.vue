<template>
  <div id="app">
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

    <app-counter-v2></app-counter-v2>

    <app-info>Different styles were applied by "h3" selector,
      because of a "scoped" CSS style of each component
    </app-info>

    <app-info><b>This HTML (text with &lt;b&gt; &lt;/b&gt; tag) has been transferred
      to component and displayed by it using &lt;slot&gt; &lt;/slot&gt; </b>
    </app-info>

    <app-info>{{somePieceOfDataFromParent}} - this text was taken from App -> data() and passed to "Info" component
    </app-info>

  </div>
</template>

<script>
import Car from './Car.vue'
import Counter from './Counter.vue'
import CounterV2 from './CounterV2'
import Info from './Info.vue'

export default {
  name: 'app',
  data () {
    return {
      carName: 'Toyota Prius - passed from parent component to Car component',
      carYear: 2006,
      counter: 0,
      somePieceOfDataFromParent: 'Some piece of data from parent'
    }
  },
  methods: {
    changeCarNameFromParent(){
      this.carName = "Audi";
    }
  },
  components:{
    AppCar: Car,
    AppCounter: Counter,
    AppCounterV2: CounterV2,
    AppInfo: Info
  }
}
</script>

<style>
body{
  background-color: black;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* Generated rules above */
  /* My rules below */
  border: 2px solid red;
  width: 1100px;
  border-radius: 10px;
  background-color: mistyrose;
  margin: auto;
  margin-top: 10px;
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

h3{
  background-color: lightseagreen;
  border-radius: 10px;
  width: 970px;
  margin: auto;
  margin-top: 15px;
  border: 1px solid white;
}
</style>
