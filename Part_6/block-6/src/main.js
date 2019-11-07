import Vue from 'vue'
import App from './App.vue'
import List from './List.vue'

Vue.component('app-list', List)

Vue.mixin({beforeCreate() {
  console.log('Global Mixin - Before create')
  }})

Vue.filter('upperCase', (value) => {
  return value.toUpperCase();
})

new Vue({
  el: '#app',
  render: h => h(App)
})
