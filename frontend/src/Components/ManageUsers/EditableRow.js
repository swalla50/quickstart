import React, { useState } from 'react'
import { faBriefcase, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faPlus, faCheckCircle, faXmark, faBoxesPacking } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditableRow = ({ item, handleCancelClick, handleEditFormChange, editFormData }) => {

    return (

        <tr id={item.myUserId} key={item.myUserId} className="content-bar">
            <td >
                <img style={{ height: '35px', borderRadius: '50%' }} src={`${'https://webapi20220126203702.azurewebsites.net/images/' + item.userPic}`} />
            </td>
            <td >
                <input className="inv-edit-input" disabled type='text' value={editFormData.myUserId} onChange={handleEditFormChange} name='myUserId'></input>
            </td>
            <td >
                <input className="inv-edit-input" type='text' value={editFormData.FullName} onChange={handleEditFormChange} name='FullName'></input>
            </td>
            <td >
                <input className="inv-edit-input" type='text' value={editFormData.UserName}  onChange={handleEditFormChange} name='PhoneNumber'></input>
            </td>
            <td >
                <input className="inv-edit-input" type='phone' value={editFormData.PhoneNumber}  onChange={handleEditFormChange} name='PhoneNumber'></input>
            </td>
            <td >
                <input className="inv-edit-input" type='email' value={editFormData.Email}  onChange={handleEditFormChange} name='Email'></input>
            </td>
            <td  >
                <input className="inv-edit-input" type='text' value={editFormData.Company} onChange={handleEditFormChange} name='Company'></input>
            </td>
            <td  >
                <select className="inv-edit-input" type='text' value={editFormData.UserRole} onChange={handleEditFormChange} name='UserRole'>
                    <option>Admin</option>
                    <option>User</option>
                </select>
            </td>

            <td className="btncontainer">
                <button className="cbbtn" type="button" onClick={handleCancelClick} >
                    <FontAwesomeIcon className="project-done-icon" icon={faXmark} size='1x' />
                </button>
                <button className="cbbtn" type='submit' >
                    <FontAwesomeIcon className="project-done-icon" icon={faCheckCircle} size='1x' />
                </button>

            </td>

        </tr>
    )

}