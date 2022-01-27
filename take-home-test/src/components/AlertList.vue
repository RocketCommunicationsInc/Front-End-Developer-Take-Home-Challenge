<template>
  <rux-table>
    <rux-table-header>
      <rux-table-header-row>
        <rux-table-header-cell
          v-for="(title, index) in tableHeaders"
          :key="index"
          >{{ title }}</rux-table-header-cell
        >
      </rux-table-header-row>
    </rux-table-header>
    <!-- TODO: make content scrollable -->
    <rux-table-body>
      <rux-table-row
        v-for="alert in alerts"
        :key="`${alert.errorId}`"
        :class="alert.new ? '' : 'acknowledged'"
      >
        <rux-table-cell>
          <rux-checkbox
            v-if="alert.new"
            :name="alert.new"
            :value="alert.errorId"
            :checked="isSelected(alert.errorId)"
            @ruxchange="$emit('select-clicked', $event.target)"
          />
        </rux-table-cell>
        <!-- <rux-table-cell> {{ alert.errorTime }} </rux-table-cell> -->
        <rux-table-cell>
          <rux-status
            style="margin: auto"
            :status="statusIconMap[alert.errorSeverity] || alert.errorSeverity"
          ></rux-status>
        </rux-table-cell>
        <rux-table-cell> {{ alert.errorMessage }} </rux-table-cell>
        <rux-table-cell> {{ alert.contactName }} </rux-table-cell>
        <rux-table-cell> {{ contactTime(alert) }} </rux-table-cell>
        <rux-table-cell>
          <rux-button @click="$emit('show-details-clicked', alert)">
            <!-- <rux-icon icon="details" size="extra-small"></rux-icon> -->
            Show Details
          </rux-button>
        </rux-table-cell>
      </rux-table-row>
    </rux-table-body>
  </rux-table>
</template>
<script>
/**
 * NOTE: would a rux-log be better? I overlooked it until today b/c I thought logs were a subset of icons in the docs tree: Icons > Log
 * Im noping trying to switch
 * Im also noping trying to brute force this rux-table to have a sticky header and footer.
 */
export default {
  name: "AlertList",
  components: {},
  props: {
    selectedAlerts: { type: Array },
    alerts: { type: Array },
  },
  data: () => ({
    // TODO: acknowledged 'select all' button and rows have checkbox (2-step needed)
    tableHeaders: [
      // "Select All",
      "",
      "",
      "Message",
      "Contact Name",
      "Time",
      "",
    ],
    statusIconMap: { warning: "serious" },
  }),
  created() {
    console.debug(`${this.$options.name}.created`);
  },
  watch: {},
  computed: {
    // TODO: format data here or from a getter?
  },
  methods: {
    isSelected(id) {
      return this.selectedAlerts.includes(id);
    },
    contactTime(alert) {
      const { contactBeginTimestamp, contactEndTimestamp } = alert;
      const timeLength = contactEndTimestamp - contactBeginTimestamp;
      const minutes = Math.floor(timeLength / 60);
      // TODO: just listing minutes as there are no seconds in the test data
      // const seconds = timeLength - minutes * 60;
      return `${minutes} min`;
    },
  },
};
</script>
<style>
rux-checkbox-group::part(label) {
  margin-bottom: 10px;
}
.acknowledged {
  /* TODO: this stomps on hover highlight */
  /* background-color: black; */
  color: black;
}
</style>
