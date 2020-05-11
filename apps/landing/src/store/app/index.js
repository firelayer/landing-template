import actions from './actions'
import mutations from './mutations'

const state = () => ({
  isAuthReady: false,
  user: null,
  settings: {
    maintenance: false
  }
})

export default {
  state,
  actions,
  mutations
}
