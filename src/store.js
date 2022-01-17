import { createStore } from 'vuex'

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
      state.contacts = CONTACTS_DATA
    },
    // Updates the selected alert within it's parent contact
    changeSelection(state, alert) {
      console.log('Changing selection for ', alert.errorId)
      alert.selected = !alert.selected
      // Find contact with alert
      const contactMatch = state.contacts.find(contact => contact.contactId === alert.contactId)
      // Find the alert on the contact
      const alertMatch = contactMatch.alerts.find(a => a.errorId === alert.errorId)
      // Update the alert selected value on the contact
      alertMatch.selected = !alertMatch.selected
    },
    // Updates the selected alert within it's parent contact
    toggleExpanded(state, alert) {
      console.log('Toggling expanded details for ', alert.errorId)
      alert.selected = !alert.selected
      // Find contact with alert
      const contactMatch = state.contacts.find(contact => contact.contactId === alert.contactId)
      // Find the alert on the contact
      const alertMatch = contactMatch.alerts.find(a => a.errorId === alert.errorId)
      // Update the alert expanded value on the contact
      alertMatch.expanded = !alertMatch.expanded
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
      if(alert) {
        console.log(alert.new)
        alert.new = false
        console.log(alert.new)
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