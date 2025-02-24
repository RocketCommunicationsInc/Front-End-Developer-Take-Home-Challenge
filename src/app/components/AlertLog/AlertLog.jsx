// 'use client'

import React from "react";
import {
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

import styles from "./AlertLog.module.css";

export function AlertLog({ data = [] }) {
  // console.clear();
  // console.log(["data", data[0].longMessage]);

  // data.map((item, index) => {
  //   if (item.alerts.length) {
  //     console.log(item.alerts[0].errorMessage)
  //   }
  // })

  const asdfasdf = (e) => {
    console.log(e)
  }

  return (
    <>
      <RuxTable className={styles.AlertLog}>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Severity</RuxTableHeaderCell>
            <RuxTableHeaderCell>Message</RuxTableHeaderCell>
            <RuxTableHeaderCell>Time</RuxTableHeaderCell>
            <RuxTableHeaderCell>Contact</RuxTableHeaderCell>
            <RuxTableHeaderCell>Acknowledged</RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {data.map((item, index) => (
            <RuxTableRow key={index}>
              <RuxTableCell>{item.errorSeverity}</RuxTableCell>
              <RuxTableCell>{item.errorMessage}</RuxTableCell>
              {/* todo: work out time sorting and display */}
              <RuxTableCell>{item.contactBeginTimestampString} - {item.contactEndTimestampString}</RuxTableCell>
              <RuxTableCell>{item.contactName}</RuxTableCell>
              <RuxTableCell>
                <RuxButton size="small" secondary={true} borderless={true} onClick={() => asdfasdf(item)}>
                  Details
                </RuxButton>
              </RuxTableCell>
            </RuxTableRow>
          ))}
        </RuxTableBody>
      </RuxTable>
    </>
  );
}
