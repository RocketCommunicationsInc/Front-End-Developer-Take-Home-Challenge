'use client';

import {
  RuxAccordionItemCustomEvent,
  RuxCheckboxCustomEvent,
  RuxSelectCustomEvent,
} from '@astrouxds/astro-web-components/dist/types/components';
import {
  RuxAccordionItem,
  RuxButton,
  RuxCheckbox,
  RuxContainer,
  RuxIcon,
  RuxOption,
  RuxSelect,
  RuxStatus,
} from '@astrouxds/react';
import { useState } from 'react';

import alertPanelStyles from '@assets/css/dashboard-alerts-panel.module.css';
import { ContactAlert } from '@models/contact';
import { useUpdateContactAlertsMutation } from '@services/contact';

interface Props {
  contactAlerts: ContactAlert[];
  onShowAlertDetailClick: (id: string | undefined) => void;
}

const ALERT_FILTER_OPTIONS = {
  severity: [
    { label: 'All', value: 'all' },
    { label: 'Critical', value: 'critical' },
    { label: 'Caution', value: 'caution' },
    { label: 'Serious', value: 'serious' },
  ],
  category: [
    { label: 'All', value: 'all' },
    { label: 'Hardware', value: 'hardware' },
    { label: 'Software', value: 'software' },
    { label: 'Spacecraft', value: 'spacecraft' },
  ],
};

