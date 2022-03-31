import { RuxTableHeader, RuxTableHeaderRow, RuxTableHeaderCell } from "@astrouxds/react";

export const TableHeader = ({ onSort }) => {

    return (
        <>
            <RuxTableHeader>
                <RuxTableHeaderRow>
                    <RuxTableHeaderCell>Alert message</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Contact name</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Contact time</RuxTableHeaderCell>
                    <RuxTableHeaderCell></RuxTableHeaderCell>
                    <RuxTableHeaderCell></RuxTableHeaderCell>
                </RuxTableHeaderRow>
            </RuxTableHeader>
        </>
    )
}