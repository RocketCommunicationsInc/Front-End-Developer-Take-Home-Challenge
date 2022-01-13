<template>
  <div class="alerts">
    <div id="alertData"></div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { Grid } from 'ag-grid-community'

const columnDefs = [
  { headerName: 'Select', field: 'selected' },
  { headerName: 'Message', field: 'errorMessage' },
  { headerName: 'Category', field: 'errorCategory' },
  { headerName: 'Time', field: 'errorTime' },
]

export default {
  name: 'grm-alerts',
  props: {
    alerts: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props) {
    reactive(props);

    const gridOptions = {
      columnDefs,
      rowData: props.alerts,
    }

    console.log('Grid Options', gridOptions)
    new Grid(document.querySelector('#alertData'), gridOptions)

    return {
      
    }
  }
}
</script>