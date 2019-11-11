<template>
  <div id="app">
    <div class="wrapper">
      <div class="form-group">
        <label for="car">Car</label>
        <input type="text" id="car" class="form-control" v-model.trim="car">
      </div>

      <div class="form-group">
        <label for="car">Car year</label>
        <input type="text" id="year" class="form-control" v-model.number="carYear">
      </div>
      <button class="btn btn-success" @click="createCar">Create car</button>
      <br>
      <button class="btn btn-success mt-2" @click="createCarByResource">Create car using "Resource"</button>
      <br>
      <button class="btn btn-primary mt-2" @click="loadCars">Load cars</button>
      <br>
      <button class="btn btn-primary mt-2" @click="loadCarsByResource">Load cars using "Resource"</button>

      <hr>

      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="car of carsFromDB"
          :key="car.id"
        >
          <strong>{{ car.car }} - {{ car.year }}</strong>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data () {
      return {
        car: '',
        carYear: '',
        carsFromDB: [],
        resource: null
      }
    },
    methods: {
      createCar() {
        console.log('Create car')

        const carObj = {
          car: this.car,
          year: this.carYear
        }

        this.$http.post('http://localhost:3000/cars', carObj) // post methods returns "Promise". It is better to handle it
          .then(response => {
            //console.log(response) // return whole data set. With unnecessary values
            return response.json() // parsing and returning created object data only
          })
          .then(newCar => {
            console.log('===========')
            console.log(newCar )
          })
      },
      loadCars() {
        console.log('Load Cars')
        this.$http.get('http://localhost:3000/cars')
          .then(response => {
            return response.json()
        })
          .then(cars => {
            console.log('===========')
            this.carsFromDB = cars
            console.log(cars)
          })
      },

      createCarByResource(){
        console.log('Create car by resource')

        const carObj = {
          car: this.car,
          year: this.carYear
        }

        this.resource.save({}, carObj)
      },

      loadCarsByResource(){
        console.log('Load cars using "Resource"')

        this.resource.get().then(resposne => resposne.json())
            .then(cars => this.carsFromDB = cars)
      }
    },
    created() {
      this.resource = this.$resource('cars')
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

  .wrapper{
    width: 500px;
    margin: auto;
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
