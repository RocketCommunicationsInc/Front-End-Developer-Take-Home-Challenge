<template>
  <div class="contacts">
    <div class="table-header">
      <div class="table-title">
        <rux-icon size="normal" icon="satellite-transmit"></rux-icon>
        {{ contacts.length }} Contacts
      </div>
      <SeverityStats :stats="contactStats" />
    </div>
    <div class="contacts-list">
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
          <rux-table-row v-for="contact in contacts" :key="`contact-${contact.contactId}`">
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
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'

import { loadSeverityStats } from '../helpers'

import SeverityStats from './SeverityStats.vue'

export default {
  name: 'grm-contacts',
  components: { SeverityStats },
  setup(props) {
    reactive(props)
    const store = useStore()
    const { state: { contacts }} = store

    const contactStats = computed(() => {
      return loadSeverityStats(contacts, 'contactStatus')
    })

    return {
      contacts,
      contactStats
    }
  }
}
</script>

<style lang="scss">
  .contacts-list {
    max-height: calc(100vh - 10rem);
    overflow-y: scroll;
    margin: 0 0.5rem;
  }
</style>