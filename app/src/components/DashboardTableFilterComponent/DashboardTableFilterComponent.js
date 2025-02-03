import React, { useState } from 'react';
import {
   RuxSelect,
   RuxOption,
} from "@astrouxds/react";
import { DashboardTableFilterComponentWrapper } from './DashboardTableFilterComponent.styled';
import { statusOptions, severityOptions } from '../../shared';

const DashboardTableFilterComponent = ({handleFilterChange}) => {

   const [filters, setFilters] = useState({
         status: statusOptions.all,
         severity: severityOptions.all,
         contactName: "",
      });
   
      const handleStatusFilterChange = (e) => {
         // e.target.value contains the selected option's value
         setFilters({...filters, status: e.target.value})
         handleFilterChange({...filters, status: e.target.value});
      };
   
      const handleSeverityFilterChange = (e) => {
         // e.target.value contains the selected option's value
         setFilters({...filters, severity: e.target.value})
         handleFilterChange({...filters, severity: e.target.value});
      };
   
   return (
      <DashboardTableFilterComponentWrapper data-testid="DashboardTableFilterComponent">
         <RuxSelect
            label="Filter by Severity" input-id="1" label-id="1" name="filterBySeverity" size="small"
            onRuxchange={handleSeverityFilterChange}
            style={{ width: "280px", padding: "5px" }} // Adding padding for better spacing
            value={filters.severity}
         >
            <RuxOption value={severityOptions.all} label={severityOptions.all}/>
            <RuxOption value={severityOptions.critical} label={severityOptions.critical}/>
            <RuxOption value={severityOptions.serious} label={severityOptions.serious}/>
            <RuxOption value={severityOptions.warning} label={severityOptions.warning}/>
            <RuxOption value={severityOptions.caution} label={severityOptions.caution}/>
         </RuxSelect>
         <RuxSelect
            label="Filter by Acknowledgement Status" input-id="1" label-id="1" name="filterByStatus" size="small"
            onRuxchange={handleStatusFilterChange}
            style={{ width: "280px", padding: "5px" }} // Adding padding for better spacing
            value={filters.status}
         >
            <RuxOption value={statusOptions.all} label={statusOptions.all}/>
            <RuxOption value={statusOptions.acknowledged} label={statusOptions.acknowledged}/>
            <RuxOption value={statusOptions.unacknowledged} label={statusOptions.unacknowledged}/>
         </RuxSelect>
      </DashboardTableFilterComponentWrapper>
   );
};

export default DashboardTableFilterComponent;
