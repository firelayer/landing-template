<template>
  <div>
    <h2 class="mb-2">User Profile</h2>
    <v-card class="pa-2">
      <div class="d-flex">
        <v-img
          :src="user.photoURL"
          aspect-ratio="1"
          class="blue-grey lighten-4 user-photo elevation-3 mr-2"
          max-width="100"
          max-height="100"
        ></v-img>
        <div class="flex-grow-1">
          <v-text-field v-model="userProfile.displayName" label="Display name" placeholder="name" hide-details></v-text-field>

          <div class="mt-2">
            <v-btn :loading="isLoadingSave" color="primary" @click="save">Save</v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { auth } from '../../firebase'

export default {
  layout: 'backoffice',
  data() {
    return {
      userProfile: {
        displayName: ''
      },
      isLoadingSave: false
    }
  },
  computed: {
    ...mapState('app', ['user'])
  },
  watch: {
    user(val) {
      this.userProfile = {
        ...val
      }
    }
  },
  mounted() {
    this.userProfile = {
      ...this.user
    }
  },
  methods: {
    ...mapMutations('app', {
      setUser: 'SET_USER'
    }),
    async save() {
      const { displayName } = this.userProfile

      this.isLoadingSave = true

      try {
        await auth().currentUser.updateProfile({
          displayName
        })

        this.setUser({
          ...this.user,
          displayName
        })
      } catch (error) {
        console.log(error)
      }

      this.isLoadingSave = false
    }
  }
}
</script>

<style lang="scss" scoped>
.user-photo {
  border-radius: $border-radius-root;
}
</style>
