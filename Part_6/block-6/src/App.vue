<template>
  <div id="app">
    <div id="block1">
      <h1>-=Simple filters=-</h1>
      <h1>1) {{ msg }}</h1>
      <h1>2) {{ msg | lowerCase }}</h1>
      <p>A local: "lowerCase" filter has been applied to the second &lth1&gt tag</p>
      <h1>3) {{ msg | upperCase }}</h1>
      <p>A global: "upperCase" filter has been applied to the third &lth1&gt tag</p>
      <h1>4) {{ msg | upperCase | lowerCase}}</h1>
      <p>Two filters has been applied to the 4th &lth1&gt tag</p>
    </div>

    <div id="block2">
      <h1>-=Filters for arrays =-</h1>
      <p>Original array of names:</p>
      <ul>
        <li v-for="name in names">{{name}}</li>
      </ul>

      <hr>
      <p>Enter some name:</p>
      <input type="text" v-model="searchedname">

      <p>Filtered array of names:</p>

      <ul>
        <li v-for="name in filteredNames">{{name}}</li>
      </ul>

      <hr>

      <h1>-=Mixins=-</h1>

      <app-list></app-list>

    </div>
  </div>
</template>

<script>
  import mixinList from './mixinList'
  export default
  {
    name: 'app',
    data () {
      return {
        msg: 'Creating custom filters for VueJs'
      }
    },
    mixins: [mixinList],
    filters:{
      lowerCase(value){
        return value.toLowerCase();
      }
    }
  }
</script>

<style>
  body{
    background-color: black;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border: 2px dashed red;
  border-radius: 30px;
  background-color: white;
  padding: 20px;
}

#block1{
  width: 700px;
  border: 1px dashed black;
  display: inline-block;
}

#block2{
  width: 600px;
  vertical-align: top;
  border: 1px dashed black;
  display: inline-block;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

  p{
    color: green;
  }
</style>
