import { RuxTableHeaderCell, RuxTableHeaderRow, } from "@astrouxds/react";

const Headers = (props) => (
    <RuxTableHeaderRow>
        <RuxTableHeaderCell>
            Alert Message
        </RuxTableHeaderCell>
        <RuxTableHeaderCell>
            Contact Name
        </RuxTableHeaderCell>
        <RuxTableHeaderCell>
            Contact Time (ms)
        </RuxTableHeaderCell>
        <RuxTableHeaderCell onClick={() => {
            props.setSortedField("errorSeverity")
            props.isAscending === true ? props.setIsAscending(false) : props.setIsAscending(true)
            props.setIsSorted(false)
        }}>
            {/* display different icon depending if we're sorting by this column */}
            Error Severity {props.isAscending === null ? '-' : props.isAscending ? '^' : `ˇ`}
        </RuxTableHeaderCell>
        <RuxTableHeaderCell>
            Actions
        </RuxTableHeaderCell>
    </RuxTableHeaderRow >
)

export default Headers;