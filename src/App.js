import React, { useEffect, useState } from "react";
import "@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css"
import "./App.css";
import Data from "./data.json";
import AlertDetailModal from "./components/AlertDetailModal";
import AlertCheckboxModal from "./components/AlertCheckboxModal";
import AlertTable from "./components/AlertTable";
import { RuxContainer } from "@astrouxds/react";

const App = () => {
	const tableHeaderText = ["Complete", "Severity", "Error Time", "Alert Message", "Contact Name", "Contact Time (minutes)", ""];
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [isCheckboxModalOpen, setIsCheckboxModalOpen] = useState(false);
	const [alertData, setAlertData] = useState([]);
	const [errorSeverityOptions, setErrorSeverityOptions] = useState([]);
	const [selectedError, setSelectedError] = useState({});

	const findAlerts = () => {
		let dataWithAlerts = Data.filter(data => data.alerts.length > 0);

		let allAlerts = dataWithAlerts.flatMap(item =>
			item.alerts.map(alert => ({
			  ...item,
			  alerts: alert,
			}))
		  );
		sortDataByErrorTime(allAlerts);
		findErrorSeverityOptions(allAlerts);
	};

	const findErrorSeverityOptions = (data) => {
		let severities = data.reduce((acc, item) => {
			if (item.alerts.errorSeverity && !acc.includes(item.alerts.errorSeverity)) {
				acc.push(item.alerts.errorSeverity);
			}
			return acc;
		}, []);
		setErrorSeverityOptions(severities);
	};

	const sortDataByErrorTime = (alerts) => {
		let sortedData = alerts?.sort((a, b) => b.alerts.errorTime - a.alerts.errorTime);
		setAlertData(sortedData);
	};

	const handleOpenDetailModal = (data) => {
		setSelectedError(data);
		setIsDetailModalOpen(true);
	};

	const handleOpenCheckboxModal = (data) => {
		setSelectedError(data);
		setIsCheckboxModalOpen(true);
	};

	const handleCloseCheckboxModal = (buttonText) => {
		setIsCheckboxModalOpen(false);
		if(buttonText === "ok") {
			selectedError.alerts.selected = true;
		}
	};

	useEffect(() => {
		findAlerts();
	}, [Data]);
	
	return (
		<div style={{ width: "100%", height: "100%", padding: 50 }}>
			<AlertDetailModal open={isDetailModalOpen} setOpen={setIsDetailModalOpen} data={selectedError} />
			<AlertCheckboxModal open={isCheckboxModalOpen} handleClose={handleCloseCheckboxModal} data={selectedError} />
			<RuxContainer style={{ width: "100%", overflowX: "scroll" }}>
				<div slot="header">Alert Dashboard</div>
				<AlertTable headerText={tableHeaderText} alertData={alertData} errorSeverities={errorSeverityOptions} handleOpenDetailModal={handleOpenDetailModal} handleOpenCheckboxModal={handleOpenCheckboxModal} />
			</RuxContainer>
		</div>
	)
};

export default App;