/* eslint-disable no-unused-vars */
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
import Modal from '../Modal/Modal'
import Row from '../Row/Row'
// current issues:
// button event in Modal wont trigger func toggleModal to switch state back to false
const Log = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [rowViewed, setRowViewed] = useState(false)

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
                />
            )
        })

    const timeFormatter = (unixTimeStamp) => {
        var date = new Date(unixTimeStamp * 1000)
        // Hours part from the timestamp
        var hours = date.getHours()
        // Minutes part from the timestamp
        var minutes = '0' + date.getMinutes()
        // Seconds part from the timestamp
        var seconds = '0' + date.getSeconds()
        // Will display time in 10:30:23 format
        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
    }

    const toggleModal = () => {
        console.log('before', isOpen)
        // issue with state setting state to false on first click
        isOpen === false ? setIsOpen(true) : setIsOpen(false)
        console.log('after', isOpen)
    }

    const toggleViewed = () => {
        console.log('view before', rowViewed)
        // issue with state setting state to false on first click
        setRowViewed(true)
        console.log('view after', rowViewed)
    }

    return (
        <div className="alert-log">
            {/* {isOpen? <Modal openModal={toggleModal}/> : null}
            <RuxTable>
                <RuxTableHeader>
                    <RuxTableHeaderRow>
                        <RuxTableHeaderCell id='name'>Name</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Status</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Message</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Contact time:</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Start</RuxTableHeaderCell>
                        <RuxTableHeaderCell>End</RuxTableHeaderCell>
                    </RuxTableHeaderRow>
                </RuxTableHeader>
                <RuxTableBody className="body">{renderRows()}</RuxTableBody>
            </RuxTable>
            {isOpen ? (
                <Modal isOpen={isOpen} toggleModal={toggleModal} />
            ) : null} */}
            <RuxTable>
                <RuxTableHeader>
                    <RuxTableHeaderRow>
                        <RuxTableHeaderCell>Name</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Status</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Message</RuxTableHeaderCell>
                        {/* <RuxTableHeaderCell className='spacer'></RuxTableHeaderCell> */}
                        <RuxTableHeaderCell>Contact time:</RuxTableHeaderCell>
                        <RuxTableHeaderCell>Start</RuxTableHeaderCell>
                        <RuxTableHeaderCell>End</RuxTableHeaderCell>
                    </RuxTableHeaderRow>
                </RuxTableHeader>
                <RuxTableBody>{renderRows()}</RuxTableBody>
                {isOpen ? (
                <Modal isOpen={isOpen} toggleModal={toggleModal} />
            ) : null}
            </RuxTable>
        </div>
    )
}

export default Log
