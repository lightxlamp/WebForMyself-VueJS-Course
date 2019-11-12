export default {

  state: {
    counter: 0
  },

  mutations: {
    changeCounter(state, payload){
      state.counter += payload
    }
  },

  actions: {
    asyncChangeCounter (context, payload){
      setTimeout(() => {
        context.commit('changeCounter', payload)
      }, 2000)
    },
    asyncChangeCounter2 ({commit}, payload){
      setTimeout(() => {
        commit('changeCounter', payload.counterValue)
      }, payload.timeoutDelay)
    }
  },

  getters: {
    computedCounter (state){
      return state.counter * (7 - 2 * (5 + 4))
    }
  }
}
