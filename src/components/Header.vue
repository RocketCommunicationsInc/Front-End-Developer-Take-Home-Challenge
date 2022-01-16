<template>
  <rux-global-status-bar v-bind="statusBarProps">
    <div style="display: flex; align-items: center; justify-content: space-evenly; flex-grow: 2">
      <rux-clock></rux-clock>
      <rux-monitoring-icon icon="altitude" label="Monitoring"></rux-monitoring-icon>
    </div>
  </rux-global-status-bar>
</template>

<script>
export default {
  name: 'grm-header',
  setup() {
    return {
      statusBarProps: {
        'app-domain': 'GRM',
        'app-name': 'Dashboard',
        'include-icon': true,
        'username': 'JDoe',
      }
    }
  }
}
</script>