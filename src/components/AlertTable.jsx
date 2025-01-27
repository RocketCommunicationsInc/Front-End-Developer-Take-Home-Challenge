import React, { useEffect, useState } from "react";
import { contactTimeInMinutes, errorTimeDate } from "../utils/timeFormatter.js";
import { RuxTable, RuxTableHeader, RuxTableBody, RuxTableHeaderRow, RuxTableHeaderCell, RuxTableCell, RuxSelect, RuxOption, RuxCheckbox, RuxStatus, RuxButton, RuxTableRow } from "@astrouxds/react";

const AlertTable = ({ headerText, alertData, errorSeverities, handleOpenDetailModal, handleOpenCheckboxModal}) => {
	const [allData, setAllData] = useState([]);

	const handleSeverityOnChange = (severity) => {
		if(severity === "all") {
			setAllData(alertData);
		} else {
			let filteredData = alertData?.filter(item => item.alerts.errorSeverity === severity);
			setAllData(filteredData);
		}
	};

	useEffect(() => {
		setAllData(alertData);
	},[alertData]);

	return (
		<RuxTable>
			<RuxTableHeader>
				<RuxTableHeaderRow>
					{ headerText.map(text => {
						return (
							<RuxTableHeaderCell key={`table-header-${text}`} style={{ display: text === "Severity" ? "flex" : "table-cell", alignItems: text === "Severity" && "center", padding: "10px 15px" }}>
								{text}
								{ text === "Severity" && <RuxSelect size={"medium"} onRuxchange={(e) => handleSeverityOnChange(e.target.value)} style={{ marginLeft: 10 }}>
									<RuxOption value={"all"} selected="" label={"all"}></RuxOption>
									{ errorSeverities?.map(item => {
										return (
											<RuxOption key={`error-severity-${item}`} selected="" value={item} label={item}>{item}</RuxOption>
										)
									})}
								</RuxSelect> }
							</RuxTableHeaderCell>
						)
					})}
				</RuxTableHeaderRow>
			</RuxTableHeader>
			<RuxTableBody>
				{ allData?.map((item, i) => {
					return (
						<RuxTableRow key={`alert-row-${i}`} style={{ opacity: item?.alerts?.selected && "0.4"}}>
							<RuxTableCell style={{ padding: "10px 15px"}}>
								<RuxCheckbox checked={item?.alerts?.selected} disabled={item?.alerts?.selected} onRuxchange={() => handleOpenCheckboxModal(item)}></RuxCheckbox>
							</RuxTableCell>
							<RuxTableCell style={{ padding: "10px 15px"}}>
								<RuxStatus style={{ margin: "auto" }} status={`${item.alerts.errorSeverity === "warning" ? "caution" : item.alerts.errorSeverity }`}></RuxStatus>
							</RuxTableCell>
							<RuxTableCell style={{ padding: "10px 15px"}}>{errorTimeDate(item.alerts.errorTime)}</RuxTableCell>
							<RuxTableCell style={{ padding: "10px 15px"}}>{item.alerts.errorMessage}</RuxTableCell>
							<RuxTableCell style={{ padding: "10px 15px"}}>{item.contactName}</RuxTableCell>
							<RuxTableCell style={{ padding: "10px 15px"}}>{contactTimeInMinutes(item.contactBeginTimestamp, item.contactEndTimestamp)}</RuxTableCell>
							<RuxTableCell style={{ padding: "10px 15px"}}>
								<RuxButton disabled={item?.alerts?.selected} size="small" secondary onClick={() => handleOpenDetailModal(item)}>SHOW DETAILS</RuxButton>
							</RuxTableCell>
						</RuxTableRow>
					)
				})}
			</RuxTableBody>
		</RuxTable>
	)
}

export default AlertTable;