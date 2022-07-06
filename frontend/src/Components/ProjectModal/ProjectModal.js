import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import './ProjectModal.css'

function ProjectModal(props) {

    const [Tasks, setTasks] = useState([{ task: "" }]);
    const [assigneeList, setAssigneeList] = useState([]);
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

    console.log("tasks", Tasks)

    const handleTaskAdd = () => {
        setTasks([...Tasks, { task: "" }])
    }

    const handleTaskRemove = (index) => {
        const list = [...Tasks]
        list.splice(index, 1);
        setTasks(list)
    }

    const onSubmit = (e) => {

    }

    const handleTaskNameChange = (e, index) => {
        const { name, value } = e.target
        const list = [...Tasks];
        list[index][name] = value;
        setTasks(list)
    }

    const handleTaskAssigneeChange = (ea, index) => {
        const { name, value } = ea.target
        const list = [...Tasks];
        list[index][name] = value;
        setTasks(list)
    }
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                Add A New Project <FontAwesomeIcon className="project-done-icon" icon={faListCheck} size='1x' />
            </Modal.Header>
            <Modal.Body>
                <form className='add-project-form'>
                    <label className='project-title'> Project Name </label>
                    <input type='text' className='title-input' />

                    <label className='project-title'> Project Description </label>
                    <textarea className='description-input' />

                    <div className='tasks-container'>
                        <label className='Tasks'> Project Tasks: </label>
                        {Tasks.map((singleTask, index) => (
                            <div key={index} className='first-division'>
                                <div className='task-input-group'>
                                    <label className='TaskName-label'> Task Name </label>
                                    <input value={singleTask.TaskName} onChange={(e) => handleTaskNameChange(e, index)} name="TaskName" type="text" id="task" required />

                                    <label className='TaskCompleter-label'> Task Assigned </label>
                                    <select  value={singleTask.TaskCompleter} onChange={(ea) => handleTaskAssigneeChange(ea, index)} name="TaskCompleter" type="select" id="taskCompleter" required >
                                        <option value={null}> </option>
                                        {assigneeList.map((item) => (
                                            
                                            <option value={item.fullName}>{item.fullName}</option>

                                        ))}
                                    </select>

                                    {Tasks.length - 1 === index && Tasks.length < 5 &&
                                        (
                                            <button type='button' onClick={handleTaskAdd} className='add-btn'>
                                                <span>Add a Task</span>
                                            </button>
                                        )}
                                </div>
                                <div className="second-division">
                                    {Tasks.length > 1 && (
                                        <button onClick={() => handleTaskRemove(index)} type='button' className='rmv-btn'>
                                            <span>Remove</span>
                                        </button>
                                    )}
                                </div>
                                
                            </div>
                        ))

                        }
                    </div>
                    <button type="button" onClick={(e) => onSubmit(e)} className='submit-project-form'>Add Project</button>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProjectModal