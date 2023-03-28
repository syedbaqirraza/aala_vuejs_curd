const state = {
  count: 0
}
const mutations = {
  increment(state, payload) {
    state.count = state.count + payload
  },
  decrement(state, payload) {
    if (state.count > payload) {
      state.count = state.count - payload
    }
  }
}
const actions = {
  incrementAction(context, payload) {
    context.commit('increment', payload)
  },
  decrementAction(context, payload) {
    context.commit('decrement', payload)
  },
  megaIncrementAction(context, payload) {
    context.commit('increment', payload)
  }
}
const getters = {
  getStateData(state) {
    return state.count
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
