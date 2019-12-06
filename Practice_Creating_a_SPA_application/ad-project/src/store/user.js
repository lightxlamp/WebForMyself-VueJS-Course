import * as firebase from 'firebase'

class User {
    constructor (id) {
        this.id = id
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        setUser (state, user){
            state.user = user
        }
    },
    actions: {
        async registerUser({commit}, {email, password}){
            commit('clearError')
            commit('setLoading', true)

            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },

        async loginUser({commit}, {email, password}){
            commit('clearError')
            commit('setLoading', true)

            // // eslint-disable-next-line no-console
            // console.log('email', email)
            // // eslint-disable-next-line no-console
            // console.log('password', password)

            try {
                const user = await firebase.auth().signInWithEmailAndPassword(email, password)
                // eslint-disable-next-line no-console
                console.log('userFromFireBase', user)
                // eslint-disable-next-line no-console
                console.log('userFromFireBase.UID', user.user.uid)
                // eslint-disable-next-line no-console
                console.log('userFromFireBase.Name', user.user.displayName)
                commit('setUser', new User(user.user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },

        autoLoginUser({commit}, payload){
            commit('setUser', new User(payload.uid))
        }, //@todo change "payload" to smth

        logoutUser({commit}){
            firebase.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        user(state){
            return state.user
        },
        isUserLoggedIn(state){
            return state.user !== null
        }
    }
}