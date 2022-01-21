const sortBasedOnErrorSeverity = (contacts, sortedField, isAscending) => {
    // copy contacts to new object
    const newContacts = { ...contacts }
    // sort contacts based on sortedField
    newContacts.alerts.sort((a, b) => {
        // allow ascending and descending sorting
        if (a[sortedField] < b[sortedField]) {
            return isAscending === true ? -1 : 1;
        }
        if (a[sortedField] > b[sortedField]) {
            return isAscending === true ? 1 : -1;
        }
        return 0;
    })
    return newContacts;
}

export { sortBasedOnErrorSeverity }