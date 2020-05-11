export default {
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_AUTH_READY: (state) => {
    state.isAuthReady = true
  },
  SET_SETTINGS: (state, settings) => {
    state.settings = settings
  }
}
