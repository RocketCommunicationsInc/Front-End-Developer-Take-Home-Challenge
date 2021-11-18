<template>
  <div id="app">
    <Alerts :alerts="alerts" class="alerts" />
  </div>
</template>

<script>
import Alerts from './components/Alerts.vue';
import contacts from '@/assets/data.json';

export default {
  name: 'App',
  data: () => {
    return {
      alerts: []
    }
  },
  components: {
    Alerts
  },
  mounted () {
    let alerts = [];
    let id = 0;

    contacts.forEach(c => {
      c.alerts.forEach(a => {
        id++; // substituting our own ids because we have duplicate id values in the test data
        alerts.push({
          id,
          ...a,
          elapsed: c.contactEndTimestamp - c.contactBeginTimestamp,
          contact: c
        })
      })
    })

    this.alerts = alerts;
  }
}
</script>

<style scoped lang="scss">
  .alerts {
    max-width: 60rem;
    height: 40rem;
    margin: 0 auto 0 auto;
  }
</style>
