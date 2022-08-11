import React, { useState } from 'react'
import { faBriefcase, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faPlus, faCheckCircle, faXmark, faBoxesPacking } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditableRow = ({ item, handleCancelClick, handleEditFormChange, editFormData }) => {

    return (

        <tr id={item.InventoryID} key={item.InventoryID} class="content-bar">
            <td >
                <input className="inv-edit-input" type='text' value={editFormData.InventoryID} readOnly name='InventoryID'></input>

            </td>
            <td >
                <input className="inv-edit-input" type='text' value={editFormData.InventoryName}  onChange={handleEditFormChange} name='InventoryName'></input>
            </td>
            <td >
                <textarea className="inv-edit-input" type='text' value={editFormData.InventoryDescription}  onChange={handleEditFormChange} name='InventoryDescription'></textarea>
            </td>
            <td >
                <input className="inv-edit-input" type='text' value={editFormData.InventorySerialNumber}  step="0.01" min="0.00" onChange={handleEditFormChange} name='InventorySerialNumber'></input>
            </td>
            <td >
                <input className="inv-edit-input" type='number' value={editFormData.InventoryCost}  step="0.01" min="0.00" onChange={handleEditFormChange} name='InventoryCost'></input>
            </td>
            <td  >
                <div className="inv-edit-input"  name='NumofInventory'><FontAwesomeIcon className="project-done-icon" icon={faBoxesPacking} size='1x' /> {editFormData.NumofInventory} items</div>
            </td>
            <td  >
                <input className="inv-edit-input" type='datetime-local' value={editFormData.LastModified} readOnly  name='LastModified'></input>
            </td>
            <td class="btncontainer">
                <button class="cbbtn" type="button" onClick={handleCancelClick} >
                    <FontAwesomeIcon className="project-done-icon" icon={faXmark} size='1x' />
                </button>
                <button class="cbbtn" type='submit' >
                    <FontAwesomeIcon className="project-done-icon" icon={faCheckCircle} size='1x' />
                </button>
                
            </td>

        </tr>
    )

}