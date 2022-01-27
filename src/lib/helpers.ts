import { Contact, ErrorSeverity, ModifiedAlert } from "./types";

export const getAlerts = (contactList: Contact[]) => {

  let alertList: ModifiedAlert[] = [];

  for (let i = 0; i < contactList.length; i++) {

    const { _id, contactName, contactSatellite, contactDetail, contactBeginTimestamp, contactEndTimestamp, alerts } = contactList[i];

    if (alerts.length) {
      for (let j = 0; j < alerts.length; j++) {

        const { errorId, errorMessage, errorSeverity, errorTime } = alerts[j]

        const contactTime = new Date(contactBeginTimestamp - contactEndTimestamp);

        const newAlert: ModifiedAlert = {
          _id: _id,
          errorId: errorId,
          acknowledged: false,
          contactDetail,
          contactName,
          contactSatellite,
          contactTime,
          errorMessage,
          errorSeverity,
          errorTime
        };

        const newAlertList = [
          ...alertList,
          newAlert
        ]

        alertList = newAlertList;
      }
    }
  }
  return [...alertList];
}

const sortAlertsByTime = () => {
//   function countingSort(arr, min, max) {
//     var i, z = 0, count = [];
//     for (i = min; i <= max; i++) {
//         count[i] = 0;
//     }
//     for (i=0; i < arr.length; i++) {
//         count[arr[i]]++;
//     }
//     for (i = min; i <= max; i++) {
//         while (count[i]-- > 0) {
//             arr[z++] = i;
//         }
//     }
//     return arr;
// }
}