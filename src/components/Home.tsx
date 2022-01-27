import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Contact, ErrorSeverity, ModifiedAlert, Store } from '../lib/types';
import { RuxButton, RuxModal } from '@astrouxds/react';
import { acknowledgeAlert, fetchAlerts } from '../store/actions';
import { AlertsList } from './AlertsList';

export const Home: FC = () => {

  const dispatch = useDispatch();
  const alerts = useSelector((store: Store) => store.alerts);

  useEffect(() => {
    dispatch(fetchAlerts());
  }, []);

  const [severityFilter, setSeverityFilter] = useState<ErrorSeverity>(ErrorSeverity.undefined);
  const [filteredAlerts, setFilteredAlerts] = useState<ModifiedAlert[]>(alerts)

  useEffect(() => {
    if (severityFilter !== ErrorSeverity.undefined) {
      const newAlerts = alerts.filter(alert => alert.errorSeverity === severityFilter);
      setFilteredAlerts(newAlerts);
    } else {
      setFilteredAlerts(alerts)
    }
  }, [severityFilter, alerts])


  const [modalAlert, setModalAlert] = useState<ModifiedAlert | undefined>(undefined);

  const handleModal = (alert?: ModifiedAlert) => {
    !alert ? setModalAlert(undefined)
      : setModalAlert(alert)
  };

  const handleAcknowledge = (contactId: string, alertId: string) => {
    dispatch(acknowledgeAlert(contactId, alertId));
    console.log(alerts)
  };

  return (
    <div className='body-container'>
      {
        !!modalAlert && 
        <RuxModal 
          modalTitle='Alert Details'
          modalMessage={`Contact Satellite: ${modalAlert.contactSatellite}.  Contact Detail: ${modalAlert.contactDetail}`}
          denyText='close'
          confirmText = ''
          open={!!modalAlert}
          onRuxmodalclosed={() => handleModal()}
        />
      }
      <h1>Alerts</h1>
      <h3>Filter by severity level: </h3>
      <RuxButton className='filterButton' onClick={() => setSeverityFilter(ErrorSeverity.undefined)}>All</RuxButton>
      <RuxButton className='filterButton' onClick={() => setSeverityFilter(ErrorSeverity.caution)}>Caution</RuxButton>
      <RuxButton className='filterButton' onClick={() => setSeverityFilter(ErrorSeverity.serious)}>Serious</RuxButton>
      <RuxButton className='filterButton' onClick={() => setSeverityFilter(ErrorSeverity.critical)}>Critical</RuxButton>
      {
        alerts?.length &&  <AlertsList alerts={filteredAlerts} handleAcknowledge={handleAcknowledge} handleModal={handleModal}/>
      }
    </div>
  )
}