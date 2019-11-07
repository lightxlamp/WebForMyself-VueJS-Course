<template>
  <div>
    <h1>List</h1>
    <input type="text" v-model="searchedname">

    <p>Filtered array of names:</p>

    <ul>
      <li v-for="name in filteredNames">{{name}}</li>
    </ul>
  </div>
</template>

<script>
    import mixinList from './mixinList'

    export default {
      name: "List",
      mixins: [mixinList]
    }

</script>

<style scoped>

</style>
