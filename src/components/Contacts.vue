<template>
  <section class="contacts" v-if="contacts.length > 0">
    <div class="table-header">
      <rux-icon size="normal" icon="satellite-transmit"></rux-icon>
      <h2>{{ contacts.length }} Contacts</h2>
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
  </section>
</template>

<script>
export default {
  name: 'grm-contacts',
  props: {
    contacts: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup() {
    
  }
}
</script>