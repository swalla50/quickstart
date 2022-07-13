import { faCheckCircle, faListCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProjectModal.css'

function ProjectModal(props) {

    const [Tasks, setTasks] = useState([{ task: "" }]);
    const [assigneeList, setAssigneeList] = useState([]);
    const [newprojName, setnewprojName] = useState("");
    const [newprojDetail, setnewprojDetail] = useState("");
    const [projectList, setProjectList] = useState([]);

    //Grab
    useEffect(() => {

        axios.get(`userlist/userlist`)
            .then((response) => {
                setAssigneeList(response.data);

            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });

    }, []);
    console.log("userlist", assigneeList)


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
            progress: "0",
            isActive: true
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
            
    }

    const handleTaskNameChange = (e, index) => {
        const { name, value } = e.target
        const list = [...Tasks];
        list[index][name] = value;
        setTasks(list)
        console.log("modal taks",Tasks)
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
                    <input  id="title-input"onChange={(e) => onProjectName(e.target.value)} type='text' className='title-input' />

                    <label className='project-title'> Project Description </label>
                    <textarea id="description-input" onChange={(e) => onProjectDetail(e.target.value)} className='description-input' />

                    <div className='tasks-container'>
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

                                            <option value={item.fullName}>{item.fullName}</option>

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
                    </div>
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