import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { faBriefcase,faMoneyBill1Wave,faBuildingColumns,faReceipt,faClock,faPlus, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TimeSheetfunc.css'
import moment from 'moment';

function TimeSheetfunc() {

    
    const [timesheet, settimesheet] = useState([]);
    const [user, setUser] = useState([])
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

   function getUserTime(){
        axios.get(`timesheet/gettimesheet`)
            .then((response) => {
                const myTime = response.data;
                settimesheet(response.data);

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }

    const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric'};

     let value;

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
            })
            .catch(err =>{
                console.log(err);
            })
            getUserTime();
          }catch(err){
              console.log(err)
          }

        
      }
      

   

  return (
            <div className='Timesheet'>
                
                <><h2> Time-Sheet </h2><button className="add-time-btn"><FontAwesomeIcon icon={faPlus} size='2x' /></button><div className='user-pay-table-container'>
                        <div className='pay-table'>
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
                                    <tr id={time.sheetId} key={time.sheetId}>
                                        <td>{time.myUserId}</td>
                                        <td>{time.fullName}</td>
                                        <td><FontAwesomeIcon icon={faClock} size='1x' />{new Date(time.timeworkedIn).toLocaleDateString(undefined, options)}</td>
                                        <td><FontAwesomeIcon icon={faClock} size='1x' />{new Date(time.timeworkedOut).toLocaleDateString(undefined, options)}</td>
                                        <td><FontAwesomeIcon icon={faClock} size='1x' />{time.timeWorked} Hr(s)</td>
                                        <td className="action-payment">
                                            <button className="btn btn-light mr-2 pay-btn" type="button">
                                                <FontAwesomeIcon icon={faPencil} size='2x' />
                                            </button>
                                            <button id={time.sheetId} onClick={()=>onquickupdate(time.sheetId)} className="btn btn-light mr-2 pay-btn"><FontAwesomeIcon icon={faBriefcase} size='2x' /> Clock-Out</button>
                                        </td>

                                    </tr>
                                ))}

                                </tbody>
                            </table>


                        </div>
                    </div></>

          </div>
  )
}

export default TimeSheetfunc