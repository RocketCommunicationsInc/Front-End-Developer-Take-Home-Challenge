'use client';
import { RuxDialog } from '@astrouxds/react';
import { useState } from 'react';

import styles from '@assets/css/dashboard.module.css';
import DashboardAlertsPanel from '@components/dashboard-alerts-panel';
import {
  useGetAllContactAlertsQuery,
  useGetContactByIdQuery,
} from '@services/contact';

export default function Home() {
  const [selectedAlertDetailId, setSelectedAlertDetailId] = useState<
    string | undefined
  >(undefined);

  const { data: alertData, isLoading } = useGetAllContactAlertsQuery();
  const { data: contactData, isFetching } = useGetContactByIdQuery(
    selectedAlertDetailId,
    {
      skip: !selectedAlertDetailId,
    }
  );

  function onShowAlertDetailDialog(id: string | undefined) {
    if (id !== selectedAlertDetailId) {
      setSelectedAlertDetailId(id);
    } else {
      console.error('Unable to display alert detail');
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className={styles.dashboardPage}>
        {/** Alert Panel */}
        <div className={styles.alertsPanelWrapper}>
          <DashboardAlertsPanel
            contactAlerts={alertData?.alerts || []}
            onShowAlertDetailClick={onShowAlertDetailDialog}
          />
        </div>
      </main>
      {/** Alert Details Dialog */}
      <RuxDialog
        title="Alert Details"
        open={!!selectedAlertDetailId}
        onRuxdialogclosed={() => setSelectedAlertDetailId(undefined)}
        clickToClose
        denyText="Close"
        confirmText=""
      >
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <>
            <span slot="header">Alert Details</span>
            <div>
              <div>
                Contact Satellite: {contactData?.contact.contactSatellite}
              </div>
              <div>Contact Detail: {contactData?.contact.contactDetail}</div>
            </div>
            <div slot="deny-text"></div>
          </>
        )}
      </RuxDialog>
    </>
  );
}
