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
      }
    }
  },
  mutations: {
    initializeMock(state) {
      console.log('Loading Mock Contact Data')
      state.contacts = CONTACTS_DATA
    }
  }
});