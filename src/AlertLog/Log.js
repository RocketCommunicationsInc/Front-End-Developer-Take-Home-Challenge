import React, { useState } from 'react'
import {
    RuxTable,
    RuxTableHeader,
    RuxTableHeaderRow,
    RuxTableHeaderCell,
    RuxTableBody,
} from '@astrouxds/react'
import data from '../data.json'
import './Log.css'
import Row from '../Row/Row'

const Log = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [rowViewed, setRowViewed] = useState(false)

    /**
     * renderRows returns a rux-table-row for every object in data
     * State and functions are passed as params to the children nested in the Rows component.
     * renderRows is called in the RuxTableBody el
     */
    const renderRows = () =>
        data.map((item, index) => {
            return (
                <Row
                    rowViewed={rowViewed}
                    item={item}
                    key={index}
                    toggleModal={toggleModal}
                    toggleViewed={toggleViewed}
                    timeFormatter={timeFormatter}
                    isOpen={isOpen}
                />
            )
        })

    /**
     * timeFormatter simply formats the unix timestamp from data into something more legible
     */
    const timeFormatter = (unixTimeStamp) => {
        const date = new Date(unixTimeStamp * 1000)
        // Hours part from the timestamp
        const hours = date.getHours()
        // Minutes part from the timestamp
        const minutes = '0' + date.getMinutes()
        // Seconds part from the timestamp
        const seconds = '0' + date.getSeconds()
        // Will display time in 10:30:23 format
        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
    }

    const toggleModal = () => {
        isOpen === false ? setIsOpen(true) : setIsOpen(false)
    }

    /**
     * toggleViewed handles state for setRowViewed.
     * the func is passed down to Row and assigned to the param selected in RuxTableRow
     * Distinguishes if Row has triggered modal with  details RuxButton
     */
    const toggleViewed = () => {
        setRowViewed(true)
    }

    return (
        <div className="alert-log">
            <RuxTable>
                <RuxTableHeader>
                    <RuxTableHeaderRow>
                        <RuxTableHeaderCell className="cell-name">
                            Name
                        </RuxTableHeaderCell>
                        <RuxTableHeaderCell>Status</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Message</RuxTableHeaderCell>
                        {/* <RuxTableHeaderCell className='spacer'></RuxTableHeaderCell> */}
                        <RuxTableHeaderCell>Contact time:</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Start</RuxTableHeaderCell>
                        <RuxTableHeaderCell>End</RuxTableHeaderCell>
                    </RuxTableHeaderRow>
                </RuxTableHeader>
                <RuxTableBody>{renderRows()}</RuxTableBody>
            </RuxTable>
        </div>
    )
}

export default Log
