import React, { useState } from 'react'
import { faTrashCan, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faPlus, faPencil, faDollarSign, faBoxesPacking } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';


const ReadOnlyRow = ({item, handleEditClick}) => {

    const [timesheet, settimesheet] = useState([]);
    const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

    return (
        <tr style={{height:"50px"}} id={item.InventoryID} class="content-bar">
            <td class="itemnum">{item.InventoryID}</td>
            <td class="itemtitle">{item.InventoryName}</td>
            <td class="itemtitle">{item.InventoryDescription}</td>
            <td class="itemnum">{item.InventorySerialNumber}</td>
            <td class="itemprice"><FontAwesomeIcon className="project-done-icon" icon={faDollarSign} size='1x' />{item.InventoryCost} ea.</td>
            <td class="itemstock"><p className='numinstock'><FontAwesomeIcon className="project-done-icon" icon={faBoxesPacking} size='1x' />{item.NumofInventory}</p> Items</td>
            <td class="itemtitle">{new Date(item.LastModified).toLocaleDateString(undefined, options)}</td>
            <td class="btncontainer">
                <button class="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faTrashCan} size='1x' /></button>
                <button onClick={(event)=> handleEditClick(event, item)}  class="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' /></button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow