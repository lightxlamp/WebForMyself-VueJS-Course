export default {
    state: {
        loading: false,
        error: null
    },

    actions: {
        setLoading ({commit}, payload){
            commit('setLoading', payload)
        },
        setError ({commit}, payload){
            // eslint-disable-next-line no-console
            console.log('SetError Action called. Payload', payload)
            commit('setError', payload)
        },
        clearError ({commit}) {
            commit('clearError')
        }
    },

    mutations: {
        setLoading (state, payload){
            state.loading = payload
        },
        setError (state, payload){
            // eslint-disable-next-line no-console
            console.log('SetError Mutation called. State + Payload', state, payload)
            state.error = payload
        },
        clearError(state){
            state.error = null
        }
    },

    getters: {
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
}