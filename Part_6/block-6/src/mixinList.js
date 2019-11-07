export default {
  data () {
    return {
      searchedname: '',
      names: ['Stas', 'Tilek', 'Egor', 'Vladimir', 'Elchibek', 'Erbol', 'Dmitry', 'Astar']
    }
  },
  computed:{
    filteredNames(){
      return this.names.filter(name => {
        return name.toLowerCase().indexOf(this.searchedname.toLowerCase()) !== -1
      })
    }
  },
  created(){
    console.log('Mixin - created')
  }
}
