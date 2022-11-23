import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';

import moment from 'moment';

import { faBuilding, faBuildingCircleArrowRight, faBuildingCircleCheck, faCode, faContactBook, faLayerGroup, faPalette, faPallet, faPeopleGroup, faPerson, faPhoneSquare, faPlus, faTrashCan, faUserGroup, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EditGroupModal(props) {
    const [user, setUser] = useState("");
    // const [contactList, setContactList] = useState([]);
    // const [venType, setvenType] = useState("");
    // const [codeItem, setcodeItem] = useState("");
    // const [venEmail, setvenEmail] = useState("");
    // const [venphone, setvenphone] = useState("");
    // const [venContact, setvenContact] = useState("");
    var vendorbool = props.Group.isVendor;
    var companybool = props.Group.isCompany;

    var parGroup = props.Group.parentGroup;
    var groupName = props.Group.vendorName;
    const [groupListL1, setGroupListL1] = useState([]);
    var listGroup;



    useEffect(() => {

        axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setGroupListL1(response.data.filter(gr => gr.isActiveVendor == true && gr.isGroup == true));
                listGroup = response.data.filter(gr => gr.isActiveVendor == true && gr.isGroup == true);
                // setGroupListL2(response.data.filter(gr => gr.isActiveVendor == true && gr.isVendor == false && gr.isGroup == true));

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

    const ongroupNameChange = (e) => {
        groupName = e;
    }
    const onparGroupChange = (e) => {
        parGroup = e;
    }
    const onisvendorChange = (e) => {
        vendorbool = e;
    }
    const onisCompanyChange = (e) => {
        companybool = e;
    }

    function submitnewVenCom() {

        if (groupName == '') {
            console.log('Need a name for your group')
            toast.error(`${"Please Enter a Name for this group."}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                theme: 'dark'

            });



        }
        else if ( parGroup==0) {
            const newcomven = {
                vendorId: props.Group.vendorId,
                vendorName: groupName,
                parentGroup: null,
                isGroup:true,
                isVendor: vendorbool,
                groupLevel: 1,
                isActiveVendor: true,
                isCompany:companybool

            }
            axios.put(`addGroup/updateGroup`, newcomven)
                .then((response) => {
                    console.log('newvencom POST', response.data)
                    toast.success(`${"Edited Group:" + groupName}`, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: 'dark'
                    });
                    props.onHide()
                })
                .catch((err) => {
                    console.log(err, "Unable to get vendor time info");
                });
            console.log('parGroup will be NULL', newcomven)
        }
        else  {
            console.log('parent group is ', parGroup)
            var newLevel = groupListL1.filter((items) => items.vendorId == parGroup);
            const newcomven1 = {
                vendorId: props.Group.vendorId,
                vendorName: groupName,
                parentGroup: parseInt(parGroup),
                isGroup:true,
                isVendor: vendorbool,
                groupLevel: parseInt(newLevel[0].groupLevel + 1),
                isActiveVendor: true,
                isCompany:companybool
            }
            axios.put(`addGroup/updateGroup`, newcomven1)
                .then((response) => {
                    console.log('newvencom POST', response.data)
                    toast.success(`${"Edited Group: " + groupName}`, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: 'dark'
                    });
                    props.onHide()
                })
                .catch((err) => {
                    console.log(err, "Unable to get vendor time info");
                });
            console.log('new group level', newcomven1)

            props.onHide();


        }

        // else {
        //     // axios.post(`addvendor/addvendor`, newcomven)
        //     //     .then((response) => {
        //     //         console.log('newvencom POST', response.data)
        //     //         toast.success(`${"Added " + venName}`, {
        //     //             position: toast.POSITION.TOP_RIGHT,
        //     //             autoClose: 5000,
        //     //             theme: 'dark'
        //     //         });
        //     //     })
        //     //     .catch((err) => {
        //     //         console.log(err, "Unable to get vendor time info");
        //     //     });

        //     axios.get(`getvendor/getvendorList`)
        //     .then((response) => {
        //         setGroupListL1(response.data.filter(gr => gr.isActiveVendor == true && gr.isGroup == true));
        //         listGroup = response.data.filter(gr => gr.isActiveVendor == true && gr.isGroup == true);
        //         // setGroupListL2(response.data.filter(gr => gr.isActiveVendor == true && gr.isVendor == false && gr.isGroup == true));

        //         console.log('GROUP: ', response.data.filter(gr => gr.isActiveVendor == true && gr.isVendor == false && gr.isGroup == true))
        //     })
        //     .catch((err) => {
        //         console.log(err, "Unable to get vendor time info");
        //     });




        //     props.onHide();
        // }



    }

    function getgroupData (){
        axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setGroupListL1(response.data.filter(gr => gr.isActiveVendor == true && gr.isGroup == true));
                listGroup = response.data.filter(gr => gr.isActiveVendor == true && gr.isGroup == true);
                // setGroupListL2(response.data.filter(gr => gr.isActiveVendor == true && gr.isVendor == false && gr.isGroup == true));

                console.log('GROUP: ', response.data.filter(gr => gr.isActiveVendor == true && gr.isVendor == false && gr.isGroup == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });

            props.onHide();

    }

    


    return (
        <div className='RestockModal'>

            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width-Restock"
                contentClassName="modal-height-Restock"
                onHide={getgroupData}
            >
                {/* <ToastContainer /> */}

                <Modal.Header closeButton>
                    Edit Group: {props.Group.vendorName} <FontAwesomeIcon style={{ marginLeft: '1rem' }} className="excel-icon" icon={faPeopleGroup} size='1x' />
                </Modal.Header>
                <Modal.Body>
                    <Form className='addcomven-form'>
                        <div className='addvencom-header'>
                            <h4 className='ComVenModal-header'>Please Add a New User Group</h4>
                        </div>
                        <div className='addvencom-inputs-container'>
                            <Form.Label className='addvencom-label'> Group Name <FontAwesomeIcon className="excel-icon" icon={faUserGroup} size='1x' /></Form.Label>
                            <Form.Control defaultValue={props.Group.vendorName} onChange={(e) => { ongroupNameChange(e.target.value) }} type='text' className='addvencom-input'></Form.Control>
                            <Form.Label className='addvencom-label'> Parent Group <FontAwesomeIcon className="excel-icon" icon={faLayerGroup} size='1x' /> </Form.Label>
                            <Form.Select defaultValue={props.Group.parentGroup} onChange={(e) => onparGroupChange(e.target.value)} type='text' className='addvencom-input'>
                                <option value={0}>None</option>
                                {groupListL1.map(item => (
                                    <option value={item.vendorId}> ({item.vendorId}) {item.vendorName} [L{item.groupLevel}]</option>
                                ))}
                            </Form.Select>
                            {/* <Form.Label className='addvencom-label'> Item Code <FontAwesomeIcon className="excel-icon" icon={faCode} size='1x' /></Form.Label>
                            <Form.Control onChange={(e) => setcodeItem(e.target.value)} type='text' className='addvencom-input'></Form.Control> */}
                            {/* <Form.Label className='addvencom-label'> Email <FontAwesomeIcon className="excel-icon" icon={faVoicemail} size='1x' /> </Form.Label>
                            <Form.Control onChange={(e) => setvenEmail(e.target.value)} type='email' className='addvencom-input'></Form.Control> */}
                            {/* <Form.Label className='addvencom-label'> Phone <FontAwesomeIcon className="excel-icon" icon={faPhoneSquare} size='1x' /></Form.Label>
                            <Form.Control onChange={(e) => setvenphone(e.target.value)} type='phone' className='addvencom-input'></Form.Control> */}
                            {/* <Form.Label className='addvencom-label'> Contact <FontAwesomeIcon className="excel-icon" icon={faContactBook} size='1x' /></Form.Label>
                            <Form.Select defaultValue={'1'} onChange={(e) => setvenContact(e.target.value)} type='text' className='addvencom-input'>
                                <option value='1'>Please Choose A Contact</option>
                                {contactList.map((item) => (
                                    <option value={item.FullName}>{item.FullName}</option>
                                ))}
                            </Form.Select> */}
                            <Form.Label className='addvencom-label'> Make Group a Vendor <FontAwesomeIcon className="excel-icon" icon={faBuildingCircleCheck} size='1x' /> </Form.Label>
                            <Form.Check defaultChecked={props.Group.isVendor} onChange={(e) => onisvendorChange(e.target.checked)} type='checkbox' className='addvencom-input'></Form.Check>
                            <Form.Label className='addvencom-label'> Make Group a Company <FontAwesomeIcon className="excel-icon" icon={faBuildingCircleCheck} size='1x' /> </Form.Label>
                            <Form.Check defaultChecked={props.Group.isCompany} onChange={(e) => onisCompanyChange(e.target.checked)} type='checkbox' className='addvencom-input'></Form.Check>
                            <Button onClick={submitnewVenCom} className='addnewVendCom-btn'>Submit</Button>

                        </div>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
export default EditGroupModal