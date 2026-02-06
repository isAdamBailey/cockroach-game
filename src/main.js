import { createApp } from 'vue'
import { createGtag } from 'vue-gtag'
import i18n from '@/i18n.js'
import App from '@/App.vue'

const app = createApp(App)

app.use(i18n)

app.use(createGtag({
  tagId: 'G-E15R074S87',
}))

app.mount('#app')
