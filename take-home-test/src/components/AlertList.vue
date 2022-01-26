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
        <!-- :key="`${index}.${alert.errorId}`" -->
        <rux-table-cell>
          <rux-checkbox
            v-if="alert.new"
            :name="alert.new"
            :value="alert.new"
            @ruxchange="$emit('select-clicked', alert.errorId)"
          />
        </rux-table-cell>
        <rux-table-cell> {{ alert.errorTime }} </rux-table-cell>
        <rux-table-cell>
          <rux-status
            style="margin: auto"
            :status="statusIconMap[alert.errorSeverity] || alert.errorSeverity"
          ></rux-status>
        </rux-table-cell>
        <rux-table-cell> {{ alert.errorMessage }} </rux-table-cell>
        <rux-table-cell> {{ alert.contactName }} </rux-table-cell>
        <rux-table-cell> {{ alert.contactTime }} </rux-table-cell>
        <rux-table-cell>
          <rux-button @click="$emit('show-details-clicked', alert.errorId)">
            <!-- <rux-icon icon="details" size="extra-small"></rux-icon> -->
            Show Details
          </rux-button>
        </rux-table-cell>
      </rux-table-row>
    </rux-table-body>
  </rux-table>
</template>
<script>
export default {
  name: "AlertList",
  components: {},
  props: {
    alerts: { type: Array },
  },
  data: () => ({
    // TODO: acknowledged 'select all' button and rows have checkbox (2-step needed)
    // tableHeaders: [{name: 'Time', key: 'errorTime'}],
    tableHeaders: [
      // "Select All",
      "",
      "time",
      "",
      "message",
      "contactName",
      "contactTime",
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
  methods: {},
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
