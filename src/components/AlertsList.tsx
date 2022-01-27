import React, { FC } from 'react';
import { ModifiedAlert } from '../lib/types';
import { Alert } from './Alert';

interface AlertsListProps {
  alerts: ModifiedAlert[],
  handleAcknowledge: (contactId: string, errorId: string) => void;
  handleModal: (alert: ModifiedAlert) => void;
};

export const AlertsList: FC<AlertsListProps> = ({ alerts, handleAcknowledge, handleModal }) => {
  return (
    <ul>
      {alerts.map( (alert, index) => {
        return <Alert alert={alert} handleAcknowledge={handleAcknowledge} handleModal={handleModal} key={index} />
      })}
    </ul>
  )
}