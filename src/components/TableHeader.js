import { RuxTableHeader, RuxTableHeaderRow, RuxTableHeaderCell, RuxSelect, RuxOption } from "@astrouxds/react";

export const TableHeader = ({ data, onSeverity }) => {
    /* 
        Remove a duplicate error severity from alerts array while mapping
    */
    const getAllErrorSeverityLevel = data.map(item => item.alerts[0].errorSeverity);
    const uniqueErrorSeverityLevel = Array.from(new Set(getAllErrorSeverityLevel));

    /* Self explanatory */
    function capitalizeFirstLetter(word) {
        return word[0].toUpperCase() + word.substring(1);
    }

    return (
        <>
            <RuxTableHeader>
                <RuxTableHeaderRow>
                    <RuxTableHeaderCell>
                        <RuxSelect onClick={(e) => onSeverity(e.target.value)}>
                            <RuxOption value="all" selected="" label="All"></RuxOption>
                            {uniqueErrorSeverityLevel.map((word, index) => {
                                return (
                                    <RuxOption key={index} value={`${word}`} label={`${capitalizeFirstLetter(word)}`}></RuxOption>
                                )
                            })}
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