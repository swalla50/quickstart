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
import Select from "react-select";
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
    // Select,
    OutlinedInput,
    MenuItem,
    ListItemText,
    Paper,
    Stack
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Box, Input } from '@material-ui/core';
import { SelectChangeEvent } from '@mui/material/Select';
import { User } from 'plaid-threads';

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

// const names = [
//     'Oliver Hansen',
//     'Van Henry',
//     'April Tucker',
//     'Ralph Hubbard',
//     'Omar Alexander',
//     'Carlos Abbott',
//     'Miriam Wagner',
//     'Bradley Wilkerson',
//     'Virginia Andrews',
//     'Kelly Snyder',
// ];

// function getStyles(name, personName, theme) {
//     return {
//         fontWeight:
//             personName.indexOf(name) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     }
// };

function AddTeamMemberModal(props) {
    const [personName, setPersonName] = React.useState([]);
    const [addedMembers, setaddedMembers] = useState([]);
    const [selectedClient, setselectedClient] = useState([]);
    const [TeamMemberList, setTeamMemberList] = useState([]);
    const [selectedMember, setselectedMember] = useState([]);
    const [user, setUser] = useState([]);
    const [role, setRole] = useState([]);
    const [names, setNames] = useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        // const {
        //     target: { nameselected },
        // } = event;
        // setselectedName(
        //     // On autofill we get a stringified value.
        //     typeof nameselected === 'string' ? nameselected.split(',') : nameselected,
        // );


        console.log("PERSON NAME", personName)
    };
    function submitNewMembers() {

        if (selectedMember.length > 0) {
            axios.get(`GetTeamListPage/GetTeamList`)
                .then((res) => {
                    
                    for (var i = 0; i < selectedMember.length; i++) {
             
                        console.log("Test:", props.client[0].vendorId)
                        if ((res.data.map(i => i.UserID).includes(selectedMember[i].UserID) == false && selectedMember[i].PTeamID == null && selectedMember[i].Company == props.client[0].vendorId) || (res.data.map(i => i.UserID).includes(selectedMember[i].UserID) == false  && selectedMember[i].PTeamID == undefined && selectedMember[i].Company == props.client[0].vendorId) ) {
                            var newentry = {
                                PTeamUserRole: (selectedMember[i].Role == null || selectedMember[i].Role == undefined) ? (1) : (selectedMember[i].Role),
                                PTeamUser: selectedMember[i].UserID,
                                PTeamID: props.team,
                                PTeamUserIsActive: true
                            }

                            axios.post('AddTeamMember/AddTeamMember', newentry)
                            .then(res => {
                                toast.success(`${"New Team Members Added" + " !"}`, {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 5000,
                                    theme: 'dark'
                                });

                                props.onHide(); 
                                clear();
        
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            console.log("this is new1", newentry)

                        }

                        // else if ((res.data.map(i => i.UserID).includes(selectedMember[i].UserID) == false && res.data.map(i => i.TeamID).includes(selectedMember[i].PTeamID) == false && selectedMember[i].PTeamID != null && selectedMember[i].PTeamID != props.team && selectedMember[i].Company == props.client[0].vendorId) || (res.data.map(i => i.UserID).includes(selectedMember[i].UserID) == false  && selectedMember[i].PTeamID != undefined && res.data.map(i => i.TeamID).includes(selectedMember[i].PTeamID) == false && selectedMember[i].PTeamID != props.team && selectedMember[i].Company == props.client[0].vendorId) ) {
                        //     var newentry = {
                        //         PTeamUserRole: (selectedMember[i].Role == null || selectedMember[i].Role == undefined) ? (1) : (selectedMember[i].Role),
                        //         PTeamUser: selectedMember[i].UserID,
                        //         PTeamID: props.team,
                        //         PTeamUserIsActive: true
                        //     }

                        //     // axios.post('AddTeamMember/AddTeamMember', newentry)
                        //     // .then(res => {
                        //     //     toast.success(`${"New Team Members Added" + " !"}`, {
                        //     //         position: toast.POSITION.TOP_RIGHT,
                        //     //         autoClose: 5000,
                        //     //         theme: 'dark'
                        //     //     });

                        //     //     props.onHide(); 
                        //     //     clear();
        
                        //     // })
                        //     // .catch(err => {
                        //     //     console.log(err);
                        //     // })
                        //     console.log("this is new2", newentry)

                        // }
                        else if ((res.data.map(i => i.UserID).includes(selectedMember[i].UserID) == true  && selectedMember[i].PTeamID != null && selectedMember[i].PTeamID != props.team && selectedMember[i].Company == props.client[0].vendorId) || (res.data.map(i => i.UserID).includes(selectedMember[i].UserID) == true  && selectedMember[i].PTeamID != undefined && selectedMember[i].PTeamID != props.team && selectedMember[i].Company == props.client[0].vendorId) ) {
                            var newentry = {
                                PTeamUserRole: (selectedMember[i].Role == null || selectedMember[i].Role == undefined) ? (1) : (selectedMember[i].Role),
                                PTeamUser: selectedMember[i].UserID,
                                PTeamID: props.team,
                                PTeamUserIsActive: true
                            }

                            axios.post('AddTeamMember/AddTeamMember', newentry)
                            .then(res => {
                                toast.success(`${"New Team Members Added" + " !"}`, {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 5000,
                                    theme: 'dark'
                                });

                                props.onHide(); 
                                clear();
        
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            console.log("this is new2", newentry)

                        }
                        else if  ((res.data.map(i => i.UserID).includes(selectedMember[i].UserID) == true && selectedMember[i].PTeamID != null && selectedMember[i].PTeamUserIsActive ==false && selectedMember[i].PTeamID != props.team  && selectedMember[i].Company == props.client[0].vendorId) || res.data.map(i => i.UserID).includes(selectedMember[i].UserID) == true && selectedMember[i].PTeamID != undefined && selectedMember[i].Company == props.client[0].vendorId ) {
                        
                            var newentry = {
                               PTeamUserRole: (selectedMember[i].Role == null || selectedMember[i].Role == undefined) ? (1) : (selectedMember[i].Role),
                               PTeamUser: selectedMember[i].UserID,
                               PTeamID: props.team,
                               PTeamUserIsActive: true
                           }

                           axios.put('AddTeamMember/updateTeamMember', newentry)
                           .then(res => {
                               toast.success(`${"New Team Members Added" + " !"}`, {
                                   position: toast.POSITION.TOP_RIGHT,
                                   autoClose: 5000,
                                   theme: 'dark'
                               });

                               props.onHide(); 
                               clear();
       
                           })
                           .catch(err => {
                               console.log(err);
                           })
                           console.log("this is an update 1", newentry)
                        }

                        else if  ((res.data.map(i => i.UserID).includes(selectedMember[i].UserID) == true && selectedMember[i].PTeamID != null && selectedMember[i].PTeamID == props.team  && selectedMember[i].Company == props.client[0].vendorId) || res.data.map(i => i.UserID).includes(selectedMember[i].UserID) == true && selectedMember[i].PTeamID != undefined && selectedMember[i].Company == props.client[0].vendorId ) {
                        
                             var newentry = {
                                PTeamUserRole: (selectedMember[i].Role == null || selectedMember[i].Role == undefined) ? (1) : (selectedMember[i].Role),
                                PTeamUser: selectedMember[i].UserID,
                                PTeamID: props.team,
                                PTeamUserIsActive: true
                            }

                            axios.put('AddTeamMember/updateTeamMember', newentry)
                            .then(res => {
                                toast.success(`${"New Team Members Added" + " !"}`, {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 5000,
                                    theme: 'dark'
                                });

                                props.onHide(); 
                                clear();
        
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            console.log("this is an update 2", newentry)
                         }

                         
                    //    else if  ((res.data.map(i => i.UserID).includes(selectedMember[i].UserID) == true && selectedMember[i].PTeamID != null  && selectedMember[i].Company == props.client[0].vendorId) || res.data.map(i => i.UserID).includes(selectedMember[i].UserID) == true && selectedMember[i].PTeamID != undefined && selectedMember[i].Company == props.client[0].vendorId ) {
                    //        var newentry = {
                    //             PTeamUserRole: (selectedMember[i].Role == null || selectedMember[i].Role == undefined) ? (1) : (selectedMember[i].Role),
                    //             PTeamUser: selectedMember[i].UserID,
                    //             PTeamID: props.team,
                    //             PTeamUserIsActive: true
                    //         }

                            
                    //     console.log("This is an update 3", newentry) 
                        }

                    


                })
                .catch((err) => {
                    console.log(err, "Unable to get user list");
                });

        }
        else
            console.log('Please choose a new member');
    }
    //  const handleAddTeamMembers = () => {

    //     for(var i =0; i < addedMembers.length; i++){
    //         var newmember ={
    //             PTeamUserRole: ,
    //             PTeamUser: addedMembers[i],
    //             PTeamID: selectedClient,
    //             PTeamUserIsActive: true
    //         }
    //         console.log(name);
    //     }


    // };

    function clear() {
        setPersonName([]);
    }

    // Grab
    useEffect(() => {

        axios.get(`userList/userList`)
            .then((response) => {
                setselectedClient(response.data.filter(i => i.Company == props.client[0].vendorId));
                setselectedMember([])
                
                axios.get(`GetTeamListPage/GetTeamList`)
                    .then((res) => {
                        console.log('team member list init',response.data.filter(i => ((res.data.filter((ip => ip.TeamID == props.team && ip.clientID ==props.client.vendorId && ip.ActiveTeamMember == false)).map(item => item.UserID).includes(i.myUserId)))), response.data.filter(i => ((!res.data.filter(ip => ip.TeamID === props.team && ip.clientID === props.client.vendorId ).map(item => item.UserID).includes(i.myUserId)))&& i.isUser==true))
                        setTeamMemberList(res.data.filter(teammember => teammember.TeamID == props.team && teammember.ActiveTeamMember == true));
                        if (response.data.filter(i => ((res.data.filter((ip => ip.TeamID == props.team && ip.clientID ==props.client.vendorId && ip.ActiveTeamMember == false)).map(item => item.UserID).includes(i.myUserId)))).length != 0 && response.data.filter(i => ((!res.data.filter(ip => ip.TeamID === props.team && ip.clientID === props.client.vendorId ).map(item => item.UserID).includes(i.myUserId)))&& i.isUser==true).length ==0) {
                            // for (var i = 0; i< (response.data.filter(i => i.Company == props.client[0].vendorId).length); i++){
                            setNames( response.data.filter(i => ((res.data.filter((ip => ip.TeamID == props.team && ip.clientID ==props.client.vendorId && ip.ActiveTeamMember == false)).map(item => item.UserID).includes(i.myUserId)))).map(item => ({ value: item.myUserId, label: item.FullName })));
                            console.log("Team Available1", response.data.filter(i => res.data.map(item => item.UserID).includes(i.myUserId) && res.data.TeamID != props.team[0] && i.Company == props.client[0].vendorId))
                            // }

                        }
                        else if (response.data.filter(i => ((res.data.filter((ip => ip.TeamID == props.team && ip.clientID ==props.client.vendorId && ip.ActiveTeamMember == false)).map(item => item.UserID).includes(i.myUserId)))).length == 0 && response.data.filter(i => ((!res.data.filter(ip => ip.TeamID === props.team && ip.clientID === props.client.vendorId ).map(item => item.UserID).includes(i.myUserId)))&& i.isUser==true).length ==0) {
                            // for (var i = 0; i< (response.data.filter(i => i.Company == props.client[0].vendorId).length); i++){
                            setNames( response.data.filter(i => ((res.data.filter((ip => ip.TeamID == props.team && ip.clientID ==props.client.vendorId && ip.ActiveTeamMember == false)).map(item => item.UserID).includes(i.myUserId)))).map(item => ({ value: item.myUserId, label: item.FullName })));
                            console.log("Team Available2", response.data.filter(i => res.data.map(item => item.UserID).includes(i.myUserId) && res.data.TeamID != props.team[0] && i.Company == props.client[0].vendorId))
                            // }

                        }
                        else {
                            // for (var i = 0; i < (response.data.filter(i => i.Company == props.client[0].vendorId && !res.data.map(item => item.UserID).includes(i.myUserId))).length; i++){
                            setNames(response.data.filter(i => i.Company == props.client[0].vendorId && res.data.map(item => item.UserID).includes(i.myUserId)).map(item => ({ value: item.myUserId, label: item.FullName })));
                            console.log("Team Available3", response.data.filter(i => i.Company == props.client[0].vendorId && res.data.map(item => item.UserID).includes(i.myUserId)).map(item => ({ value: item.myUserId, label: item.FullName })))
                            // }

                        }

                        // console.log("ADD TEAM MEMBERS", response.data.filter(i => !res.data.map(item => item.UserID).includes(i.myUserId) && !res.data.TeamID == props.team && i.Company == props.client[0].vendorId))

                    })
                    .catch((err) => {
                        console.log(err, "Unable to get user list");
                    });




            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });

        console.log('SELECTED TEAM', props.team)



    }, [props.show, props.client, props.team]);

    const showselectedmembers = (e) => {
        axios.get(`GetAllTeamMembers/getTeamMembersList`)
            .then((response) => {
                // setselectedClient(response.data.filter(i => i.Company == props.client[0].vendorId));

                // for (var i = 0; i < response.data.length; i++){
                //     selectedMember.push(

                //     )
                // }
                axios.get(`userList/userList`)
                .then((res) => {
                console.log('SELECTION OF MEMBER',response.data.filter(i => e.map(item => item.value).includes(i.UserID)&& i.PTeamID == props.team || i.PTeamID ==null || i.PTeamID == undefined),res.data.filter(i => e.map(item => item.value).includes(i.myUserId)),response.data.filter(i => e.map(item => item.value).includes(i.UserID)&& i.PTeamID == props.team || i.PTeamID ==null || i.PTeamID == undefined).length)

                // console.log('new changes role',response.data.filter(i => e.map(item => item.value).includes(i.UserID)))

                // setTeamMemberList(res.data.filter(teammember => teammember.TeamID == props.team));
                // if (selectedMember == "") {
                //     setselectedMember(response.data.filter(i => e.map(item => item.value).includes(i.UserID)&&  i.PTeamID == props.team || i.PTeamID ==null || i.PTeamID == undefined))
                //     setaddedMembers(response.data.filter(i => e.map(item => item.value).includes(i.UserID)&& i.PTeamID == props.team || i.PTeamID ==null || i.PTeamID == undefined))
                // }
                // else if(response.data.filter(i => e.map(item => item.value).includes(i.UserID)&& i.PTeamID == props.team || i.PTeamID ==null || i.PTeamID == undefined).length != 0) {
                //     setselectedMember([...response.data.filter(i => e.map(item => item.value).includes(i.UserID)&&  i.PTeamID == props.team || i.PTeamID ==null || i.PTeamID == undefined)])
                //     setaddedMembers([...response.data.filter(i => (e.map(item => item.value)).includes(i.UserID)&&  i.PTeamID == props.team || i.PTeamID ==null || i.PTeamID == undefined)])
                // }
                // else if(response.data.filter(i => e.map(item => item.value).includes(i.UserID)&& i.PTeamID == props.team || i.PTeamID ==null || i.PTeamID == undefined).length == 0) {
                    setselectedMember(res.data.filter(i => e.map(item => item.value).includes(i.myUserId)).map(i =>({Company: i.Company,FullName:i.FullName,PTeamID:props.team,Role: 1,UserID: i.myUserId,userPic: i.userPic})))
                    setaddedMembers(res.data.filter(i => (e.map(item => item.value)).includes(i.myUserId)).map(i =>({Company: i.Company,FullName:i.FullName,PTeamID:props.team,Role: 1,UserID: i.myUserId,userPic: i.userPic})))
                    console.log("THIS IS 0 Length")
                // }
                console.log('Selected Data', res.data.filter(i => e.map(item => item.value).includes(i.myUserId)).map(i =>({Company: i.Company,FullName:i.FullName,PTeamID:props.team,Role: 1,UserID: i.myUserId,userPic: i.userPic})))

                console.log('Selected Data2', addedMembers)



            })



            })
            .catch((err) => {
                console.log(err, "Unable to get user list");
            });



    }
    const showselectedmemberrole = (e, UserID) => {

        // setselectedClient(response.data.filter(i => i.Company == props.client[0].vendorId));

        // for (var i = 0; i < response.data.length; i++){
        //     selectedMember.push(

        //     )
        // }

        for (var i = 0; i < selectedMember.length; i++) {
            if (selectedMember[i].UserID == UserID) {
                selectedMember[i].Role = e.value

            }
            else console.log('no match');

        }

        console.log('new changes role', selectedMember)

        setaddedMembers(selectedMember)

        // setselectedMember(response.data.filter(i => e.map(item => item.value).includes(i.UserID)))
        // console.log('Selected Data', response.data.filter(i => e.map(item => item.value).includes(i.UserID)))








    }

    // const AddMembers = (members) => {

    //     // console.log('added members'. addedMembers)
    //     if (members.length > 0) {
    //         for (var i = 0; i < members.length; i++) {

    //             var newMember = {
    //                 PTeamUserRole: members[i].Role,
    //                 PTeamUser: members[i].UserID,
    //                 PTeamID: props.team,
    //                 PTeamUserIsActive: true
    //             }
    //             console.log('New Team Member Submitted', newMember)



    //         }
    //     }

    //     else
    //         console.log("Please enter a value for ", members[i].FullName)
// }
// function onAddTeamMember() {
//     const newTeamObj = {
//         PTeamName: NewTeam,
//         PTeamIsActive: true,
//         clientID: props.object[0].vendorId
//     }


//     axios.post(`AddTeam/AddTeam`, newTeamObj)
//         .then((response) => {
//             toast.success(`${"New Team Added: " + NewTeam}`, {
//                 position: toast.POSITION.TOP_RIGHT,
//                 autoClose: 5000,
//                 theme: 'dark'
//             });
//             // console.log('TEAM SUBMIT', newTeamObj)
//         })
//         .catch((err) => {
//             console.log(err, "Unable to get user list");
//         });

//     props.onHide()

// }



return (
    <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => { props.onHide(); clear() }}
    // dialogClassName="modal-width-AddTeam"
    // contentClassName="modal-height-AddTeam"
    >
        <ToastContainer />

        <Modal.Header closeButton>
            <div className='manage-team-header-container'>
                Add New Member To Team:
            </div>
        </Modal.Header>
        <Modal.Body>
            <Form className='add-project-form'>
                {/* <label className='project-title'> Project Name </label>
                    <input id="title-input" onChange={(e) => onProjectName(e.target.value)} type='text' className='title-input' /> */}
                <FormControl>
                    <label id="demo-multiple-name-label">Select New Team Members</label>
                    {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={selectedName}
                            // label={name.FullName}
                            // nameselected={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Chip" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        > */}
                    {/* <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> */}
                    {/* <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            // name={personName2}
                            value={personName}
                            onChange={(e)=>{handleChange(e);console.log("ID",e.target.value.myUserId)}}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((name) => (
                                        <Chip key={name.myUserId} label={name.FullName} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem
                                    key={name.myUserId}
                                    value={{myUserId: name.myUserId,FullName: name.FullName}}
                                    // style={getStyles(name.myUserId, personName, theme)}
                                >
                                    {name.FullName}
                                </MenuItem>
                            ))}
                        </Select> */}
                    <Select
                        // styles={styles}
                        closeMenuOnSelect={false}
                        isMulti
                        options={names}
                        onChange={(e) => { showselectedmembers(e) }}
                    // defaultValue={options[0]}
                    />{selectedMember.length == 0 ?
                        (
                            <h7>No new team members have been selected. Please select at least one new team member to continue.</h7>
                        )
                        :
                        (
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                <TableHead style={{ width: '100%' }}>

                                    <TableRow>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="left">User</TableCell>
                                        <TableCell align="right">Role</TableCell>

                                    </TableRow>

                                </TableHead>
                                <TableBody>



                                    {selectedMember.map((row, index) => (
                                        <TableRow
                                            key={row.UserID}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">
                                                <img className='profile-pic' src={'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + row.userPic} style={{ height: '30px', width: '30px', borderRadius: '50px' }} />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.FullName}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Select
                                                    // styles={styles}
                                                    closeMenuOnSelect={true}
                                                    defaultValue={{ value: 1, label: 'Project Team Member' }}
                                                    options={[{ value: 0, label: 'Project Lead' }, { value: 1, label: 'Project Team Member' }]}
                                                    onChange={(e) => { showselectedmemberrole(e, row.UserID)}}
                                                // defaultValue={options[0]}
                                                />
                                            </TableCell>

                                            {/* {EditMode ? <TableCell align="right"><input defaultChecked={row.TaskCompleted} type='checkbox'></input></TableCell> : <TableCell align="right"><input disabled defaultChecked={row.TaskCompleted} type='checkbox'></input></TableCell>} */}
                                        </TableRow>
                                    ))}



                                </TableBody>
                            </Table>
                        )
                    }
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
                <button type="button" onClick={() => submitNewMembers()} className='submit-project-form'>Add Team Members</button>
                {/* onClick={()=>submitNewMembers()} */}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => { props.onHide(); clear() }}>Close</Button>
        </Modal.Footer>
    </Modal>
)
}

export default AddTeamMemberModal