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
      <div>
        <span class="alert-count">
          {{ activeAlerts || "No" }}
        </span>
        active alerts
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
      :selectedAlerts="this.selectedAlerts"
      :alerts="this.alerts"
      @select-clicked="toggleSelected"
      @show-details-clicked="showDetails"
    />
    <rux-button @click="acknowledgeSelected" :disabled="!selectedAlerts.length">
      Acknowledge
    </rux-button>
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
    showModal: false,
    modalTitle: "",
    modalMessage: "",
    alerts: [],
    rawAlerts: [], // TODO: vuex?
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
    filterOptions: [], // key, checked, name, label, count
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

    // TODO: all below here are candidates for vuex store
    getAlertList() {
      const sortOrder = this.activeSortOrder;
      const filters = this.activeFilters;
      // TODO: optimization - if sort order is changed, can work with existing filtered list
      // TODO: i think i can make these templates in the store, then add isFiltered to each? i dont think functions can be observable?
      // TODO: this can be a map: new: {intersect: true, isFiltered... }, then severityOrder.forEach add props
      const filterOptions = [
        {
          key: "new",
          intersect: true,
          isFiltered: (alert) => alert.new === true,
        },
      ].concat(
        this.severityOrder.map((status) => {
          return {
            key: status,
            isFiltered: (alert) => alert.errorSeverity === status,
          };
        })
      );

      const filterMap = {
        new: {
          intersect: true,
          // TODO: TEMP - data.json alert.new = false - confusion
          // TODO: TEMP - there is one per status key
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
        const unionFilters = Object.keys(filterMap)
          .filter((key) => filters.includes(key) && !filterMap[key].intersect)
          .reduce((obj, key) => {
            obj[key] = filterMap[key];
            return obj;
          }, {});

        if (Object.entries(unionFilters).length) {
          facetedAlerts = facetedAlerts.filter((alert) => {
            if (
              Object.keys(unionFilters).some((key) =>
                unionFilters[key].isFiltered(alert)
              )
            ) {
              return true;
            }
            return false;
          });
        }

        // NOTE: this solution only works for one intersection filter.
        const intersectFilter = filterOptions.find(
          (option) => option.intersect && filters.includes(option.key)
        );
        if (intersectFilter) {
          facetedAlerts = facetedAlerts.filter((alert) =>
            intersectFilter.isFiltered(alert)
          );
        }
      }

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
            contactSatellite: contact.contactSatellite,
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
    // TODO: i hope i can consolidate templates for these datastructures, this is getting to be a mess
    getFacetedAlertCounts() {
      // TODO: faceted counts affected by intersect facet - this context? calling?
      // TODO: temp until moved to store - need to apply to unfiltered, then if new, apply new filter to count (fuuuuuuck)
      const alertList = this.rawAlerts || this.getRawAlerts;
      const facetCount = {};
      alertList.forEach((alert) => {
        // if this alert has a prop in the template
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
      if (name === "new") {
        this.filterOptions = [...this.getFilterOptions];
      }
      this.alerts = [...this.getAlertList];
    },
  },
};
</script>
