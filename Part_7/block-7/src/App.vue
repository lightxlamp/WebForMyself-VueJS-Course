<template>
  <div id="app">
    <div id="block1">
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

      <on-off v-model="switched"></on-off>
      <div>
        <h3 v-if="switched">Component is enabled</h3>
        <h3 v-else>Component is disabled</h3>
      </div>
    </div>

    <div id="block2">
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

      <p>Default value was selected by: v-model="defaultFrameworkForAnotherSelect"</p>
      <select v-model="defaultFrameworkForAnotherSelect">
        <option
          v-for="framework in frameworkList">{{framework}}
        </option>
      </select>
      <hr>
      <p>Modifier for numbers</p>
      <p>Enter your age:</p>
      <input type="text" v-model.number="age">
      <p>Your age is {{age}}</p>
      <p>When user types something exept digits to age field.</p>
      <p>Watch does not work, because of ".number" modifier<</p>
    </div>
  </div>
</template>

<script>
import onOff from './OnOff.vue'

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
      defaultFrameworkForAnotherSelect: 'React',
      age: 20,
      switched: false
    }
  },
  watch:{
    age(value){
      console.log(value);
      console.log(typeof(value))
    }
  },
  components: {
    onOff: onOff
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
    margin: auto;
  }

  body{
    background-color: black;
  }

#block1{
  padding: 20px;
  border-radius: 10px;
  background-color: wheat;
  width: 600px;
  border: 1px dashed black;
  display: inline-block;
}

#block2{
  padding: 20px;
  border-radius: 10px;
  background-color: wheat;
  width: 600px;
  vertical-align: top;
  border: 1px dashed black;
  display: inline-block;
}
</style>
