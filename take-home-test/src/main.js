// main.js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Import Astro's base styles
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'

import {
  applyPolyfills,
  defineCustomElements,
} from '@astrouxds/astro-web-components/loader'

applyPolyfills().then(() => {
  defineCustomElements()
})

// Tell Vue to ignore all components defined in the astro-web-components package
Vue.config.ignoredElements = [/rux-\w*/]

new Vue({
  render: (h) => h(App),
}).$mount('#app')