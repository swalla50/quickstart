import React, {useState}from 'react'
import { faBriefcase,faMoneyBill1Wave,faBuildingColumns,faReceipt,faClock,faPlus, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';


const ReadOnlyRow = ({time, handleEditClick, onquickupdate, getUserTime}) => {

    const [timesheet, settimesheet] = useState([]);
    const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric'};
   
    return (
        <tr id={time.sheetId} key={time.sheetId}>
            <td>{time.myUserId}</td>
            <td>{time.fullName}</td>
            <td><FontAwesomeIcon icon={faClock} size='1x' />{new Date(time.timeworkedIn).toLocaleDateString(undefined, options)}</td>
            <td><FontAwesomeIcon icon={faClock} size='1x' />{new Date(time.timeworkedOut).toLocaleDateString(undefined, options)}</td>
            <td><FontAwesomeIcon icon={faClock} size='1x' />{time.timeWorked} Hr(s)</td>
            <td className="action-payment">
                <button className="btn btn-light mr-2 pay-btn" type="button" onClick={(event)=> handleEditClick(event, time)} >
                    <FontAwesomeIcon icon={faPencil} size='2x' />
                </button>
                <button id={time.sheetId} onClick={() => onquickupdate(time.sheetId)} className="btn btn-light mr-2 pay-btn"><FontAwesomeIcon icon={faBriefcase} size='2x' /> Clock-Out</button>
            </td>

        </tr>
    )
}

export default ReadOnlyRow