import VueRouter from 'vue-router'
import Home from './pages/Home'
// import Cars from './pages/Cars' // We are going to lazy load this component. So.. import when needed only
//import Car from './pages/Car'
import CarInfo from './pages/CarInfo'
import ErrorCmp from './pages/Error'

const Cars = resolve => {
  require.ensure(['./pages/Cars.vue'], () => {
    resolve(
      require('./pages/Cars.vue')
    )
  })
}

const Car = resolve => {
  require.ensure(['./pages/Car.vue'], () => {
    resolve(
      require('./pages/Car.vue')
    )
  })
}

export default new VueRouter({
  routes: [
    {
      path: '', // localhost:8080
      component: Home
    },
    {
      path: '/cars', // localhost:8080/cars
      component: Cars
    },
    {
      path: '/car/:id',
      component: Car,
      children: [
        {
          path: 'info', // localhost:8080/car/4/full
          component: CarInfo,
          name: 'carInfo',
          // beforeEnter(to, from, next){
          //   console.log('Before Enter')
          // }
        }
      ]
    },
    {
      path: '/none',
      redirect: '/cars'
    },
    {
      path: '*',
      component: ErrorCmp
    }
  ],
  scrollBehavior (to, from, savedPosition){

    if(to.hash){
      return {selector: to.hash}
    }
    return { //default
      x: 0,
      y: 0
    }
  },
  mode: 'history' // this parameter removes # from url. e.g. http://localhost:8080/#/cars
  // Possible problems of History Mode:
  //  https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
})
