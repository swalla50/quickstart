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
import { Button, Modal } from 'react-bootstrap'
import '../Project/Projectfunc.css'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import Lottie from 'react-lottie-player';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ExpandMoreOutlined } from '@material-ui/icons';
import SkeletonTable from '../Skeleton/SkeletonTable';
import moment from 'moment';
import { faCheck, faCheckCircle, faMinus, faPlus, faPlusCircle, faTrashCan, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
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
import AddTeamModal from './AddTeamModal';
import AddTeamMemberModal from './AddTeamMemberModal';
import TeamDeletionWarn from './TeamDeletionWarn';


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

function ProjectTeamModal(props) {

    const [TeamList, setTeamList] = useState([]);
    const [selectedClient, setselectedClient] = useState([]);
    const [TeamMemberList, setTeamMemberList] = useState([]);
    const [addteamModal, setaddteamModal] = useState(false);
    const [addteammemberModal, setaddteammemberModal] = useState(false);
    const [teamDiscardWarnModal, setteamDiscardWarnModal] = useState(false);
    const [selectedTeam, setselectedTeam] = useState([]);
    const [EditModeID, setEditModeID] = useState(['0']);
    const [removedmemberList, setremovedmemberList] = useState([]);
    const [discardedTeam,setdiscardedTeam] = useState([]);

    var list = [];
    var client = [];

    //Grab
    useEffect(() => {
        setTeamList([])

        axios.get(`getteams/getTeamList`)
            .then((response) => {
                setTeamList(response.data.filter(i => i.clientID == props.client));

            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });
        axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setselectedClient(response.data.filter(i => i.vendorId == props.client));



            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });




    }, [props.show, props.client, addteamModal, addteammemberModal]);

    useEffect(() => {
        axios.get(`getteams/getTeamList`)
            .then((response) => {
                setTeamList(response.data.filter(i => i.clientID == props.client));

            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });
        axios.get(`GetTeamListPage/GetTeamList`)
            .then((response) => {
                setTeamMemberList(response.data);
                // setremovedmemberList(response.data.filter(i => i.ActiveTeamMember == true));
                // console.log("NEW NEW")
            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });
    }, [])


    // function addToRemoveList(e, index, user) {
    //     // console.log(removedmemberList.filter(i => i.TeamID == user.TeamID && i.ActiveTeamMember == true))

    //     const { name, checked } = e.target
    //     // const list = [...removedmemberList];

    //     // list[index][name] = checked;
    //     for (var i = 0; i < removedmemberList.length; i++) {
    //         // console.log(list[i])
    //         if (removedmemberList[i].UserID == user.UserID && removedmemberList[i].TeamID == user.TeamID) {
    //             removedmemberList[i].ActiveTeamMember === e.target
    //             console.log(removedmemberList[i], "checked")
    //         }
    //     }
    //     // list.filter(i => i.UserID == user.UserID && i.TeamID == user.TeamID).map(u => u.ActiveTeamMember) == checked
    //     // console.log("current list", list.filter(i => i.UserID == user.UserID && i.TeamID == user.TeamID).map(u => u))
    //     console.log("new list", removedmemberList)
    //     // setremovedmemberList(...removedmemberList,[{
    //     //     PTeamUser: user.UserID,
    //     //     PTeamID: user.TeamID,
    //     //     PTeamUserIsActive: user[index].checkvalue

    //     // }])
    //     // console.log(newlist)

    // }




    // // const removeRemoveList = (index) => {
    // //     const list = [...removedmemberList]
    // //     list.splice(index, 1);
    // //     setTasks(list)
    // // }

    // function removemember(user) {

    //     const removedmember = {
    //         PTeamUser: user.UserID,
    //         PTeamID: user.TeamID,
    //         PTeamUserIsActive: false
    //     }
    //     console.log(removedmember)
    //     // axios.put('AddTeamMember/removeuser', removedmember)
    //     //     .then(res => {
    //     //         toast.error(`${"Removed Team Member"}`, {
    //     //             position: toast.POSITION.TOP_RIGHT,
    //     //             autoClose: 5000,
    //     //             theme: 'dark'
    //     //         });
    //     //         axios.get(`GetTeamListPage/GetTeamList`)
    //     //             .then((response) => {
    //     //                 setTeamMemberList(response.data);



    //     //             })
    //     //             .catch((err) => {
    //     //                 console.log(err, "Unable to get user list");
    //     //             });
    //     //     })
    //     //     .catch(err => {
    //     //         console.log(err);
    //     //     })
    // }

    const EditDeleteTeamsTrue = (element) => {
        setremovedmemberList(TeamMemberList.filter(teams => teams.TeamID == element && teams.ActiveTeamMember == true).map(i=> i.UserID))
        console.log("initial removed list", TeamMemberList.filter(teams => teams.TeamID == element && teams.ActiveTeamMember == true).map(i=> i.UserID))
        if (EditModeID.includes('0')){
        setEditModeID([element])
        console.log('selected ID', EditModeID)
        }
        else{
            setteamDiscardWarnModal(true)

          console.log('selected ID FALSE', EditModeID)
        }
    }

    const EditDeleteTeamsFalse = (element) => {
        console.log('element', element.toString())
        setremovedmemberList([])
        if (EditModeID.includes('0')){
           var arr = EditModeID.filter(val => val !== element.toString());        
            setEditModeID(arr)
        console.log('selected ID FALSE', EditModeID)
        }
        else{
           setteamDiscardWarnModal(true)

          console.log('selected ID FALSE', EditModeID)
        }
        
    }

    const saveRemovedMembers = (memberlist) =>{

        console.log("POST MOVE:",memberlist.toString(),discardedTeam.PTeamID)
        axios.put(`${'DeleteTeamMembers/DeleteTeamMembers/'+ memberlist.toString()+ '/' + discardedTeam.PTeamID}`)
        .then((response) => {
            EditDeleteTeamsFalse(discardedTeam.PTeamID)
        setEditModeID(['0'])
        axios.get(`getteams/getTeamList`)
        .then((response) => {
            setTeamList(response.data.filter(i => i.clientID == props.client));

        })
        .catch((err) => {
            console.log(err, "Unable to get user list");
        });
        axios.get(`GetTeamListPage/GetTeamList`)
        .then((response) => {
            setTeamMemberList(response.data);
            // setremovedmemberList(response.data.filter(i => i.ActiveTeamMember == true));
            // console.log("NEW NEW")
        })
        .catch((err) => {
            console.log(err, "Unable to get user list");
        });

            // setremovedmemberList(response.data.filter(i => i.ActiveTeamMember == true));
            // console.log("NEW NEW")
            setteamDiscardWarnModal(false)
            
        })
        .catch((err) => {
            console.log(err, "Unable to get user list");
        });

        
        
    }
    const handleadddeletedteamusers = (this1,value,team) =>{
        console.log(this1.target.checked)

        if (this1.target.checked) {
            removedmemberList.push(value);
            console.log('Added Userssss',removedmemberList)
        } else {
            var index = removedmemberList.indexOf(value);
            if (index > -1) {
                removedmemberList.splice(index, 1);
                console.log('Added Userssss',removedmemberList)
            }
        }
        
    }
    const handleadddeletedteamusersall = (this1) =>{
        // console.log(this1.target.checked)
        // foreach ( TeamMemberList.filter(teams => teams.TeamID == item.PTeamID && teams.ActiveTeamMember == true) in CheckBoxList1.Items)
        // {
        //     chkitem.Selected = true;
        // }
        var checkboxes = document.getElementsByName('foo');
        for(var i=0, n=TeamMemberList.filter(teams => teams.TeamID == this1 && teams.ActiveTeamMember == true).length;i<n;i++) {
            checkboxes[i].checked = this1.checked;
          }
          console.log(checkboxes)
        
    }
    function handleshowaddteam() {
        setaddteamModal(false);
        setTeamList([])

        axios.get(`getteams/getTeamList`)
            .then((response) => {
                setTeamList(response.data.filter(i => i.clientID == props.client));

            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });
        axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setselectedClient(response.data.filter(i => i.vendorId == props.client));



            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });
        axios.get(`GetTeamListPage/GetTeamList`)
            .then((response) => {
                setTeamMemberList(response.data);



            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });

    }
    function handleteamdiscardwarn() {
        EditDeleteTeamsFalse(discardedTeam.PTeamID)
        setEditModeID(['0'])
        setteamDiscardWarnModal(false);

        axios.get(`getteams/getTeamList`)
            .then((response) => {
                setTeamList(response.data.filter(i => i.clientID == props.client));

            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });
        axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setselectedClient(response.data.filter(i => i.vendorId == props.client));



            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });
        axios.get(`GetTeamListPage/GetTeamList`)
            .then((response) => {
                setTeamMemberList(response.data);



            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });

    }
    function handleteamdiscardwarnNo() {
        EditDeleteTeamsTrue(discardedTeam.PTeamID)
        setteamDiscardWarnModal(false);

    }
    function handleshowaddteammember() {
        setaddteammemberModal(false);
        setTeamList([])

        axios.get(`getteams/getTeamList`)
            .then((response) => {
                setTeamList(response.data.filter(i => i.clientID == props.client));

            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });
        axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setselectedClient(response.data.filter(i => i.vendorId == props.client));



            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });
        axios.get(`GetTeamListPage/GetTeamList`)
            .then((response) => {
                setTeamMemberList(response.data);



            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });

    }

    // console.log("Selected Client", selectedClient, TeamList, props.client)

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>
                <div className='manage-team-header-container'>
                    <div className='manage-team-header-left'>
                        Manage Teams For: {selectedClient.map(i => (<>{i.vendorName}</>))}
                    </div>
                    <div className='manage-team-header-right' style={{ display: 'flex' }}>
                        {/* {EditMode == true ?
                            (
                                <>
                                    <Button onClick={() => { setEditMode(false) }} style={{ borderRadius: '10px', border: 'none' }} className='cancel-team-edit'>
                                        Save <FontAwesomeIcon style={{ color: '#4ff68a', marginLeft: '.5rem' }} className="cancel-team-edit-icon" icon={faCheck} size='1x' />
                                    </Button>
                                    <Button onClick={() => { setEditMode(false) }} style={{ borderRadius: '10px', border: 'none' }} className='cancel-team-edit'>
                                        Cancel <FontAwesomeIcon style={{ color: 'red', marginLeft: '.5rem' }} className="cancel-team-edit-icon" icon={faX} size='1x' />
                                    </Button>
                                </>

                            )
                            :
                            (
                                <>
                                    <Button onClick={() => setaddteamModal(true)} style={{ borderRadius: '20rem', border: 'none' }} className='add-team-member'>
                                        Add New Team <FontAwesomeIcon style={{ color: '#4ff68a', marginLeft: '.5rem' }} className="cancel-team-edit-icon" icon={faPlus} size='1x' />
                                    </Button>
                                </>
                            )

                        } */}

                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                {props.client != "" && TeamList != "" ?
                    (
                        (TeamList.map((item, index) => (
                            <Accordion>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreOutlined />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <div className='team-acc-header'>
                                        <Typography style={{ float: 'left' }}>{'(' + item.PTeamID + ')' + ' ' + item.PTeamName}</Typography>
                                    </div>

                                </AccordionSummary>
                                <AccordionDetails>

                                    <TableContainer component={Paper} id={item.PTeamID}>
                                        {EditModeID.includes(item.PTeamID.toString()) === true ?
                                            (

                                                <>
                                                    <Button onClick={() =>  saveRemovedMembers(removedmemberList) } style={{ borderRadius: '10px', border: 'none' }} className='cancel-team-edit'>
                                                        Save <FontAwesomeIcon style={{ color: '#4ff68a', marginLeft: '.5rem' }} className="cancel-team-edit-icon" icon={faCheck} size='1x' />
                                                    </Button>
                                                    <Button onClick={() => { EditDeleteTeamsFalse(item.PTeamID.toString()); setdiscardedTeam(item)}} style={{ borderRadius: '10px', border: 'none' }} className='cancel-team-edit'>
                                                        Cancel <FontAwesomeIcon style={{ color: 'red', marginLeft: '.5rem' }} className="cancel-team-edit-icon" icon={faX} size='1x' />
                                                    </Button>
                                                </>

                                            )
                                            :
                                            (
                                                <div className='team-head-container'>
                                                    <FontAwesomeIcon onClick={() => { setselectedTeam(item.PTeamID); setaddteammemberModal(true) }} style={{ float: 'right', marginBottom: '2rem', marginTop: '2rem', marginRight: '2rem' }} className="add-team-member-icon" icon={faPlusCircle} size='2x' />
                                                    <Button onClick={() =>{ {discardedTeam.length === 0? setdiscardedTeam(item):setdiscardedTeam(discardedTeam)};EditDeleteTeamsTrue(item.PTeamID.toString());}} style={{ borderRadius: '20rem', border: 'none' }} className='edit-team-member'>
                                                        Delete Teams & Users <FontAwesomeIcon style={{ color: 'red', marginLeft: '.5rem' }} className="cancel-team-edit-icon" icon={faMinus} size='1x' />
                                                    </Button>
                                                </div>
                                            )
                                        }
                                        {TeamMemberList.filter(teams => teams.TeamID == item.PTeamID && teams.ActiveTeamMember == true) != "" ?
                                            (
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                                    <TableHead style={{ width: '100%' }}>

                                                        <TableRow>
                                                            <TableCell align="center"></TableCell>
                                                            <TableCell align="left">User ID</TableCell>
                                                            <TableCell align="right">Name</TableCell>
                                                            <TableCell align="right">Phone</TableCell>
                                                            <TableCell align="right">Email</TableCell>
                                                            <TableCell align="right">Role</TableCell>
                                                            <TableCell align="center"></TableCell>
                                                        </TableRow>

                                                    </TableHead>
                                                    <TableBody>
                                                        {TeamMemberList.filter(teams => teams.TeamID == item.PTeamID && teams.ActiveTeamMember == true).map((row, index) => (
                                                            <TableRow
                                                                key={row.PTeamID}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                id={item.PTeamID}
                                                            >
                                                                <TableCell align="center">
                                                                    <img className='profile-pic' src={'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + row.userPic} style={{ height: '30px', width: '30px', borderRadius: '50px' }} />
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {row.UserID}
                                                                </TableCell>
                                                                <TableCell align="right">{row.TeamMemberName}</TableCell>
                                                                <TableCell align="right">{row.PhoneNumber}</TableCell>
                                                                <TableCell align="right">{row.Email}</TableCell>
                                                                <TableCell align="right">{row.ProjectRole}</TableCell>
                                                                {EditModeID.includes(item.PTeamID.toString()) === true ? < TableCell align="right"><input  onChange={(e)=>handleadddeletedteamusers(e,row.UserID)} name="foo"  defaultChecked={true} type='checkbox'></input></TableCell> : <></>}
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            )
                                            :
                                            (
                                                <>No Team Members For Team: ({selectedClient.map(i => (<>{i.vendorName}</>))}) {item.PTeamName}</>
                                            )
                                        }

                                    </TableContainer>

                                </AccordionDetails>

                            </Accordion>
                        )))
                    )
                    :
                    (
                        (TeamList == "" && props.client == "" ?
                            (
                                <h3 className='None-Assingned'>No Client Chosen.</h3>
                            )
                            :
                            (
                                <h3 className='None-Assingned-team'>No Teams For This Client.</h3>
                            )
                        )


                    )

                }


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            <AddTeamModal id="Vendor-modal-modal"
                show={addteamModal}
                onHide={handleshowaddteam}
                object={selectedClient}
            />
            <AddTeamMemberModal id="Vendor-modal-modal"
                show={addteammemberModal}
                onHide={handleshowaddteammember}
                client={selectedClient}
                team={selectedTeam}
            />
            <TeamDeletionWarn id="Vendor-modal-modal"
                show={teamDiscardWarnModal}
                onHide={handleteamdiscardwarn}
                onHideNo={handleteamdiscardwarnNo}
                client={selectedClient}
                team={discardedTeam}
            />
        </Modal>
    )
}

export default ProjectTeamModal