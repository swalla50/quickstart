import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AssignModuleRightsModal from './AssignModuleRightsModal';
import TreeView from '@mui/lab/TreeView';


import TreeItem from '@mui/lab/TreeItem';
import { ChevronRightRounded, ExpandMoreRounded, Group } from '@material-ui/icons';
import { faLock, faPlusCircle, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import AddGroupModal from './AddGroupModal';
import EditGroupModal from './EditGroupModal';
import AssignGroupUsers from './AssignGroupUsers';
import DeleteConfirmModal from './DeleteConfirmModal';

function AddUserModal(props) {
    const [user, setUser] = useState([]);

    const [groupListL1, setGroupListL1] = useState([]);
    const [groupListL2, setGroupListL2] = useState([]);
    const [moduleModal, setmoduleModal] = useState(false);
    const [group, setGroup] = useState([]);
    const [AddGroups, setAddGroups] = useState(false);
    const [EditGroups, seteditGroups] = useState(false);
    const [GroupUsers, setGroupUsers] = useState(false);
    const [Delete, setDelete] = useState(false)

    function handlemodalModal() {
        setmoduleModal(false);
    }
    function handledeletegroupModal() {
        setDelete(false);
    }
    function handleditGrouplModal() {
        seteditGroups(false);
        axios.get(`getvendor/getvendorList`)
        .then((response) => {
            setGroupListL1(response.data.filter(gr => gr.isActiveVendor == true  && gr.isGroup == true && gr.groupLevel == 1));
            setGroupListL2(response.data.filter(gr => gr.isActiveVendor == true && gr.isGroup == true));

            console.log('GROUP: ', response.data.filter(gr => gr.isActiveVendor == true && gr.isVendor == false && gr.isGroup == true))
        })
        .catch((err) => {
            console.log(err, "Unable to get vendor time info");
        });
    }
    function handleaddGrouplModal() {
        setAddGroups(false);
        axios.get(`getvendor/getvendorList`)
        .then((response) => {
            setGroupListL1(response.data.filter(gr => gr.isActiveVendor == true  && gr.isGroup == true && gr.groupLevel == 1));
            setGroupListL2(response.data.filter(gr => gr.isActiveVendor == true && gr.isGroup == true));

            console.log('GROUP: ', response.data.filter(gr => gr.isActiveVendor == true && gr.isVendor == false && gr.isGroup == true))
        })
        .catch((err) => {
            console.log(err, "Unable to get vendor time info");
        });
    }
    function handleuserGrouplModal() {
        setGroupUsers(false);

    }



    useEffect(() => {

        axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setGroupListL1(response.data.filter(gr => gr.isActiveVendor == true  && gr.isGroup == true && gr.groupLevel == 1));
                setGroupListL2(response.data.filter(gr => gr.isActiveVendor == true && gr.isGroup == true));

                console.log('GROUP: ', response.data.filter(gr => gr.isActiveVendor == true && gr.isVendor == false && gr.isGroup == true))
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




    }, []);


    console.log("select GROUP", group)


    function openDeleteModal(e){
        
        setDelete(true)
    }

   //Remove Group
   function deleteGroup (){
    var deletedGroup ={
        vendorId: group.vendorId,
        isGroup: false
    }

    axios.put('deleteGroup/deleteGroup', deletedGroup)
        .then(res => {
            toast.success(`${"Deleted Group Successfully"}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                theme:'dark'
            });
            axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setGroupListL1(response.data.filter(gr => gr.isActiveVendor == true  && gr.isGroup == true && gr.groupLevel == 1));
                setGroupListL2(response.data.filter(gr => gr.isActiveVendor == true && gr.isGroup == true));
    
                console.log('GROUP: ', response.data.filter(gr => gr.isActiveVendor == true && gr.isVendor == false && gr.isGroup == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
        })
        .catch(err => {
            console.log(err);
        })
        
    
    
              
    console.log("GroupDeleted",deletedGroup)
   }
    return (
        <div className='UpdateUser'>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width-Restock"
                contentClassName="modal-height-Restock"
            >
                <ToastContainer/>
                <Modal.Header closeButton>
                    <div className='header-container-security-group'>
                        <div className='security-header-left'>
                            User Security Groups <FontAwesomeIcon className="project-done-icon" icon={faLock} size='1x' />
                        </div>
                        <div className='security-header-right'>
                            <Button  onClick={() => setAddGroups(true)} className='Add-new-group-btn' style={{ display: 'flex', height: '30px' }}>
                                <p style={{ color: 'white', marginRight: '1rem' }} className='Add-group-btn-text'>Add Group</p>  <FontAwesomeIcon style={{ color: 'white' }} className="project-done-icon" icon={faPlusCircle} size='2x' />
                            </Button>
                        </div>

                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='groups-container'>
                        <div className='group-item'>

                            <>
                                <div className='group-title-container'>
                                    {/* <div className='title-container'>
                                            <h5 className='group-text'>({item.vendorId})</h5>
                                            <p className='group-name'>{item.vendorName}</p>
                                        </div> */}
                                    <TreeView
                                        aria-label="file system navigator"
                                        CollapseIcon={<ExpandMoreRounded />}
                                        ExpandIcon={<ChevronRightRounded />}
                                        sx={{ flexGrow: 1, overflowY: 'auto', paddingInline: '5rem' }}
                                        style={{ background: 'transparent' }}
                                        onNodeSelect={false}
                                        onNodeToggle={false}
                                    >
                                        {groupListL1.map((item, index) => (
                                            <TreeItem style={{ borderRadius: '50px'}} className='groupL1' nodeId={item.vendorId} label={`${'(' + item.vendorId + ')' + ' ' + item.vendorName
                                                }  `

                                            } icon={<DropdownButton menuVariant="dark" className='group-dropdown' id="dropdown-item-buttonpostrights" title=". . .">
                                                <Dropdown.Item style={{ color: 'white' }} onClick={() => { setmoduleModal(true); setGroup(groupListL1[index]); }} className="group-option-btn" as="button">Assign Modules to {item.vendorName}</Dropdown.Item>
                                                <Dropdown.Item style={{ color: 'white' }} onClick={() => { seteditGroups(true); setGroup(item) }} className="group-option-btn" as="button">Edit Group</Dropdown.Item>
                                                <Dropdown.Item style={{ color: 'white' }} onClick={() => { setGroupUsers(true); setGroup(item) }} className="group-option-btn" as="button">Assign Users ({item.vendorName})</Dropdown.Item>

                                                <Dropdown.Item style={{ color: 'white' }} onClick={() => { setDelete(true); setGroup(item) }} className="group-option-btn" as="button">Delete ({item.vendorName})</Dropdown.Item>
                                            </DropdownButton>}>
                                                {/* {groupListL2[index].parentGroup == item.vendorId ? (<TreeItem nodeId="2" label={`${'(' + groupListL2[index].vendorId + ')' + ' ' + groupListL2[index].vendorName} `} />) : (<div></div>)} */}
                                                {groupListL2.filter(i => i.parentGroup === item.vendorId).map((items, indexs) => (
                                                    <TreeItem style={{ background: '#0d6efd', borderRadius: '50px' }} 
                                                    icon={
                                                    <DropdownButton menuVariant="dark" className='group-dropdown' id="dropdown-item-buttonpostrights" title=". . .">
                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setmoduleModal(true); setGroup(items) }} className="group-option-btn" as="button">Assign Modules to {items.vendorName}</Dropdown.Item>
                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { seteditGroups(true); setGroup(items) }} className="group-option-btn" as="button">Edit Group</Dropdown.Item>
                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setGroupUsers(true); setGroup(items) }} className="group-option-btn" as="button">Assign Users ({items.vendorName})</Dropdown.Item>
                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setDelete(true); setGroup(items) }} className="group-option-btn" as="button">Delete ({items.vendorName})</Dropdown.Item>
                                                    </DropdownButton>
                                                    } className='groupL2' nodeId={items.vendorId} label={`${'(' + items.vendorId + ')' + ' ' + items.vendorName} `} />
                                                ))}

                                            </TreeItem>
                                        ))}
                                    </TreeView>
                                    {/* <DropdownButton menuVariant="dark" className='group-dropdown' id="dropdown-item-buttonpost" title=". . .">
                                            <Dropdown.Item style={{ color: 'white' }} onClick={() => { setmoduleModal(true); setGroup(groupList[index]) }} className="group-option-btn" as="button">Assign Modules</Dropdown.Item>
                                        </DropdownButton> */}
                                </div>

                            </>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
                <AssignModuleRightsModal id="user-modal-modal"
                    show={moduleModal}
                    onHide={handlemodalModal}
                    Group={group}
                />
                <AddGroupModal id="user-modal-modal"
                    show={AddGroups}
                    onHide={handleaddGrouplModal}
                />
                <EditGroupModal id="user-modal-modal"
                    show={EditGroups}
                    onHide={handleditGrouplModal}
                    Group={group}
                />
                <AssignGroupUsers id="user-modal-modal"
                    show={GroupUsers}
                    onHide={handleuserGrouplModal}
                    Group={group}
                />
                <DeleteConfirmModal id="user-modal-modal"
                    show={Delete}
                    onHide={handledeletegroupModal}
                    Group={group}
                    deleteFunc={deleteGroup}
                />
            </Modal>
        </div >
    )
}

export default AddUserModal

// {groupListL2.filter(l2 => l2.parentGroup === item.vendroId).map((items,indexs) => (
//     <TreeItem nodeId="2" label={`${'(' +items.vendorId+')'+ ' ' + items.vendorName} `} />
//     ))}