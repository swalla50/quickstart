import React, { useState } from 'react'
import { faBriefcase, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faPlus, faCheckCircle, faXmark, faBoxesPacking } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditableRow = ({ item, handleCancelClick, handleEditFormChange, editFormData }) => {

    return (

        <tr id={item.vendorId} key={item.vendorId} className="content-bar">
            <td >
                <input className="inv-edit-input" type='text' value={editFormData.vendorId} readOnly name='VendorID'></input>

            </td>
            <td >
                <input className="inv-edit-input" type='text' value={editFormData.vendorName}  onChange={handleEditFormChange} name='vendorName'></input>
            </td>
            <td >
                <select className="inv-edit-input" type='text' value={editFormData.vendorType}  onChange={handleEditFormChange} name='vendorType'>
                    <option>{editFormData.vendorType}</option>
                    <option>Technology</option>
                    <option>Office Supply</option>
                    <option>Logistics</option>
                    <option>Retailer</option>
                    <option>B2B</option>
                    <option>B2G</option>
                </select>
            </td>
            <td >
                <input className="inv-edit-input" type='text' value={editFormData.itemCode}  step="0.01" min="0.00" onChange={handleEditFormChange} name='itemCode'></input>
            </td>
            <td >
                <input className="inv-edit-input" type='email' value={editFormData.vendorEmail}  step="0.01" min="0.00" onChange={handleEditFormChange} name='vendorEmail'></input>
            </td>
            <td  >
                <input className="inv-edit-input" type='phone' value={editFormData.vendorPhone}  onChange={handleEditFormChange} name='vendorPhone'></input>
            </td>
            <td  >
            <input className="inv-edit-input" type='text' value={editFormData.vendorContact}  onChange={handleEditFormChange} name='vendorContact'></input>
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