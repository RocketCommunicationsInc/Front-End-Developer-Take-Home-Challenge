<template>
  <div class="layout">
    <Alerts :alerts="resources.alerts" :stats="stats.alerts"></Alerts>
    <Contacts :contacts="resources.contacts" :stats="stats.contacts"></Contacts>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import moment from 'moment'

import Alerts from '../components/Alerts.vue'
import Contacts from '../components/Contacts.vue'
import contacts from '../../data.json'

export default {
  name: 'grm-dashboard',
  components: { Alerts, Contacts },
  setup() {
    const resources = reactive({ contacts: [], alerts: [], stats: {} })
    const stats = reactive({ alerts: {}, contacts: {} })
    const severityScale = ['critical', 'serious', 'caution', 'warning', 'normal']

    onMounted(async () => {
      const alerts = contacts.map(({
        alerts, contactId, contactName, contactBeginTimestamp: begin, contactEndTimestamp: end
      }) => alerts.map(alert => ({
        ...alert,
        contactId,
        contactName,
        contactTime: moment(end - begin).format('h:mm:ss'),
      }))).flat()
      resources.contacts = contacts.sort((a, b) => {
        return severityScale.indexOf(a.contactStatus) - severityScale.indexOf(b.contactStatus)
      })
      resources.alerts = alerts.sort((a, b) => {
        return severityScale.indexOf(a.errorSeverity) - severityScale.indexOf(b.errorSeverity)
      })

      severityScale.forEach(state => {
        stats.alerts[state] = 0
        stats.contacts[state] = 0
      })
      alerts.forEach(alert => {
        stats.alerts[alert.errorSeverity] += 1
      })
      contacts.forEach(contact => {
        stats.contacts[contact.contactStatus] += 1
      })

      console.log(stats)
      console.log(resources)
    });


    return {
      resources,
      stats
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
    justify-content: space-between;
    padding: 0 1rem;
    gap: 1rem;
    .table-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.2rem;
      rux-icon {
        margin-right: 1rem;
      }
    }
  }

  rux-table-cell, rux-table-header-cell {
    cursor: pointer;
    padding: 0.45rem 0.5rem;
  }
  
</style>