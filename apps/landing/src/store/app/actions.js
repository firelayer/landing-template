const updateProfile = async ({ commit, dispatch, state }, userProfile) => {
  const { displayName } = userProfile
  const userSearch = new User(query)

  try {
    const user = await userSearch.get()

    commit('LOADED', [user])
  } catch (error) {
    commit('LOADED', [])
  }
}

export default {
  updateProfile
}
