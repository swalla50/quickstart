import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { textSpanIsEmpty } from 'typescript';
import moment from 'moment';
import { EditableRow } from './EditableRow'
import ReadOnlyRow from './ReadOnlyRow'
import './VendorCompanyModal.css'
import { faBuilding, faBuildingCircleArrowRight, faBuildingCircleCheck, faBuildingUser, faCode, faContactBook, faPalette, faPallet, faPerson, faPhoneSquare, faPlus, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ppid } from 'process';

function EditVenComModal(props) {
    const [user, setUser] = useState("");
    const [contactList, setContactList] = useState([]);
    var venName = props.object.vendorName;
    var venType = props.object.vendorType;
    var codeItem = props.object.itemCode;
    var venEmail = props.object.vendorEmail;
    var venphone = props.object.vendorPhone;
    var venContact = props.object.vendorContact;
    var vendorbool = props.object.isVendor;
    var companybool = props.object.isCompany;
    const [vendId, setvendId] = useState("");
    

    useEffect(() => {

        // console.log("Name", props.object.vendorName)
        axios.get(`UserProfile`)
            .then((res) => {
                setUser(res.data)

                // console.log("user",user)



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`userList/userList`)
            .then((response) => {
                setContactList(response.data.filter(ven => ven.isActive == true && ven.isContact == true));
                // console.log('USERS: ', response.data.filter(ven => ven.isActive == true && ven.isUser == true));
            })
            .catch((err) => {
                // console.log(err, "Unable to get vendor time info");
            });

    }, [])
    // console.log("vend ID", props.object.vendorId)
    function submitnewVenCom() {
        const newcomven = {
            vendorName: venName,
            vendorType: venType,
            itemCode: codeItem,
            vendorEmail: venEmail,
            vendorPhone: venphone,
            vendorContact: venContact,
            isVendor: vendorbool,
            isActive: true,
            isGroup: false
        }

        if (venType == '') {
            console.log('Did not select a vendor')
            toast.error(`${"Please Select A Vendor"}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                theme: 'dark'
            });
        }
        else if (venContact == '') {
            console.log('Did not select a contact')
            toast.error(`${"Please Select A Contact"}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                theme: 'dark'
            });
        }
        else {
            axios.post(`addvendor/addvendor`, newcomven)
                .then((response) => {
                    console.log('newvencom POST', response.data)
                    toast.success(`${"Added " + venName}`, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: 'dark'
                    });
                })
                .then(
                    axios.get(`getvendor/getvendorList`)
                .then((response) => {

                    console.log('vendors: ', response.data.filter(ven => ven.isActive == true && ven.isVendor == true))
                })
                .catch((err) => {
                    console.log(err, "Unable to get vendor time info");
                })

                )
                .catch((err) => {
                    console.log(err, "Unable to get vendor time info");
                });

            axios.get(`getvendor/getvendorList`)
                .then((response) => {

                    console.log('vendors: ', response.data.filter(ven => ven.isActive == true && ven.isVendor == true))
                })
                .catch((err) => {
                    console.log(err, "Unable to get vendor time info");
                });

            props.onHide();
        }



    }
    const onvendorNameChange = (e) =>{
            venName=e
            console.log(venName)
        }
        const onvendorTypeChange = (e) =>{
            venType=e
            console.log(venType)
        }
        const onvendorcodeItemChange = (e) =>{
            codeItem=e
        }
        const onvendorEmailChange = (e) =>{
            venEmail=e
        }
        const onvendorPhoneChange = (e) =>{
            venphone=e
        }
        const onvendorContactChange = (e) =>{
            venContact=e
        }
        const onvendorBoolChange = (e) =>{
            vendorbool=e
        }
        const oncompanyBoolChange = (e) =>{
            companybool=e
        }

    function submiteditVenCom() {
        const editcomven = {
            vendorId: props.object.vendorId,
            vendorName: venName,
            vendorType: venType,
            itemCode: codeItem,
            vendorEmail: venEmail,
            vendorPhone: venphone,
            vendorContact: venContact,
            isVendor: vendorbool,
            isCompany: companybool
        }

      

        axios.put(`updateCompany/updateCompany`, editcomven)
            .then((response) => {
                console.log('newvencom POST', response.data)
                toast.success(`${"Updated " + venName}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: 'dark'
                });
                props.onHide();
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });

        // axios.get(`getvendor/getvendorList`)
        //     .then((response) => {

        //         console.log('vendors: ', response.data.filter(ven => ven.isActive == true && ven.isVendor == true))
        //     })
        //     .catch((err) => {
        //         console.log(err, "Unable to get vendor time info");
        //     });

        

        props.onHide();
        // console.log("EDITED", editcomven)
    }


    // console.log("EMIAL", props.object.vendorEmail, venEmail, venName, codeItem)


    return (
        <div className='RestockModal'>

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
                    Edit Company/Vendor

                </Modal.Header>
                <Modal.Body>
                    <Form className='addcomven-form'>
                        <div className='addvencom-header'>
                            <h4 className='ComVenModal-header'>Update Company: {props.object.vendorName}</h4>
                        </div>
                        <div className='addvencom-inputs-container'>
                            <Form.Label className='addvencom-label'> Name <FontAwesomeIcon className="excel-icon" icon={faBuilding} size='1x' /></Form.Label>
                            <Form.Control defaultValue={props.object.vendorName} onChange={(e) => { onvendorNameChange(e.target.value); e.preventDefault() }} type='text' className='addvencom-input'></Form.Control>
                            <Form.Label className='addvencom-label'> Type <FontAwesomeIcon className="excel-icon" icon={faPalette} size='1x' /> </Form.Label>
                            <Form.Select defaultValue={props.object.vendorType} onChange={(e) => onvendorTypeChange(e.target.value)} type='text' className='addvencom-input'>
                                <option value="food">food</option>
                                <option value="Technology">Technology</option>
                                <option value="Office Supply">Office Supply</option>
                                <option value="Logistics">Logistics</option>
                                <option value="Retaier">Retailer</option>
                                <option value="B2B">B2B</option>
                                <option value="B2G">B2G</option>
                            </Form.Select>
                            <Form.Label className='addvencom-label'> Item Code <FontAwesomeIcon className="excel-icon" icon={faCode} size='1x' /></Form.Label>
                            <Form.Control defaultValue={props.object.itemCode} onChange={(e) => onvendorcodeItemChange(e.target.value)} type='text' className='addvencom-input'></Form.Control>
                            <Form.Label className='addvencom-label'> Email <FontAwesomeIcon className="excel-icon" icon={faVoicemail} size='1x' /> </Form.Label>
                            <Form.Control defaultValue={props.object.vendorEmail} onChange={(e) => onvendorEmailChange(e.target.value)} type='email' className='addvencom-input'></Form.Control>
                            <Form.Label className='addvencom-label'> Phone <FontAwesomeIcon className="excel-icon" icon={faPhoneSquare} size='1x' /></Form.Label>
                            <Form.Control defaultValue={props.object.vendorPhone} onChange={(e) => onvendorPhoneChange(e.target.value)} type='phone' className='addvencom-input'></Form.Control>
                            <Form.Label className='addvencom-label'> Contact <FontAwesomeIcon className="excel-icon" icon={faContactBook} size='1x' /></Form.Label>
                            <Form.Select defaultValue={props.object.vendorContact} onChange={(e) => onvendorContactChange(e.target.value)} type='text' className='addvencom-input'>
                                {contactList.map((item) => (
                                    <option value={item.FullName}>{item.FullName}</option>
                                ))}
                            </Form.Select>
                            <Form.Label className='addvencom-label'> Vendor <FontAwesomeIcon className="excel-icon" icon={faBuildingCircleCheck} size='1x' /> </Form.Label>
                            <Form.Check defaultChecked={props.object.isVendor} onChange={(e) => onvendorBoolChange(e.target.checked)} type='checkbox' className='addvencom-input'></Form.Check>
                            <Form.Label className='addvencom-label'> Company <FontAwesomeIcon className="excel-icon" icon={faBuildingUser} size='1x' /> </Form.Label>
                            <Form.Check defaultChecked={props.object.isCompany} onChange={(e) => oncompanyBoolChange(e.target.checked)} type='checkbox' className='addvencom-input'></Form.Check>

                            <Button onClick={submiteditVenCom} className='addnewVendCom-btn'>Submit</Button>

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
export default EditVenComModal