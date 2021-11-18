<template>
<div class="alerts">
  <div class="alerts-table">
    <rux-table>
      <rux-table-header class="sticky">
        <rux-table-header-row>
          <rux-table-header-cell>
            Alert message
          </rux-table-header-cell>
          <rux-table-header-cell>
            Contact name
          </rux-table-header-cell>
          <rux-table-header-cell>
            Contact time
          </rux-table-header-cell>
          <rux-table-header-cell></rux-table-header-cell>
        </rux-table-header-row>
      </rux-table-header>
      <rux-table-body>
        <rux-table-row class="alert-row" v-for="alert in orderedAlerts" :key="alert.id" @click="selectAlert(alert)" :selected="isAlertSelected(alert)">
          <rux-table-cell>
            {{alert.errorMessage}}
          </rux-table-cell>
          <rux-table-cell>
            {{alert.contact.contactName}}
          </rux-table-cell>
          <rux-table-cell>
            {{timeFormat(alert.elapsed)}}
          </rux-table-cell>
          <rux-table-cell>
            <rux-button v-if="isAlertSelected(alert)" @click="openDetailsModal(alert)" primary="true">View Details</rux-button>
          </rux-table-cell>
        </rux-table-row>
      </rux-table-body>
    </rux-table>
  </div>
  <rux-modal @ruxmodalclosed="onModalClose" :open="isModalOpen" confirm-text="Close" deny-text="" :modal-message="contactDetail" :modal-title="contactSatellite"></rux-modal>
</div>
  
</template>

<script>
import { timeFormat } from '@/util/timeFormat.js'

export default {
  name: 'Alerts',
  props: {
    alerts: Array
  },
  data: function() {
    return {
      isModalOpen: false,
      contactDetail: '',
      contactSatellite: '',
      selectedAlert: {}
    }
  },
  computed: {
    orderedAlerts: function () {
      return this.alerts.slice().sort((a, b) => {
        return a.errorTime < b.errorTime;
      })
    }
  },
  methods: {
    timeFormat,
    selectAlert(alert) {
      this.selectedAlert = alert;
    },
    isAlertSelected(alert) {
      return alert.id === this.selectedAlert.id;
    },
    openDetailsModal(alert) {
      this.contactSatellite = alert.contact.contactSatellite;
      this.contactDetail = alert.contact.contactDetail;
      this.isModalOpen = true;
    },
    onModalClose() {
      this.isModalOpen = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.alerts {
  overflow: scroll;
  .alerts-table {
    .sticky {
      position: sticky;
      top: 0;
      z-index: 2;
    }
    .alert-row {
      cursor: pointer;
    }  
  }
}
</style>
