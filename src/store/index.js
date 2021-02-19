import { createStore } from 'vuex'
import { UserModule } from './User'

export default createStore({
  state: {},

  // Mutations are functions that directly change state.
  // Convention for mutations to be in ALL_CAPS
  mutations: {},

  // Actions are functions that you call throughout your application the call mutations.
  actions: {},

  modules: {
    User: UserModule
  }
})
