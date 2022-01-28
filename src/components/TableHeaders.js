import { RuxTableHeaderCell } from "@astrouxds/react";

const TableHeader = () => {
    return (
        <>
            <RuxTableHeaderCell>Name</RuxTableHeaderCell>
            <RuxTableHeaderCell>Ground</RuxTableHeaderCell>
            <RuxTableHeaderCell>Time</RuxTableHeaderCell>
            <RuxTableHeaderCell>Status</RuxTableHeaderCell>
            <RuxTableHeaderCell>State</RuxTableHeaderCell>
            <RuxTableHeaderCell>Step</RuxTableHeaderCell>
            <RuxTableHeaderCell>Alert Message</RuxTableHeaderCell>
            <RuxTableHeaderCell>Category</RuxTableHeaderCell>
        </>
    )
}

export default TableHeader; 