import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import animationData from '../../assets/animations/89438-blue-loadingg.json'
import { Button, Form, Modal } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import Lottie from 'react-lottie-player';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ExpandMoreOutlined } from '@material-ui/icons';
import SkeletonTable from '../Skeleton/SkeletonTable';
import moment from 'moment';
import { faCheckCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Grid,
    TextField,
    Card,
    CardContent,
    Typography,
    Checkbox,
    Autocomplete,
    Chip,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    ListItemText,
    Paper,
    Stack
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Input } from '@material-ui/core';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
};

function AddTeamModal(props) {

    const [TeamList, setTeamList] = useState([]);
    const [selectedClient, setselectedClient] = useState([]);
    const [TeamMemberList, setTeamMemberList] = useState([]);
    const [NewTeam, setNewTeam] = useState("");

    //Grab
    // useEffect(() => {
    //     setTeamList([])

    //     axios.get(`getteams/getTeamList`)
    //         .then((response) => {
    //             setTeamList(response.data.filter(i => i.clientID == props.client));

    //         })
    //         .catch((err) => {
    //             console.log(err, "Unable to get user list");
    //         });
    //     axios.get(`getvendor/getvendorList`)
    //         .then((response) => {
    //             setselectedClient(response.data.filter(i => i.vendorId == props.client));



    //         })
    //         .catch((err) => {
    //             console.log(err, "Unable to get user list");
    //         });
    //     axios.get(`getteammembers/getTeamMembersList`)
    //         .then((response) => {
    //             setTeamMemberList(response.data.filter(i => i.clientId == props.client));



    //         })
    //         .catch((err) => {
    //             console.log(err, "Unable to get user list");
    //         });



    // }, [props.show, props.client]);

    function onAddProjectTeam() {
        const newTeamObj = {
            PTeamName: NewTeam,
            PTeamIsActive: true,
            clientID: props.object[0].vendorId
        }


        axios.post(`AddTeam/AddTeam`, newTeamObj)
            .then((response) => {
                toast.success(`${"New Team Added: " + NewTeam}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: 'dark'
                });
                // console.log('TEAM SUBMIT', newTeamObj)
            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });

        props.onHide()

    }


    // console.log("Selected Client", selectedClient, TeamList, props.object)

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={props.onHide}
        // dialogClassName="modal-width-AddTeam"
        // contentClassName="modal-height-AddTeam"
        >
            <ToastContainer />

            <Modal.Header closeButton>
                <div className='manage-team-header-container'>
                    Add New Team For {selectedClient.map(i => (<>{i.vendorName}</>))} Projects
                </div>
            </Modal.Header>
            <Modal.Body>
                <Form className='add-project-form'>
                    {/* <label className='project-title'> Project Name </label>
                    <input id="title-input" onChange={(e) => onProjectName(e.target.value)} type='text' className='title-input' /> */}

                    <FormControl>
                        <label id="demo-multiple-name-label">New Team's Name</label>
                        <Input onChange={(e) => setNewTeam(e.target.value)} style={{ width: '100%' }} type='text' className='inpt-TeamName' />
                        {/* <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Associated Client" />}
                            MenuProps={MenuProps}
                        >
                            {companylist.map((name) => (
                                <MenuItem
                                    key={name.vendorId}
                                    value={name.vendorId.toString()}
                                    style={getStyles(name.vendorName, personName, theme)}
                                >
                                    {name.vendorName}
                                </MenuItem>
                            ))}
                        </Select> */}
                    </FormControl>

                    {/* <div className='tasks-container'>
                        <label className='project-title'> Project Tasks: </label>
                        {Tasks.map((singleTask, index) => (
                            <div key={index} className='first-division'>
                                <div className='task-input-group'>
                                    <label className='TaskName-label'> Task Name </label>
                                    <input value={singleTask.TaskName} onChange={(e) => handleTaskNameChange(e, index)} name="TaskName" type="text" id="task" required />

                                    <label className='TaskCompleter-label'> Task Assigned </label>
                                    <select value={singleTask.TaskCompleter} onChange={(ea) => handleTaskAssigneeChange(ea, index)} name="TaskCompleter" type="select" id="taskCompleter" required >
                                        <option value={null}> </option>
                                        {assigneeList.map((item) => (

                                            <option value={item.myUserId}>{item.FullName}</option>

                                        ))}
                                    </select>

                                    {Tasks.length - 1 === index && Tasks.length < 5 &&
                                        (
                                            <button type='button' onClick={handleTaskAdd} className='add-task-btn'>
                                                <span>Add a Task</span><FontAwesomeIcon className="task-add-icon" icon={faCheckCircle} size='1x' />
                                            </button>
                                        )}
                                </div>
                                <div className="second-division">
                                    {Tasks.length > 1 && (
                                        <button onClick={() => handleTaskRemove(index)} type='button' className='rmv-task-btn'>
                                            <FontAwesomeIcon className="task-rmv-icon" icon={faTrashCan} size='1x' />
                                        </button>
                                    )}
                                </div>

                            </div>
                        ))

                        }
                    </div> */}
                    <button type="button" onClick={() => onAddProjectTeam()} className='submit-project-form'>Add Team</button>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddTeamModal