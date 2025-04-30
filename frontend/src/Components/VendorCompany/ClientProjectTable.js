
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import animationData from '../../assets/animations/89438-blue-loadingg.json'
import Lottie from 'react-lottie-player';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ExpandMoreOutlined } from '@material-ui/icons';
import SkeletonTable from '../Skeleton/SkeletonTable';
import moment from 'moment';
import { Button } from '@mui/material';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ClientProjectTable(props) {

    const [projectList, setProjectList] = useState([]);
    const [projectTasks, setprojectTasks] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [EditMode,setEditMode] = useState(false);
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            console.log("CLIENT ID", props.clientId)
            axios.get(`getproject/getprojectList`)
                .then((response) => {
                    setProjectList(response.data.filter(item => item.clientId == props.clientId));

                    console.log("client projcet data", response.data.filter(item => item.clientId == props.clientId))
                })
                .catch((err) => {
                    console.log(err, "Unable to get user time info");
                });
            axios.get(`getTasks/getTaskList`)
                .then((response) => {
                    setprojectTasks(response.data.filter(item => item.clientId == props.clientId));
                    setLoading(false);

                })
                .catch((err) => {
                    console.log(err, "Unable to get user time info");
                });
        }, 3500)

    }, [props])
    return (
        <div className='client-proj-table'>
            {Loading || (Loading == true && projectList == "") ?
                (
                    <div style={{ height: '30rem', background: 'transparent', borderRadius: '10px', justifyContent:'center',textAlign:'-webkit-center'}}>
                    <Lottie
                        loop
                        className='typing-animation-object'
                        animationData={animationData}
                        play
                        style={{ width: '20rem',justifySelf:'center' }}
                    />
                    </div>
                )
                :
                (
                    (projectList == "" ?
                        (
                            <div style={{ height: '30rem', background: 'white', borderRadius: '10px' }}>
                                <p style={{ color: 'black' }}>No Projects for this client.</p>
                            </div>
                        )
                        :
                        (
                        <>
                       
                        <>  {EditMode?<><Button className='client-proj-save-edit-btn'onClick={() => setEditMode(false)}> Cancel </Button> <Button style={{marginRight:'1rem'}}className='client-proj-save-edit-btn'onClick={() => setEditMode(false)}> Save Changes </Button> </>: <Button className='client-proj-save-edit-btn' onClick={() => setEditMode(true)}> Edit </Button>}{projectList.map(item => (
                                <Accordion>

                                    <AccordionSummary
                                        expandIcon={<ExpandMoreOutlined />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{'(' + item.projectID + ')' + ' ' + item.projectName + ' ' + '(' + moment(item.projectDueDate).format('LLLL') + ')'} {item.progress == 100?( <FontAwesomeIcon style={{color:'#4ff68a'}}className="project-complete-icon" icon={faCheckCircle} size='2x' />):(<></>)}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <TableContainer component={Paper}>

                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Task</TableCell>
                                                        <TableCell align="right">Task Assignee</TableCell>
                                                        <TableCell align="right">Due Date</TableCell>
                                                        <TableCell align="right">Completed</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {projectTasks.filter(task => task.projectID == item.projectID).map((row) => (
                                                        <TableRow
                                                            key={row.name}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {row.TaskName}
                                                            </TableCell>
                                                            <TableCell align="right">{row.TaskAssignee}</TableCell>
                                                            <TableCell align="right">{moment(row.DueDate).format('LLL')}</TableCell>
                                                            {EditMode ? <TableCell align="right"><input defaultChecked={row.TaskCompleted} type='checkbox'></input></TableCell> : <TableCell align="right"><input disabled defaultChecked={row.TaskCompleted} type='checkbox'></input></TableCell>}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                    </AccordionDetails>

                                </Accordion>
                            ))}</></> 
                        )
                        
                    )
                    
                )
                

            }
            

        </div>
    )
}

export default ClientProjectTable

