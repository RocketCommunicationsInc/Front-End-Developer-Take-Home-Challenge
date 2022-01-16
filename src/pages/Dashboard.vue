<template>
  <div class="layout">
    <Alerts></Alerts>
    <Contacts></Contacts>
  </div>
</template>

<script>
import Alerts from '../components/Alerts.vue'
import Contacts from '../components/Contacts.vue'

export default {
  name: 'grm-dashboard',
  components: { Alerts, Contacts },
  setup() {

    return {

    }
    
  },
}
</script>

<style lang="scss">
  .layout {
    display: grid;
    grid-template-columns: minmax(42rem, 28%) auto;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
        "alerts contacts"
        "alerts contacts";
    .alerts {
      grid-area: alerts;
    }
    .contacts {
      grid-area: contacts;
    }
  }
  
  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem 1rem;
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