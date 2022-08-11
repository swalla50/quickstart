import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { faBriefcase, faMoneyBill1Wave, faFileExcel, faBuildingColumns, faReceipt, faClock, faPlus, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Payrollfunc.css'
import moment from 'moment';
import ReadOnlyRow from './ReadOnlyRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from "xlsx";
import { Skeleton } from '@mui/material';
import SkeletonTable from '../Skeleton/SkeletonTable';


function Payrollfunc(props) {

    const [pay, setpay] = useState([]);
    const [user, setUser] = useState([]);
    const [editTime, setEditTime] = useState(null);
    const [current, setCurrent] = useState(props.current)
    const [editFormData, setEditFormData] = useState({
        sheetId: "",
        timeworkedIn: "",
        timeworkedOut: "",
    })
    const [addFormData, setAddFormData] = useState({
        timeworkedIn: "",
        timeworkedOut: "",
    })

    function handleOnExport() {
        let element = document.getElementById("payRollTable");
        var wb = XLSX.utils.book_new();

        var ws = XLSX.utils.table_to_sheet(element);
        delete (ws['O5'])

        XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
        XLSX.writeFile(wb, "PayRoll.xlsx");
    }

    const successExport = () => {
        toast.success("Exported PayRoll.xlsx Successfully!", {
            className: "export-Toast",
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: 'dark'
        });
    }

    //Add the change to form
    const handleAddFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
        console.log(newFormData);
    }


    //Grab
    useEffect(() => {
        setTimeout(() => {
            setCurrent(props.current)
            axios.get(`payroll/getpay`)
                .then((response) => {
                    const myTime = response.data;
                    setpay(response.data);

                })
                .catch((err) => {
                    console.log(err, "Unable to get user pay info");
                });
            axios.get(`UserProfile`)
                .then((res) => {
                    const myUser = res.data;
                    setUser(myUser);

                })
                .catch((err) => {
                    console.log(err, "Unable to get user pay info");
                });
        }, 4000)



    }, [props.current]);

    const onExportClick = () => {
        handleOnExport()
        successExport()
    }


    return (
        <div className='pay'>

            <><h2> Payroll </h2><div className='user-pay-table-container' >
                <div className='pay-table'>
                    <button className='excel-export' onClick={onExportClick}><FontAwesomeIcon className="excel-icon" icon={faFileExcel} size='1x' /> </button>
                    <form >
                        <table id="payRollTable" class="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Hours Worked</th>
                                    <th>Pay Per Hour</th>
                                    <th>Payment</th>
                                    <th>Pay Period</th>
                                    <th class='confirm-pay-head'>Confirm Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pay.filter(pay => pay.myUserId == user.MyUserId).map(pay => (
                                    <ReadOnlyRow pay={pay} />
                                ))}
                            </tbody>
                        </table>{pay == "" &&[1, 2, 3].map((n) => <SkeletonTable theme="dark" key={n} />)}
                    </form>

                </div>
            </div></>

        </div>
    )
}

export default Payrollfunc