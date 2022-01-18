<template>
  <div class="stats">
    <rux-button
      v-for="level in scale"
      :key="`severity-${level}`"
      size="small"
      @click.stop="() => select($event, level)"
      :secondary="!(alertFilter === level)"
    >
      <span :class="level">{{ stats[level] }}</span>
      <rux-status :status="level"></rux-status>
    </rux-button>
    <rux-button
      size="small"
      v-if="alertFilter !== null"
      @click.stop="() => select($event, null)"
      secondary=""
    >
      <span>reset</span>
    </rux-button>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'

import { severityScale } from '../helpers'

export default {
  name: 'grm-severity-stats',
  emits: ['select'],
  props: {
    stats: {
      type: Object,
      default() {
        return {
          critical: 0,
          serious: 0,
          caution: 0,
          normal: 0
        }
      }
    }
  },
  setup(props) {
    reactive(props)
    const store = useStore()

    const scale = severityScale.filter(scale => props.stats[scale] > 0)

    const select = (e, filter) => {
      store.commit('changeAlertFilter', filter)
      console.log(store.state.filters)
    }

    const alertFilter = computed(() => {
      return store.state && store.state.filters.alerts
    })

    return {
      scale,
      select,
      alertFilter
    }
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