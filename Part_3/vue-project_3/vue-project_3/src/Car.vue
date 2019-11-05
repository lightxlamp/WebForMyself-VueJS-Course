<template>
    <div class="car">
      <h3>Car component</h3>
      <h5>Car name: {{carName}} / reversed name: {{reverseCarName}} for validation lesson</h5>
      <p>Car year: {{carYear}}</p>
      <button @click="changeCarName">Change car name</button>
      <button @click="changeFromParentFunc()">Change car name with a function from parent component</button>
      <button @click="updateCounterFromCarComponent">Update counter from Car component</button>
    </div>
</template>

<script>
    export default {
      //props: ['carName', 'carYear'],
      // props: {
      //   carName: String,
      //   carYear: Number
      // },
      props:{
        carName:{
          type: String,
          default: 'BiBi'
        },
        carYear:{
          type: Number,
          default: 1973
        },
        counter:{
          type: Number,
          default: 0
        },
        changeFromParentFunc: Function
      },
      methods:{
        changeCarName(){
          this.carName = "Mazda";
          this.$emit('carNameChanged', this.carName)
        },
        updateCounterFromCarComponent(){
          this.$emit('counterUpdated', this.counter + 1)
        }
      },
      computed: {
        reverseCarName(){
          return this.carName.split('').reverse().join('');
        }
      }
    }
</script>

<style scoped>
  .car {
    border: 1px solid black;
    width: 1000px;
    border-radius: 10px;
    background-color: beige;
    margin: auto;
    padding: 0px 20px 20px 20px;
  }
</style>
