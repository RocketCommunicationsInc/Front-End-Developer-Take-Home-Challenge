import React, { FC } from 'react';
import { ErrorSeverity, ModifiedAlert } from '../lib/types';
import { RuxButton, RuxIcon, RuxStatus } from '@astrouxds/react';


interface AlertProps {
  alert: ModifiedAlert,
  handleModal: (alert: ModifiedAlert) => void,
  handleAcknowledge: (contactId: string, erroorId: string) => void
}

export const Alert: FC<AlertProps> = ({ alert, handleAcknowledge, handleModal }) => {

  const {
    _id,
    acknowledged,
    contactName,
    contactTime,
    contactSatellite,
    contactDetail,
    errorId,
    errorSeverity,
    errorMessage,
    errorTime
  } = alert;

  console.log(acknowledged, contactName)

  return (
    <li className='alert-container'>
      <RuxStatus status={errorSeverity !== ErrorSeverity.undefined ? errorSeverity : undefined} />
      <p><b>Error Message:</b> {errorMessage}</p>
      <p><b>Contact Name:</b> {contactName}</p>
      <p><b>Contact Time:</b> {contactTime.toUTCString()}</p>
      <p><u onClick={() => handleModal(alert)} className='alert-learnmore'>Show Details</u></p>
      {
        !acknowledged ? <RuxButton onClick={() => handleAcknowledge(_id, errorId)}>Acknowledge</RuxButton>
        : <RuxIcon icon="done" />
      }
    </li>
  )
}