<template>
  <div class="alert-pane">
    <rux-modal
      :open="showModal"
      :modal-title="modalTitle"
      :modal-message="modalMessage"
      confirm-text="Ok"
      deny-text=""
      @ruxmodalclosed="showModal = false"
    >
    </rux-modal>
    <div class="alert-header">
      <div class="alert-summary">
        <span class="alert-count">
          {{ activeAlerts || "No" }}
        </span>
        New Alerts
      </div>
      <div class="alert-filters">
        <!-- TODO: ux tweaks? - [popup menu, scrollable content]  -->
        <!-- TODO: clear filters button -->
        <rux-checkbox-group label="Filters">
          <rux-checkbox
            v-for="option in filterOptions"
            :key="option.name"
            :checked="option.value ? true : false"
            :name="option.name"
            :value="option.value"
            @ruxchange="refilter($event.target)"
          >
            {{ option.label }}: {{ option.count || "none" }}
          </rux-checkbox>
        </rux-checkbox-group>
      </div>
      <div class="alert-sorts">
        <rux-select
          label="Sort By"
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
    <div class="alert-log">
      <AlertList
        style="max-height: 90vh"
        :selectedAlerts="this.selectedAlerts"
        :alerts="this.alerts"
        @select-clicked="toggleSelected"
        @show-details-clicked="showDetails"
      />
    </div>
    <div class="alert-actions">
      <rux-button
        @click="acknowledgeSelected"
        :disabled="!selectedAlerts.length"
      >
        Acknowledge
      </rux-button>
    </div>
  </div>
</template>
<script>
// TODO: temp - vuex?
import rawContactsWithAlerts from "../../../data.json";
import AlertList from "@/components/AlertList";

