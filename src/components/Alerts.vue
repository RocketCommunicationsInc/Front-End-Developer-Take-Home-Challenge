<template>
  <div class="alerts">
    <AlertModal />
    <div class="table-header">
      <div class="table-title">
        <rux-icon size="normal" icon="antenna"></rux-icon>
        {{ alerts.length }} Active Alerts
      </div>
      <SeverityStats :stats="alertStats" />
    </div>
    <div class="alerts-list">
      <rux-table>
        <rux-table-header>
          <rux-table-header-row>
            <rux-table-header-cell></rux-table-header-cell>
            <rux-table-header-cell></rux-table-header-cell>
            <rux-table-header-cell>Contact</rux-table-header-cell>
            <rux-table-header-cell>Message</rux-table-header-cell>
            <rux-table-header-cell>Time</rux-table-header-cell>
          </rux-table-header-row>
        </rux-table-header>
        <rux-table-body>
          <rux-table-row
            v-for="alert in alerts"
            :selected.prop="alert.expanded"
            @click="() => toggleExpanded($event, alert)"
            :key="`alert-${alert.errorId}`"
          >
            <rux-table-cell>
              <rux-checkbox
                :name="`check-alert-${alert.errorId}`"
                :checked.prop="alert.selected"
                @ruxchange="() => changeSelection($event, alert)"
              ></rux-checkbox>
            </rux-table-cell>
            <rux-table-cell>
              <rux-status style="margin: auto;" :status="alert.errorSeverity"></rux-status>
            </rux-table-cell>
            <rux-table-cell>{{ alert.contactName }}</rux-table-cell>
            <rux-table-cell>{{ alert.errorMessage }}</rux-table-cell>
            <rux-table-cell>{{ alert.contactTime }}</rux-table-cell>
            <div class="table-drawer">
              {{ alert.longMessage }}
              <rux-button @click.stop="() => openModal($event, alert)">Show Details</rux-button>
            </div>
          </rux-table-row>
        </rux-table-body>
      </rux-table>
    </div>
    <div class="alerts-actions">
      <rux-button-group>
        <rux-button :disabled="!canAcknowledge">Acknowledge</rux-button>
      </rux-button-group>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex'

import { loadAlerts, sortBySeverity, loadSeverityStats } from '../helpers/index'
import SeverityStats from './SeverityStats.vue'
import AlertModal from './AlertModal.vue'

export default {
  name: 'grm-alerts',
  components: { SeverityStats, AlertModal },
  setup(props) {
    reactive(props)
    const store = useStore()
    const { state: { contacts }} = store

    const alerts = computed(() => {
      return sortBySeverity(loadAlerts(contacts), 'errorSeverity')
    })

    const alertStats = computed(() => {
      return loadSeverityStats(alerts.value, 'errorSeverity')
    })

    const canAcknowledge = computed(() => {
      return alerts.value.some(alert => alert.selected)
    })

    const changeSelection = (e, alert) => {
      store.commit('changeSelection', alert)
    }

    const toggleExpanded = (e, alert) => {
      store.commit('toggleExpanded', alert)
    }

    const openModal = (e, alert) => {
      store.commit('openAlertModal', alert)
    }

    return {
      alerts,
      alertStats,
      canAcknowledge,
      changeSelection,
      toggleExpanded,
      openModal
    }
  }
}
</script>

<style lang="scss" scoped>
  .alerts-list {
    max-height: calc(100vh - 14rem);
    overflow-y: scroll;
    margin: 0 0.5rem;
  }
  .alerts-actions {
    display: flex;
    justify-content: space-evenly;
    padding: 0.625rem 1rem;
  }
  rux-table-row {
    position: relative;
    .table-drawer {
      cursor: pointer;
      position: absolute;
      overflow: hidden;
      display: flex;
      justify-content: space-around;
      align-items: center;
      top: 2.5rem;
      left: 0;
      padding: 0;
      height: 0;
    }
    &.is-selected {
      height: 7rem;
      .table-drawer {
        height: auto;
        width: 100%;
        padding: 1rem 0;
      }
    }

  }
</style>