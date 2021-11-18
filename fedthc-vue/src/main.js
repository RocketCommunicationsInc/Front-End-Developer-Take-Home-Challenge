import Vue from 'vue'
import App from './App.vue'
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import { RuxButton } from '@astrouxds/astro-web-components/dist/components/rux-button'
import { RuxTable } from '@astrouxds/astro-web-components/dist/components/rux-table'
import { RuxTableBody } from '@astrouxds/astro-web-components/dist/components/rux-table-body'
import { RuxTableRow } from '@astrouxds/astro-web-components/dist/components/rux-table-row'
import { RuxTableCell } from '@astrouxds/astro-web-components/dist/components/rux-table-cell'
import { RuxTableHeader } from '@astrouxds/astro-web-components/dist/components/rux-table-header'
import { RuxTableHeaderRow } from '@astrouxds/astro-web-components/dist/components/rux-table-header-row'
import { RuxTableHeaderCell } from '@astrouxds/astro-web-components/dist/components/rux-table-header-cell'
import { RuxModal } from '@astrouxds/astro-web-components/dist/components/rux-modal'

Vue.config.productionTip = false

customElements.define('rux-button', RuxButton)
customElements.define('rux-table', RuxTable)
customElements.define('rux-table-body', RuxTableBody)
customElements.define('rux-table-row', RuxTableRow)
customElements.define('rux-table-cell', RuxTableCell)
customElements.define('rux-table-header', RuxTableHeader)
customElements.define('rux-table-header-row', RuxTableHeaderRow)
customElements.define('rux-table-header-cell', RuxTableHeaderCell)
customElements.define('rux-modal', RuxModal)

Vue.config.ignoredElements = [/rux-\w*/]

new Vue({
  render: h => h(App),
}).$mount('#app')
