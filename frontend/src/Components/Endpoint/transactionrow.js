import React, {useState}from 'react'
import { faBriefcase,faMoneyBill1Wave,faBuildingColumns,faReceipt,faClock,faDollarSign,faPlus, faPencil, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';


const Transactionrow = ({e}) => {

   
    return (
        <tr >
            <td>{e.name}</td>
            <td>{e.amount}</td>
            <td>{e.date}</td>
        </tr>
    )
}

export default Transactionrow