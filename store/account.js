// Vuex store for logged in account state

export const state = () => ({
  loggedInUser: null
})

export const mutations = {
  login (state, user) {
    state.loggedInUser = user
  }
}

export const getters = {
  isLoggedIn (state) {
    return state.loggedInUser != null
  },

  isAdministrator (state, getters) {
    if (!getters.isLoggedIn) {
      return false
    }
    return state.loggedInUser.role === 'ADMIN'
  },

  isModerator (state, getters) {
    if (!getters.isLoggedIn) {
      return false
    }
    return state.loggedInUser.role === 'MODERATOR'
  }
}
