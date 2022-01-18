<template>
  <div class="stats">
    <rux-button size="small" secondary="">
      <span class="status-critical">{{ stats.critical }}</span>
      <rux-status status="critical"></rux-status>
    </rux-button>
    <rux-button size="small" secondary="">
      <span class="status-serious">{{ stats.serious }}</span>
      <rux-status status="serious"></rux-status>
    </rux-button>
    <rux-button size="small" secondary="">
      <span class="status-caution">{{ stats.caution }}</span>
      <rux-status status="caution"></rux-status>
    </rux-button>
    <rux-button size="small" secondary="">
      <span class="status-normal">{{ stats.normal }}</span>
      <rux-status status="normal"></rux-status>
    </rux-button>
  </div>
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

  .stats {
    margin: 0;
    padding: 0;
    display: flex;
    text-align: center;
    rux-button {
      list-style: none;
      padding: 0.25rem 0.15rem;
      
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