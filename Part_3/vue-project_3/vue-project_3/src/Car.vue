<template>
    <div class="car">

      <h3>Car component</h3>
      <h5>Car name: {{carName}} / reversed name: {{reverseCarName}} for validation lesson</h5>
      <p>Car year: {{carYear}}</p>

      <div id="buttons">
        <button @click="changeCarName">Change car name</button>
        <span>- Calls "ChangeCarName" method of a current - "Car" component.
          And emits new value to an "App" component</span>
        <br>
        <button @click="changeFromParentFunc()">Change car name with a function from parent component</button>
        <span>- "Car" component accepts "ChangeCarName" function as a parameter from "App" component and calls it</span>
        <br>
        <button @click="updateCounterFromCarComponent">Update "Counter" from Car component</button>
        <span>- Complex and "incorrect" version</span>
        <br>
        <button @click="updateCounter2FromCarComponentWithEventEmitter">
          Update "CounterV2" from Car component using Event Emitter
        </button>
        <span>- Greatly simplified version of a "Counter updater" implemented above. I LLLLLLLOVE it. Also we
        pass Num to counter</span>
      </div>

    </div>

</template>

<script>
    import {eventEmitter} from "./main"

    export default {
      // props: ['carName', 'carYear'],

      // props: {
      //   carName: String,
      //   carYear: Number
      // }, //These two ways of passing parameters can be used as well

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
        },
        updateCounter2FromCarComponentWithEventEmitter(){
          eventEmitter.$emit('counterUpdatedByEmitter', 3)
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

  h3{
    background-color: lightgreen;
  }

  #buttons{
    text-align: left;
  }

  #buttons button{
    padding: 4px;
    margin: 5px;
  }

  #app span{
    font-size: 12px;
  }
</style>
