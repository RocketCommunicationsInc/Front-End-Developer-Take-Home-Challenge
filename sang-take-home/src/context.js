import React, { useState, useEffect, useContext } from 'react';
import data from './data.json';
import { v4 as uuid } from 'uuid';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [grmData, setGRMData] = useState(data);
  const [alertList, setAlertList] = useState([]);
  const [nonAlertList, setNonAlertList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [alertCount, setAlertCount] = useState(0);
  // const [severityList, setSeverityList] = useState(['a', 'b', 'c', 'd']);
  const [severityList, setSeverityList] = useState(null);

  // need 2 sort methods
  // 1. sort by error time
  // 2. sort by severity
  // 3. still have to factor in ack / unack

  // let severityRank = {
  //   "severe": 0,
  //   // ...
  // }

  const getContactsWithAlerts = () => {
    /* note about massaging the data to have create an array
    with objects with ONLY the details I need 
    */
    let alertsData = grmData
      .filter((contact) => {
        // picking contacts with alert(s) only
        return contact.alerts.length > 0;
      })
      .map((contact) => {
        const {
          _id,
          contactName,
          contactSatellite,
          contactDetail,
          contactBeginTimestamp,
          contactEndTimestamp,
        } = contact;
        return contact.alerts.map((alert) => {
          alert.alertId = uuid();
          const { errorMessage, errorSeverity, errorTime, alertId } = alert;
          return {
            // picking out only the relevant items for the construction of data
            errorSeverity,
            _id,
            alertId,
            contactName,
            contactSatellite,
            contactDetail,
            contactBeginTimestamp,
            contactEndTimestamp,
            errorMessage,
            errorTime,
          };
        });
      })
      .flat();
    // array.flatten before you sort
    // alertsData = alertsData.flat();
    // console.log(alertsData);

    /*old way of injecting id into the alert object
    let alertsData = grmData.filter((data) => data.alerts.length !== 0);
    // Injecting my own ID into each of the alerts object
    alertsData.forEach((contact) => {
      if (contact.alerts.length > 1) {
        contact.alerts.forEach((alert) => {
          alert.id = uuid();
        });
      } else {
        contact.alerts[0].id = uuid();
      }
    });
    */

    let sortedAlertsData = alertsData.sort((a, b) => {
      let stringA = a.errorTime.toString();
      a = +stringA.slice(6, stringA.length);
      let stringB = b.errorTime.toString();
      b = +stringB.slice(6, stringB.length);
      // if b-a == 0 {
      //   return severityRank[b.rank] - severityrank[a.rank]
      // }
      return b - a;
    });

    // console.log('Viewing ID for each alerts', sortedAlertsData);
    setAlertList(sortedAlertsData);
  };

  const getContactsWithNoAlerts = () => {
    const nonAlertsData = grmData
      .filter((data) => data.alerts.length === 0)
      .slice(0, 100);
    setNonAlertList(nonAlertsData);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalInfo = (contactSatellite, contactDetail) => {
    setModalContent({
      contactSatellite,
      contactDetail,
    });
  };

  const singleAcknowledge = (_id, alertId) => {
    // let newAlertList = [];
    // for (let i = 0; i < alertList.length; i++) {
    //   if (alertList[i].alerts.length === 1 && alertList[i]._id === _id) {
    //     continue;
    //   } else if (alertList[i].alerts.length > 1 && alertList[i]._id === _id) {
    //     let newAlerts = [];
    //     for (let j = 0; j < alertList[i].alerts.length; j++) {
    //       if (alertList[i].alerts[j].id !== id) {
    //         newAlerts.push(alertList[i].alerts[j]);
    //       }
    //     }
    //     alertList[i].alerts = newAlerts;
    //   } else {
    //     newAlertList.push(alertList[i]);
    //   }
    // }
    // console.log('Acknowledge Update', newAlertList);
    // setAlertList(newAlertList);
    setAlertList(alertList.filter((alert) => alert.alertId !== alertId));
  };

  const handleSeverityChange = () => {
    if (severityList === null) {
      setSeverityList(true);
    } else {
      setSeverityList(!severityList);
    }
  };

  const organizeSeverity = () => {
    let newAlertList = [];
    if (severityList) {
      let warningLevels = ['critical', 'serious', 'warning', 'caution'];
      while (warningLevels.length !== 0) {
        for (let i = 0; i < alertList.length; i++) {
          if (alertList[i].errorSeverity === warningLevels[0]) {
            newAlertList.push(alertList[i]);
          }
        }
        warningLevels = warningLevels.slice(1);
      }
      console.log(newAlertList);
      setAlertList(newAlertList);
    } else if (!severityList) {
      let warningLevels = ['caution', 'warning', 'serious', 'critical'];
      while (warningLevels.length !== 0) {
        for (let i = 0; i < alertList.length; i++) {
          if (alertList[i].errorSeverity === warningLevels[0]) {
            newAlertList.push(alertList[i]);
          }
        }
        warningLevels = warningLevels.slice(1);
      }
      console.log(newAlertList);
      setAlertList(newAlertList);
    }
  };

  useEffect(() => {
    getContactsWithAlerts();
    getContactsWithNoAlerts();
  }, []);

  useEffect(() => {
    if (severityList === true || severityList === false) {
      organizeSeverity();
    }
  }, [severityList]);

  return (
    <AppContext.Provider
      value={{
        alertList,
        nonAlertList,
        isModalOpen,
        openModal,
        closeModal,
        modalInfo,
        modalContent,
        singleAcknowledge,
        handleSeverityChange,
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
