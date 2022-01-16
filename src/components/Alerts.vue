<template>
  <section class="alerts" v-if="alerts.length > 0">
    <div class="table-header">
      <rux-icon size="normal" icon="antenna"></rux-icon>
      <h2>{{ alerts.length }} Active Alerts</h2>
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
        <rux-table-row v-for="alert in alerts" :key="`alert-${alert.errorId}`">
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
</template>

<script>
export default {
  name: 'grm-alerts',
  props: {
    alerts: {
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