import { RuxTableHeader, RuxTableHeaderRow, RuxTableHeaderCell, RuxSelect, RuxOption } from "@astrouxds/react";

export const TableHeader = ({ viewSeverity }) => {

    return (
        <>
            <RuxTableHeader>
                <RuxTableHeaderRow>
                    <RuxTableHeaderCell>
                        <RuxSelect onClick={(e) => viewSeverity(e.target.value)}>
                            <RuxOption value="All" selected="" label="Error Severity"></RuxOption>
                            <RuxOption value="all" label="All"></RuxOption>
                            <RuxOption value="critical" label="Critical"></RuxOption>
                            <RuxOption value="serious" label="Serious"></RuxOption>
                            <RuxOption value="caution" label="Caution"></RuxOption>
                            <RuxOption value="normal" label="Normal"></RuxOption>
                            <RuxOption value="standby" label="Standby"></RuxOption>
                            <RuxOption value="off" label="Off"></RuxOption>
                        </RuxSelect>
                    </RuxTableHeaderCell>
                    <RuxTableHeaderCell>Alert message</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Contact name</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Contact time</RuxTableHeaderCell>
                    <RuxTableHeaderCell></RuxTableHeaderCell>
                </RuxTableHeaderRow>
            </RuxTableHeader>
        </>
    )
}