export default function DashboardAlertsPanel({
  contactAlerts,
  onShowAlertDetailClick,
}: Readonly<Props>) {
  const [filters, setFilters] = useState({
    severity: 'all',
    category: 'all',
  });
  const [selectedAllChecked, setSelectedAllChecked] = useState(false);
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState(new Set());
  const [selectedAlerts, setSelectedAlerts] = useState(new Set());

  const [updateContactAlert] = useUpdateContactAlertsMutation();

  function onFilterChange(event: RuxSelectCustomEvent<void>) {
    const value = event.target.value as string;
    const filterType = event.target.label?.toLowerCase() as
      | 'severity'
      | 'category';

    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  }

  function onClearSelectedAlerts() {
    setSelectedAlerts(new Set());
    setSelectedAllChecked(false);
  }

  function onSelectAllAlerts(event: RuxCheckboxCustomEvent<void>) {
    const { checked } = event.target;
    setSelectedAllChecked(checked);

    setSelectedAlerts(() => {
      if (checked) {
        return new Set(
          contactAlerts
            .map((alert) => alert._id)
            .filter((id) => id !== undefined) as string[]
        );
      } else {
        setSelectedAllChecked(false);
        return new Set();
      }
    });
  }

  async function onAlertExpanded(
    _event: RuxAccordionItemCustomEvent<void>,
    alertId: string | undefined
  ) {
    try {
      await updateContactAlert({ id: alertId, expanded: true });
    } catch (error) {
      console.error(error);
    }
  }

  async function onAlertSelect(event: RuxCheckboxCustomEvent<void>) {
    const { id, checked } = event.target;

    if (!id) {
      return;
    }

    try {
      const alert = contactAlerts.find((alert) => alert._id === id);

      if (alert && !alert.selected) {
        await updateContactAlert({ id, selected: true });
      }

      setSelectedAlerts((prev) => {
        const newSet = new Set(prev);
        if (checked) {
          newSet.add(id);
        } else {
          newSet.delete(id);
        }

        return newSet;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function onAcknowledgeAlert() {
    const acknowledgedAlertIds = Array.from(selectedAlerts).filter(
      (id) => !acknowledgedAlerts.has(id)
    );
    if (acknowledgedAlertIds.length === 0) {
      return;
    }

    try {
      await Promise.all(
        acknowledgedAlertIds.map((id) =>
          updateContactAlert({ id, acknowledged: true })
        )
      );

      setAcknowledgedAlerts((prev) => {
        const newSet = new Set(prev);
        for (const id of acknowledgedAlertIds) {
          newSet.add(id);
        }
        return newSet;
      });
    } catch (error) {
      console.error(error);
    } finally {
      onClearSelectedAlerts();
    }
  }

  return (
    <RuxContainer className={alertPanelStyles.alertsPanel}>
      <div className={alertPanelStyles.alertsHeader} slot="header">
        <div className={alertPanelStyles.alertsTitle}>
          <span className={alertPanelStyles.alertsTitleCount}>
            {contactAlerts.length - acknowledgedAlerts.size}
          </span>
          Active Alerts
        </div>
        {/** Alert Filters */}
        <div className={alertPanelStyles.alertsSelectMenu}>
          <RuxSelect
            value={filters.severity}
            size="small"
            label="Severity"
            onRuxchange={onFilterChange}
            inputId={filters.severity}
          >
            {ALERT_FILTER_OPTIONS.severity.map((option) => (
              <RuxOption
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </RuxSelect>
          <RuxSelect
            value={filters.category}
            size="small"
            label="Category"
            onRuxchange={onFilterChange}
          >
            {ALERT_FILTER_OPTIONS.category.map((option) => (
              <RuxOption
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </RuxSelect>
        </div>
      </div>
      {/** Alert List Header */}
      <div className={alertPanelStyles.alertListHeader}>
        <RuxCheckbox
          checked={selectedAllChecked}
          onRuxchange={onSelectAllAlerts}
          class={alertPanelStyles.selectAllCheckbox}
        />

        {/** Sortable Headers */}
        <span className={alertPanelStyles.alertListHeaderLabelWrapper}>
          <span>Message</span>
        </span>
        <span className={alertPanelStyles.alertListHeaderLabelWrapper}>
          <span>Contact Name</span>
        </span>
        <span className={alertPanelStyles.alertListHeaderLabelWrapper}>
          <span>Contact Time</span>
        </span>
        <span className={alertPanelStyles.alertListHeaderLabelWrapper}>
          <span>Time</span>
        </span>
      </div>
      {/** Alert List */}
      {contactAlerts.length === 0 ? (
        <p>No contact alerts to display</p>
      ) : (
        <ul className={alertPanelStyles.alertList}>
          {contactAlerts
            .filter((alert) => {
              const matchesSeverity =
                filters.severity === 'all' ||
                alert.errorSeverity === filters.severity;

              const matchesCategory =
                filters.category === 'all' ||
                alert.errorCategory === filters.category;

              return matchesSeverity && matchesCategory;
            })
            .map((alert) => (
              <li
                key={alert._id}
                className={[
                  !alert.selected && !alert.expanded && !alert.acknowledged
                    ? alertPanelStyles.idle
                    : '',
                  alert.acknowledged ? alertPanelStyles.acknowledged : '',
                ].join(' ')}
              >
                <RuxAccordionItem
                  onRuxexpanded={(event) => onAlertExpanded(event, alert._id)}
                >
                  <div className={alertPanelStyles.alertItemLabel} slot="label">
                    {!alert.acknowledged ? (
                      <RuxCheckbox
                        id={alert._id}
                        checked={
                          alert?._id ? selectedAlerts.has(alert._id) : false
                        }
                        disabled={alert.acknowledged}
                        onRuxchange={onAlertSelect}
                      ></RuxCheckbox>
                    ) : (
                      <RuxIcon size="extra-small" icon="check"></RuxIcon>
                    )}
                    <RuxStatus status={alert.errorSeverity}></RuxStatus>
                    <span>{alert.errorMessage}</span>
                    <span>{alert.contactName}</span>
                    <span>{alert.contactTime}</span>
                    <span>{alert.errorTime}</span>
                  </div>
                  <div className={alertPanelStyles.alertItemContent}>
                    <p>{alert.errorMessage}</p>
                    <RuxButton
                      onClick={() => onShowAlertDetailClick(alert.contactId)}
                    >
                      Show Details
                    </RuxButton>
                  </div>
                </RuxAccordionItem>
              </li>
            ))}
        </ul>
      )}
      <div slot="footer">
        <RuxButton
          disabled={selectedAlerts.size === 0}
          onClick={onClearSelectedAlerts}
          secondary
        >
          Clear Selected
        </RuxButton>
        &nbsp;&nbsp;
        <RuxButton
          disabled={selectedAlerts.size === 0}
          onClick={onAcknowledgeAlert}
        >
          Acknowledge
        </RuxButton>
      </div>
    </RuxContainer>
  );
}
