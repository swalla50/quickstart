


import React, { useCallback, useState, useMemo, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import { Tooltip } from 'bootstrap';
import moment from 'moment'
import EditEventModal from './EditEventModal';
import { ToastContainer } from 'react-toastify';
import { join } from 'path';



// import DemoLink from '../../DemoLink.component'
// import events from '../../resources/events'
// CreateEventWithNoOverlap.propTypes = {
//   localizer: PropTypes.instanceOf(DateLocalizer),
//   dayLayoutAlgorithm: PropTypes.string,
// }
function CreateEventWithNoOverlap(props) {
    const [TasktList, setTaskList] = useState([]);
    const [ProjectList, setProjectList] = useState([]);
    const [joinedList, setjoinedList] = useState([]);
    // var joinedList = [];
    const [EditEventWindow, setEditEventWindow] = useState(false);
    const [EventInfo, setEventInfo] = useState([]);
    const [EventType, setEventType] = useState("");
    let tooltipInstance = null;

    var taskList = [];
    var projectList = [];
    var clientid = 0;

    var tempproj = [];
    var projDueDate = [];
    useEffect(() => {
        
        setjoinedList([])
        clientid = props.clientid;
        //      taskList =[];
        //      projectList=[];


        //         axios.get(`gettasks/gettaskList`)
        //             .then((response) => {(async) =>{
        //                 // setjoinedList([])
        //                 var temptask = response.data.filter(proj => proj.TaskDeleted == false)
        //                 var taskDueDate = response.data.filter(proj => proj.TaskDeleted == false)
        //                 console.log("new data",response.data.filter(proj => proj.TaskDeleted == false))
        //                 for (var i = 0; i <= temptask.length; i++) {
        //                     // temptask[i].DueDate = moment(temptask[i].DueDate).format('YYYY-MM-DD')
        //                     taskList[i] = {
        //                         id: temptask[i].TaskID,
        //                         title: `${'Task: ' + temptask[i].TaskName}`,
        //                         start: temptask[i].DueDate,
        //                         end: temptask[i].DueDate,
        //                         extendedProps: {
        //                             description: `${'Due: ' + temptask[i].DueDate}`,
        //                             dueDate: taskDueDate[i].DueDate,
        //                             maxDateLimit: taskDueDate[i].projectDueDate,
        //                             assignee: taskDueDate[i].TaskCompleter,
        //                             completed: taskDueDate[i].TaskCompleted,
        //                             taskname: taskDueDate[i].TaskName
        //                         },
        //                         allDay:false,
        //                         color: '#4ff68a',
        //                         type: 'task'
        //                     }
        //                     taskList.push(taskList[i])
        //                     // console.log("APPEND TASK",taskList)
        //                     taskList = taskList

        //                     setTaskList(taskList)
        //                     // joinedList.push(...TasktList)
        //                 }


        //             })
        //             .catch((err) => {
        //                 console.log(err, "Unable to get user time info");
        //             });
        //         axios.get(`addproject/newproject`)

        //             .then((response) => {
        //                 var tempproj = response.data.filter(proj => proj.isDeleted == false)
        //                 var projDueDate = response.data.filter(proj => proj.isDeleted == false)
        //                 console.log("DUE DATE PROJ", response.data.filter(proj => proj.isDeleted == false))
        //                 for (var i = 0; i <= tempproj.length; i++) {
        //                     // tempproj[i].projectDueDate = moment(tempproj[i].projectDueDate).format('YYYY-MM-DD')
        //                     projectList[i] = {
        //                         id: tempproj[i].projectID,
        //                         title: `${'Project: ' + tempproj[i].projectName}`,
        //                         start: tempproj[i].projectDueDate,
        //                         end: tempproj[i].projectDueDate,
        //                         extendedProps: {
        //                             description: `${'Due: ' + tempproj[i].projectDueDate}`,
        //                             dueDate: projDueDate[i].projectDueDate,
        //                             maxDateLimit: projDueDate[i].projectDueDate

        //                         },
        //                         allDay:false,
        //                         color: '#76828e',
        //                         textColor: 'white',
        //                         type: 'project',

        //                     }

        //                     projectList.push(projectList[i])
        //                     projectList = projectList
        //                     // joinedList.push(projectList[i])
        //                     setProjectList(projectList)
        //                     // joinedList.push(...ProjectList)
        //                 }
        // // setjoinedList([...TasktList,...ProjectList])
        // // console.log("New LIST",joinedList)
        //             })
        //             .catch((err) => {
        //                 console.log(err, "Unable to get user time info");
        //             });    
        async function getCalendarData() {

        taskList = [];
        projectList = [];
        // joinedList = []

        await axios.get(`gettasks/gettaskList`)
            .then((response) => {
               
                var temptask = response.data.filter(proj => proj.TaskDeleted == false && proj.clientId == clientid)
                var taskDueDate = response.data.filter(proj => proj.TaskDeleted == false  && proj.clientId == clientid)
                for (var i = 0; i <= temptask.length; i++) {
                    // temptask[i].DueDate = moment(temptask[i].DueDate).format('YYYY-MM-DD')
                    taskList[i] = {
                        id: temptask[i].TaskID,
                        title: `${'Task: ' + temptask[i].TaskName}`,
                        start: temptask[i].DueDate,
                        end: temptask[i].DueDate,
                        extendedProps: {
                            description: `${'Due: ' + temptask[i].DueDate}`,
                            dueDate: taskDueDate[i].DueDate,
                            maxDateLimit: taskDueDate[i].projectDueDate,
                            assignee: taskDueDate[i].TaskCompleter,
                            completed: taskDueDate[i].TaskCompleted,
                            taskname: taskDueDate[i].TaskName
                        },
                        allDay: false,
                        color: '#4ff68a',
                        type: 'task'
                    }
                    taskList.push(taskList[i])
                    // joinedList.push(taskList[i])
                    setTaskList(taskList)
                    // joinedList.push(...TasktList)
                }


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        await axios.get(`addproject/newproject`)

            .then((response) => {
                // console.log("TEMP INFO",response.data.filter(proj => proj.isDeleted == false && proj.clientId == clientid))
                var tempproj = response.data.filter(proj => proj.isDeleted == false && proj.clientId == clientid)
                var projDueDate = response.data.filter(proj => proj.isDeleted == false && proj.clientId == clientid)
                // console.log("DUE DATE PROJ", response.data.filter(proj => proj.isDeleted == false))
                for (var i = 0; i <= tempproj.length; i++) {
                    // tempproj[i].projectDueDate = moment(tempproj[i].projectDueDate).format('YYYY-MM-DD')
                    projectList[i] = {
                        id: tempproj[i].projectID,
                        title: `${'Project: ' + tempproj[i].projectName}`,
                        start: tempproj[i].projectDueDate,
                        end: tempproj[i].projectDueDate,
                        extendedProps: {
                            description: `${'Due: ' + tempproj[i].projectDueDate}`,
                            dueDate: projDueDate[i].projectDueDate,
                            maxDateLimit: projDueDate[i].projectDueDate

                        },
                        allDay: false,
                        color: '#76828e',
                        textColor: 'white',
                        type: 'project',

                    }

                    projectList.push(projectList[i])
                    setjoinedList([...projectList,...taskList])
                    setProjectList(projectList)   
                    // console.log("New LIST", joinedList)
                    // joinedList.push(...ProjectList)
                }


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

     
  

    }
        getCalendarData()
// console.log("TASK EVENTS", joinedList)
    }, [props.show]);




    const onCalendarEvent = (info) => {
        setEventInfo(info.event)
        setEventType(info.event.extendedProps)
        setEditEventWindow(true)

        console.log(info.event)

    };


    
    function handleEditEvent() {
        setEditEventWindow(false)
        // getCalendarData();
    }
    const handleMouseEnter = (info) => {
        if (info.event.extendedProps.description) {
            tooltipInstance = new Tooltip(info.el, {
                title: info.event.extendedProps.description,
                html: true,
                placement: "top",
                trigger: "hover",
                container: "body"
            });

            tooltipInstance.show();
        }
    };

    const handleMouseLeave = (infoo) => {
        if (tooltipInstance) {
            tooltipInstance.dispose();
            tooltipInstance = null;
        }
    };

    // console.log("Event",joinedList)
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-width-projCal"
            contentClassName="modal-height-projCal"
            onHide={() => { props.onHide(); }}
        // onShow={() => getCalendarData()}
        >
            <ToastContainer />

            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <>
                    {/* <DemoLink fileName="createEventWithNoOverlap">
        <strong>
          Click an event to see more info, or drag the mouse over the calendar
          to select a date/time range.
          <br />
          The events are being arranged by `no-overlap` algorithm.
        </strong>
      </DemoLink> */}
                    <FullCalendar
                        nextDayThreshold={'24:00:00'}
                        eventClick={onCalendarEvent}
                        dayMaxEvents={1}
                        events={joinedList}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            center: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                    />
                </>

            </Modal.Body>
            <EditEventModal
                id="inventory-modal-modal"
                show={EditEventWindow}
                Info={EventInfo}
                onHide={()=>{handleEditEvent()}}
                Type={EventType} />

        </Modal>

    )
}

export default CreateEventWithNoOverlap

