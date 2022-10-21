import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { textSpanIsEmpty } from 'typescript';
import moment from 'moment';


function EditableUserModal(props) {

    const [vendorList, setvendorlist] = useState([]);
    useEffect(() => {
        axios.get(`getVendor/getvendorList`)
            .then((response) => {
                setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == false));
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
    }, [])


    return (
        <div className='SellModal'>

            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width-sell"
                contentClassName="modal-height-sell"
                backdropClassName='edit-user-shadow'
            >

                <Modal.Header closeButton>
                    Edit information for user: <div style={{ marginLeft: '2rem', color: "#4f86f6" }}>{props.Item.FullName} </div><img style={{ height: '35px', borderRadius: '50%' }} className='edit-user-picture' src={`${'https://webapi20220126203702.azurewebsites.net/images/' + props.Item.userPic}`} />
                </Modal.Header>
                <Modal.Body>
                    <Form className="sell-form-container" >

                        <div className='editusers-form'>
                            <Form.Label>User ID</Form.Label>
                            <Form.Control defaultValue={props.Item.MyUserId} type="text" className='user-myUserID' />
                            <Form.Label>Name</Form.Label>
                            <Form.Control defaultValue={props.Item.FullName} type="text" className='user-FullName' />
                            <Form.Label>User Name</Form.Label>
                            <Form.Control defaultValue={props.Item.UserName} type="text" className='user-UserName' />
                        </div>
                        <div className='editusers-form-row2'>
                            <div className='row2-left-edituser'>
                                <Form.Label className='edit-users-label'>Phone Number</Form.Label>
                                <Form.Control defaultValue={props.Item.PhoneNumber} type="phone" className='user-PhoneNumber' />
                                <Form.Label className='edit-users-label'>Organization</Form.Label>
                                <Form.Select className='edit-user-dropdown' type='text' defaultValue={props.Item.Company} >
                                    {vendorList.map((item) => (
                                        <option value={item.vendorId}>{item.vendorName}</option>
                                    ))}
                                </Form.Select>

                            </div>
                            <div className='row2-right-edituser'>
                                <Form.Label className='edit-users-label'>Email</Form.Label>
                                <Form.Control defaultValue={props.Item.Email} type="phone" className='user-Email' />
                                <Form.Label className='edit-users-label'>Role</Form.Label>
                                <Form.Select className='edit-user-dropdown' type='text' defaultValue={props.Item.UserRole} >
                                    <option>User</option>
                                    <option>Admin</option>
                                </Form.Select>

                                <div className='edit-user-checkboxes'>
                                    <div className='check-input-group'>
                                        <Form.Label className='edit-users-label'>Is User</Form.Label> 
                                        <Form.Check defaultChecked={props.Item.isUser} className='isUser-check'></Form.Check>
                                    </div>
                                    <div className='check-input-group'>
                                        <Form.Label className='edit-users-label'>Is Employee</Form.Label>
                                        <Form.Check defaultChecked={props.Item.isEmployee} className='isEmployee-check'></Form.Check>
                                    </div>
                                    <div className='check-input-group'>
                                        <Form.Label className='edit-users-label'>Is Contact</Form.Label>
                                        <Form.Check defaultChecked={props.Item.isContact} className='isContact-check'></Form.Check>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='submit-sell-container'>
                            <Button variant="secondary" size="sm">Change User {props.Item.FullName}</Button>
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

export default EditableUserModal
