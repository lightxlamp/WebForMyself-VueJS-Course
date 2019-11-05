<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "Info"
    }
</script>

<style scoped>
  div{
    font-size: 14px;
    margin-top: 5px;
    border: 1px solid black;
    width: 1000px;
    border-radius: 7px;
    background-color: beige;
    margin: auto;
    margin-top: 5px;
    padding: 5px 20px 5px 20px;
  }
</style>
