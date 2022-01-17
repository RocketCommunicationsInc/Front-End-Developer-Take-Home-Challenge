import moment from 'moment'

export const severityScale = ['critical', 'serious', 'caution', 'normal', 'standby', 'off']

// Loads array of alert data from contacts, adds some contact props
export const loadAlerts = contacts => {
  return contacts.map(({
    alerts, contactId, contactName, contactBeginTimestamp, contactEndTimestamp
  }) => alerts.map(alert => ({
    ...alert,
    contactId,
    contactName,
    contactTime: moment(contactEndTimestamp - contactBeginTimestamp).format('h:mm:ss'),
  }))).flat()
}

// For Sorting collections by severity props
export const sortBySeverity = (collection, prop, scale = severityScale) => {
  return collection.sort((a, b) => {
    return scale.indexOf(a[prop]) - scale.indexOf(b[prop])
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