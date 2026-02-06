import { createApp } from 'vue'
import { createGtag } from 'vue-gtag'
import App from './App.vue'

const app = createApp(App)

app.use(createGtag({
  tagId: 'G-XXXXXXXXXX',
}))

app.mount('#app')
