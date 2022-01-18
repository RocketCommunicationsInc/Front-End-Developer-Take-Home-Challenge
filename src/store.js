import { createStore } from 'vuex'

import { updateAlert } from './helpers'
import CONTACTS_DATA from '../data.json'

export const store = createStore({
  state() {
    return {
      contacts: [],
      filters: {
        contacts: null,
        alerts: null
      },
      sorting: {
        contacts: null,
        alerts: null
      },
      selection: {
        // TODO change from reference implementation to id storage with computed
        contact: null,
        alert: null
      },
      modals: {
        alert: false
      }
    }
  },
  mutations: {
    // Loads mock contact data from json to initialize store
    initializeMock(state) {
      console.log('Loading Mock Contact Data')
      const contacts = CONTACTS_DATA.map(contact => {
        // Initialize alerts 'new' property
        const alerts = contact.alerts.map(alert => ({ ...alert, new: true }))
        return { ...contact, alerts}
      })
      state.contacts = contacts
    },
    // Updates the selected alert within it's parent contact
    changeSelection(state, alert) {
      console.log('Changing selection for ', alert.errorId)
      updateAlert(state.contacts, alert, 'selected', !alert.selected)
    },
    // Updates the selected alert within it's parent contact
    toggleExpanded(state, alert) {
      console.log('Toggling expanded details for ', alert.errorId)
      updateAlert(state.contacts, alert, 'expanded', !alert.expanded)
    },
    openAlertModal(state, alert) {
      console.log('Opening alert modal for ', alert.errorId)
      state.modals.alert = true
      state.selection.alert = alert
    },
    dismissModal(state) {
      console.log('Closing alert modal')
      state.modals.alert = false
      state.selection.alert = null
    },
    acknowledgeAlert(state) {
      const { alert } = state.selection
      console.log('Acknowledging alert ', alert.errorId)
      if(alert && alert.new) {
        updateAlert(state.contacts, alert, 'new', false)
        updateAlert(state.contacts, alert, 'expanded', false)
      }
    },
    acknowledgeSelection(state) {
      console.log('Acknowledging all selected alerts')
      state.contacts.forEach(contact => {
        contact.alerts.forEach(alert => {
          if(alert.selected) {
            alert.new = false
            alert.selected = false
          }
        })
      })
    }
  }
});