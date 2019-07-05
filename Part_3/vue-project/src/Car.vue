<template>
  <div class="car">
    <h3>Model: {{carName}} / {{reverseName}}</h3>
    <p>Year: {{carYear}}</p>
    <buton @click="changeName">Change name</buton>
    <buton @click="changeCarNameFunc()">Change from parent</buton>
    <buton @click="updateCounter()">Update Counter</buton>
  </div>
</template>

<script>
    import {eventEmitter} from "./main";

    export default {
      //props: ['carName', 'carYear'],
     /* props: {
        carName: String,
        carYear: Number
      },*/
      props: {
        carName: {
          type: String,
          required: true,
          default: 'Default Car Name'
        },
        carYear: {
          type: Number,
          required: true,
          default: 1999
        },
        changeCarNameFunc: Function,
        counter: Number
      },
      methods: {
        changeName(){
          this.carName = 'BMW E34',
          this.$emit('isNamechanged', this.carName)
        },
        updateCounter(){
          this.$emit('counterUpdated', this.counter++)
          eventEmitter.$emit('counter2Updated')
        }
      },
      computed: {
        reverseName(){
          return this.carName.split('').reverse().join('');
        }
      }
    }
</script>

<style>
  .car{
    border: 1px solid #1dff0f;
  }
</style>

<style scoped>

</style>
