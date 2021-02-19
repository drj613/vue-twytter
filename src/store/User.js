export const UserModule = {
  namespaced: true,

  state: {
    user: null
  },

  // Mutations are functions that directly change state.
  // Convention for mutations to be in ALL_CAPS
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    }
  },

  // Actions are functions that you call throughout your application the call mutations.
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    }
  }
}