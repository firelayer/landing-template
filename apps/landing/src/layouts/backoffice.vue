<template>
  <v-app>
    <v-app-bar flat color="white" app>
      <v-app-bar-nav-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <nuxt-link :to="localePath('/')" class="d-flex align-center">
        <img src="/images/logo.png" alt="TheCompany" height="38" class="mr-2">
      </nuxt-link>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <lang-switcher class="mr-2" />
        <user-menu />
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      floating
      class="elevation-4"
      color="secondary"
      width="280"
    >
      <div class="px-2 py-1 white--text">
        <div class="title font-weight-bold">User Dashboard</div>
        <div class="overline">1.0.0 Valiant</div>
      </div>

      <v-list dense>
        <v-subheader class="mt-1 overline">Menu</v-subheader>
        <v-list-item :to="localePath('/dashboard')" exact>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="localePath('/dashboard/profile')" exact>
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>User Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2 text-center">
          <v-btn small href="https://firelayer.io/docs" target="_blank" text>Docs</v-btn>
          <v-btn small href="https://github.com/firelayer/landing-template" target="_blank" text>Feedback</v-btn>
          <v-btn small href="https://github.com/firelayer/landing-template" target="_blank" text>Support</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-content>
      <client-only>
        <v-container fluid>
          <nuxt v-if="user && !settings.maintenance" />
          <div v-if="settings.maintenance" class="text-center">
            <v-img
              class="mb-5"
              height="200px"
              contain
              src="/images/maintenance.svg"
            ></v-img>

            <h1>{{ $t('dashboard.maintenance') }}</h1>
          </div>
        </v-container>
      </client-only>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { realtime } from '../firebase'
import requiresAuth from '../mixins/requiresAuth'
import UserMenu from '../components/common/UserMenu'
import LangSwitcher from '../components/common/LangSwitcher'

export default {
  name: 'BackofficeLayout',
  components: {
    UserMenu,
    LangSwitcher
  },
  mixins: [requiresAuth],
  data() {
    return {
      drawer: null
    }
  },
  computed: {
    ...mapState('app', ['user', 'settings'])
  },
  mounted() {
    realtime().ref('/_settings').on('value', (snapshot) => {
      this.setSettings(snapshot.val() || this.settings)
    })
  },
  beforeDestroy() {
    realtime().ref('/_settings').off()
  },
  methods: {
    ...mapMutations('app', {
      setSettings: 'SET_SETTINGS'
    })
  },
  head() {
    return {
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
}
</script>
