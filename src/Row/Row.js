import React, { useState } from 'react'
import {
    RuxTableRow,
    RuxTableCell,
    RuxStatus,
    RuxButton,
} from '@astrouxds/react'
import './Row.css'
//  rearrange, reorganize props
const Row = ({
    rowViewed,
    item,
    index,
    toggleModal,
    toggleViewed,
    timeFormatter,
}) => {
    const [previewed, setPreviewed] = useState(false)

    const changePreview = () => setPreviewed(true)

    return (
        <RuxTableRow key={index} selected={previewed}>
            <RuxTableCell>{item.contactName}</RuxTableCell>
            <RuxTableCell>
                <RuxStatus status={item.contactStatus} />
            </RuxTableCell>
            <RuxTableCell>error message</RuxTableCell>
            <RuxTableCell>
                <RuxButton
                    size="small"
                    type="button"
                    onClick={(e) => {
                        toggleModal()
                        changePreview()
                    }}
                >
                    Details{' '}
                </RuxButton>
            </RuxTableCell>
            <RuxTableCell>
                {timeFormatter(item.contactBeginTimestamp)}
            </RuxTableCell>
            <RuxTableCell>
                {timeFormatter(item.contactEndTimestamp)}
            </RuxTableCell>
        </RuxTableRow>
    )
}

export default Row