export default {
  name: "AlertPane",
  components: {
    AlertList,
  },
  data: () => ({
    showModal: false,
    modalTitle: "",
    modalMessage: "",
    alerts: [],
    rawAlerts: [], // TODO: temp optimization until vuex?
    selectedAlerts: [],
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
    filterOptions: [],
    activeFilters: ["new"],
  }),
  created() {
    console.debug(`${this.$options.name}.created`);
    this.init();
  },
  watch: {},
  computed: {
    activeAlerts() {
      return this.getFacetedAlertCounts.new;
    },
    getFilterOptions() {
      const alertCounts = this.getFacetedAlertCounts;
      const useNew = this.activeFilters.includes("new");
      console.log(alertCounts);
      const filterOptionsList = ["new"]
        .concat(this.severityOrder)
        .map((key) => {
          const option = {
            name: key,
            value: this.activeFilters.includes(key),
            label: key,
          };
          // TODO: eew
          if (alertCounts[key]?.count) {
            option.count = useNew
              ? alertCounts[key].new
              : alertCounts[key].count;
          } else {
            option.count = alertCounts[key];
          }
          return option;
        }, this)
        .filter((option) => option.name === "new" || option.count > 0);

      return filterOptionsList;
    },

    // TODO: all below here are candidates for vuex store, ants across the bridge first...
    getAlertList() {
      const sortOrder = this.activeSortOrder;
      const filters = this.activeFilters;

      // TODO: optimization - if only sort order is changed, can work with existing filtered list

      // TODO: these maps are static and should be moved to the appropriate context
      const filterMap = {
        new: {
          intersect: true,
          isFiltered: (alert) => alert.new === true,
        },
      };
      // disjoint sets
      this.severityOrder.forEach((status) => {
        filterMap[status] = {
          isFiltered: (alert) => alert.errorSeverity === status,
        };
      });
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

      let facetedAlerts = this.rawAlerts || this.getRawAlerts;

      if (filters.length) {
        const unionFilters = [];
        const intersectFilters = [];
        filters.forEach((key) => {
          const filter = filterMap[key];
          if (!filter) {
            return;
          }
          if (filter.intersect) {
            intersectFilters.push(filter);
          } else {
            unionFilters.push(filter);
          }
        });
        if (intersectFilters.length) {
          // TODO: optimization candidate if many filters
          intersectFilters.forEach((filter) => {
            facetedAlerts = facetedAlerts.filter((alert) =>
              filter.isFiltered(alert)
            );
          });
        }
        if (unionFilters.length) {
          facetedAlerts = facetedAlerts.filter((alert) => {
            if (unionFilters.some((filter) => filter.isFiltered(alert))) {
              return true;
            }
            return false;
          });
        }
      }

      facetedAlerts.sort(sortCompareMap[sortOrder]);

      // TODO: should this transform data (timestamp maths) to consumer or AlertList?
      return facetedAlerts;
    },
    // TODO: vuex store - init
    getRawAlerts() {
      let rawAlerts = rawContactsWithAlerts
        .map((contact) => {
          const {
            contactSatellite,
            contactName,
            contactDetail,
            contactBeginTimestamp,
            contactEndTimestamp,
          } = contact;
          return contact.alerts.map((alert) => ({
            contactSatellite,
            contactName, // this isnt informative
            contactDetail,
            contactBeginTimestamp,
            contactEndTimestamp,
            ...alert,
          }));
        })
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
    getFacetedAlertCounts() {
      const alerts = this.rawAlerts || this.getRawAlerts;
      const facetCount = {};
      alerts.forEach((alert) => {
        // TODO: context leak: this should be dynamically build from the filterMap
        const { new: unacknowledged, errorSeverity } = alert;
        if (unacknowledged) {
          facetCount.new = facetCount.new ? facetCount.new + 1 : 1;
        }
        if (errorSeverity) {
          if (!facetCount[errorSeverity]) {
            facetCount[errorSeverity] = {
              new: 0,
              count: 0,
            };
          }
          facetCount[errorSeverity].count += 1;
          if (unacknowledged) {
            facetCount[errorSeverity].new += 1;
          }
        }
      });
      return facetCount;
    },
  },
  methods: {
    toggleSelected(alert) {
      console.log(`toggleSelected: ${alert}`);
      const { checked, value: id } = alert;
      if (checked) {
        this.selectedAlerts.push(id);
      } else {
        this.selectedAlerts.splice(this.selectedAlerts.indexOf(id), 1);
      }
    },
    // beyond scope: persist b/t loads
    acknowledgeSelected() {
      this.selectedAlerts.forEach((id) => {
        const selectedIndex = this.rawAlerts.findIndex(
          (alert) => alert.errorId === id
        );
        this.rawAlerts.splice(selectedIndex, 1, {
          ...this.rawAlerts[selectedIndex],
          new: false,
        });
      });

      this.selectedAlerts = [];
      this.alerts = this.getAlertList;
      this.filterOptions = this.getFilterOptions;
    },
    showDetails(alert) {
      console.log(`showDetails: ${alert}`);
      this.modalTitle = `Satellite: ${alert.contactSatellite}`;
      this.modalMessage = `${alert.contactDetail}`;
      this.showModal = true;
    },
    init() {
      this.rawAlerts = this.getRawAlerts;
      this.alerts = this.getAlertList;
      this.filterOptions = this.getFilterOptions;
    },

    // TODO: debating vuex mapMutations([RESORT,REFILTER]) which should update alerts getter
    resort(sortOrder) {
      // TODO: more scalable for more sort options
      console.log(`resort: ${sortOrder}`);
      if (this.activeSortOrder === sortOrder) {
        return;
      }
      this.activeSortOrder = sortOrder;
      this.alerts = [...this.getAlertList];
    },
    refilter(filter) {
      const { checked, name } = filter;
      if (checked) {
        this.activeFilters.push(name);
      } else {
        this.activeFilters.splice(this.activeFilters.indexOf(name), 1);
      }
      // toggling 'new' filter updates other filter options
      if (name === "new") {
        this.filterOptions = [...this.getFilterOptions];
      }
      this.alerts = [...this.getAlertList];
    },
  },
};
</script>
<style scoped>
/* .alert-pane {
  height: 100%;
  min-height: 0px;
  overflow-y: scroll;
  overflow-x: hidden;
} */
.alert-header {
  padding: 1rem;
  display: flex;

  /* flex: none;
  flex-flow: row nowrap; */
}
.alert-summary {
  flex: 1 1 auto;
  display: flex;
  flex-flow: column nowrap;
  align-self: center;
  text-align: center;
}
.alert-count {
  font-size: 3rem;
  font-weight: 500;
}
.alert-filters,
.alert-sorts {
  padding: 1rem;
}
.alert-log {
  display: flex;
  flex-flow: column;
  overflow: hidden;
}
.alert-actions {
  display: flex;
  justify-content: center;
  padding: 2rem;

  /* flex: none;
  flex-wrap: wrap;
  border-top: 1px solid var(--logHeaderBackgroundColor, rgb(20, 32, 44));
  box-shadow: 0 -0.5rem 1.25rem rgb(0 0 0 / 25%);
  margin-top: auto;
  z-index: 1; */
}
</style>
