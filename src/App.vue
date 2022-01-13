<template>
  <rux-global-status-bar v-bind="statusBarProps">
    <div style="display: flex; align-items: center; justify-content: space-evenly; flex-grow: 2">
      <rux-tabs id="tab-set-id-1">
        <rux-tab id="tab-id-1">Contacts</rux-tab>
      </rux-tabs>
      <rux-clock></rux-clock>
      <rux-monitoring-icon icon="altitude" label="Monitoring"></rux-monitoring-icon>
    </div>
  </rux-global-status-bar>
    
  <rux-tab-panels aria-labelledby="tab-set-id-1">
    <rux-tab-panel aria-labelledby="tab-id-1">
      <div class="layout">
        <div class="alerts">
          <h2>Alerts</h2>
          <Alerts :alerts="resources.alerts"></Alerts>
        </div>
        <div class="contacts">
          <h2>Contacts</h2>
          <Contacts :contacts="resources.contacts"></Contacts>
        </div>
      </div>
      
    </rux-tab-panel>
  </rux-tab-panels>

</template>

<script>
import { reactive, onMounted } from 'vue'

import { Alerts, Contacts } from './components'
import contacts from '../data.json'


export default {
  components: { Alerts, Contacts },
  setup() {
    const resources = reactive({ contacts: [], alerts: [] })

    onMounted(async () => {
      const alerts = contacts.map(({
        alerts, contactId, contactName, contactBeginTimestamp, contactEndTimestamp
      }) => alerts.map(alert => ({
        ...alert,
        contactId,
        contactName,
        contactBeginTimestamp,
        contactEndTimestamp
      }))).flat()
      resources.contacts = contacts
      resources.alerts = alerts

      console.log(resources)
    });


    return {
      resources,
      statusBarProps: {
        'app-domain': 'GRM',
        'app-name': 'Dashboard',
        'include-icon': true,
        'username': 'JDoe',
      }
    }
    
  },
}
</script>

<style scoped>
  .layout {
    display: flex;
    justify-content: space-evenly;
  }
</style>