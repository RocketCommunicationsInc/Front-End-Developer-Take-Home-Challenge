import React from "react";
import {
  RuxAccordion,
  RuxAccordionItem,
  RuxButton,
  RuxDialog,
  RuxTable,
  RuxTableBody,
  RuxTableCell,
  RuxTableHeader,
  RuxTableHeaderCell,
  RuxTableHeaderRow,
  RuxTableRow,
} from "@astrouxds/react";

import styles from "./AlertLog2.module.css";

export function AlertLog2({ data }) {
  console.log(["data", data[0]]);
  const severityClasses = (severityLevel) => {
    switch (severityLevel) {
      case "critical":
        return styles.AlertSeverityCritical;
      case "caution":
        return styles.AlertSeverityCaution;
      case "serious":
        return styles.AlertSeveritySerious;
      case "warning":
      default:
        return "";
    }
  };

  const rowAcknowledgedClass = (acknowledged) => {
    if (acknowledged) {
      return styles.RowAcknowledged;
    }
  };

  return (
    <>
      <RuxTable className={styles.AlertLog}>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Contact</RuxTableHeaderCell>
            <RuxTableHeaderCell>Time</RuxTableHeaderCell>
            <RuxTableHeaderCell>Alerts</RuxTableHeaderCell>
            {/* <RuxTableHeaderCell>Severity</RuxTableHeaderCell> */}
            {/* <RuxTableHeaderCell>Message</RuxTableHeaderCell> */}
            {/* <RuxTableHeaderCell>Acknowledged</RuxTableHeaderCell> */}
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {data.map((item, index) => (
            <RuxTableRow
              key={index}
              className={rowAcknowledgedClass(item.acknowledged)}
            >
              <RuxTableCell>
                {item.contactName} ∞ {item.alerts.length}
              </RuxTableCell>
              <RuxTableCell>
                {item.contactBeginTimestamp} - {item.contactEndTimestamp}
              </RuxTableCell>
              <RuxTableCell>
                <RuxAccordion disallowMultiple={true}>
                  {item.alerts.map((alert, index) => (
                    <RuxAccordionItem >
                      <div slot="prefix" className={severityClasses(alert.errorSeverity)}>{alert.errorSeverity}</div>
                      <div slot="label">{alert.errorMessage}</div>
                      <div>The details</div>
                    </RuxAccordionItem>
                  ))}
                </RuxAccordion>
              </RuxTableCell>

              {/* <RuxTableCell className={severityClasses(item.errorSeverity)}>{item.errorSeverity}</RuxTableCell> */}
              {/* <RuxTableCell>{item.errorMessage}</RuxTableCell> */}
              {/* todo: work out time sorting and display */}
              {/* <RuxTableCell> */}
              {/* <DetailCell item={item} /> */}
              {/* </RuxTableCell> */}
            </RuxTableRow>
          ))}
        </RuxTableBody>
      </RuxTable>
    </>
  );
}
