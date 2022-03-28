import React, { useState } from 'react'
import {
    RuxTableRow,
    RuxTableCell,
    RuxStatus,
    RuxButton,
} from '@astrouxds/react'
import './Row.css'
import Modal from '../Modal/Modal'
//  rearrange, reorganize props
const Row = ({
    rowViewed,
    item,
    index,
    toggleModal,
    timeFormatter,
    isOpen,
}) => {
    const [previewed, setPreviewed] = useState(false)
    const changePreview = () => setPreviewed(true)

    /**
     * toggleBetweenComponents is a conditional statement that renders the correct component depending on state
     * in this case, it renders a RuxTableRow or Modal depending on the value of isOpen
     */
    const toggleBetweenComponents = () => {
        return !isOpen ? (
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
        ) : (
            <Modal isOpen={isOpen} toggleModal={toggleModal} />
        )
    }
    return <>{toggleBetweenComponents()}</>
}

export default Row
