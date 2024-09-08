import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'
import router from './router'
import store from './store'
import style from './assets/style.css'
import 'material-icons/iconfont/material-icons.css';

const vuetify = createVuetify({
    components,
    directives,
  })

createApp(App)
.use(router)
.use(store)
.use(vuetify)
.use(style)
.mount('#app');
