<template>
    <div class="counter">
      <h3>Counter component</h3>
      <p>Counter {{counter}}</p>
    </div>
</template>

<script>
    export default {
        name: "Counter",
        props: ['counter']
    }
</script>

<style scoped>
  .counter{
    border: 1px solid black;
    width: 1000px;
    border-radius: 10px;
    background-color: aliceblue;
    margin: auto;
    margin-top: 5px;
    padding: 0px 20px 0px 20px;
  }
</style>
