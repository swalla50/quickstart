import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { textSpanIsEmpty } from 'typescript';
import moment from 'moment';
import $ from 'jquery'


function EditableContactModal(props) {

    const [vendorList, setvendorlist] = useState([]);
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [defaultLogo, setdefaultLogo] = useState("");
    const [imgData, setImgData] = useState(defaultLogo);
    const [Photo, setPhoto] = useState();
    const [PhotoName, setPhotoName] = useState("");
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        axios.get(`getVendor/getvendorList`)
            .then((response) => {
                setImgData('https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + props.object.userPic)
                setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == false));
                setName(props.object.FullName)
                setEmail(props.object.Email)
                setPhone(props.object.PhoneNumber)
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
    }, [props.show])

    function clickImage() {
        $(function () {
            $('#profile-image6').on('click', function (e) {

                $(document.getElementById('profile-image-upload6')).click();
            });
        });
    }
    const onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            setPhoto(e.target.files[0]);
            setPhotoName(e.target.files[0].name);
            reader.readAsDataURL(e.target.files[0]);
            // console.log("IMG Reader: ", e.target.files)

        }
    };



    function updateContact() {
        console.log(Photo);
        const formData = new FormData();
        formData.append("formFile", Photo);
        formData.append("fileName", PhotoName);
        axios.post("https://webapi20220126203702.azurewebsites.net/api/blobexplorer/uploadblobfile", formData)
            .then(res => {
                const updatedcontact = {
                    MyUserId: props.object.myUserId,
                    Email: Email,
                    FullName: Name,
                    PhoneNumber: Phone,
                    Company: props.object.Company,
                    orgType: props.object.orgType,
                    userPic: res.data.toString().replace(/\s/g, ''),
                    payperHour: props.object.payperHour,
                    isContact: true,
                    isEmployee: props.object.isEmployee,
                    isUser: props.object.isUser,
                    isActive: props.object.isActive
                }

                axios.put('https://webapi20220126203702.azurewebsites.net/api/applicationuser/editUser',updatedcontact)
                console.log("Updated Contact", updatedcontact,'Success1')
            })
            .catch(err => {
                console.log(err);

                const updatedcontact = {
                    MyUserId: props.object.myUserId,
                    Email: Email,
                    FullName: Name,
                    PhoneNumber: Phone,
                    Company: props.object.Company,
                    orgType: props.object.orgType,
                    userPic: props.object.userPic,
                    payperHour: props.object.payperHour,
                    isContact: true,
                    isEmployee: props.object.isEmployee,
                    isUser: props.object.isUser,
                    isActive: props.object.isActive
                }

                axios.put('https://webapi20220126203702.azurewebsites.net/api/applicationuser/editUser',updatedcontact)
                console.log("Updated Contact", updatedcontact,'Success2');

            })
            props.onHide()


    }


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
                    Edit information for user: <div style={{ marginLeft: '2rem', color: "#4f86f6" }}>{props.object.FullName} </div><img style={{ height: '35px', borderRadius: '50%' ,width: '35px'}} className='edit-user-picture' src={`${'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + props.object.userPic}`} />
                </Modal.Header>
                <Modal.Body>
                    <Form className="sell-form-container" >
                        <div style={{ width: '100%', textAlign: 'center' }} onClick={clickImage} className='sender-logo1'>
                            <input id="profile-image-upload6" onChange={onChangePicture} type="file" className='hidden invoice-image-upload'>

                            </input>
                            <img style={{ borderRadius: '50px', border: 'solid #0d6efd 3px', boxShadow: '0px 6px 20px 0px rgb(0 0 0 / 30%)' }} id="profile-image6" className='sender-logo-img' src={imgData} />

                        </div>

                        <div className='editusers-form'>
                            <Form.Label>User ID</Form.Label>
                            <Form.Control disabled defaultValue={props.object.myUserId} type="text" className='user-myUserID' />
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => setName(e.target.value)} defaultValue={props.object.FullName} type="text" className='user-FullName' />
                            {/* <Form.Label>User Name</Form.Label>
                            <Form.Control defaultValue={props.object.UserName} type="text" className='user-UserName' /> */}
                        </div>
                        <div className='editusers-form-row2'>
                            <div className='row2-left-edituser'>
                                <Form.Label className='edit-users-label'>Phone Number</Form.Label>
                                <Form.Control onChange={(e) => setPhone(e.target.value)} defaultValue={props.object.PhoneNumber} type="phone" className='user-PhoneNumber' />
                                {/* <Form.Label className='edit-users-label'>Company</Form.Label> */}
                                {/* <Form.Select disabled className='edit-user-dropdown' type='text' defaultValue={props.object.Company} >
                                    {vendorList.map((item) => (
                                        <option value={item.vendorId}>{item.vendorName}</option>
                                    ))}
                                </Form.Select> */}

                            </div>
                            <div className='row2-right-edituser'>
                                <Form.Label className='edit-users-label'>Email</Form.Label>
                                <Form.Control defaultValue={props.object.Email} type="phone" className='user-Email' />
                                {/* <Form.Label className='edit-users-label'>Role</Form.Label>
                                <Form.Select className='edit-user-dropdown' type='text' defaultValue={props.object.UserRole} >
                                    <option>User</option>
                                    <option>Admin</option>
                                </Form.Select> */}

                                <div className='edit-user-checkboxes'>
                                    {/* <div className='check-input-group'>
                                        <Form.Label className='edit-users-label'>Is User</Form.Label> 
                                        <Form.Check defaultChecked={props.object.isUser} className='isUser-check'></Form.Check>
                                    </div>
                                    <div className='check-input-group'>
                                        <Form.Label className='edit-users-label'>Is Employee</Form.Label>
                                        <Form.Check defaultChecked={props.object.isEmployee} className='isEmployee-check'></Form.Check>
                                    </div> */}
                                    <div className='check-input-group'>
                                        <Button style={{ background: 'red', color: 'white', border: 'none', borderRadius: '40px', marginTop: '2rem' }}> Delete {props.object.FullName}</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='submit-sell-container'>
                            <Button onClick={updateContact} variant="secondary" size="sm">Change User {props.object.FullName}</Button>
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

export default EditableContactModal
