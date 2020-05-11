<template>
  <div>
    <v-card class="pa-2">
      <h3>{{ $t('dashboard.logged') }}</h3>
      <pre>{{ user }}</pre>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'backoffice',
  computed: {
    ...mapState('app', ['user'])
  }
}
</script>
