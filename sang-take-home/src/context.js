import React, { useState, useEffect, useContext } from 'react';
import data from './data.json';
import { v4 as uuid } from 'uuid';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [grmData, setGRMData] = useState(data);
  const [alertList, setAlertList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [alertCount, setAlertCount] = useState(0);

  const getAlerts = () => {
    let alertsData = grmData.filter((data) => data.alerts.length !== 0);

    // Might not need this if errorIds are unique in the alerts
    // Post-Note: errorIds were not unique, therefore we have to use uuid to inject
    alertsData.forEach((contact) => {
      // console.log(contact.alerts.length);
      if (contact.alerts.length > 1) {
        contact.alerts.forEach((alert) => {
          alert.id = uuid();
        });
      } else {
        contact.alerts[0].id = uuid();
        // console.log(contact.alerts[0].id);
      }
    });

    let sortedAlertsData = alertsData.sort((a, b) => {
      let stringA = a.alerts[0].errorTime.toString();
      a = +stringA.slice(6, stringA.length);
      let stringB = b.alerts[0].errorTime.toString();
      b = +stringB.slice(6, stringB.length);
      return b - a;
    });

    // console.log checks for repeats _id in the contact
    // let repeatedId = [];
    // for(let i = 0; i < sortedAlertsData.length; i++) {
    //   if(!repeatedId.includes(sortedAlertsData[i]._id)) {
    //     repeatedId.push(sortedAlertsData[i]._id);
    //     console.log(repeatedId);
    //   } else {
    //     console.log('contains a repeat');
    //   }
    // }

    // console.log(alertsData);
    // sortedAlertsData.forEach((e) => {
    //   console.log(
    //     'Error Time',
    //     `${e.alerts[0].errorTime}`,
    //     `${e.alerts[0].errorMessage}`
    //   );
    // });
    console.log('Viewing ID for each alerts', sortedAlertsData);
    setAlertList(sortedAlertsData);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalInfo = (contactSatellite, contactDetail) => {
    console.log(contactSatellite, contactDetail);
    setModalContent({
      contactSatellite,
      contactDetail,
    });
  };

  const singleAcknowledge = (_id, id) => {
    console.log(id);
    // const newAlertList = alertList.map((alert) => {
    //   return alert.alerts.filter((individualAlert) => {
    //     return individualAlert.id !== id;
    //   });
    // });

    // const newAlertList = alertList.filter((individualAlert) => {
    //   if (individualAlert.alerts.length === 1 && individualAlert.alerts.id === id) {
    //     delete individualAlert.alerts;
    //   } else {
    //     return individualAlert.alerts.id !== id;
    //   }
    // });

    // let newAlertList = [];
    // for(let i = 0; i < alertList.length; i++) {
    //   // create another array for the collection of alerts array?
    //   if(alertList[i].alerts.length === 1 && alertList[i].alerts[0].id === id ) {
    //     continue;
    //   } else if(alertList.alerts.length > 1){
    //     for(let j = 0; j < alertList[i].alerts.length; j++) {
    //       if(alertList[i].alerts[j].id === id) {
    //         continue;
    //       } else {
    //         newAlertList.push(alertList[i].alerts[j]);
    //       }
    //     }
    //   } else {
    //     newAlertList.push(alertList[i]);
    //   }
    // }

    let newAlertList = [];
    for (let i = 0; i < alertList.length; i++) {
      // create another array for the collection of alerts array?
      if (alertList[i].alerts.length === 1 && alertList[i]._id === _id) {
        continue;
      } else if (alertList[i].alerts.length > 1 && alertList[i]._id === _id) {
        let newAlerts = [];
        for (let j = 0; j < alertList[i].alerts.length; j++) {
          if (alertList[i].alerts[j].id !== id) {
            newAlerts.push(alertList[i].alerts[j]);
          }
        }
        alertList[i].alerts = newAlerts;
      } else {
        newAlertList.push(alertList[i]);
      }
    }

    // next one to try alertList.filter((alert) => {alert.alerts.filters(() => {...})})
    // using contactName and id?
    console.log('Acknowledge Update', newAlertList);
    setAlertList(newAlertList);
  };

  useEffect(() => {
    getAlerts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        alertList,
        isModalOpen,
        openModal,
        closeModal,
        modalInfo,
        modalContent,
        singleAcknowledge,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

/*
* Out of the grmData, we need to check if there are alerts provided for
each data
* Make another state for the data with alerts
* Make another state for data without alerts

* By default loading, the most recent alerts should be at the top

* create an option to allow the user to view the severity

*/
