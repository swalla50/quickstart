import React, { useState } from 'react'
import { faTrashCan, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faPlus, faPencil, faDollarSign, faBoxesPacking, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';


const ReadOnlyRow = ({item, handleEditClick}) => {

    const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

    return (
        <tr style={{height:"50px"}} id={item.myUserId} className="content-bar">
            <td className="itemnum">
                <img style={{height:'35px', borderRadius:'50%'}}src={`${'https://webapi20220126203702.azurewebsites.net/images/'+ item.userPic}`}/>
            </td>
            <td className="itemtitle">{item.myUserId}</td>
            <td className="itemnum">{item.FullName}</td>
            <td className="itemnum">{item.UserName}</td>
            <td className="itemprice"><FontAwesomeIcon className="project-done-icon" icon={faPhone} size='1x' />{item.PhoneNumber}</td>
            <td className="itemstock"><p className='numinstock'><FontAwesomeIcon className="project-done-icon" icon={faEnvelope} size='1x' />{item.Email}</p></td>
            <td className="itemtitle">{item.Company}</td>
            <td className="itemtitle">{item.UserRole}</td>
            <td className="btncontainer">
                <button className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faTrashCan} size='1x' /></button>
                <button onClick={(event)=> handleEditClick(event, item)}  className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' /></button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow