import moment from 'moment'

export const severityScale = ['critical', 'serious', 'caution', 'normal', 'standby', 'off']

// Loads array of alert data from contacts, adds some contact props
export const loadAlerts = contacts => {
  return contacts.map(({
    alerts,
    contactId,
    contactName,
    contactBeginTimestamp,
    contactEndTimestamp,
    contactSatellite,
    contactDetail
  }) => alerts.map(alert => ({
    ...alert,
    contactId,
    contactName,
    contactTime: moment(contactEndTimestamp - contactBeginTimestamp).format('h:mm:ss'),
    contactSatellite,
    contactDetail
  }))).flat()
}

export const sortByNew = (collection) => {
  return collection.sort((a, b) => b.new - a.new)
}

// For Sorting collections by severity props
export const sortBySeverity = (collection, prop, scale = severityScale) => {
  return collection.sort((a, b) => {
    return scale.indexOf(a[prop]) - scale.indexOf(b[prop])
  })
}

// For Sorting collections by severity props
export const sortByTime = (collection) => {
  return collection.sort((a, b) => {
    return b.errorTime - a.errorTime
  })
}

export const loadSeverityStats = (collection, prop, scale = severityScale) => {
  const stats = {}
  scale.forEach(statusType => {
    stats[statusType] = 0
  })
  collection.forEach(item => {
    stats[item[prop]] += 1
  })
  return stats
}

export const getAlert = (contacts, alert) => {
  const contactMatch = contacts.find(contact => contact.contactId === alert.contactId)
  // Find the alert on the contact
  return contactMatch.alerts.find(a => a.errorId === alert.errorId)
}

export const updateAlert = (contacts, alert, propName, newValue) => {
  getAlert(contacts, alert)[propName] = newValue
}

export const getRandomSuffix = (n = 1000000) => {
  return Math.floor((Math.random()*n)+1)
}