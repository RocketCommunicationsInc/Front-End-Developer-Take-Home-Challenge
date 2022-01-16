import { createStore } from 'vuex'
import moment from 'moment'

import CONTACTS_DATA from '../data.json'
import { severityScale } from './config/index'

export const store = createStore({
  state() {
    return {
      config: {},
      contacts: [],
      alerts: [],
      stats: {
        contacts: {},
        alerts: {}
      }
    }
  },
  mutations: {
    loadConfig(state) {
      console.log('Loading Configuration')
      state.config = {
        severityScale
      }
    },
    initializeMock(state) {
      console.log('Loading Mock Contact Data')
      state.contacts = CONTACTS_DATA.sort((a, b) => {
        return severityScale.indexOf(a.contactStatus) - severityScale.indexOf(b.contactStatus)
      })
      // Load alerts from contacts, move to computed
      state.alerts = state.contacts.map(({
        alerts, contactId, contactName, contactBeginTimestamp: begin, contactEndTimestamp: end
      }) => alerts.map(alert => ({
        ...alert,
        contactId,
        contactName,
        contactTime: moment(end - begin).format('h:mm:ss'),
      }))).flat().sort((a, b) => {
        return severityScale.indexOf(a.errorSeverity) - severityScale.indexOf(b.errorSeverity)
      })

    },
    loadStats(state) {
      // Update values for SeverityStatus component
      severityScale.forEach(statusType => {
        state.stats.alerts[statusType] = 0
        state.stats.contacts[statusType] = 0
      })
      state.contacts.forEach(contact => {
        state.stats.contacts[contact.contactStatus] += 1
      })
      state.alerts.forEach(alert => {
        state.stats.alerts[alert.errorSeverity] += 1
      })
    }

  }
});