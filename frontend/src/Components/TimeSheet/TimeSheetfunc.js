import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { faBriefcase, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faPlus, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TimeSheetfunc.css'
import moment from 'moment';
import ReadOnlyRow from './ReadOnlyRow';
import { EditableRow } from './EditableRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TimeSheetfunc() {

    const [timesheet, settimesheet] = useState([]);
    const [user, setUser] = useState([]);
    const [editTime, setEditTime] = useState(null);
    const [editFormData, setEditFormData] = useState({
        sheetId: "",
        timeworkedIn: "",
        timeworkedOut: "",
    })
    const [addFormData, setAddFormData] = useState({
        timeworkedIn: "",
        timeworkedOut: "",
    })

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

        axios.get(`timesheet/gettimesheet`)
            .then((response) => {
                const myTime = response.data;
                settimesheet(response.data);

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`UserProfile`)
            .then((res) => {
                const myUser = res.data;
                setUser(myUser);

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

    }, []);

    //getting the user's time
    function getUserTime() {
        axios.get(`timesheet/gettimesheet`)
            .then((response) => {
                const myTime = response.data;
                settimesheet(response.data);

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }



    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedTime = {
            sheetId: editTime,
            timeworkedIn: editFormData.timeworkedIn,
            timeworkedOut: editFormData.timeworkedOut

        }
        axios.put('addtimesheet/updateTime', editedTime)
            .then(res => {
                console.log("edited time", res.data)
                getUserTime();
                toast.success("Updated Time Sheet Successfully!",{
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 15000
                   });
            })
            .catch(err => {
                console.log(err);
            })
        setEditTime(null);
       

    }
    //updating a new time for user
    const onAddTime = async () => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }

        await axios.get(`UserProfile`, config)
            .then(() => {

                console.log(user)

                var timevalue = {
                    fullName: user.fullName,
                    timeworkedIn: moment().format('YYYY-MM-DDTHH:mm:ss'),
                    timeworkedOut: null,
                    payperHour: user.payperHour,
                    myUserId: user.myUserId

                }
                axios.post('AddTimeSheet/addTimeitem', timevalue)
                    .then(() => {
                        getUserTime();
                    })
                    .catch(err => {
                        console.log(err);
                    })



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

    }

    //Cancel Edit
    const handleCancelClick = () => {
        setEditTime(null);
      };

    //For the click to edit
    const handleEditClick = (event, time) => {
        event.preventDefault();
        setEditTime(time.sheetId);

        const formValues = {
            myUserId: time.myUserId,
            fullName: time.fullName,
            timeworkedIn: time.timeworkedIn,
            timeworkedOut: time.timeworkedOut,
            timeWorked: time.timeWorked
        }
        setEditFormData(formValues);
    }
    const onquickupdate = async (timeval) => {
        var timeval = {
            sheetId:  timeval,
            timeworkedOut: moment().format('YYYY-MM-DDTHH:mm:ss'),
          } 
          try{
            await axios.put('quickaddtime/quickupdatetime',  timeval)
            .then(res => {
                let newTime = res.data;
                
                res.data.timeworkedOut = moment().format('YYYY-MM-DDTHH:mm:ss')
                
                console.log("newTime:", newTime);
                getUserTime();
            })
            .catch(err =>{
                console.log(err);
            })
            
          }catch(err){
              console.log(err)
          }

        
      }

    return (
        <div className='Timesheet'>

            <><h2> Time-Sheet </h2><button className="add-time-btn"><FontAwesomeIcon icon={faPlus} size='2x' onClick={() => onAddTime()} /></button><div className='user-pay-table-container' >
                <div className='pay-table'>
                    <form onSubmit={handleEditFormSubmit}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Time-In</th>
                                    <th>Time-Out</th>
                                    <th>Hours</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timesheet.filter(timesheet => timesheet.myUserId == user.myUserId).map(time => (
                                    <>
                                        {editTime === time.sheetId ? (
                                            <EditableRow time={time} editFormData={editFormData} handleEditFormChange={handleEditFormChange}  handleCancelClick={handleCancelClick} />
                                        ) : (
                                            <ReadOnlyRow getUserTime={getUserTime} time={time} onquickupdate={onquickupdate} handleEditClick={handleEditClick} />
                                        )}
                                    </>
                                ))}

                            </tbody>
                        </table>
                    </form>

                </div>
            </div></>

        </div>
    )
}

export default TimeSheetfunc