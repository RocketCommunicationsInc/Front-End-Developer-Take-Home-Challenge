<template>
  <div class="alert-pane">
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
  }),
  created() {
    console.debug(`${this.$options.name}.created`);
    this.init();
  },
  watch: {},
  computed: {
    // TODO: move this to the store
    // TODO: when moved to the store, remove params - store will manage sorts/filters
    getAlertList() {
      let facetedAlerts = this.getRawAlerts;

      // TODO: apply mutators

      // TODO: should this transform data (timestamp maths) to consumer or an alert component?
      return facetedAlerts;
    },
    // TODO: this should be stored so i dont have to reprocess with different random numbers
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
  },
};
</script>
