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
        <section class="alerts" v-if="resources.alerts.length > 0">
          <div class="table-header">
            <rux-icon size="normal" icon="antenna"></rux-icon>
            <h2>{{ resources.alerts.length }} Active Alerts</h2>
          </div>
          <rux-table>
            <rux-table-header>
              <rux-table-header-row>
                <rux-table-header-cell></rux-table-header-cell>
                <rux-table-header-cell></rux-table-header-cell>
                <rux-table-header-cell>Contact</rux-table-header-cell>
                <rux-table-header-cell>Message</rux-table-header-cell>
                <rux-table-header-cell>Category</rux-table-header-cell>
                <rux-table-header-cell>Time</rux-table-header-cell>
              </rux-table-header-row>
            </rux-table-header>
            <rux-table-body>
              <rux-table-row v-for="alert in resources.alerts" :key="`alert-${alert.errorId}`">
                <rux-table-cell>
                  <rux-checkbox :name="`check-alert-${alert.errorId}`" :checked="alert.selected"></rux-checkbox>
                </rux-table-cell>
                <rux-table-cell>
                  <rux-status style="margin: auto;" :status="alert.errorSeverity"></rux-status>
                </rux-table-cell>
                <rux-table-cell>{{ alert.contactName }}</rux-table-cell>
                <rux-table-cell>{{ alert.errorMessage }}</rux-table-cell>
                <rux-table-cell>{{ alert.errorCategory }}</rux-table-cell>
                <rux-table-cell>{{ alert.errorTime }}</rux-table-cell>
              </rux-table-row>
            </rux-table-body>
          </rux-table>
        </section>
        <section class="contacts">
          <div class="table-header">
            <rux-icon size="normal" icon="satellite-transmit"></rux-icon>
            <h2>{{ resources.contacts.length }} Contacts</h2>
          </div>
          <rux-table>
            <rux-table-header>
              <rux-table-header-row>
                <rux-table-header-cell></rux-table-header-cell>
                <rux-table-header-cell>Name</rux-table-header-cell>
                <rux-table-header-cell>GS</rux-table-header-cell>
                <rux-table-header-cell>Equipment String</rux-table-header-cell>
                <rux-table-header-cell>Status</rux-table-header-cell>
              </rux-table-header-row>
            </rux-table-header>
            <rux-table-body>
              <rux-table-row v-for="contact in resources.contacts" :key="`contact-${contact.contactId}`">
                <rux-table-cell>
                  <rux-status style="margin: auto;" :status="contact.contactStatus"></rux-status>
                </rux-table-cell>
                <rux-table-cell>{{ contact.contactName }}</rux-table-cell>
                <rux-table-cell>{{ contact.contactGround }}</rux-table-cell>
                <rux-table-cell>{{ contact.contactEquipment }}</rux-table-cell>
                <rux-table-cell>{{ contact.contactState }} (Step: {{ contact.contactStep }})</rux-table-cell>
              </rux-table-row>
            </rux-table-body>
          </rux-table>
        </section>
      </div>
      
    </rux-tab-panel>
  </rux-tab-panels>

</template>

<script>
import { reactive, onMounted } from 'vue'

import contacts from '../data.json'

const severityScale = ['critical', 'serious', 'caution', 'warning']
 
export default {
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
      }))).flat().sort((a, b) => {
        return severityScale.indexOf(a.errorSeverity) - severityScale.indexOf(b.errorSeverity)
      })
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

<style scoped lang="scss">
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