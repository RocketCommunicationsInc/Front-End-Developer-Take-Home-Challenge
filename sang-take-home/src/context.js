import React, { useState, useEffect, useContext } from 'react';
import data from './data.json';
import { v4 as uuid } from 'uuid';

// *********** Note to Reviewiers ***********
// Throughout the app, I definitely could've made more files(components and helpers)
// to differentiate them but I decided to keep them in the same place since the app
// wasn't too large, and for easier viewing

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [grmData, setGRMData] = useState(data);
  const [alertList, setAlertList] = useState([]);
  const [nonAlertList, setNonAlertList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [severityList, setSeverityList] = useState(null);

  const getContactsWithAlerts = () => {
    // massaging the data to get the only things I need from the the json data
    const alertsData = grmData
      .filter((contact) => {
        // picking contacts with alert(s) only
        return contact.alerts.length > 0;
      })
      .map((contact) => {
        const {
          _id,
          contactName,
          contactDetail,
          contactSatellite,
          contactBeginTimestamp,
          contactEndTimestamp,
        } = contact;
        return contact.alerts.map((alert) => {
          alert.alertId = uuid();
          const { errorMessage, errorSeverity, errorTime, alertId } = alert;
          // picking out only the relevant items for the construction of the new object.
          return {
            _id,
            alertId,
            contactDetail,
            contactSatellite,
            contactName,
            contactBeginTimestamp,
            contactEndTimestamp,
            errorMessage,
            errorSeverity,
            errorTime,
          };
        });
      })
      .flat();

    // Noticed a pattern where the first few numbers of different errorTime(s) were the
    // same (e.g. started with 1542134...) and didn't want javascript to be unable to parse a large number.
    // Therefore I started comparing numbers towards the middle and the end
    const sortedAlertsData = alertsData.sort((a, b) => {
      const stringA = a.errorTime.toString();
      a = +stringA.slice(6, stringA.length);
      const stringB = b.errorTime.toString();
      b = +stringB.slice(6, stringB.length);
      return b - a;
    });
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
    let organizedAlertList = [];
    // organizing alert list from most severe to least severe "critical" -> "caution"
    if (severityList) {
      let warningLevels = ['critical', 'serious', 'warning', 'caution'];
      while (warningLevels.length !== 0) {
        for (let i = 0; i < alertList.length; i++) {
          if (alertList[i].errorSeverity === warningLevels[0]) {
            organizedAlertList.push(alertList[i]);
          }
        }
        warningLevels = warningLevels.slice(1);
      }
      setAlertList(organizedAlertList);
      // organizing alert list from least severe to most severe "caution" -> "critical"
    } else if (!severityList) {
      let warningLevels = ['caution', 'warning', 'serious', 'critical'];
      while (warningLevels.length !== 0) {
        for (let i = 0; i < alertList.length; i++) {
          if (alertList[i].errorSeverity === warningLevels[0]) {
            organizedAlertList.push(alertList[i]);
          }
        }
        warningLevels = warningLevels.slice(1);
      }
      setAlertList(organizedAlertList);
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
* Make a state for the contact with alerts
* Make another state for contact without alerts

* By default loading, the most recent alerts should be at the top

* create an option to allow the user to view the severity
*/
