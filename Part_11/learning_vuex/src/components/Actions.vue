<template>
  <div>
    <button class="btn btn-success" @click="updateCounter(1)">Add</button>
    <button class="btn btn-danger" @click="updateCounter(-1)">Subtract</button>

    <br>
    <br>
    <p>Buttons based on mutations:</p>

    <button class="btn btn-success" @click="updateCounterV2(1)">Add</button>
    <button class="btn btn-danger" @click="updateCounterV2 (-1)">Subtract</button>

    <br>
    <br>
    <p>Buttons based on actions: (Updating after 2 seconds)</p>

    <button class="btn btn-success" @click="updateCounterV3(1)">Add</button>
    <button class="btn btn-danger" @click="updateCounterV3 (-1)">Subtract</button>
  </div>
</template>

<script>
  export default{
    methods: {
      updateCounter (val) {
      // this.$emit('counterUpdated', val) //old way
      this.$store.state.counter += val
      },
      updateCounterV2(val){
        this.$store.commit('changeCounter', val)
      },
      updateCounterV3(val){
        this.$store.dispatch('asyncChangeCounter2', {
          counterValue: val,
          timeoutDelay: 2000
        })
      }
    }
  }
</script>
