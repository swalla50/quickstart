
import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, DropdownButton, Dropdown, FormCheck } from 'react-bootstrap';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowBack, CheckBox, Comment, ViewModule } from '@material-ui/icons';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import 'react-toastify/dist/ReactToastify.css';
import { ChevronS1Left } from 'plaid-threads';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function AssignModuleRightsModal(props) {
    const [user, setUser] = useState([]);

    const [module, setModule] = useState([]);
    const [availableModule, setavailableModule] = useState([]);
    const [match, setMactch] = useState([]);
    var matchesmade = [];


    useEffect(() => {

        axios.get(`grouprights/getGroupRights`)
            .then((response) => {
                setModule(response.data);



            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });

        axios.get(`GetModuleList/getModule`)
            .then((res) => {
                setavailableModule(res.data);
                for (var i = 0; i < res.data.length; i++) {
                    matchesmade.push(res.data[i].ModuleID);
                    setMactch(matchesmade);
                }

            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
        axios.get(`UserProfile`)
            .then((res) => {
                setUser(res.data)


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

        getavailable();

        if(props.onHide){
            resetValues();
            handleToggleunassaign(null);
        }


    }, []);

    function resetValues (){
        setChecked([]);
        setunChecked([]);
        setselectedRightLevel(0)
    }

    const [checked, setChecked] = React.useState([]);
    const [unchecked, setunChecked] = React.useState([]);
    //For the selectable list
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);

        
      };
      const handleToggleunassaign = (value) => () => {
        const currentIndex = unchecked.indexOf(value);
        const newunChecked = [...unchecked];
    
        if (currentIndex === -1) {
            newunChecked.push(value);
        } else {
            newunChecked.splice(currentIndex, 1);
        }
    
        setunChecked(newunChecked);

        
      };



    // console.log("NEW GROUP",module,availableModule.filter((items) => match.indexOf(Number(items.ModuleID))))
    function getavailable() {
        axios.get(`grouprights/getGroupRights`)
        .then((response) => {
            setModule(response.data);



        })
        .catch((err) => {
            console.log(err, "Unable to get vendor time info");
        });
    }

    // function onSubmitNewUserChanges() {
    //     const userInfo = {
    //         UserName: username,
    //         FullName: FullName,
    //         Email: userEmail,
    //         PhoneNumber: Phone,
    //         orgName: Org,
    //         orgType: OrgType,
    //         Password: password,
    //         UserRole: Role,
    //         payperHour: payPerHour,
    //         userPic: PhotoName
    //     }
    //     // console.log("NEW USER DATA",userInfo.Photo[0].name)

    //     console.log(Photo);
    //     const formData = new FormData();
    //     formData.append("formFile", Photo);
    //     formData.append("fileName", PhotoName);

    //     console.log(formData)
    //     try {
    //         const res = axios.post("https://webapi20220126203702.azurewebsites.net/api/ApplicationUser/saveFile", formData);
    //         console.log("PHOTO SUCCESS", res);
    //     }
    //     catch (ex) {
    //         console.log(ex);
    //     }
    //     axios.post('applicationuser/Register', userInfo)
    //         .then(res => {
    //             var editeduser = res.data;
    //             console.log("NEW INFO", res.data)
    //             toast.success(`${"Added  " + userInfo.FullName + " Successfully!"}`, {
    //                 position: toast.POSITION.TOP_RIGHT,
    //                 autoClose: 5000,
    //                 theme: 'dark'

    //             });
    //             getUserData();
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })

    //     getUserData();
    //     props.onHide();
    // }


    // function getUserData() {
    //     axios.get(`UserProfile`)
    //         .then((res) => {
    //             setUser(res.data)
    //             setusername(res.data.UserName);
    //             setFullName(res.data.FullName);
    //             setPhone(res.data.PhoneNumber);
    //             setOrg(res.data.orgName);
    //             setOrgType(res.data.orgType);
    //             setPhoto(res.data.userPic);


    //         })
    //         .catch((err) => {
    //             console.log(err, "Unable to get user time info");
    //         });
    // }

    const selectedModules = []
    const [allselectedModules, setallselectedModules] = useState([]);
    // const [check, setCheck] = useState(false)
    const [selectedRightLevel, setselectedRightLevel] = useState(0);
    // function selectModules(value, checkvalue) {
    //     selectedModules.push({ ModuleID: value, Checked: checkvalue });
    //     setallselectedModules(selectedModules)
    //     console.log('modules selected', selectedModules)
    // }

    function selectRightLevel(value) {
        setselectedRightLevel(value);
    }



    function assignRight() {
        if(checked.length >1){
          for (var i = 0; i < checked.length; i++) {
            const newGroupRights = {
                GRID: checked[i].GRID,
                GRLevel: selectedRightLevel
            }
            axios.put('assignModuleRights/assignModuleRights', newGroupRights)
            .then(res => {
                getavailable();
                toast.success(`${props.Group.vendorName + ' now has the module ' + checked[i].ModuleName}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme:'dark'
                });
            })
            .catch(err => {
                console.log(err);
            })
        }  
        }
         else if(checked.length === 1 && selectedRightLevel != null){
            const newGroupRights = {
                GRID: checked[0].GRID,
                GRLevel: selectedRightLevel
            }
            axios.put('assignModuleRights/assignModuleRights', newGroupRights)
            .then(res => {
                getavailable();
                toast.success(`${props.Group.vendorName + ' now has the module ' + checked[0].ModuleName}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme:'dark'
                });
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            toast.error("No Modules Selected.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: 'dark'
        });
        }
        getavailable();

    }
    function unassignRight() {
        if(unchecked.length >1){
          for (var i = 0; i < unchecked.length; i++) {
            const newGroupRights = {
                GRID: unchecked[i].GRID,
                GRLevel: null
            }
            axios.put('assignModuleRights/assignModuleRights', newGroupRights)
            .then(res => {
                getavailable();
                toast.success(`${props.Group.vendorName + ' now has the module ' + unchecked[i].ModuleName + ' Removed'}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme:'dark'
                });
            })
            .catch(err => {
                console.log(err);
            })
        }  
        }
         else if(unchecked.length === 1){
            const newGroupRights = {
                GRID: unchecked[0].GRID,
                GRLevel: null
            }
            axios.put('assignModuleRights/assignModuleRights', newGroupRights)
            .then(res => {
                getavailable();
                toast.success(`${props.Group.vendorName + ' now has the module ' + unchecked[0].ModuleName + ' Removed'}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme:'dark'
                });
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            toast.error("No Modules Selected to unassign.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: 'dark'
        });
        }
        getavailable();

    }

    function getModules(){
        axios.get(`grouprights/getGroupRights`)
            .then((response) => {
                setModule(response.data);



            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });

        axios.get(`GetModuleList/getModule`)
            .then((res) => {
                setavailableModule(res.data);
                for (var i = 0; i < res.data.length; i++) {
                    matchesmade.push(res.data[i].ModuleID);
                    setMactch(matchesmade);
                }

            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
    }

    return (
        <div className='AssignModuleRights'>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width"
                contentClassName="modal-height"
                onHide={() => {props.onHide();resetValues()}}
                onShow={() => getModules()}
                
            >
                <ToastContainer />

                <Modal.Header closeButton>
                    Update Group: {props.Group.vendorName}
                </Modal.Header>
                <Modal.Body>
                    <div className='module-rights-container'>
                        <div className='upper'>
                            <div className='rights-available'>
                                <h5 className='module-assign-header'>Available</h5>
                                <div className='available-module-container'>
                                    {module.filter(module => module.vendorId == props.Group.vendorId && module.Level == null).map(item => (
                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {[0].map((value) => {
                                          const labelId = `checkbox-list-label-${item}`;
                                  
                                          return (
                                            <ListItem
                                              key={value}
                                              secondaryAction={
                                                <IconButton edge="end" aria-label="comments">
                                                  <ViewModule style={{color:'white'}} />
                                                </IconButton>
                                              }
                                              disablePadding
                                            >
                                              <ListItemButton className='module-name' role={undefined} onClick={handleToggle(item)} dense>
                                                <ListItemIcon>
                                                  <Checkbox
                                                    style={{color: 'white'}}
                                                    edge="start"
                                                    checked={checked.indexOf(item) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                  />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={`${'(' + item.ModuleID + ')' + ' ' + item.ModuleName}`} />
                                              </ListItemButton>
                                            </ListItem>
                                          );
                                        })}
                                      </List>
                                        // <Button  type="button"  onClick={(e) => selectModules(e.target.value, e.target.checked)} value={item.ModuleID}  onSelect={} className='module-name' >({item.ModuleID}) {item.ModuleName}</Button>
                                    ))}
                                </div>
                            </div>
                            <div className='rights-available'>
                                <h5 className='module-assign-header'>Right Levels</h5>
                                <div className='rights-container'>
                                    <Button onClick={(e) => selectRightLevel(e.target.value)} value={1} style={{ background: '#0bd70b', border: 'none' }} className='view-right'>View</Button>
                                    <Button onClick={(e) => selectRightLevel(e.target.value)} style={{ background: '#bfbf10', border: 'none' }} value={2} className='edit-right'>Edit</Button>
                                    <Button onClick={(e) => selectRightLevel(e.target.value)} style={{ background: '#b90000', border: 'none' }} value={3} className='delete-right'>Delete</Button>
                                </div>
                                

                            </div>
                            <div className='rights-assigned'>
                                <h5 className='module-assign-header'>Assigned</h5>
                                <div className='available-module-container'>
                                    {module.filter(module => module.vendorId == props.Group.vendorId && module.Level !== null).map((item) => (
                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {[0].map((value) => {
                                          const labelId = `checkbox-list-label-${item}`;
                                  
                                          return (
                                            <ListItem
                                              key={value}
                                              secondaryAction={
                                                <IconButton edge="end" aria-label="comments">
                                                  <ViewModule style={{color:'white'}} />
                                                </IconButton>
                                              }
                                              disablePadding
                                            >
                                              <ListItemButton className={`${"module-name" + item.Level}`} role={undefined} onClick={handleToggleunassaign(item)} dense>
                                                <ListItemIcon>
                                                  <Checkbox
                                                    style={{color: 'white'}}
                                                    edge="start"
                                                    checked={unchecked.indexOf(item) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                  />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={`${'(' + item.ModuleID + ')' + ' ' + item.ModuleName}`} />
                                              </ListItemButton>
                                            </ListItem>
                                          );
                                        })}
                                      </List>
                                        // <Button value={item.ModuleID} className={`${"module-name" + item.Level}`}>({item.ModuleID}) {item.ModuleName} - {item.Level}</Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='lower'>
                            <div className='assign-unassign-right-btn'>
                                    <Button onClick={assignRight} style={{ background: 'gray', border: 'none' }} className='delete-right'>Assign  <FontAwesomeIcon className="bk-coin-icon" icon={faChevronRight} size='1x' /><FontAwesomeIcon className="bk-coin-icon" icon={faChevronRight} size='1x' /></Button>
                                    <Button onClick={unassignRight} style={{ background: 'gray', border: 'none' }} className='delete-right'> <FontAwesomeIcon className="bk-coin-icon" icon={faChevronLeft} size='1x' /><FontAwesomeIcon className="bk-coin-icon" icon={faChevronLeft} size='1x' /> Un-Assign</Button>
                                </div>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default AssignModuleRightsModal