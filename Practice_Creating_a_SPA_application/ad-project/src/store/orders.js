import * as firebase from 'firebase'

class Order{
    constructor(name, phone, adId, done = false, id = null){
        this.name = name
        this.phone = phone
        this.adId = adId
        this.done = done
        this.id = id
    }
}

export default {
    state: {
        orders: []
    },
    actions: {
        async createOrder({commit}, {name, phone, adId, ownerId}) {
            const order = new Order(name, phone, adId)
            // eslint-disable-next-line no-console
            console.log('Order', order)
            commit('clearError')

            try{
                await firebase.database().ref(`/users/${ownerId}/orders`).push(order)
            }
            catch (error){
                commit('setError', error.message)
            }
        },
        async fetchOrders ({commit, getters}){
            commit('setLoading', true)
            commit('clearError')

            let resultOrders = []

            try{
                const firebaseValue = await firebase.database().ref(`/users/${getters.user.id}/orders`)
                    .once('value')
                const orders = firebaseValue.val()

                Object.keys(orders).forEach(key => {
                    const order = orders[key]
                    resultOrders.push(
                        new Order(order.name, order.phone, order.adId, order.done, key)
                    )
                })

                commit('loadOrders', resultOrders)
                commit('setLoading', false)
            }
            catch (e){
                commit('setLoading', false)
                commit('setError', e.message)
            }
        }
    },
    mutations: {
        loadOrders (state, payload){
            state.orders = payload
        }
    },
    getters: {
        completedOrders (state) {
            return state.orders.filter(order => order.done)
        },
        incompliteOrders(state){
            return state.orders.filter(order => !order.done)
        },
        allOrders(state, getters){
            return getters.incompliteOrders.concat(getters.completedOrders)
        }
    }
}