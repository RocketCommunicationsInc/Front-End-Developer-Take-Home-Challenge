import { ActionReducer, createReducer, on } from '@ngrx/store'
import { FetchStatus } from '@grmCommon/enums/status.enums'
import { addActiveContact, addContacts, fetchContacts, fetchContactsFailure, fetchContactsSuccess,
  removeActiveContact, saveCurrentPage, selectedStatus, sortContacts } from '@grmContacts/contacts.actions'
import { ContactsState, defaultContactsState } from '@grmContacts/contacts.state'
import { SortDirection } from '@grmCommon/enums/sort.enums'

/**
 * The contacts reducer
 */
export const contactsReducers: ActionReducer<ContactsState> = createReducer(
  defaultContactsState,
  on(fetchContacts, (state: ContactsState, { }) => ({
    ...state,
    fetchStatus: FetchStatus.fetching
  })),
  on(fetchContactsSuccess, (state: ContactsState, { contacts }) => {
    // Build the status list and filter the duplicates
    let statusList: string[] = contacts.map(contact => contact.contactStatus)
    statusList = statusList.filter((status, index) => statusList.indexOf(status) === index)

    return ({
      ...state,
      contacts,
      statusList,
      fetchStatus: FetchStatus.fetchSuccess
    })
  }),
  on(fetchContactsFailure, (state, { error, message }) => ({
    ...state,
    error,
    errorMessage: message,
    fetchStatus: FetchStatus.fetchFailed
  })),
  on(addActiveContact, (state, { contactId }) => ({
    ...state,
    activeContacts: state.activeContacts.concat(contactId)
  })),
  on(removeActiveContact, (state, { contactId }) => ({
    ...state,
    activeContacts: state.activeContacts.filter(_contactId => _contactId !== contactId)
  })),
  on(sortContacts, (state, { column }) => ({
    ...state,
    sortColumn: column,
    sortDirection: (state.sortDirection === SortDirection.desc) ? SortDirection.asc : SortDirection.desc
  })),
  on(addContacts, (state, { contacts }) => ({
    ...state,
    contacts: state.contacts?.concat(contacts)
  })),
  on(saveCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page
  })),
  on(selectedStatus, (state, { status }) => ({
    ...state,
    selectedStatus: status
  }))
)
