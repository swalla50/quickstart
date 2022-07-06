import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faCheck, faCheckCircle, faGrip, faList, faPencil, faPlus, faSave, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'
import './Projectfunc.css'
import ProjectModal from '../ProjectModal/ProjectModal'
import gif from '../../../src/assets/images/icons8-double-left.gif'

function Projectfunc() {
    // const projectList = [
    //     {
    //         projectID: 1,
    //         projectName: 'New project',
    //         projectDescription: 'This is a test Project for the world to see.',
    //         MostRecentTask: 'Test Last Task',
    //         LastTaskCompleter: 'Steven Wallace',
    //         progress: 50
    //     },
    //     {
    //         projectID: 2,
    //         projectName: 'ASC Project',
    //         projectDescription: 'This is a project containing ASC Modules and finance reports.',
    //         MostRecentTask: 'Amirization',
    //         LastTaskCompleter: 'Jason Drummond',
    //         progress: 10
    //     },
    //     {
    //         projectID: 3,
    //         projectName: 'MSN Project',
    //         projectDescription: 'This is a project containing MSN Re-configuration.',
    //         MostRecentTask: 'Plot Creation',
    //         LastTaskCompleter: 'Steven Wallace',
    //         progress: 100
    //     },
    //     {
    //         projectID: 4,
    //         projectName: 'Facebook Project',
    //         projectDescription: 'This is a project containing Facebook Auditing.',
    //         MostRecentTask: 'Audit intial summary',
    //         LastTaskCompleter: 'Jason Drummond',
    //         progress: 25
    //     },
    // ]
    const [projectList, setProjectList] = useState([]);
    const [projectContent, setProjectContent] = useState("");
    const [projEdit, setProjEdit] = useState(false);
    const [projectModal, setProjectModal] = useState(false);
    //Grab
    useEffect(() => {

        axios.get(`getproject/getprojectList`)
            .then((response) => {
                setProjectList(response.data);
                console.log("init content: ", projectContent)
                console.log(projEdit)

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

    }, []);

    
    console.log("projectstate", projectList)

    // const openProjectModal =(props){
    //     document.getElementById(props.projectID)
    //     console.log(props.projectID)
    // }

    function getProjectData(event) {
        setProjectContent(projectList.filter(proj => proj.projectID == event));
        console.log(projEdit)
    }
    function editProject() {
        setProjEdit(true)
    }
    function closeeditProject() {
        setProjEdit(false)
    }

    return (
        <div className='project-func'>
            <h2> Projects </h2>
            <div className='Project-list-contatiner'>
                <div className='Project-list-canvas'>
                    <button  onClick={() => setProjectModal(true)} className='Add-New-Project'>Add Project <FontAwesomeIcon className="project-done-icon" icon={faPlus} size='1x' /></button>
                    <Tabs className='project-tabs' defaultActiveKey="Grid" id="uncontrolled-tab-example" >
                        <Tab eventKey="Grid" title={<FontAwesomeIcon className="project-done-icon" icon={faGrip} size='2x' />} className="Grid-tab">
                            <ul className='project-list'>
                                {projectList.map((item =>
                                    <li className='project-item' key={item.projectID} onClick={(e) => getProjectData(e.target.id)} id={item.projectID}>
                                        <div onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-header'>{item.progress === 100 ? <><h4 className='project-name'>{item.projectName}</h4><FontAwesomeIcon className="project-done-icon" icon={faCheckCircle} size='2x' /></> : <h4 className='project-name'>{item.projectName}</h4>}</div>
                                        <h5 onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-description'>{item.projectDescription}</h5>
                                        <p onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='last-task'>{item.mostRecentTask} : <p className='completer' onClick={(e) => getProjectData(e.target.id)} id={item.projectID} style={{ fontWeight: "bold", color: "white" }}>{item.lastTaskCompleter}</p></p>
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
                                {projectList.map((item =>
                                    <li onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-item-listed' key={item.projectID} >
                                        <div onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-header-listed'>{item.progress === 100 ? <><h4 className='project-name'>{item.projectName}</h4><FontAwesomeIcon className="project-done-icon" icon={faCheckCircle} size='2x' /></> : <h4 className='project-name'>{item.projectName}</h4>}</div>
                                        <h5 onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='project-description-listed'>{item.projectDescription}</h5>
                                        <p onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='last-task-listed'>{item.mostRecentTask} : <p onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='completer' style={{ fontWeight: "bold", color: "white" }}>{item.lastTaskCompleter}</p></p>
                                        <div onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='progress-container-listed'>
                                            <div onClick={(e) => getProjectData(e.target.id)} id={item.projectID} class="w3-grey" style={{ height: "10px", width: "100%", background: "white", border: "none", borderRadius: "50px" }}><span className='progress meter  animate' style={{ height: "10px", width: item.progress + "%", background: "#00dd29", paddingTop: '1px', paddingBottom: '1px' }}></span></div>
                                            <p onClick={(e) => getProjectData(e.target.id)} id={item.projectID} className='progress-percent'>{item.progress}%</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Tab>
                    </Tabs>
                    <ProjectModal
                        show={projectModal}
                        onHide={() => setProjectModal(false)}
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
                                            <div className='project-task-list'>
                                                <h5 className='project-task-title'> Test Task 1</h5>
                                                <h5 className='project-task-title'> Test Task 2</h5>
                                                <h5 className='project-task-title'> Test Task 3</h5>
                                                <h5 className='project-task-title'> Test Task 4</h5>
                                            </div>
                                        </div>
                                    )
                                }


                                if (projEdit == true) {
                                    return (
                                        <div key={item.projectID} className='project-content'>
                                            <button className='project-close-edit-btn' onClick={closeeditProject}>
                                                <FontAwesomeIcon className="project-done-icon" icon={faXmark} size='1x' />
                                            </button>
                                            <input type='text' value={item.projectName} style={{ width: '100%' }} className='project-title-input'>

                                            </input>

                                            <label className='project-description-label'>
                                                Description
                                            </label>
                                            <p className='project-description'>
                                                <textarea className='project-description-input' style={{ width: '100%' }}>{item.projectDescription}</textarea>
                                            </p>

                                            <label className="project-task-label">
                                                Tasks:
                                            </label>
                                            <div className='project-task-list'>
                                                <h5 className='project-task-title'> Test Task 1</h5>
                                                <h5 className='project-task-title'> Test Task 2</h5>
                                                <h5 className='project-task-title'> Test Task 3</h5>
                                                <h5 className='project-task-title'> Test Task 4</h5>
                                            </div>
                                            <button className='project-save-btn' onClick={closeeditProject}>
                                                <FontAwesomeIcon className="project-done-icon" icon={faSave} size='2x' />
                                            </button>
                                        </div>
                                    )
                                }




                            }

                            ))}
                        </div>
                    }
                </div>
            </div>

        </div >
    )
}

export default Projectfunc