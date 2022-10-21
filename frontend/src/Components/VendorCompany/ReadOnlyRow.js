import React, { useState } from 'react'
import { faTrashCan, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faPlus, faPencil, faDollarSign, faBoxesPacking, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';


const ReadOnlyRow = ({item, handleEditClick}) => {

    const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

    return (
        <tr style={{height:"50px"}} id={item.vendorId} className="content-bar">
            <td className="itemnum">{item.vendorId}</td>
            <td className="itemtitle">{item.vendorName}</td>
            <td className="itemtitle">{item.vendorType}</td>
            <td className="itemnum">{item.itemCode}</td>
            <td className="itemprice"><FontAwesomeIcon className="project-done-icon" icon={faEnvelope} size='1x' />{item.vendorEmail}</td>
            <td className="itemstock"><p className='numinstock'><FontAwesomeIcon className="project-done-icon" icon={faPhone} size='1x' />{item.vendorPhone}</p></td>
            <td className="itemtitle">{item.vendorContact}</td>
            <td className="btncontainer">
                <button className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faTrashCan} size='1x' /></button>
                <button onClick={(event)=> handleEditClick(event, item)}  className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' /></button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow