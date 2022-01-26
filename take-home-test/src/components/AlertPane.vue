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
import AlertList from "@/components/AlertList";
export default {
  name: "AlertPane",
  components: {
    AlertList,
  },
  data: () => ({
    alerts: [
      {
        // TODO: there are duplicate ids - need to uniquify
        errorId: "d3472160-9d02-5f20-95ee-772c02a6233a",
        errorTime: 1542134427946,
        errorSeverity: "critical",
        errorMessage: "Red FEP 124 - Offline",
        contactTime: "cBTs-cETs",
        contactName: 64900,
        // TODO: this is false for all alerts - need to transform raw
        new: true,
        // TODO: rux-modal - from contact (parent) context - i can either wire a getter to get the props from the parent for each alert, OR alertList getter should add them to the alert, but duped data...
        contactSatellite: "USA-256",
        contactDetail:
          "Lorem esse proident exercitation ad commodo fugiat consectetur laborum.",
      },
    ],
  }),
  created() {
    console.debug(`${this.$options.name}.created`);
  },
  watch: {},
  computed: {},
  methods: {
    toggleSelected(alert) {
      console.log(`toggleSelected: ${alert}`);
    },
    showDetails(alert) {
      console.log(`showDetails: ${alert}`);
    },
  },
};
</script>
