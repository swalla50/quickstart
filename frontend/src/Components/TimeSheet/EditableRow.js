import React, { useState } from 'react'
import { faBriefcase, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditableRow = ({ time, handleCancelClick, handleEditFormChange, editFormData }) => {

    return (

        <tr id={time.sheetId} key={time.sheetId}>
            <td>
                <input type='text' value={editFormData.myUserId} readOnly name='myUserId'></input>

            </td>
            <td>
                <input type='text' value={editFormData.fullName} readOnly name='fullName'></input>
            </td>
            <td><input type="datetime-local" required='required' id={time.sheetId} name='timeworkedIn' value={editFormData.timeworkedIn} onChange={handleEditFormChange}></input></td>
            <td><input type='datetime-local' required='required' id={time.sheetId} name='timeworkedOut' value={editFormData.timeworkedOut} onChange={handleEditFormChange}></input></td>
            <td><input type='text' value={editFormData.timeWorked} readOnly name='timeWorked'></input> Hr(s)</td>
            <td className="action-payment">
                <button className="btn btn-light mr-2 pay-btn" type='submit' >
                    <FontAwesomeIcon icon={faCheckCircle}  size='2x' /> Save
                </button>
                <button className="btn btn-light mr-2 pay-btn" type="button" onClick={handleCancelClick} >
                    <FontAwesomeIcon icon={faCheckCircle} size='2x' /> Cancel
                </button>
            </td>

        </tr>
    )

}
