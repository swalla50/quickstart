import { faCheckCircle, faListCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProjectModal.css'
import moment from 'moment'

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

function ProjectModal(props) {

    const [Tasks, setTasks] = useState([{ task: "" }]);
    const [assigneeList, setAssigneeList] = useState([]);
    const [newprojName, setnewprojName] = useState("");
    const [newprojDetail, setnewprojDetail] = useState("");
    const [projectList, setProjectList] = useState([]);
    const [newprojDueDate, setnewprojDueDate] = useState("");
    const [companylist,setcompanylist] = useState([]);
    const [newClientId ,setnewClientId] = useState(0);

    //Grab
    useEffect(() => {

        axios.get(`userlist/userlist`)
            .then((response) => {
                setAssigneeList(response.data);

            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });

            axios.get(`getvendor/getvendorList2`)
            .then((response) => {
                // setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true));
                setcompanylist(response.data.filter(ven => ven.isActiveVendor == true && ven.isCompany == true))
                // console.log('vendors: ', response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });

    }, []);

    const handleTaskAdd = () => {
        setTasks([...Tasks, { task: "" }])
    }

    const handleTaskRemove = (index) => {
        const list = [...Tasks]
        list.splice(index, 1);
        setTasks(list)
    }

    // const onSubmit = () => {

    //     console.log("This is the new project: ",submittedProj)
    // }
    useEffect(() => {

        axios.get(`getproject/getprojectList`)
            .then((response) => {
                setProjectList(response.data);


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

    }, []);

    const onAddProject = async () => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }

        var submittedProj =
        {
            projectName: newprojName,
            projectDescription: newprojDetail,
            MostRecentTask: "No Tasks Completed Yet",
            LastTaskCompleter: "N/A",
            progress: 0,
            isDeleted: false,
            clientId: newClientId,
            projectDueDate: newprojDueDate
        }
        axios.post('addproject/addProject', submittedProj,)
            .then(res => {
                console.log("This is the new project: ", res.data)

                document.getElementById("description-input").value = "";
                document.getElementById("title-input").value = "";
                toast.success(`${"New Project: " + newprojName + " Added Successfully!"}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: 'dark'
                });
            })
            .catch(err => {
                console.log(err);
            })
        axios.get(`getproject/getprojectList`)
            .then((response) => {
                setProjectList(response.data);


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        props.onHide();
        console.log("NEW PROJ", submittedProj)
    }

    const handleTaskNameChange = (e, index) => {
        const { name, value } = e.target
        const list = [...Tasks];
        list[index][name] = value;
        setTasks(list)
        console.log("modal taks", Tasks)
    }

    const handleTaskAssigneeChange = (ea, index) => {
        const { name, value } = ea.target
        const list = [...Tasks];
        list[index][name] = value;
        setTasks(list)
    }

    const onProjectName = (pName) => {
        setnewprojName(pName);
    }

    const onProjectDetail = (pDetail) => {
        setnewprojDetail(pDetail);
    }
    const onProjectDueDate = (pDueDate) => {
        setnewprojDueDate(pDueDate);
    }
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        setnewClientId(value)
        console.log("Value", personName[0])
    };


    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ToastContainer />

            <Modal.Header closeButton>
                Add A New Project <FontAwesomeIcon className="project-done-icon" icon={faListCheck} size='1x' />
            </Modal.Header>
            <Modal.Body>
                <form className='add-project-form'>
                    <label className='project-title'> Project Name </label>
                    <input id="title-input" onChange={(e) => onProjectName(e.target.value)} type='text' className='title-input' />

                    <label className='project-title'> Project Description </label>
                    <textarea id="description-input" onChange={(e) => onProjectDetail(e.target.value)} className='description-input' />
                    <label className='project-title'> Project Due Date </label>
                    <input type='datetime-local' id="description-input" onChange={(e) => onProjectDueDate(e.target.value)} className='description-input' />
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Associated Client</InputLabel>
                        <Select
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
                        </Select>
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
                    <button type="button" onClick={(e) => onAddProject(e)} className='submit-project-form'>Add Project</button>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProjectModal