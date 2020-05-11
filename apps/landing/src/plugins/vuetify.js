import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#1976d2',
          secondary: '#26303d',
          accent: '#50749a',
          error: '#e06b6b',
          info: '#7da3bf',
          success: '#6bc56f',
          warning: '#ead11a'
        }
      }
    },
    icons: {
      iconfont: 'mdi'
    }
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
