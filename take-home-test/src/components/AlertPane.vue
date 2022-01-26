<template>
  <div class="alert-pane">
    <div class="alert-header">
      <div class="alert-sorts">
        <!-- TODO: looks like these components just take init and emit, but no v-model (i cant figure out how to make rux-select update its model) -->
        <rux-select
          label="Sort By"
          input-id="2"
          label-id="2"
          :value="activeSortOrder"
          @ruxchange="resort($event.target.value)"
        >
          <rux-option
            v-for="option in sortOptions"
            :key="option.label"
            :value="option.value"
            :label="option.label"
          ></rux-option>
        </rux-select>
      </div>
    </div>
    <AlertList
      :alerts="this.alerts"
      @select-clicked="toggleSelected"
      @show-details-clicked="showDetails"
    />
  </div>
</template>
<script>
// TODO: temp - this should be moved closer to backend
import rawContactsWithAlerts from "../../../data.json";
import AlertList from "@/components/AlertList";
export default {
  name: "AlertPane",
  components: {
    AlertList,
  },
  data: () => ({
    alerts: [],
    sortOptions: [
      { label: "Time", value: "errorTime" },
      { label: "Severity", value: "errorSeverity" },
    ],
    activeSortOrder: "errorTime",
    severityOrder: [
      "critical",
      "serious",
      "warning", // 1 found in data.json - https://www.astrouxds.com/components/status-symbol/ maps it to 'serious'
      "caution",
      "normal",
      "standby",
      "off",
      // undefined,
    ],
  }),
  created() {
    console.debug(`${this.$options.name}.created`);
    this.init();
  },
  watch: {},
  computed: {
    // TODO: vuex store
    getAlertList() {
      const sortOrder = this.activeSortOrder;
      const sortCompareMap = {
        errorTime: (a, b) => {
          if (a.errorTime > b.errorTime) {
            return -1;
          }
          if (a.errorTime < b.errorTime) {
            return 1;
          }
          return 0;
        },
        errorSeverity: (a, b) => {
          if (
            this.severityOrder.indexOf(a.errorSeverity) <
            this.severityOrder.indexOf(b.errorSeverity)
          ) {
            return -1;
          }
          if (
            this.severityOrder.indexOf(a.errorSeverity) >
            this.severityOrder.indexOf(b.errorSeverity)
          ) {
            return 1;
          }
          if (a.errorTime > b.errorTime) {
            return -1;
          }
          if (a.errorTime < b.errorTime) {
            return 1;
          }
          return 0;
        },
      };

      let facetedAlerts = this.getRawAlerts;

      facetedAlerts.sort(sortCompareMap[sortOrder]);

      // TODO: should this transform data (timestamp maths) to consumer or AlertList?
      return facetedAlerts;
    },
    // TODO: vuex store - init
    getRawAlerts() {
      // TODO: rawAlerts will emulate the api response
      let rawAlerts = rawContactsWithAlerts
        .map((contact) =>
          contact.alerts.map((alert) => ({
            // contactId: contact.contactId, // I could just add the contact data directly...
            contactName: contact.contactName,
            contactDetail: contact.contactDetail,
            ...alert,
          }))
        )
        .reduce((acc, curVal) => acc.concat(curVal), []);

      // tweak raw data for a richer dataset
      let severityChanged = {};
      rawAlerts = rawAlerts.map((alert) => {
        // const randomized = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        const randomized = Math.floor(100 + Math.random() * 900);
        alert.errorId = alert.errorId.concat(randomized);
        const changedCount = severityChanged[alert.errorSeverity];
        if (changedCount) {
          if (changedCount > 2) {
            return alert;
          }
          severityChanged[alert.errorSeverity] += 1;
          return { ...alert, new: true };
        }
        severityChanged[alert.errorSeverity] = 1;
        return { ...alert, new: true };
      });
      return rawAlerts;
    },
  },
  methods: {
    toggleSelected(alert) {
      console.log(`toggleSelected: ${alert}`);
    },
    showDetails(alert) {
      console.log(`showDetails: ${alert}`);
    },
    init() {
      this.alerts = this.getAlertList;
    },

    // TODO: debating vuex mapMutations('RESORT') which should update alerts getter
    resort(sortOrder) {
      // TODO: more scalable for more sort options
      console.log(`resort: ${sortOrder}`);
      if (this.activeSortOrder === sortOrder) {
        return;
      }
      this.activeSortOrder = sortOrder;
      this.alerts = [...this.getAlertList];
    },
  },
};
</script>
