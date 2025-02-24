"use client";

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

export function AlertLog({ data = [], doUpdateEntry }) {
  const DetailCell = (entry) => {
    if (entry.item.acknowledged === true) {
      return <>yer mom</>;
    } else {
      return (
        <RuxButton
          size="small"
          secondary={true}
          borderless={true}
          onClick={() => doUpdateEntry(entry.item)}
        >
          Details
        </RuxButton>
      );
    }
  };

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
              <RuxTableCell>
                {item.contactBeginTimestampString} -{" "}
                {item.contactEndTimestampString}
              </RuxTableCell>
              <RuxTableCell>{item.contactName}</RuxTableCell>
              <RuxTableCell>
                <DetailCell item={item} />
              </RuxTableCell>
            </RuxTableRow>
          ))}
        </RuxTableBody>
      </RuxTable>
    </>
  );
}
