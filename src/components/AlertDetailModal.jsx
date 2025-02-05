import React from "react";
import { RuxDialog, RuxButton } from "@astrouxds/react";

const AlertDetailModal = ({ open, setOpen, data }) => {
	return (
		<>
			<RuxDialog open={open} header={`Contact Satellite: ${data?.contactSatellite}`}>
				<div>
					<span>Contact Name: {data?.contactName}</span>
				</div>
				<div>
					<span>Contact Detail: {data?.contactDetail}</span>
				</div>
				<div slot="footer" style={{ display: "flex", justifyContent: "flex-end" }}>
				<RuxButton onClick={() => setOpen(false)}>Close</RuxButton>
				</div>
			</RuxDialog>
		</>
	)
}

export default AlertDetailModal;