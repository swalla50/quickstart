import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faCheck, faCheckCircle, faTrashCan, faGrip, faList, faPencil, faPlus, faSave, faSquare, faSquareCheck, faXmark, faCalendarAlt, faCalendarCheck, faClock, faChartArea, faChartBar, faChartLine, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'
import moment from 'moment';
import './Projectfunc.css'
import ProjectModal from '../ProjectModal/ProjectModal'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gif from '../../../src/assets/images/icons8-double-left.gif'
import SkeletonElement from '../Skeleton/SkeletonElement';
import SkeletonProject from '../Skeleton/SkeletonProject';
import CirlceLoading from '../Skeleton/CirlceLoading';
import InProgressProjects from '../ChartJS/InProgressProjects';
import InProgressTasks from '../ChartJS/InProgressTasks';
import CreateEventWithNoOverlap from './ProjectCalendarModal';
import animationData from '../../assets/animations/124672-3arrow-right.json';
import animationDataCircle from '../../assets/animations/89438-blue-loadingg.json'

import Lottie from 'react-lottie-player';
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
import TaskGanttChart from './TaskGanttChart';
import ProjectTeamModal from '../ProjectModal/ProjectTeamModal';


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

function Projectfunc(props) {
    const [projectList, setProjectList] = useState([]);
    const [projectContent, setProjectContent] = useState("");
    const [projEdit, setProjEdit] = useState(false);
    const [projectModal, setProjectModal] = useState(false);
    const [projectTasks, setprojectTasks] = useState("");
    const [assigneeList, setAssigneeList] = useState([]);
    const [completedtasks, setcompletedtasks] = useState([{}]);
    const [companylist, setcompanylist] = useState([]);
    const [Tasks, setTasks] = useState([{ task: "" }]);
    const [newProjName, setnewProjName] = useState("");
    const [newProjDesc, setnewProjDesc] = useState("");
    const [projID, setprojID] = useState("");
    const [isChecked, setisChecked] = useState(false);
    const [isComplete, setisComplete] = useState(false);
    const [lastTask, setlastTask] = useState("");
    const [lastCompleter, setlastCompleter] = useState("");
    const [Calendar, setCalendar] = useState(false);
    const [user, setUser] = useState([]);
    const [DaysLeft, setDaysLeft] = useState(0);
    const [newclientId, setnewclientId] = useState(0);
    const [TargetedClient, setTargetedClient] = useState([]);
    const [loading, setloading] = useState(true);
    const [TeamList, setTeamList] = useState([]);
    const [current, setCurrent] = useState(props.current)
    const [newTeamID, setnewTeamID] = useState("");
    const [selectedProjectGantt, setselectedProjectGantt] = useState("");
    const [GanttProjectList, setGanttProjectList] = useState([]);
    const [projectTeamModal, setprojectTeamModal] = useState(false);

    const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const [max, setmax] = useState("");


    const onTaskDelete = (id, deleteindex) => {
        var deletedTask =
        {

            TaskDeleted: true,
            TaskID: id
        }
        handleTaskeRemove(deleteindex);
        axios.put('addtasks/deletetasks', deletedTask)
            .then(res => {


            })
            .catch(err => {
                console.log(err);
            })
        toast.error(`${"Task Deleted Successfully!"}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: 'dark'
        });

    }
    function handleCalendar() {
        setCalendar(false);
    }
    function handleshowTeam() {
        setprojectTeamModal(false);
    }

    const onChangeProject = async () => {
        var completed = 0
        for (let k = 0; k < projectTasks.length; k++) {
            if (projectTasks[k].TaskCompleted == true) {

                completed++
            }
        }
        var progress = ((completed / projectTasks.length) * 100)
        progress = Math.round(progress)


        // var lasttaskArr = []
        // for (let k = 0; k < projectTasks.length; k++) {
        //     if (projectTasks[k].TaskCompleted == true) {

        //         completed++
        //         console.log("ammount completed: ", completed)
        //     }
        // }
        for (let i = 0; i < projectTasks.length; i++) {
            if (projectTasks[i].TaskID == null) {
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }



                var submittedTask =
                {
                    TaskName: projectTasks[i].TaskName,
                    projectID: projID,
                    DueDate: projectTasks[i].DueDate,
                    BeginDate: projectTasks[i].BeginDate,
                    TaskCompleted: projectTasks[i].TaskCompleted,
                    TaskDeleted: false,
                    TaskCompleter: projectTasks[i].TaskCompleter,
                    Progress: "0",
                    isActive: true
                }
                var newprojData1 = {
                    ProjectID: projID,
                    projectName: newProjName,
                    projectDescription: newProjDesc,
                    LastTaskCompleter: lastCompleter,
                    MostRecentTask: lastTask,
                    progress: progress,
                    clientId: newclientId,
                    isDeleted: false,
                    ProjectTeamID: newTeamID
                }
                console.log(i, ":", submittedTask, newprojData1)
                axios.post('addtasks/addTask', submittedTask,)
                    .then(res => {


                    })
                    .catch(err => {
                        console.log(err);
                    })
                axios.put('updateProject/updateProject', newprojData1)
                    .then(res2 => {

                        var newprojectdata = res2.data
                        getProjecttaskData();

                    })
                    .catch(err => {

                        console.log(err);
                    })


            }
            if (projectTasks[i].TaskID != null) {

                var taskval = {
                    TaskID: projectTasks[i].TaskID,
                    TaskName: projectTasks[i].TaskName,
                    TaskCompleter: projectTasks[i].TaskCompleter,
                    DueDate: projectTasks[i].DueDate,
                    BeginDate: projectTasks[i].BeginDate,
                    TaskCompleted: projectTasks[i].TaskCompleted
                }
                var newprojData = {
                    ProjectID: projID,
                    projectName: newProjName,
                    projectDescription: newProjDesc,
                    isDeleted: isChecked,
                    progress: progress,
                    clientId: newclientId,
                    LastTaskCompleter: lastCompleter,
                    MostRecentTask: lastTask,
                    ProjectTeamID: newTeamID
                }
                console.log("TaskList", projectTasks)
                console.log(i, ":", taskval, newprojData)

                axios.put('updatetasks/updateTasks', taskval)
                    .then(res => {

                        res.data.dueDate = moment().format('YYYY-MM-DDTHH:mm:ss');
                        getProjecttaskData();

                    })
                    .catch(err => {

                        console.log(err);
                    })
                axios.put('updateProject/updateProject', newprojData)
                    .then(res2 => {

                        var newprojectdata = res2.data

                    })
                    .catch(err => {

                        console.log(err);
                    })
                if (isChecked == true) {
                    var deletedTask =
                    {

                        TaskDeleted: true,
                        projectID: projID
                    }
                    // console.log("this will be deleled", deletedTask)
                    axios.put('deletetasks/deleteprojTasks', deletedTask)
                        .then(res => {
                            console.log("This is the delted task ", res.data)
                            setProjectContent("")
                            axios.get(`getproject/getprojectList`)

                        })
                        .catch(err => {
                            console.log(err);
                        })
                }

            }

            var updatedTeamRelation = {
                PTeamID: newTeamID,
                projectID: projID
            }
            axios.put('AddProjectTeamRelationship/updateTeamRelationship', updatedTeamRelation)
                .then(res2 => {

                    var newprojectdata = res2.data
                    console.log(newprojectdata)

                })
                .catch(err => {

                    console.log(err);
                })

            closeeditProject();

            axios.get(`getTasks/getTaskList`)
                .then((response) => {
                    setProjectList(response.data);

                    axios.get(`getproject/getprojectList`)
                        .then((response) => {
                            setProjectList(response.data);


                        })
                        .catch((err) => {
                            console.log(err, "Unable to get user time info");
                        });

                })
                .catch((err) => {
                    console.log(err, "Unable to get user time info");
                });
            getProjectData(projID);
            setProjectContent(projectList.filter(proj => proj.projectID == projID));


        }

        // console.log("This is the edited project: ", newprojData)
        toast.success(`${"Project: " + newProjName + " Edited Successfully!"}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: 'dark'
        });
    }

    const onChangeProject2 = async () => {
        var completed = 0
        for (let k = 0; k < Tasks.length; k++) {
            if (Tasks[k].TaskCompleted == true) {

                completed++
                // console.log("ammount completed: ", completed)
            }
        }
        var progress = ((completed / Tasks.length) * 100)

        progress = Math.round(progress);

        console.log("no tasks", Tasks)
        for (let i = 0; i < Tasks.length; i++) {
            if (Tasks[i].TaskName && projID) {
                Tasks[i].projectID = projectContent[0].projectID

                var submittedTask2 =
                {
                    TaskName: Tasks[i].TaskName,
                    projectID: projID,
                    DueDate: Tasks[i].DueDate,
                    TaskCompleted: Tasks[i].TaskCompleted,
                    TaskDeleted: false,
                    TaskCompleter: Tasks[i].TaskCompleter,
                }
                axios.post('addtasks/addTask', submittedTask2,)
                    .then(res => {
                        console.log("This is the new project: ", res.data)


                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            var newprojData = {
                ProjectID: projID,
                projectName: newProjName,
                projectDescription: newProjDesc,
                progress: progress,
                isDeleted: isChecked,
                clientId: newclientId,
                LastTaskCompleter: lastCompleter,
                MostRecentTask: lastTask,
                ProjectTeamID: newTeamID
            }
            console.log(i, ":", submittedTask2, newprojData)

            axios.put('updateProject/updateProject', newprojData)
                .then(res2 => {

                    var newprojectdata = res2.data
                    console.log(newprojectdata)

                })
                .catch(err => {

                    console.log(err);
                })
            if (isChecked == true) {
                var deletedTask =
                {

                    TaskDeleted: true,
                    projectID: projID
                }
                console.log("this will be deleled", deletedTask)
                console.log(i, ":", submittedTask2, newprojData)

                axios.put('deletetasks/deleteprojTasks', deletedTask)
                    .then(res => {
                        console.log("This is the delted task ", res.data)
                        setProjectContent("")
                        axios.get(`getproject/getprojectList`)
                            .then((response) => {
                                setProjectList(response.data);
                                toast.error(`${"Project: " + newProjName + " has been deleted."}`, {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 5000,
                                    theme: 'dark'
                                });

                            })
                            .catch((err) => {
                                console.log(err, "Unable to get user time info");
                            });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

            var updatedTeamRelation = {
                PTeamID: newTeamID,
                projectID: projID
            }
            axios.put('AddProjectTeamRelationship/updateTeamRelationship', updatedTeamRelation)
                .then(res2 => {

                    var newprojectdata = res2.data
                    console.log(newprojectdata)

                })
                .catch(err => {

                    console.log(err);
                })
            toast.success(`${"Project: " + Tasks[i].TaskName + " Edited Successfully!"}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                theme: 'dark'
            });


            closeeditProject();





        }


    }
    //Grab gantt projects
    // useEffect(() => {

    // }, [TargetedClient]);
    //Grab
    useEffect(() => {


        setProjectList("");
        setloading(true)
        axios.get(`getproject/getprojectList`)
            .then((response) => {
                setGanttProjectList(response.data.filter(proj => proj.isDeleted == false && proj.clientId == TargetedClient));

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

        setTimeout(() => {
            // setCurrent(props.current)
            setloading(false)
            axios.get(`getproject/getprojectList`)
                .then((response) => {
                    setProjectList(response.data.filter(proj => proj.isDeleted == false && proj.clientId == TargetedClient));

                })
                .catch((err) => {
                    console.log(err, "Unable to get user time info");
                });

            axios.get(`UserProfile`)
                .then((res) => {
                    setUser(res.data)




                })
                .catch((err) => {
                    console.log(err, "Unable to get user time info");
                });
            axios.get(`gettasks/gettaskList`)
                .then((responset) => {
                    setprojectTasks(responset.data.filter(task => task.TaskDeleted == false));
                    console.log("PROJECT TASKS", responset.data.filter(task => task.TaskDeleted == false))

                })
                .catch((err) => {
                    console.log(err, "Unable to get user time info");
                });

            axios.get(`getTeamMembers/getTeamMembersList`)
                .then((res) => {
                    console.log('team members', res.data)
                    setAssigneeList(res.data);

                })
                .catch((err) => {
                    console.log(err, "Unable to get user list");
                });


            axios.get(`getvendor/getvendorList`)
                .then((response) => {
                    setcompanylist(response.data.filter(ven => ven.isActiveVendor == true && ven.isCompany == true))
                    // console.log('vendors: ', response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true))
                })
                .catch((err) => {
                    console.log(err, "Unable to get vendor time info");
                });
            axios.get(`getProjectTeams/getProjectTeams`)
                .then((response) => {
                    setTeamList(response.data)
                    // console.log('vendors: ', response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true))
                })
                .catch((err) => {
                    console.log(err, "Unable to get vendor time info");
                });

        }, 4000)

    }, [TargetedClient]);

    function handleTaskAdd(eventid2) {
        setTasks([...Tasks, { projectID: eventid2 }])
        console.log("newTask", Tasks)
    }
    function handleTaskAdde(eventid) {
        setprojectTasks([...projectTasks, { TaskID: null, projectID: eventid, TaskDeleted: false, TaskCompleted: false }])

    }

    const handleTaskRemove = (index) => {
        const list = [...Tasks]
        list.splice(index, 1);
        setTasks(list)
    }
    const handleTaskeRemove = (index) => {
        const list = [...projectTasks]
        list.splice(index, 1);
        setprojectTasks(list)
    }

    const handleTaskNameChange = (e, index) => {
        const { name, value } = e.target
        const list = [...projectTasks];
        list[index][name] = value;
        setprojectTasks(list)
    }

    const handleTaskAssigneeChange = (ea, index) => {
        const { name, value } = ea.target
        const list = [...projectTasks];
        list[index][name] = value;
        setprojectTasks(list)
    }
    const handleTaskDueDateChange = (ed, index) => {
        const { name, value } = ed.target
        const list = [...projectTasks];
        list[index][name] = value;
        setprojectTasks(list)
        console.log("NewDate", name, value, list)
    }
    const handleTaskBeginDateChange = (ed, index) => {
        const { name, value } = ed.target
        const list = [...projectTasks];
        list[index][name] = value;
        setTasks(list)
        console.log("changed tasks", list, Tasks, projectTasks)
    }
    const handleTaskNameChange2 = (eaa, index) => {
        const { name, value } = eaa.target
        const list = [...Tasks];
        list[index][name] = value;
        setTasks(list)
        console.log("newTask", Tasks)
    }
    const handleTaskAssigneeChange2 = (eaaa, index) => {
        const { name, value } = eaaa.target
        const list = [...Tasks];
        list[index][name] = value;
        setTasks(list)
    }
    const handleTaskDueDateChange2 = (ed, index) => {
        const { name, value } = ed.target
        const list = [...Tasks];
        list[index][name] = value;
        setTasks(list)
        console.log("NewDate2", name, value, list)
    }
    const handleTaskBeginDateChange2 = (ed, index) => {
        const { name, value } = ed.target
        const list = [...Tasks];
        list[index][name] = value;
        setTasks(list)
        console.log("changed tasks", list, Tasks, projectTasks)
    }

    function handleChangeChk(e) {
        let isCheckedvalue = e.target.checked;
        setisChecked(isCheckedvalue)
        // do whatever you want with isChecked value

    }
    function handleProjectNameChange(projName) {
        setnewProjName(projName)
    }
    function handleProjectDescChange(projDesc) {
        setnewProjDesc(projDesc)
    }

    function handleChangeComplete(ec, index, tn, tc) {
        const { name, checked } = ec.target
        const list = [...projectTasks];
        list[index][name] = checked;
        setprojectTasks(list)
        // var lasttaskArr = []
        // var lastTask = ""
        // for (let k = 0; k < projectTasks.length; k++) {
        //     if (projectTasks[k].TaskCompleted == true) {

        //         lasttaskArr.push(projectTasks[k].TaskName)
        //         console.log("last task: ", lasttaskArr)
        //     }
        //     lastTask= lasttaskArr[lasttaskArr.length -1]

        // }
        if (checked == true) {
            setlastTask(tn)
            setlastCompleter(tc)
        }
        // console.log("last task shown: ", lastTask)
    }
    function handleChangeComplete2(ec, index) {
        const { name, checked } = ec.target
        const list = [...Tasks];
        list[index][name] = checked;
        setprojectTasks(list)
        console.log("tasks true", Tasks)
    }


    // const openProjectModal =(props){
    //     document.getElementById(props.projectID)
    //     console.log(props.projectID)
    // }

    const handleshow = () => {
        setProjectModal(false)
        document.getElementById("project-modal-modal").value = "";
    }

    const getProjectData = (event) => {
        setProjectContent(projectList.filter(proj => proj.projectID == event));
        console.log("GET CLIENT", projectList.filter(proj => proj.projectID == event))
        getProjecttaskData(event);
        setprojID(event)
        var projDate = projectList.filter(proj => proj.projectID == event).map(item => item.projectDueDate)
        // console.log("PROJ DATE", projDate)
        timeDifference(moment().format('YYYY-MM-DD'), moment(projDate[0]).format('YYYY-MM-DD'))
        closeeditProject();

    }


    // const getprojContent =() =>{
    //     for(let i = 0; i < projectContent.length; i++){
    //         setnewProjName(projectContent[i].projectName);
    //             setnewProjDesc(projectContent[i].projectDescription);
    //             setprojID(projectContent[i].projectID)
    //             console.log("init proj name",projectContent[i].projectName)
    //     }
    // }
    var completed = 0;
    var alltasks;
    var progresscalc;
    function timeDifference(timestamp2, timestamp1) {
        var now = moment(timestamp1); //todays date
        var end = moment(timestamp2); // another date
        var duration = moment.duration(now.diff(end));
        var days = duration.asDays();


        setDaysLeft(days)
        // console.log("DIFF", days, timestamp1, timestamp2)
    }
    function getProjecttaskData(taskevent) {
        axios.get(`gettasks/gettaskList`)
            .then((responset) => {
                setprojectTasks(responset.data.filter(pTask => pTask.projectID == taskevent && pTask.TaskDeleted == false));
                setprojID(taskevent)

                setmax(projectList.filter(pTask => pTask.projectID == taskevent).map(item => item.projectDueDate))
                console.log("MAXX", max)
            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

        // setprojectTasks(projectTasks.filter(pTask => pTask.projectID == taskevent))
    }
    function editProject() {
        setProjEdit(true)
        for (let i = 0; i < projectContent.length; i++) {
            setnewProjName(projectContent[i].projectName);
            setnewProjDesc(projectContent[i].projectDescription);
            setlastTask(projectContent[i].MostRecentTask)
            setlastCompleter(projectContent[i].LastTaskCompleter)
            setnewclientId(projectContent[i].clientId)
            setprojID(projectContent[i].projectID)
            setnewTeamID(projectContent[i].ProjectTeamID)
            console.log("init proj name", projectContent)
        }
    }
    function closeeditProject() {
        setProjEdit(false)
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
        setnewclientId(value)

        console.log("CLIENTID", personName[0])
    };
    const handleChangeTeam = (event) => {

        setnewTeamID(event)

        // console.log("TEAMID", event)
    };
    // console.log("USERE LOGGED PROJ",user.Company)
    // console.log("TEAM LIST", TeamList, "PROJECT CONTENT", projectContent)
    return (
        <div className='project-func'>
            <ToastContainer />
            <div className='header-container'>
                <h2> Projects </h2>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">Associated Client</InputLabel>

                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        // value={user.Company}G
                        onChange={(e) => { setTargetedClient(e.target.value); setProjectContent(""); setselectedProjectGantt([])}}
                        input={<OutlinedInput label="Associated Client" />}
                        MenuProps={MenuProps}
                    >
                        {loading == true ?
                            (
                                <MenuItem
                                style={{placeContent:'center'}}
                                >
                                    <Lottie
                                        loop
                                        className='no-proj-animation-object'
                                        animationData={animationDataCircle}
                                        play
                                        style={{ width: 50, rotate: 180 }}
                                    />
                                </MenuItem>
                            )
                            :
                            (
                                (companylist.map((name) => (
                                    <MenuItem
                                        key={name.vendorId}
                                        value={name.vendorId}
                                        style={getStyles(name.vendorName, personName, theme)}
                                    >
                                        {name.vendorName}
                                    </MenuItem>
                                )))
                            )

                        }
                    </Select>
                </FormControl>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={1}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item className="proj-view" style={{ width: '50px' }}>
                                <Nav.Link eventKey="first"><FontAwesomeIcon className="project-done-icon" icon={faChartBar} size='2x' /></Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="proj-view" style={{ width: '50px' }}>
                                <Nav.Link eventKey="second"><FontAwesomeIcon className="project-done-icon" icon={faChartLine} size='2x' /></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={11}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <div className='Project-list-contatiner'>
                                    {/* <div className="chart-views-projects">
                    <li class="nav-list-closed"><button style={{background:'white',borderRadius:'5px',marginRight:'1rem',marginBottom:'2rem',width:'50px'}} class="toggle"><FontAwesomeIcon className="project-done-icon" icon={faChartBar} size='2x' /></button></li>
                    <li class="nav-list-closed"><button style={{background:'white',borderRadius:'5px',marginRight:'1rem',width:'50px'}} class="toggle"><FontAwesomeIcon className="project-done-icon" icon={faChartLine} size='2x' /></button></li>
                </div> */}
                                    <div className='Project-list-canvas'>
                                        <div className='project-count-container'>
                                            <div className='project-metrics-container'>
                                                <div className='projects-in-progress-container'>
                                                    <h4>Project Progress</h4>
                                                    <InProgressProjects Id={TargetedClient} className="PieChart1" />
                                                </div>
                                                <div className='projects-in-progress-container'>
                                                    <h4>Task Progress</h4>
                                                    <InProgressTasks Id={TargetedClient} className='PieChart2' />
                                                </div>
                                                <div onClick={() => setCalendar(true)} className='projects-in-progress-container-calendar'>
                                                    <FontAwesomeIcon className="project-done-icon" icon={faCalendarCheck} size='9x' />
                                                </div>
                                            </div>
                                            <div className='add-new-project-container'>
                                                {TargetedClient == "" ?
                                                    (

                                                        <><button style={{ background: 'lightgray' }} onClick={() => alert('No client is selected.')} className='Add-New-Project-disabled'>Add Project <FontAwesomeIcon className="project-done-icon" icon={faPlus} size='1x' /></button><button onClick={() => alert('No client is selected.')} style={{ background: 'lightgray' }} className='Add-New-Project-disabled'>Manage Teams <FontAwesomeIcon className="project-done-icon" icon={faUserGroup} size='1x' /></button></>

                                                    )
                                                    :
                                                    (
                                                        <><button onClick={() => setProjectModal(true)} className='Add-New-Project'>Add Project <FontAwesomeIcon className="project-done-icon" icon={faPlus} size='1x' /></button><button onClick={() => setprojectTeamModal(true)} className='Add-New-Project'>Manage Teams <FontAwesomeIcon className="project-done-icon" icon={faUserGroup} size='1x' /></button></>
                                                    )
                                                }
                                            </div>

                                            {/* <h4 className='project-count'>{projectList == "" ? <div className='loading-project-count'>{projectList == "" && <div className='project-count-circle'>(<CirlceLoading /> Projects)</div>}</div> : <div div className='loaded-project-count'>({projectList.filter(item => item.isDeleted == 0).length} Projects)</div>}</h4> */}
                                        </div>


                                        {
                                            TargetedClient == "" ?
                                                (
                                                    <>
                                                        <Tabs className='project-tabs' defaultActiveKey="Grid" id="uncontrolled-tab-example" >
                                                            <Tab eventKey="Grid" title={<FontAwesomeIcon className="project-done-icon" icon={faGrip} size='2x' />}>
                                                                <h3>No Associated Client Selected</h3>

                                                            </Tab>
                                                            <Tab eventKey="List" title={<FontAwesomeIcon className="project-done-icon" icon={faList} size='2x' />} className="list-tab">
                                                                <h3>No Associated Client Selected</h3>
                                                            </Tab>
                                                        </Tabs>
                                                    </>
                                                )
                                                :
                                                (
                                                    (projectList.length == 0 ?
                                                        (
                                                            <>

                                                                {loading == true ?
                                                                    (
                                                                        <><Tabs className='project-tabs' defaultActiveKey="Grid" id="uncontrolled-tab-example" >
                                                                            <Tab eventKey="Grid" title={<FontAwesomeIcon className="project-done-icon" icon={faGrip} size='2x' />}>

                                                                                <ul className='project-list'>
                                                                                    {projectList == "" && loading == true && [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <SkeletonProject key={n} theme="dark" />)}
                                                                                </ul>
                                                                            </Tab>
                                                                            <Tab eventKey="List" title={<FontAwesomeIcon className="project-done-icon" icon={faList} size='2x' />} className="list-tab">
                                                                                <ul className='project-list'>
                                                                                    {projectList == "" && loading == true && [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <SkeletonProject key={n} theme="dark" />)}
                                                                                </ul>
                                                                            </Tab>
                                                                        </Tabs>
                                                                        </>

                                                                    )
                                                                    :
                                                                    (
                                                                        <>
                                                                            <Tabs className='project-tabs' defaultActiveKey="Grid" id="uncontrolled-tab-example" >
                                                                                <Tab eventKey="Grid" title={<FontAwesomeIcon className="project-done-icon" icon={faGrip} size='2x' />}>
                                                                                    <h3>{companylist.filter(x => x.vendorId == TargetedClient).map(i => i.vendorName)} does not have any projects associated</h3>
                                                                                </Tab>
                                                                                <Tab eventKey="List" title={<FontAwesomeIcon className="project-done-icon" icon={faList} size='2x' />} className="list-tab">
                                                                                    <h3>{companylist.filter(x => x.vendorId == TargetedClient).map(i => i.vendorName)} does not have any projects associated</h3>
                                                                                </Tab>
                                                                            </Tabs>
                                                                        </>

                                                                    )

                                                                }


                                                            </>
                                                        )
                                                        :
                                                        (
                                                            <>
                                                                <Tabs className='project-tabs' defaultActiveKey="Grid" id="uncontrolled-tab-example" >
                                                                    <Tab eventKey="Grid" title={<FontAwesomeIcon className="project-done-icon" icon={faGrip} size='2x' />} >
                                                                        <ul className='project-list'>
                                                                            {/* Loading Data Divs */}


                                                                            {projectList == "" && [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <SkeletonProject key={n} theme="dark" />)}
                                                                            {/* Data Loaded content */}
                                                                            {projectList.filter(projectList => projectList.isDeleted == 0).map(item => (
                                                                                <li className='project-item' key={item.projectID} onClick={(e) => getProjectData(e.target.id)} id={item.projectID}>
                                                                                    <div onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-header'>{item.progress === 100 ? <><h4 className='project-name' onClick={(e) => getProjectData(e.target.id)} id={item.projectID}>{item.projectName}</h4><FontAwesomeIcon onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className="project-fin-icon" icon={faCheckCircle} size='2x' /></> : <h4 onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-name'>{item.projectName}</h4>}</div>
                                                                                    <h5 onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-description'>{item.projectDescription}</h5>
                                                                                    <p onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='last-task'>{item.MostRecentTask} : <p className='completer' onClick={(e) => getProjectData(e.target.id)} id={item.projectID} style={{ fontWeight: "bold", color: "white" }}>{item.LastTaskCompleter}</p></p>
                                                                                    <div onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='progress-container'>
                                                                                        <div onClick={(e) => getProjectData(e.target.id)} id={item.projectID} class="w3-grey" style={{ height: "10px", width: "100%", background: "white", border: "none", borderRadius: "50px" }}><span className='progress meter  animate' style={{ height: "10px", width: item.progress + "%", background: "#00dd29", paddingTop: '1px', paddingBottom: '1px' }}></span></div>
                                                                                        <p onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='progress-percent'>{item.progress}%</p>
                                                                                    </div>


                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </Tab>
                                                                    <Tab eventKey="List" title={<FontAwesomeIcon className="project-done-icon" icon={faList} size='2x' />} className="list-tab">
                                                                        <ul className='project-list-listed'>
                                                                            {projectList.filter(projectList => projectList.isDeleted == 0).map(item => (
                                                                                <li onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-item-listed' key={item.projectID}>
                                                                                    <div onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-header-listed'>{item.progress === 100 ? <><h4 className='project-name' onClick={(e) => getProjectData(e.target.id)} id={item.projectID}>{item.projectName}</h4><FontAwesomeIcon onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className="project-fin-icon" icon={faCheckCircle} size='2x' /></> : <h4 onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-name'>{item.projectName}</h4>}</div>
                                                                                    <h5 onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-description-listed'>{item.projectDescription}</h5>
                                                                                    <p onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='last-task-listed'>{item.MostRecentTask} : <p onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='completer' style={{ fontWeight: "bold", color: "white" }}>{item.LastTaskCompleter}</p></p>
                                                                                    <div onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='progress-container-listed'>
                                                                                        <div onClick={(e) => getProjectData(e.target.id)} id={item.projectID} class="w3-grey" style={{ height: "10px", width: "100%", background: "white", border: "none", borderRadius: "50px" }}><span className='progress meter  animate' style={{ height: "10px", width: item.progress + "%", background: "#00dd29", paddingTop: '1px', paddingBottom: '1px' }}></span></div>
                                                                                        <p onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='progress-percent'>{item.progress}%</p>
                                                                                    </div>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </Tab>
                                                                </Tabs>

                                                            </>
                                                        )

                                                    )

                                                )

                                        }



                                    </div >
                                    <div className='Project-content-container'>
                                        {projectContent == "" ?
                                            <div className='default-project-content'>
                                                {projectList.length == 0 ?
                                                    (
                                                        <h3> Please Add a Project</h3>
                                                    )
                                                    :
                                                    (
                                                        <h3> Please Select a Project</h3>
                                                    )

                                                }


                                                <div>
                                                    <Lottie
                                                        loop
                                                        className='no-proj-animation-object'
                                                        animationData={animationData}
                                                        play
                                                        style={{ width: 150, rotate: 180 }}
                                                    />
                                                </div>
                                            </div>
                                            :
                                            <div className='project-content-shown'>
                                                {projectContent.map((item => {
                                                    if (projEdit == false) {
                                                        return (
                                                            <div id={item.projectID} key={item.projectID} className='project-content'>
                                                                <h4 className='project-title-text'>
                                                                    {item.projectName}
                                                                    <p>Due: {moment(item.projectDueDate).format('lll')}</p><p>{DaysLeft > 0 ? (parseInt(DaysLeft) + "   Day(s) Left") : ((parseInt(DaysLeft * -1)) + "    Day(s) Past Due")}</p>
                                                                    <button className='project-edit-btn' onClick={editProject}>
                                                                        <FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' />
                                                                    </button>
                                                                </h4>
                                                                <label className='project-description-label'>
                                                                    Description
                                                                </label>
                                                                <p className='project-description'>
                                                                    {item.projectDescription}
                                                                </p>

                                                                <label className="project-task-label">
                                                                    Tasks:
                                                                </label>

                                                                {projectTasks == "" ?
                                                                    <h5>Please add tasks for this project by clicking the edit button in the top right.</h5>
                                                                    :
                                                                    <div className='project-task-list'>
                                                                        {projectTasks.map((item) => (
                                                                            <h5 className='project-task-title'>
                                                                                {item.TaskName} <p className='task-assignee'>Assigned to: {item.TaskAssignee}</p>
                                                                                {item.TaskCompleted == true ?
                                                                                    (<FontAwesomeIcon className="task-done-icon" icon={faSquareCheck} size='1x' />)
                                                                                    :
                                                                                    (<FontAwesomeIcon className="task-done-icon" icon={faSquare} size='1x' />)
                                                                                }
                                                                                {(item.DueDate < item.projectDueDate && (item.TaskCompleted == false || item.TaskCompleted == null) && item.projectDueDate > moment().format()) ?
                                                                                    (
                                                                                        <p className='task-date'>{new Date(item.DueDate).toLocaleDateString(undefined, options)}</p>
                                                                                    )
                                                                                    :
                                                                                    (
                                                                                        <></>
                                                                                    )
                                                                                }

                                                                                {(item.DueDate < item.projectDueDate && item.TaskCompleted == true) ?
                                                                                    (
                                                                                        <><FontAwesomeIcon style={{ color: '#4ff68a' }} className="task-done-icon" icon={faClock} size='1x' /><p style={{ color: '#4ff68a' }} className='task-date'>{new Date(item.DueDate).toLocaleDateString(undefined, options)}</p></>
                                                                                    )
                                                                                    :


                                                                                    (
                                                                                        <></>
                                                                                    )


                                                                                }
                                                                                {(item.DueDate < item.projectDueDate && (item.TaskCompleted == false || item.TaskCompleted == null) && item.projectDueDate < moment().format()) ?
                                                                                    (
                                                                                        <><FontAwesomeIcon style={{ color: 'red' }} className="task-done-icon" icon={faClock} size='1x' /><p style={{ color: 'red' }} className='task-date'>{new Date(item.DueDate).toLocaleDateString(undefined, options)}</p></>
                                                                                    )
                                                                                    :


                                                                                    (
                                                                                        <></>
                                                                                    )


                                                                                }
                                                                            </h5>

                                                                        ))}
                                                                    </div>
                                                                }
                                                            </div>
                                                        )
                                                    }


                                                    if (projEdit == true) {
                                                        return (
                                                            <div key={item.projectID} className='project-content'>
                                                                <button className='project-close-edit-btn' onClick={closeeditProject}>
                                                                    <FontAwesomeIcon className="project-done-icon" icon={faXmark} size='1x' />
                                                                </button>
                                                                <label className='project-description-label'>
                                                                    Project Name
                                                                </label>
                                                                <input onChange={(projName) => handleProjectNameChange(projName.target.value)} id={item.projectID} type='text' defaultValue={item.projectName} style={{ width: '100%' }} className='project-title-input' />
                                                                <label className='project-description-label'>
                                                                    Description
                                                                </label>
                                                                <p className='project-description'>
                                                                    <textarea onChange={(projDesc) => handleProjectDescChange(projDesc.target.value)} defaultValue={item.projectDescription} className='project-description-input' style={{ width: '100%' }} />
                                                                </p>
                                                                <FormControl sx={{ m: 1, width: 300 }}>
                                                                    <InputLabel id="demo-multiple-name-label">Associated Client</InputLabel>
                                                                    <Select
                                                                        labelId="demo-multiple-name-label"
                                                                        id="demo-multiple-name"
                                                                        defaultValue={item.clientId}
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
                                                                <FormControl sx={{ m: 1, width: 300 }}>
                                                                    <InputLabel id="demo-multiple-name-label">Project Team</InputLabel>
                                                                    <Select
                                                                        labelId="demo-multiple-name-label"
                                                                        id="demo-multiple-name"
                                                                        defaultValue={item.ProjectTeamID}
                                                                        onChange={(e) => handleChangeTeam(e.target.value)}
                                                                        input={<OutlinedInput label="Project Team" />}
                                                                        MenuProps={MenuProps}
                                                                    >
                                                                        {TeamList.map((name) => (
                                                                            <MenuItem
                                                                                key={name.PTeamID}
                                                                                value={name.PTeamID}
                                                                                style={getStyles(name.PTeamName, personName, theme)}
                                                                            >
                                                                                {name.PTeamName}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>

                                                                {projectTasks == "" ?
                                                                    <div className='edit-tasks-container'>
                                                                        <label className='project-title'> Project Tasks: </label>
                                                                        {Tasks.map((singleTask, index) => (
                                                                            <div key={index} className='edit-first-division'>
                                                                                <div className='edit-task-input-group'>
                                                                                    <label className='TaskName-label'> Task Name </label>
                                                                                    <input onChange={(e) => handleTaskNameChange2(e, index)} value={singleTask.taskName} name="TaskName" type="text" id="task" required />

                                                                                    <label className='TaskCompleter-label'> Task Assigned </label>
                                                                                    <select onChange={(e) => handleTaskAssigneeChange2(e, index)} defaultvalue={singleTask.taskCompleter} name="TaskCompleter" type="select" id="taskCompleter" required >
                                                                                        {/* <option> </option> */}
                                                                                        {assigneeList.filter(i => i.TeamID == item.ProjectTeamID).length == 0 ?
                                                                                            (
                                                                                                <option>Assign A Team To This Task</option>
                                                                                            )
                                                                                            :
                                                                                            (
                                                                                                (assigneeList.filter(i => i.TeamID == item.ProjectTeamID && i.projectID == singleTask.projectID).map((item) => (

                                                                                                    <option value={item.UserID}>{item.TeamMemberName}</option>

                                                                                                )))
                                                                                            )

                                                                                        }

                                                                                    </select>
                                                                                    <label className='TaskDueDate-label'> Begin Date </label>
                                                                                    <input onChange={(e) => handleTaskBeginDateChange2(e, index)} value={singleTask.beginDate} name="BeginDate" type="datetime-local" max={max} id="beginDate" required />

                                                                                    <label className='TaskDueDate-label'> Due Date </label>
                                                                                    <input onChange={(e) => handleTaskDueDateChange2(e, index)} value={singleTask.dueDate} name="DueDate" type="datetime-local" max={max} id="dueDate" required />

                                                                                    {Tasks.length - 1 === index && Tasks.length < 5 &&
                                                                                        (
                                                                                            <button type='button' onClick={(e) => handleTaskAdd(item.projectID)} id={item.projectID} className='add-task-btn'>
                                                                                                <span>Add a Task</span><FontAwesomeIcon className="task-add-icon" icon={faCheckCircle} size='1x' />
                                                                                            </button>
                                                                                        )}
                                                                                </div>
                                                                                <div className="edit-second-division">
                                                                                    {Tasks.length > 1 && (
                                                                                        <button onClick={() => handleTaskRemove(singleTask.TaskID, index)} type='button' className='rmv-task-btn'>
                                                                                            <FontAwesomeIcon className="task-rmv-icon" icon={faTrashCan} size='1x' />
                                                                                        </button>
                                                                                    )}
                                                                                </div>
                                                                                <div className='complete-task-container'>
                                                                                    <h5 className='complete-task-label'>Complete Task: </h5> <input onChange={(e) => handleChangeComplete2(e, index)} name="TaskCompleted" className='complete-check' type="checkbox" />
                                                                                </div>
                                                                            </div>
                                                                        ))

                                                                        }
                                                                    </div>
                                                                    :
                                                                    <div className='edit-tasks-container'>
                                                                        <label className='project-title'> Project Tasks: </label>
                                                                        {projectTasks.map((singleTask, index) => (
                                                                            <div key={index} className='edit-first-division'>
                                                                                <div className='edit-task-input-group' id={singleTask.projectID}>
                                                                                    <label className='TaskName-label'> Task Name </label>
                                                                                    <input onChange={(a) => handleTaskNameChange(a, index)} value={singleTask.TaskName} name="TaskName" type="text" id="task" required />

                                                                                    <label className='TaskCompleter-label'> Task Assigned </label>
                                                                                    <select onChange={(e) => handleTaskAssigneeChange(e, index)} defaultValue={singleTask.TaskCompleter} name="TaskCompleter" type="select" id="taskCompleter" required >
                                                                                        {/* <option value={singleTask.TaskAssignee}> {singleTask.TaskAssignee} </option> */}
                                                                                        {assigneeList.filter(i => i.TeamID == item.ProjectTeamID).length == 0 ?
                                                                                            (
                                                                                                <option>Assign A Team To This Task</option>
                                                                                            )
                                                                                            :
                                                                                            (
                                                                                                (assigneeList.filter(i => i.TeamID == item.ProjectTeamID && i.projectID == singleTask.projectID).map((item) => (

                                                                                                    <option value={item.UserID}>{item.TeamMemberName}</option>

                                                                                                )))
                                                                                            )

                                                                                        }
                                                                                    </select>

                                                                                    <label className='TaskDueDate-label'> Begin Date </label>
                                                                                    <input onChange={(e) => handleTaskBeginDateChange(e, index)} value={singleTask.BeginDate} name="BeginDate" type="datetime-local" max={max} id="beginDate" required />
                                                                                    <label className='TaskDueDate-label'> Due Date </label>
                                                                                    <input onChange={(e) => handleTaskDueDateChange(e, index)} value={singleTask.DueDate} name="DueDate" type="datetime-local" max={max} id="dueDate" required />

                                                                                    {projectTasks.length - 1 === index && projectTasks.length < 30 &&
                                                                                        (
                                                                                            <button type='button' onClick={(e) => handleTaskAdde(singleTask.projectID)} className='add-task-btn'>
                                                                                                <span>Add a Task</span><FontAwesomeIcon className="task-add-icon" icon={faCheckCircle} size='1x' />
                                                                                            </button>
                                                                                        )}
                                                                                </div>
                                                                                <div className="edit-second-division">
                                                                                    {projectTasks.length > 1 && (
                                                                                        <button onClick={() => onTaskDelete(singleTask.TaskID, index)} type='button' className='rmv-task-btn'>
                                                                                            <FontAwesomeIcon className="task-rmv-icon" icon={faTrashCan} size='1x' />
                                                                                        </button>
                                                                                    )}
                                                                                </div>
                                                                                {singleTask.TaskCompleted == true ?
                                                                                    <div className='complete-task-container'>
                                                                                        <h5 className='complete-task-label'>Complete Task: </h5> <input onChange={(e) => handleChangeComplete(e, index, singleTask.TaskName, singleTask.TaskAssignee)} name="TaskCompleted" checked={true} className='complete-check' type="checkbox" />
                                                                                    </div>
                                                                                    :
                                                                                    <div className='complete-task-container'>
                                                                                        <h5 className='complete-task-label'>Complete Task: </h5> <input onChange={(e) => handleChangeComplete(e, index, singleTask.TaskName, singleTask.TaskAssignee)} name="TaskCompleted" checked={false} className='complete-check' type="checkbox" />
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                }
                                                                <div className='archive-proj-container'>
                                                                    <h5 className='archive-project-label'>Archive Project</h5> <input onChange={e => handleChangeChk(e)} className='archive-check' type="checkbox" />
                                                                </div>
                                                                <button className='project-save-btn' onClick={projectTasks == "" ? onChangeProject2 : onChangeProject}>
                                                                    <FontAwesomeIcon className="project-done-icon" icon={faSave} size='2x' />
                                                                </button>
                                                            </div>
                                                        )
                                                    }


                                                }))}
                                            </div>
                                        }
                                    </div>
                                </div >
                                <CreateEventWithNoOverlap
                                    id="inventory-modal-modal"
                                    show={Calendar}
                                    clientid={TargetedClient}
                                    onHide={handleCalendar} />
                                <ProjectModal id="project-modal-modal"
                                    show={projectModal}
                                    onHide={handleshow}
                                />
                                <ProjectTeamModal id="project-modal-modal"
                                    show={projectTeamModal}
                                    onHide={handleshowTeam}
                                    client={TargetedClient}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">

                                <div className='Project-list-contatiner'>




                                    <div style={{ width: '100%' }} className='Project-list-canvas'>
                                        <FormControl sx={{ m: 1, width: 300 }}>
                                            <InputLabel id="demo-multiple-name-label">Select A Project</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                // defaultValue={item.ProjectTeamID}
                                                onChange={(e) => setselectedProjectGantt(e.target.value)}
                                                input={<OutlinedInput label="Project Team" />}
                                                MenuProps={MenuProps}
                                            >
                                                {GanttProjectList.map((item) => (
                                                    <MenuItem
                                                        key={item.projectID}
                                                        value={item.projectID}
                                                        style={getStyles(item.projectName, personName, theme)}
                                                    >
                                                        {item.projectName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TaskGanttChart clientid={TargetedClient} projectid={selectedProjectGantt} />
                                    </div>
                                </div >
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div >
    )
} export default Projectfunc