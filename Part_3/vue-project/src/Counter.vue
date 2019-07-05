<template>
    <h1>counter: {{counter}}</h1>
    <h1>counter2: {{counter2}}</h1>
</template>

<script>
    export default {
      name: "Counter",
      props: ['counter'],
      data(){
        return{
          counter2: 0
        }
      }
    }
</script>

<style scoped>

</style>
