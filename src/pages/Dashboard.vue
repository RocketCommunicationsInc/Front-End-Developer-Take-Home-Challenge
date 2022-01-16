<template>
  <div class="layout">
    <Alerts :alerts="resources.alerts"></Alerts>
    <Contacts :contacts="resources.contacts"></Contacts>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'

import Alerts from '../components/Alerts.vue'
import Contacts from '../components/Contacts.vue'
import contacts from '../../data.json'

export default {
  name: 'grm-dashboard',
  components: { Alerts, Contacts },
  setup() {
    const resources = reactive({ contacts: [], alerts: [] })
    const severityScale = ['critical', 'serious', 'caution', 'warning']

    onMounted(async () => {
      const alerts = contacts.map(({
        alerts, contactId, contactName, contactBeginTimestamp, contactEndTimestamp
      }) => alerts.map(alert => ({
        ...alert,
        contactId,
        contactName,
        contactBeginTimestamp,
        contactEndTimestamp
      }))).flat().sort((a, b) => {
        return severityScale.indexOf(a.errorSeverity) - severityScale.indexOf(b.errorSeverity)
      })
      resources.contacts = contacts
      resources.alerts = alerts

      console.log(resources)
    });


    return {
      resources
    }
    
  },
}
</script>

<style lang="scss">
  .layout {
    display: flex;
    justify-content: space-between;
  }
  
  .table-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;
    gap: 1rem;
  }

  .contacts {
    flex-grow: 2;
  }

  rux-table-cell, rux-tab {
    cursor: pointer;
  }
</style>