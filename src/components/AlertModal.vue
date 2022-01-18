<template>
  <div v-if="selectedAlert"
    style="display: flex; flex-flow: column; justify-content: center;">
    <rux-modal
      :open="modalIsOpen"
      :modal-title="`${selectedAlert.contactName}: ${selectedAlert.errorMessage}`"
      :modal-message="`
        ${selectedAlert.contactSatellite}
        ${selectedAlert.contactDetail}
      `"
      confirm-text="Acknowledge"
      deny-text="Cancel"
      @ruxmodalclosed="dismissModal"
    ></rux-modal>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex'

export default {
  name: 'grm-alert-modal',
  setup(props) {
    reactive(props)
    const store = useStore()
    const { state: { modals, selection }} = store

    const modalIsOpen = computed(() => {
      return modals && modals.alert
    })

    const dismissModal = (e) => {
      // If 'Acknowledge' selected
      if(e.detail) {
        store.commit('acknowledgeAlert')
      }
      store.commit('dismissModal')
    }

    const selectedAlert = computed(() => {
      return selection.alert
    })

    return {
      modalIsOpen,
      selectedAlert,
      dismissModal
    }
  },
}
</script>

<style scoped>
  rux-modal::part(message) {
    padding-bottom: 2rem;
  }
</style>