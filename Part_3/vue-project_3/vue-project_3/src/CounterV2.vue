<template>
  <div class="counterV2">
    <h3>Counter component V2</h3>
    <p>CounterV2: {{counterV2}}</p>
    <slot></slot>
  </div>
</template>

<script>
  import {eventEmitter} from './main'

  export default {
    data(){
      return{
        counterV2: -1
      }
    },
    created() {
      eventEmitter.$on('counterUpdatedByEmitter', (num) => this.counterV2 += num)
    }
  }
</script>

<style scoped>
  .counterV2{
    font-style: italic;
    border: 2px solid green;
    width: 1000px;
    border-radius: 10px;
    background-color: aliceblue;
    margin: auto;
    margin-top: 5px;
    padding: 0px 20px 0px 20px;
  }
  h3{
    background-color: lightblue;
  }
</style>
