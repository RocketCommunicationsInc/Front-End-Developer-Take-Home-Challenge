import React from "react";
import { RuxDialog, RuxButton } from "@astrouxds/react";

const AlertCheckboxModal = ({ open, handleClose, data }) => {
	return (
		<RuxDialog open={open} header={`Complete Alert `} onRuxdialogclosed={handleClose}>
			<div>
				<h3 style={{ marginTop: 0 }}>Alert Message: {data?.alerts?.errorMessage}</h3>
			</div>
			<div style={{ padding: "10px 0px" }}>
				<span>Do you want to mark this alert as completed?</span>
			</div>
			<div>
				<span>(This action is irreversible.)</span>
			</div>
			<div slot="footer" style={{ display: "flex", justifyContent: "flex-end" }}>
				<RuxButton secondary onClick={() => handleClose("cancel")}>Cancel</RuxButton>
				<RuxButton onClick={() => handleClose("ok")} style={{ marginLeft: 20 }}>OK</RuxButton>
			</div>
		</RuxDialog>
	)
}

export default AlertCheckboxModal;