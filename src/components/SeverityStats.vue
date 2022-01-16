<template>
  <ul>
    <li class="status-critical">
      {{ stats.critical }}
      <rux-status status="critical"></rux-status>
    </li>
    <li class="status-serious">
      {{ stats.serious }}
      <rux-status status="serious"></rux-status>
    </li>
    <li class="status-caution">
      {{ stats.caution }}
      <rux-status status="caution"></rux-status>
    </li>
    <li class="status-normal">
      {{ stats.normal }}
      <rux-status status="normal"></rux-status>
    </li>
  </ul>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'grm-severity-stats',
  props: {
    stats: {
      type: Object,
      default() {
        return {
          critical: 0,
          serious: 0,
          caution: 0,
          warning: 0,
          normal: 0
        }
      }
    }
  },
  setup(props) {
    reactive(props)
  }
}
</script>

<style lang="scss" scoped>

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    text-align: center;
    li {
      list-style: none;
      padding: 0.25rem 0.5rem;
      
      .status-critical {
        color: $colorCritical
      }
      .status-serious {
        color: $colorSerious
      }
      .status-caution {
        color: $colorCaution
      }
      .status-normal {
        color: $colorNormal
      }
    }
  }
</style>