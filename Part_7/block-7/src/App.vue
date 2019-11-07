<template>
  <div id="app">
    <h2>Essential Links + name = {{name}}</h2>
    <input type="text" v-model.lazy="name">
    <br>
    <br>
    <textarea name="" id="" cols="80" rows="10" v-model="textarea"></textarea>
    <br>
    <p>{{textarea}}</p>

    <br>
    <label for="">
      <input type="checkbox" value="instagram" v-model="socialArray"> Instagram
    </label>

    <label for="">
      <input type="checkbox" value="vk" v-model="socialArray"> VK
    </label>

    <label for="">
      <input type="checkbox" value="facebook" v-model="socialArray"> Facebook
    </label>

    <h3>Social networks selected by checkboxes</h3>
    <ul>
      <li v-for="s in socialArray">{{s}}</li>
    </ul>

    <hr>

    <label for="">
      <input type="radio" value="instagram" v-model="social"> Instagram
    </label>

    <label for="">
      <input type="radio" value="vk" v-model="social"> VK
    </label>

    <label for="">
      <input type="radio" value="facebook" v-model="social"> Facebook
    </label>

    <p>Social network selected by radio button is {{social}}</p>

    <hr>
    <p>Default value was selected by: :selected="framework === defaultFramework"</p>
    <select>
      <option
        v-for="framework in frameworkList"
        :selected="framework === defaultFramework"
      >{{framework}}
      </option>
    </select>

    <hr>
    <p>Default value was selected by: v-model="defaultFrameworkForAnotherSelect"</p>
    <select v-model="defaultFrameworkForAnotherSelect">
      <option
        v-for="framework in frameworkList">{{framework}}
      </option>
    </select>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name: 'Initial Value',
      textarea: '',
      socialArray: ['vk'],
      social: 'facebook',
      frameworkList: ['Angular', 'Vue JS', 'React'],
      defaultFramework: 'Vue JS',
      defaultFrameworkForAnotherSelect: 'React'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
    white-space: pre;
  }

  #app{
    width: 550px;
    margin: auto;
  }
</style>
