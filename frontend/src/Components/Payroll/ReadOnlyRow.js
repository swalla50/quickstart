import React, {useState}from 'react'
import { faBriefcase,faMoneyBill1Wave,faBuildingColumns,faReceipt,faClock,faDollarSign,faPlus, faPencil, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';


const ReadOnlyRow = ({pay, handleEditClick, onquickupdate, getUserTime}) => {

    const [timesheet, settimesheet] = useState([]);
    const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric'};
   
    return (
        <tr id={pay.sheetId} key={pay.sheetId}>
            <td>{pay.myUserId}</td>
            <td>{pay.fullName}</td>
            <td><FontAwesomeIcon icon={faClock} size='1x' />{pay.timeWorked}</td>
            <td><FontAwesomeIcon icon={faDollarSign} size='1x' />{pay.payperHour} per/Hr</td>
            <td><FontAwesomeIcon icon={faDollarSign} size='1x' />{pay.payment}</td>
            <td><FontAwesomeIcon size='1x' /> Period {pay.payPeriod}</td>
            <td className="action-payment">
                <button className="btn btn-light mr-2 pay-btn" type="button" onClick={(event)=> handleEditClick(event, pay)} >
                    Pay <FontAwesomeIcon icon={faCheckCircle} size='2x' />
                </button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow