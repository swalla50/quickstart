import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AssignModuleRightsModal from './AssignModuleRightsModal';
import PropTypes from 'prop-types';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';

import { ChevronRightRounded, ExpandMoreRounded, Group } from '@material-ui/icons';
import { faLock, faPlusCircle, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import AddGroupModal from './AddGroupModal';
import EditGroupModal from './EditGroupModal';
import AssignGroupUsers from './AssignGroupUsers';
import DeleteConfirmModal from './DeleteConfirmModal';
import Lottie from 'react-lottie-player';
import animationData from '../../assets/animations/89438-blue-loadingg.json'


function AddUserModal(props) {
    const [user, setUser] = useState([]);

    const [groupListL1, setGroupListL1] = useState([]);
    const [groupListL2, setGroupListL2] = useState([]);
    const [moduleModal, setmoduleModal] = useState(false);
    const [group, setGroup] = useState([]);
    const [editgroup, seteditgroup] = useState([]);
    const [AddGroups, setAddGroups] = useState(false);
    const [EditGroups, seteditGroups] = useState(false);
    const [GroupUsers, setGroupUsers] = useState(false);
    const [Delete, setDelete] = useState(false)
    const [groups, setgroups] = useState([])
    const [loading, setLoading] = useState(false);
    const CustomContent = React.forwardRef(function CustomContent(props, ref) {
        const {
            classes,
            className,
            label,
            nodeId,
            icon: iconProp,
            expansionIcon,
            displayIcon,
        } = props;

        const {
            disabled,
            expanded,
            selected,
            focused,
            handleExpansion,
            handleSelection,
            preventSelection,
        } = useTreeItem(nodeId);

        const icon = iconProp || expansionIcon || displayIcon;

        const handleMouseDown = (event) => {
            preventSelection(event);
        };

        const handleExpansionClick = (event) => {
            handleExpansion(event);
        };

        const handleSelectionClick = (event) => {
            handleSelection(event);
        };

        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
                className={clsx(className, classes.root, {
                    [classes.expanded]: expanded,
                    [classes.selected]: selected,
                    [classes.focused]: focused,
                    [classes.disabled]: disabled,
                })}
                onMouseDown={handleMouseDown}
                ref={ref}
            >
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div onClick={handleExpansionClick} className={classes.iconContainer}>
                    {icon}
                </div>
                <Typography
                    onClick={handleSelectionClick}
                    component="div"
                    className={classes.label}
                >
                    {label}
                </Typography>
            </div>
        );
    });

    CustomContent.propTypes = {
        /**
         * Override or extend the styles applied to the component.
         */
        classes: PropTypes.object.isRequired,
        /**
         * className applied to the root element.
         */
        className: PropTypes.string,
        /**
         * The icon to display next to the tree node's label. Either a parent or end icon.
         */
        displayIcon: PropTypes.node,
        /**
         * The icon to display next to the tree node's label. Either an expansion or collapse icon.
         */
        expansionIcon: PropTypes.node,
        /**
         * The icon to display next to the tree node's label.
         */
        icon: PropTypes.node,
        /**
         * The tree node label.
         */
        label: PropTypes.node,
        /**
         * The id of the node.
         */
        nodeId: PropTypes.string.isRequired,
    };

    function CustomTreeItem(props) {
        return <TreeItem ContentComponent={CustomContent} {...props} />;
    }

    function handlemodalModal() {
        setmoduleModal(false);
    }
    function handledeletegroupModal() {
        setDelete(false);
    }
    function handleopenDeleteGorup(e) {
        var deleteGroups = []
        // console.log(groupListL1)
        for (var i = 0; i < groupListL1.length; i++) {
            for (var j = 0; j < groupListL2.length; j++) {
                // console.log("deleted groups",j,deleteGroups)
                if (e === groupListL1[i].vendorId) {
                    deleteGroups.push(groupListL1[i])
                    if (groupListL2[j].parentGroup == groupListL1[i].vendorId) {
                        deleteGroups.push(groupListL2[j])
                        setGroup(deleteGroups)
                    }
                }



            }

        }
        var newList = [... new Set(deleteGroups)]
        setGroup(newList)
        console.log("deleted groups", newList)
    }
    function handleditGrouplModal() {
        seteditGroups(false);
        refreshGroups();
    }
    function handleaddGrouplModal() {
        setAddGroups(false);
        refreshGroups();
    }
    function handleuserGrouplModal() {
        setGroupUsers(false);
        refreshGroups()

    }

    function refreshGroups() {
        if (props.show != false) {



            axios.get(`UserProfile`)
                .then((res) => {
                    setUser(res.data)
                    axios.get(`getvendor/getvendorList`)
                        .then((response) => {

                            // setGroupListL2(response.data.filter(gr => gr.isActiveVendor == true && gr.isGroup == true && gr.groupLevel ==2));


                            axios.get(`LoadUserRights/getuserRights/` + res.data.myUserId)
                                .then((lures) => {

                                    for (var i = 0; i < lures.data.length; i++) {
                                        groups.push(lures.data[i])
                                    }
                                    setgroups([... new Set(groups.map(item => item))])


                                    setGroupListL1(response.data.filter((gr) => {
                                        return groups.some((f) => {
                                            return ((f.groupId === gr.vendorId && gr.isActiveVendor === true && gr.isGroup == true && f.ActiveUserGroup == true && f.GroupRightsActive == true) || (f.parentGroup === gr.vendorId && gr.isActiveVendor === true && gr.isGroup == true && f.ActiveUserGroup == true && f.GroupRightsActive == true))
                                        });

                                    }));
                                    setGroupListL2(response.data.filter((gr) => {
                                        return groups.some((f) => {
                                            return ((f.groupId === gr.vendorId && gr.isActiveVendor === true && gr.isGroup == true && f.ActiveUserGroup == true && f.GroupRightsActive == true) || (f.groupId === gr.parentGroup && gr.isActiveVendor === true && gr.isGroup == true && f.ActiveUserGroup == true && f.GroupRightsActive == true))
                                        });

                                    }));

                                })
                                .catch((err) => {
                                    console.log(err, "Unable to get vendor time info");
                                });

                            // console.log('GROUP: ', response.data.filter(gr => gr.isActiveVendor == true && gr.isVendor == false && gr.isGroup == true))
                        })
                        .catch((err) => {
                            console.log(err, "Unable to get vendor time info");
                        });

                })
                .catch((err) => {
                    console.log(err, "Unable to get user time info");
                });



        }
    }

    console.log("TEST LOOK GROUPS", groups.some((f) => {
        return (f.groupId == 17 && f.inGroup == true)
    }), groups)


    useEffect(() => {

        setGroupListL1([])
        setGroupListL2([])
        if (props.show != false) {
            setTimeout(() => {


                axios.get(`UserProfile`)
                    .then((res) => {
                        setUser(res.data)
                        axios.get(`getvendor/getvendorList`)
                            .then((response) => {

                                // setGroupListL2(response.data.filter(gr => gr.isActiveVendor == true && gr.isGroup == true && gr.groupLevel ==2));
                                setLoading(true);

                                axios.get(`LoadUserRights/getuserRights/` + res.data.myUserId)
                                    .then((lures) => {

                                        for (var i = 0; i < lures.data.length; i++) {
                                            groups.push(lures.data[i])
                                        }
                                        setgroups([... new Set(groups.map(item => item))])

                                        console.log("GROUP PUSH", groups)
                                        setGroupListL1(response.data.filter((gr) => {
                                            return groups.some((f) => {
                                                return ((f.groupId === gr.vendorId && gr.isActiveVendor === true && gr.isGroup == true && f.ActiveUserGroup == true && f.GroupRightsActive == true) || (f.parentGroup === gr.vendorId && gr.isActiveVendor === true && gr.isGroup == true && f.ActiveUserGroup == true && f.GroupRightsActive == true))
                                            });

                                        }));
                                        setGroupListL2(response.data.filter((gr) => {
                                            return groups.some((f) => {
                                                return ((f.groupId === gr.vendorId && gr.isActiveVendor === true && gr.isGroup == true && f.ActiveUserGroup == true && f.GroupRightsActive == true) || (f.groupId === gr.parentGroup && gr.isActiveVendor === true && gr.isGroup == true && f.ActiveUserGroup == true && f.GroupRightsActive == true))
                                            });

                                        }));

                                    })
                                    .catch((err) => {
                                        console.log(err, "Unable to get vendor time info");
                                    });

                                // console.log('GROUP: ', response.data.filter(gr => gr.isActiveVendor == true && gr.isVendor == false && gr.isGroup == true))
                            })
                            .catch((err) => {
                                console.log(err, "Unable to get vendor time info");
                            });

                    })
                    .catch((err) => {
                        console.log(err, "Unable to get user time info");
                    });
            }, 4000)


        }
    }, [props.show]);



    function openDeleteModal(e) {

        setDelete(true)
    }

    //Remove Group
    function deleteGroup() {


        for (var i = 0; i < group.length; i++) {
            var deletedGroup = {
                vendorId: group[i].vendorId,
                isGroup: false
            }
            var deleteUserGroup = {
                groupId: group[i].vendorId,
                isActive: false
            }
            var deleteGroupRights = {
                GroupID: group[i].vendorId,
                isActive: false
            }
            axios.put('deleteGroup/deleteGroup', deletedGroup)
                .then(res => {


                })
                .catch(err => {
                    console.log(err);
                })
            axios.put('AddGroupRight/deleteGroupRight', deleteGroupRights)
                .then(res1 => {


                })
                .catch(err => {
                    console.log(err);
                })
            axios.put('AddUserGroups/deleteUserGroups', deleteUserGroup)
                .then(res2 => {

                    refreshGroups();
                })
                .catch(err => {
                    console.log(err);
                })
            console.log("GroupDeleted", group[i].vendorId)
        }


        toast.success(`${"Deleted Group(s) Successfully"}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: 'dark'
        });








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
                <ToastContainer />
                <Modal.Header closeButton>
                    <div className='header-container-security-group'>
                        <div className='security-header-left'>
                            User Security Groups <FontAwesomeIcon className="project-done-icon" icon={faLock} size='1x' />
                        </div>
                        <div className='security-header-right'>
                            <Button onClick={() => setAddGroups(true)} className='Add-new-group-btn' style={{ display: 'flex', height: '30px' }}>
                                <p style={{ color: 'white', marginRight: '1rem' }} className='Add-group-btn-text'>Add Group</p>  <FontAwesomeIcon style={{ color: 'white' }} className="project-done-icon" icon={faPlusCircle} size='2x' />
                            </Button>
                        </div>

                    </div>
                </Modal.Header>
                <Modal.Body>
                    {loading == false ?
                        (
                            <div className='animation-group-container'>
                                <Lottie
                                    loop
                                    className='typing-animation-object'
                                    animationData={animationData}
                                    play
                                    style={{ width: '20rem' }}
                                />
                            </div>

                        )
                        :
                        (
                            <div className='groups-container'>
                                <div className='group-item'>

                                    <>
                                        <div className='group-title-container'>
                                            {/* <div className='title-container'>
                                            <h5 className='group-text'>({item.vendorId})</h5>
                                            <p className='group-name'>{item.vendorName}</p>
                                        </div> */}
                                            <TreeView
                                                aria-label="icon expansion"
                                                defaultCollapseIcon={<ExpandMoreRounded />}
                                                defaultExpandIcon={<ChevronRightRounded />}
                                                sx={{ flexGrow: 1, overflowY: 'auto', paddingInline: '5rem' }}
                                                style={{ background: 'transparent' }}
                                            >
                                                {groupListL1.filter(i => i.groupLevel == 1).map((item, index) => (
                                                    <TreeItem style={{ borderRadius: '50px' }} className='groupL1' nodeId={item.vendorId} label={`${'(' + item.vendorId + ')' + ' ' + item.vendorName
                                                        }  `

                                                    } icon={<DropdownButton menuVariant="dark" className='group-dropdown' id="dropdown-item-buttonpostrights" title=". . .">
                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setmoduleModal(true); setGroup(groupListL1[index]); }} className="group-option-btn" as="button">Assign Modules to {item.vendorName}</Dropdown.Item>
                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { seteditGroups(true); seteditgroup(item) }} className="group-option-btn" as="button">Edit Group</Dropdown.Item>
                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setGroupUsers(true); setGroup(item) }} className="group-option-btn" as="button">Assign Users ({item.vendorName})</Dropdown.Item>
                                                        {groups.some((f) => {
                                                            return (f.groupId == item.vendorId && f.inGroup == true)
                                                        }) ?
                                                            (
                                                                <Dropdown.Item style={{ color: 'white' }} onClick={() => { setDelete(true); handleopenDeleteGorup(item.vendorId) }} className="group-option-btn" as="button">Delete ({item.vendorName})</Dropdown.Item>
                                                            )
                                                            :
                                                            (
                                                                <></>
                                                            )

                                                        }

                                                    </DropdownButton>}>
                                                        {/* {groupListL2[index].parentGroup == item.vendorId ? (<TreeItem nodeId="2" label={`${'(' + groupListL2[index].vendorId + ')' + ' ' + groupListL2[index].vendorName} `} />) : (<div></div>)} */}

                                                        {groupListL2.filter(i => i.parentGroup === item.vendorId && i.groupLevel == 2).map((items, indexs) => (
                                                            <CustomTreeItem style={{ background: '#0d6efd', borderRadius: '50px' }}
                                                                icon={
                                                                    <DropdownButton menuVariant="dark" className='group-dropdown' id="dropdown-item-buttonpostrights" title=". . .">
                                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setmoduleModal(true); setGroup(items) }} className="group-option-btn" as="button">Assign Modules to {items.vendorName}</Dropdown.Item>
                                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { seteditGroups(true); seteditgroup(items) }} className="group-option-btn" as="button">Edit Group</Dropdown.Item>
                                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setGroupUsers(true); setGroup(items) }} className="group-option-btn" as="button">Assign Users ({items.vendorName})</Dropdown.Item>
                                                                        {groups.some((f) => {
                                                                            return (f.groupId == items.vendorId && f.inGroup == true)
                                                                        }) ?
                                                                            (
                                                                                <Dropdown.Item style={{ color: 'white' }} onClick={() => { setDelete(true); handleopenDeleteGorup(items.vendorId) }} className="group-option-btn" as="button">Delete ({items.vendorName})</Dropdown.Item>
                                                                            )
                                                                            :
                                                                            (
                                                                                <></>
                                                                            )

                                                                        }
                                                                    </DropdownButton>
                                                                } className='groupL2' nodeId={items.vendorId} label={`${'(' + items.vendorId + ')' + ' ' + items.vendorName} `} >

                                                                {groupListL2.filter(i => i.parentGroup === item.vendorId && i.groupLevel == 3).map((items, indexs) => (
                                                                    <CustomTreeItem style={{ background: '#0d6efd', borderRadius: '50px' }}
                                                                        icon={
                                                                            <DropdownButton menuVariant="dark" className='group-dropdown' id="dropdown-item-buttonpostrights" title=". . .">
                                                                                <Dropdown.Item style={{ color: 'white' }} onClick={() => { setmoduleModal(true); setGroup(items) }} className="group-option-btn" as="button">Assign Modules to {items.vendorName}</Dropdown.Item>
                                                                                <Dropdown.Item style={{ color: 'white' }} onClick={() => { seteditGroups(true); seteditgroup(items) }} className="group-option-btn" as="button">Edit Group</Dropdown.Item>
                                                                                <Dropdown.Item style={{ color: 'white' }} onClick={() => { setGroupUsers(true); setGroup(items) }} className="group-option-btn" as="button">Assign Users ({items.vendorName})</Dropdown.Item>
                                                                                <Dropdown.Item style={{ color: 'white' }} onClick={() => { setDelete(true); handleopenDeleteGorup(items.vendorId) }} className="group-option-btn" as="button">Delete ({items.vendorName})</Dropdown.Item>
                                                                            </DropdownButton>
                                                                        } className='groupL2' nodeId={items.vendorId} label={`${'(' + items.vendorId + ')' + ' ' + items.vendorName} `} >

                                                                        {groupListL2.filter(i => i.parentGroup === item.vendorId && i.groupLevel == 4).map((items, indexs) => (
                                                                            <CustomTreeItem style={{ background: '#0d6efd', borderRadius: '50px' }}
                                                                                icon={
                                                                                    <DropdownButton menuVariant="dark" className='group-dropdown' id="dropdown-item-buttonpostrights" title=". . .">
                                                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setmoduleModal(true); setGroup(items) }} className="group-option-btn" as="button">Assign Modules to {items.vendorName}</Dropdown.Item>
                                                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { seteditGroups(true); seteditgroup(items) }} className="group-option-btn" as="button">Edit Group</Dropdown.Item>
                                                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setGroupUsers(true); setGroup(items) }} className="group-option-btn" as="button">Assign Users ({items.vendorName})</Dropdown.Item>
                                                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setDelete(true); setGroup(items) }} className="group-option-btn" as="button">Delete ({items.vendorName})</Dropdown.Item>
                                                                                    </DropdownButton>
                                                                                } className='groupL2' nodeId={items.vendorId} label={`${'(' + items.vendorId + ')' + ' ' + items.vendorName} `} >

                                                                            </CustomTreeItem>
                                                                        ))}
                                                                    </CustomTreeItem>
                                                                ))}
                                                            </CustomTreeItem>
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
                        )
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>

                {moduleModal == true ?
                    (
                        <AssignModuleRightsModal id="user-modal-modal"
                            show={moduleModal}
                            onHide={handlemodalModal}
                            group={group}
                        />)
                    :
                    (
                        <></>
                    )
                }
                {AddGroups == true ?
                    (
                        <AddGroupModal id="user-modal-modal"
                            show={AddGroups}
                            onHide={handleaddGrouplModal}
                        />
                    )
                    :
                    (
                        <></>
                    )

                }

                {EditGroups == true ?
                    (
                        <EditGroupModal id="user-modal-modal"
                            show={EditGroups}
                            onHide={handleditGrouplModal}
                            group={editgroup}
                        />
                    )
                    :
                    (
                        <></>
                    )

                }

                {GroupUsers == true ?

                    (
                        <AssignGroupUsers id="user-modal-modal"
                            show={GroupUsers}
                            onHide={handleuserGrouplModal}
                            group={group}
                        />
                    )
                    :
                    (
                        <></>
                    )
                }

                {Delete == true ?
                    (
                        <DeleteConfirmModal id="user-modal-modal"
                            show={Delete}
                            onHide={handledeletegroupModal}
                            group={group}
                            deleteFunc={deleteGroup}
                        />
                    )
                    :
                    (
                        <></>
                    )

                }

            </Modal>
        </div >
    )
}

export default AddUserModal

// {groupListL2.filter(l2 => l2.parentGroup === item.vendroId).map((items,indexs) => (
//     <TreeItem nodeId="2" label={`${'(' +items.vendorId+')'+ ' ' + items.vendorName} `} />
//     ))}