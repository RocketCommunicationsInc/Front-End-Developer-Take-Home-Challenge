import { RuxOption, RuxSelect } from "@astrouxds/react";
import Summary from "../Summary/Summary";

import type { Status } from "@astrouxds/astro-web-components";

function AlertHero({ alertLength, acknowledgedLength, setSeveritySelection }) {
  return (
    <div className="hero">
      <div className="hero__primary">
        <Summary count={alertLength} text="Total Alerts" />
        <Summary count={acknowledgedLength} text="Acknowledged" />
      </div>
      <div className="hero__secondary">
        <RuxSelect
          label="Severity"
          onRuxchange={(e) => setSeveritySelection(e.target.value as Status)}
        >
          <RuxOption label="All" value="all" />
          <RuxOption label="Critical" value="critical" />
          <RuxOption label="Caution" value="caution" />
          <RuxOption label="Serious" value="serious" />
        </RuxSelect>
      </div>
    </div>
  );
}

export default AlertHero;
