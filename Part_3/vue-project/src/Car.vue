<template>
  <div class="car">
    <h3>Model: {{carName}}</h3>
    <p>Year: {{carYear}}</p>
  </div>
</template>

<script>
    export default {
      props: ['carName'],
        data() {
          return {
            //carName: 'Toyota Prius II',
            carYear: '2006'
          }
        }
    }
</script>

<style>
  .car{
    border: 1px solid red;
  }
</style>

<style scoped>

</style>
