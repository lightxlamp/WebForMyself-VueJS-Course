<template>
    <div class="car">
      <h1>Car name: {{carName}} / reversed name: {{reverseCarName}} for validation lesson</h1>
      <p>Car year: {{carYear}}</p>
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
    padding: 20px;
  }
</style>
