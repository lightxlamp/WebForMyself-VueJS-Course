export default {
    state: {
        loading: false,
        error: null
    },

    actions: {
        setLoading ({commit}, trueOrFalse){
            commit('setLoading', trueOrFalse)
        },
        setError ({commit}, trueOrFalse){
            // eslint-disable-next-line no-console
            //console.log('SetError Action called. Payload', payload)
            commit('setError', trueOrFalse)
        },
        clearError ({commit}) {
            commit('clearError')
        }
    },

    mutations: {
        setLoading (state, trueOrFalse){
            state.loading = trueOrFalse
        },
        setError (state, trueOrFalse){
            // eslint-disable-next-line no-console
            //console.log('SetError Mutation called. State + Payload', state, payload)
            state.error = trueOrFalse
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