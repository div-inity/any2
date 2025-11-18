import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import css from './styles/main.css'
import globals from './globals.js'

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(css)
  .mixin(globals)
  .mount('#app')
