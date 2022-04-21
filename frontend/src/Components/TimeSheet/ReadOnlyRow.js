import React, {useState}from 'react'
import { faBriefcase,faMoneyBill1Wave,faBuildingColumns,faReceipt,faClock,faPlus, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';


const ReadOnlyRow = ({time, handleEditClick}) => {

    const [timesheet, settimesheet] = useState([]);
    const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric'};
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
            getUserTime();
          }catch(err){
              console.log(err)
          }
          getUserTime();
        
      }
    return (
        <tr id={time.sheetId} key={time.sheetId}>
            <td>{time.myUserId}</td>
            <td>{time.fullName}</td>
            <td><FontAwesomeIcon icon={faClock} size='1x' />{new Date(time.timeworkedIn).toLocaleDateString(undefined, options)}</td>
            <td><FontAwesomeIcon icon={faClock} size='1x' />{new Date(time.timeworkedOut).toLocaleDateString(undefined, options)}</td>
            <td><FontAwesomeIcon icon={faClock} size='1x' />{time.timeWorked} Hr(s)</td>
            <td className="action-payment">
                <button className="btn btn-light mr-2 pay-btn" type="button" onClick={(event)=> handleEditClick(event, time)} >
                    <FontAwesomeIcon icon={faPencil} size='2x' />
                </button>
                <button id={time.sheetId} onClick={() => onquickupdate(time.sheetId)} className="btn btn-light mr-2 pay-btn"><FontAwesomeIcon icon={faBriefcase} size='2x' /> Clock-Out</button>
            </td>

        </tr>
    )
}

export default ReadOnlyRow