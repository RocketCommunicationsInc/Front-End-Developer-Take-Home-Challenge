const massageData = (dataToMassage) => {
    const massagedObject = { alerts: [], contacts: {} };
    dataToMassage.forEach(contact => {
        //copy alerts plus extra data needed into alerts array to display only alerts
        if (contact.alerts.length > 0) {
            contact.alerts.map(alert => {
                massagedObject.alerts.push({
                    ...alert,
                    contactName: contact.contactName,
                    contactTime: contact.contactEndTimestamp - contact.contactBeginTimestamp,
                    contactID: contact._id,
                    acknowledge: false
                })
            })
        }
        // save contact info as id
        massagedObject.contacts[contact._id] = contact;
    })
    // sort alerts based on time
    massagedObject.alerts.sort((a, b) => b.errorTime - a.errorTime);
    return massagedObject;
}

export { massageData }