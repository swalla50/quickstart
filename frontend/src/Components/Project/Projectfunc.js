import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faCheck, faCheckCircle, faTrashCan, faGrip, faList, faPencil, faPlus, faSave, faSquare, faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap'
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

function Projectfunc(props) {
    const [projectList, setProjectList] = useState([]);
    const [projectContent, setProjectContent] = useState("");
    const [projEdit, setProjEdit] = useState(false);
    const [projectModal, setProjectModal] = useState(false);
    const [projectTasks, setprojectTasks] = useState("");
    const [assigneeList, setAssigneeList] = useState([]);
    const [Tasks, setTasks] = useState([{ task: "" }]);
    const [current, setCurrent] = useState(props.current)

    const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const onTaskDelete = (id, deleteindex) => {
        var deletedTask =
        {

            TaskDeleted: true,
            TaskID: id
        }
        console.log("this will be deleled", deletedTask)
        handleTaskeRemove(deleteindex);
        axios.put('addtasks/deletetasks', deletedTask)
            .then(res => {
                console.log("This is the delted task ", res.data)


            })
            .catch(err => {
                console.log(err);
            })
        toast.error(`${"Task Deleted Successfully!"}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: 'dark'
        });
        axios.get(`getproject/getprojectList`)
            .then((response) => {
                setProjectList(response.data);


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`getTasks/getTaskList`)
            .then((response) => {
                setProjectList(response.data);


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }

    const onChangeProject = async () => {

        console.log("Final tasks", projectTasks)
        for (let i = 0; i < projectTasks.length; i++) {
            if (projectTasks[i].TaskID == null) {
                console.log("POST ", i, ": ", projectTasks[i])
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }

                var submittedTask =
                {
                    TaskName: projectTasks[i].TaskName,
                    projectID: projectTasks[i].projectID,
                    DueDate: projectTasks[i].DueDate,
                    TaskCompleted: false,
                    TaskDeleted: false,
                    TaskCompleter: projectTasks[i].TaskCompleter,
                    Progress: "0",
                    isActive: true
                }
                axios.post('addtasks/addTask', submittedTask,)
                    .then(res => {
                        console.log("This is the new project: ", res.data)

                        toast.success(`${"Project: " + projectTasks[i].TaskName + " Edited Successfully!"}`, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 5000,
                            theme: 'dark'
                        });



                    })
                    .catch(err => {
                        console.log(err);
                    })


            }
            if (projectTasks[i].TaskID != null) {
                console.log("UPDATE ", i, ": ", projectTasks[i])
                var taskval = {
                    TaskID: projectTasks[i].TaskID,
                    TaskName: projectTasks[i].TaskName,
                    TaskCompleter: projectTasks[i].TaskCompleter,
                    DueDate: projectTasks[i].DueDate
                }

                axios.put('updatetasks/updateTasks', taskval)
                    .then(res => {

                        res.data.dueDate = moment().format('YYYY-MM-DDTHH:mm:ss');

                    })
                    .catch(err => {

                        console.log(err);
                    })

            }
            toast.success(`${"Project: " + projectTasks[i].TaskName + " Edited Successfully!"}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                theme: 'dark'
            });
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


        }
        console.log("This is the edited project: ", projectTasks)

    }
    const onChangeProject2 = async () => {
        for (let i = 0; i < Tasks.length; i++) {
            Tasks[i].projectID = projectContent[0].projectID

            var submittedTask2 =
            {
                TaskName: Tasks[i].TaskName,
                projectID: Tasks[i].projectID,
                DueDate: Tasks[i].DueDate,
                TaskCompleted: false,
                TaskDeleted: false,
                TaskCompleter: Tasks[i].TaskCompleter,
            }
            axios.post('addtasks/addTask', submittedTask2,)
                .then(res => {
                    console.log("This is the new project: ", res.data)

                    toast.success(`${"Project: " + Tasks[i].TaskName + " Edited Successfully!"}`, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: 'dark'
                    });

                })
                .catch(err => {
                    console.log(err);
                })
            closeeditProject();
            axios.get(`getTasks/getTaskList`)
                .then((response) => {
                    setProjectList(response.data);


                })
                .catch((err) => {
                    console.log(err, "Unable to get user time info");
                });
            axios.get(`getproject/getprojectList`)
                .then((response) => {
                    setProjectList(response.data);


                })
                .catch((err) => {
                    console.log(err, "Unable to get user time info");
                });



        }


    }

    //Grab
    useEffect(() => {
        setTimeout(()=>{
            setCurrent(props.current) 
            axios.get(`getproject/getprojectList`)
            .then((response) => {
                setProjectList(response.data);

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`gettasks/gettaskList`)
            .then((responset) => {
                setprojectTasks(responset.data);


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`userlist/userlist`)
            .then((response) => {
                setAssigneeList(response.data);

            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });
           }, 4000)

       

    }, [props.current]);

    console.log("assign", assigneeList)
    function handleTaskAdd(eventid2) {
        setTasks([...Tasks, { projectID: eventid2 }])
        console.log("append", eventid2)
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
        console.log("remv ptask", projectTasks)
    }

    const handleTaskNameChange = (e, index) => {
        const { name, value } = e.target
        const list = [...projectTasks];
        list[index][name] = value;
        setprojectTasks(list)
        console.log("change task", projectTasks)
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

    }
    const handleTaskNameChange2 = (eaa, index) => {
        const { name, value } = eaa.target
        const list = [...Tasks];
        list[index][name] = value;
        setTasks(list)
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
    }

    console.log("plist", projectList)


    // const openProjectModal =(props){
    //     document.getElementById(props.projectID)
    //     console.log(props.projectID)
    // }

    const handleshow = () => {
        setProjectModal(false)
        document.getElementById("project-modal-modal").value = "";
    }

    function getProjectData(event) {
        setProjectContent(projectList.filter(proj => proj.projectID == event));

        getProjecttaskData(event);
        closeeditProject();
        console.log("newtask", event)
    }

    var completed = 0;
    var alltasks;
    var progresscalc;
    function getProjecttaskData(taskevent) {
        axios.get(`gettasks/gettaskList`)
            .then((responset) => {
                setprojectTasks(responset.data.filter(pTask => pTask.projectID == taskevent));


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

        // for (let i = 0; i < projectTasks.filter(pTask => pTask.projectID == taskevent).length; i++) {
        //     if (projectTasks[i].taskCompleted == 1) {
        //         completed++;

        //     }
        //     var count = 1;

        //     alltasks = ((projectTasks.filter(pTask => pTask.projectID == taskevent).length) * (count + i))
        //     console.log("ptasks", i + 1)

        // }
        // progresscalc = (completed / alltasks) * 100;

        console.log("completed: ", completed, "all tasks: ", alltasks, "perc: ", progresscalc)

        // setprojectTasks(projectTasks.filter(pTask => pTask.projectID == taskevent))
    }
    console.log("ptasks", projectTasks)
    function editProject() {
        setProjEdit(true)
    }
    function closeeditProject() {
        setProjEdit(false)
    }

    return (
        <div className='project-func'>
            <ToastContainer />
            <h2> Projects </h2>
            <div className='Project-list-contatiner'>
                <div className='Project-list-canvas'>
                    <div className='project-count-container'><button onClick={() => setProjectModal(true)} className='Add-New-Project'>Add Project <FontAwesomeIcon className="project-done-icon" icon={faPlus} size='1x' /></button> <h4 className='project-count'>({projectList.filter(item => item.isActive == 1).length} Projects)</h4></div>
                    <Tabs className='project-tabs' defaultActiveKey="Grid" id="uncontrolled-tab-example" >
                        <Tab eventKey="Grid" title={<FontAwesomeIcon className="project-done-icon" icon={faGrip} size='2x' />} className="Grid-tab">
                            <ul className='project-list'>
                                {/* Loading Data Divs */}


                                {projectList=="" &&[1,2,3,4,5,6,7,8,9,10].map((n) => <SkeletonProject key={n} theme="dark"/>)}
                                {/* Data Loaded content */}
                                {projectList.filter(projectList => projectList.isActive == 1).map(item => (
                                    <li className='project-item' key={item.projectID} onClick={(e) => getProjectData(e.target.id)} id={item.projectID}>
                                        <div onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-header'>{item.progress === 100 ? <><h4 className='project-name'>{item.projectName}</h4><FontAwesomeIcon className="project-done-icon" icon={faCheckCircle} size='2x' /></> : <h4 className='project-name'>{item.projectName}</h4>}</div>
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
                                {projectList.filter(projectList => projectList.isActive == 1).map(item => (
                                    <li onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-item-listed' key={item.projectID} >
                                        <div onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-header-listed'>{item.progress === 100 ? <><h4 className='project-name'>{item.projectName}</h4><FontAwesomeIcon className="project-done-icon" icon={faCheckCircle} size='2x' /></> : <h4 className='project-name'>{item.projectName}</h4>}</div>
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
                    <ProjectModal id="project-modal-modal"
                        show={projectModal}
                        onHide={handleshow}
                    />
                </div>
                <div className='Project-content-container'>
                    {projectContent == [] ?
                        <div className='default-project-content'>
                            <h3> Please Select a Project</h3>

                            <div>
                                <img src={gif} className='left-gif' />
                            </div>
                        </div>
                        :
                        <div className='project-content-shown'>
                            {projectContent.map((item => {
                                if (projEdit == false) {
                                    return (
                                        <div key={item.projectID} className='project-content'>
                                            <h4 className='project-title-text'>
                                                {item.projectName}
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
                                                            {item.TaskName} <p className='task-assignee'>Assigned to: {item.TaskAssignee}</p> {item.TaskCompleted == true ? (<FontAwesomeIcon className="task-done-icon" icon={faSquareCheck} size='1x' />) : (<FontAwesomeIcon className="task-done-icon" icon={faSquare} size='1x' />)} <p className='task-date'>{new Date(item.DueDate).toLocaleDateString(undefined, options)}</p>
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
                                            <input type='text' value={item.projectName} style={{ width: '100%' }} className='project-title-input'>

                                            </input>

                                            <label className='project-description-label'>
                                                Description
                                            </label>
                                            <p className='project-description'>
                                                <textarea className='project-description-input' style={{ width: '100%' }}>{item.projectDescription}</textarea>
                                            </p>

                                            {projectTasks == "" ?
                                                <div className='edit-tasks-container'>
                                                    <label className='project-title'> Project Tasks: </label>
                                                    {Tasks.map((singleTask, index) => (
                                                        <div key={index} className='edit-first-division'>
                                                            <div className='edit-task-input-group'>
                                                                <label className='TaskName-label'> Task Name </label>
                                                                <input onChange={(e) => handleTaskNameChange2(e, index)} value={singleTask.taskName} name="TaskName" type="text" id="task" required />

                                                                <label className='TaskCompleter-label'> Task Assigned </label>
                                                                <select onChange={(e) => handleTaskAssigneeChange2(e, index)} value={singleTask.taskCompleter} name="TaskCompleter" type="select" id="taskCompleter" required >
                                                                    <option> </option>
                                                                    {assigneeList.map((item) => (

                                                                        <option value={item.myUserId}>{item.FullName}</option>

                                                                    ))}
                                                                </select>

                                                                <label className='TaskDueDate-label'> Due Date </label>
                                                                <input onChange={(e) => handleTaskDueDateChange2(e, index)} value={singleTask.dueDate} name="DueDate" type="datetime-local" id="dueDate" required />

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
                                                                <select onChange={(e) => handleTaskAssigneeChange(e, index)} name="TaskCompleter" type="select" id="taskCompleter" required >
                                                                    <option value={singleTask.TaskAssignee}> {singleTask.TaskAssignee} </option>
                                                                    {assigneeList.map((itema) => (

                                                                        <option name="taskCompleter" value={itema.myUserId}>{itema.FullName}</option>

                                                                    ))}
                                                                </select>

                                                                <label className='TaskDueDate-label'> Due Date </label>
                                                                <input onChange={(e) => handleTaskDueDateChange(e, index)} value={singleTask.DueDate} name="DueDate" type="datetime-local" id="dueDate" required />

                                                                {projectTasks.length - 1 === index && projectTasks.length < 5 &&
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

                                                        </div>
                                                    ))}
                                                </div>
                                            }
                                            <div className='archive-proj-container'>
                                                <h5>Archive Project</h5> <input className='archive-check' type="checkbox" />
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
            </div>        </div >
    )
} export default Projectfunc