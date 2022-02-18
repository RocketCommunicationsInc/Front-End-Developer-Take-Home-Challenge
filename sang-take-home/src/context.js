import React, { useState, useEffect, useContext } from 'react';
import data from './data.json';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [grmData, setGRMData] = useState(data);
  const [alertList, setAlertList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [alertCount, setAlertCount] = useState(0);

  const getAlerts = () => {
    let alertsData = grmData.filter((data) => data.alerts.length !== 0);
    let sortedAlertsData = alertsData.sort((a, b) => {
      // let stringA = a.alerts[0].errorTime.toString();
      // a = +stringA.slice(6, stringA.length);
      // console.log(a);
      // let stringB = b.alerts[0].errorTime.toString();
      // b = +stringB.slice(6, stringB.length);
      // console.log(b);
      return b - a;
    });
    // sortedAlertsData.forEach((e) => {
    //   console.log(
    //     'Error Time',
    //     `${e.alerts[0].errorTime}`,
    //     `${e.alerts[0].errorMessage}`
    //   );
    // });
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
      contactSatellite: contactSatellite,
      contactDetail: contactDetail,
    });
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
