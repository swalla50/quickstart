


import React, { useCallback, useState, useMemo, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, DropdownButton, Dropdown, Card } from 'react-bootstrap';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Tooltip } from 'bootstrap';
import moment from 'moment'
import { Label } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faDiagramProject, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import animationData from '../../assets/animations/97238-blue-arrow.json'
import Lottie from 'react-lottie-player';
import { toast } from 'react-toastify';



// import DemoLink from '../../DemoLink.component'
// import events from '../../resources/events'
// CreateEventWithNoOverlap.propTypes = {
//   localizer: PropTypes.instanceOf(DateLocalizer),
//   dayLayoutAlgorithm: PropTypes.string,
// }
function EditEventModal(props) {
    const [Type, setType] = useState("");
    const [TaskName, setTaskName] = useState("");
    const [TaskCompleter, setTaskCompleter] = useState(0);
    const [TaskDueDate, setTaskDueDate] = useState("");
    const [TaskCompleted, setTaskCompleted] = useState(false);
    const [Users, setUsers] = useState([]);

    let tooltipInstance = null;
    var taskList = [];
    var projectList = [];

    async function updateTask() {
        const newTaskInfo = {
            taskName: TaskName,
            taskCompleter: TaskCompleter,
            dueDate: TaskDueDate,
            taskCompleted: TaskCompleted,
            taskID: props.Info.id
        }
        console.log("UPDATED TASK", newTaskInfo)
       await axios.put('updateTasks/updateTasks', newTaskInfo,)
            .then(res => {
                console.log("This is the new project: ", res.data)

                toast.success(`${"Updated Task: " + TaskName + " Successfully!"}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: 'dark'
                });
            })
            .catch(err => {
                console.log(err);
            })

        props.onHide()
    }
    useEffect(() => {

        const assignData = async () => {
            await axios.get(`userList/userList`)
                .then((response) => {
                    setUsers(response.data.filter(user => user.isActive == true));



                })
                .catch((err) => {
                    console.log(err, "Unable to get user time info");
                });

        }
        setTaskCompleted(props.Type.completed == null ? (false) : (props.Type.completed))
        setTaskCompleter(props.Type.assignee)
        setTaskDueDate(props.Type.dueDate)
        setTaskName(props.Type.taskname)
        assignData()
            .catch(console.error)
            // console.log("COMPLETED TASK",TaskCompleted)
    }, [])

    function resetValues() {
        setTaskCompleted(TaskCompleted)
        setTaskCompleter(TaskCompleter)
        setTaskDueDate(TaskDueDate)
        setTaskName(TaskName)
    }
    async function assignData() {
        await axios.get(`userList/userList`)
            .then((response) => {
                setUsers(response.data.filter(user => user.isActive == true));


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        setTaskCompleted(props.Type.completed == null ? (false) : (props.Type.completed))
        setTaskCompleter(props.Type.assignee)
        setTaskDueDate(props.Type.dueDate)
        setTaskName(props.Type.taskname)
        // console.log("COMPLETED TASK2",TaskCompleted)
    }

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-editevent-width-invoice"
            contentClassName="modal-editevent-height-invoice"
            onHide={() => { props.onHide();resetValues()}}
        onShow={() => assignData()}
        >
            {/* <ToastContainer /> */}

            <Modal.Header closeButton>
                {props.Type.type === 'task' ? (<h2>Task</h2>) : (<h2>Project</h2>)}
            </Modal.Header>
            <Modal.Body>

                {props.Type.type === 'task' ?
                    (
                        <>
                            <div className='proj-edit-animation-container'>
                                <Lottie
                                    loop
                                    className='proj-edit-animation-object'
                                    animationData={animationData}
                                    play
                                    style={{ width: '13rem', marginLeft: '13rem' }}
                                />
                            </div>
                            <Form.Group className='Edit-Task-Form'>
                                <div className='edit-info-group'>
                                    <Form.Label className='label-title'>Task ID: </Form.Label>
                                    <p className='form-content'>{props.Info.id}</p>
                                </div>
                                <div className='edit-info-group'>
                                    <Form.Label className='label-title'>Project Due: </Form.Label>
                                    <p className='form-content'>{moment(props.Type.maxDateLimit).format('LLL')}</p>
                                </div>
                                <div className='edit-info-group'>
                                    <Form.Label className='label-title'>Task Name:</Form.Label>
                                    <Form.Control onChange={(e) => setTaskName(e.target.value)} className='form-input-edit' type="text" value={TaskName}></Form.Control>
                                </div>
                                <div className='edit-info-group'>
                                    <Form.Label className='label-title'>Due Date:</Form.Label>
                                    <Form.Control onChange={(e) => setTaskDueDate(e.target.value)} className='form-input-edit' max={props.Type.maximum} type="datetime-local" value={TaskDueDate}></Form.Control>
                                </div>
                                <div className='edit-info-group'>
                                    <Form.Label className='label-title'>Assignee:</Form.Label>
                                    <Form.Select onChange={(e) => setTaskCompleter(e.target.value)} value={TaskCompleter} className='form-input-edit' aria-label="Default select example">
                                        {Users.map(item => (
                                            <option id={item.myUserId} value={item.myUserId}>{item.FullName}</option>
                                        ))}
                                    </Form.Select>
                                </div>
                                <div className='edit-info-group'>
                                    <Form.Label className='label-title'>Completed<FontAwesomeIcon className="project-done-icon" icon={faQuestionCircle} size='1x' /></Form.Label>
                                    <Form.Check onChange={(e) => setTaskCompleted(e.target.checked)} className='form-input-edit' defaultChecked={ TaskCompleted } checked={TaskCompleted}></Form.Check>
                                </div>
                                <div style={{ padding: '3rem' }} c className='edit-info-group'>
                                    <Button onClick={updateTask} style={{ borderRadius: '10px' }} className='form-input-edit'>Change Task:{props.Info.title} </Button>
                                </div>

                            </Form.Group>
                        </>
                    )
                    :
                    (
                        <>
                            <div className='proj-edit-animation-container'>
                                <Lottie
                                    loop
                                    className='proj-edit-animation-object'
                                    animationData={animationData}
                                    play
                                    style={{ width: 150, marginLeft: '13rem' }}
                                />
                            </div>
                            <Form.Group className='Edit-Task-Form'>
                                <div className='edit-info-group'>
                                    <Form.Label className='label-title'>Project ID: </Form.Label>
                                    <p className='form-content'>{props.Info.id}</p>
                                </div>
                                <div className='edit-info-group'>
                                    <Form.Label className='label-title'>Project Due: </Form.Label>
                                    <p className='form-content'>{moment(props.Type.maxDateLimit).format('LLL')}</p>
                                </div>
                                <div className='edit-info-group'>
                                    <Form.Label className='label-title'>Task Name:</Form.Label>
                                    <Form.Control className='form-input-edit' type="text" defaultValue={props.Info.title}></Form.Control>
                                </div>
                                <div className='edit-info-group'>
                                    <Form.Label className='label-title'>Due Date:</Form.Label>
                                    <Form.Control className='form-input-edit' max={props.Type.maximum} type="datetime-local" defaultValue={props.Type.dueDate}></Form.Control>
                                </div>
                                <div className='edit-info-group'>
                                    <Button className='form-input-edit'  >Change Project:{props.Info.title} </Button>
                                </div>
                            </Form.Group>
                        </>
                    )
                }






            </Modal.Body>

        </Modal>

    )
}

export default EditEventModal