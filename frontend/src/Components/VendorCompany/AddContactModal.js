import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import axios from 'axios';
import $ from 'jquery';

function AddContactModal(props) {
    const [user, setUser] = useState([]);

    const [username, setusername] = useState("");
    const [FullName, setFullName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Org, setOrg] = useState("");
    const [defaultLogo, setdefaultLogo] = useState("");
    const [OrgType, setOrgType] = useState("");
    const [imgData, setImgData] = useState(defaultLogo);
    const [Photo, setPhoto] = useState();
    const [PhotoName, setPhotoName] = useState("");
    const [userEmail, setuserEmail] = useState("");
    const [picture, setPicture] = useState(null);
    const [password, setPassword] = useState("");
    const [payPerHour, setpayPerHour] = useState("");
    const [Role, setRole] = useState("");
    const [Contactbool, setContactbool] = useState(false);
    const [Employeebool, setEmployeebool] = useState(false);
    const [Activebool, setActivebool] = useState(false);
    const [companyList, setcompanylist] = useState([]);


    useEffect(() => {

        axios.get(`UserProfile`)
            .then((res) => {
                setUser(res.data)
                setusername(res.data.UserName);
                setuserEmail(res.data.Email);
                setFullName(res.data.FullName);
                setPhone(res.data.PhoneNumber);
                setOrg(res.data.orgName);
                setOrgType(res.data.orgType);
                setPhotoName("anonymous.png");
                setImgData('https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + ' https://altbooksblob.blob.core.windows.net/profilepicscpntainer/anonymous.png')


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`getvendor/getvendorList2`)
            .then((response) => {
                setcompanylist(response.data.filter(ven => ven.isActiveVendor == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });

    }, []);
    function clickImage() {
        $(function () {
            $('#profile-image5').on('click', function (e) {

                $(document.getElementById('profile-image-upload')).click();
            });
        });
    }
    function onuserNameChange(value) {
        setusername(value);
    }

    function onFullNameChange(value) {
        setFullName(value);
    }
    function onPhoneChange(value) {
        setPhone(value);
    }
    function onOrgChange(value) {
        setOrg(value);
    }
    function onOrgTypeChange(value) {
        setOrgType(value);
    }
    function onEmailChange(value) {
        setuserEmail(value);
    }
    function onPayChange(value) {
        setpayPerHour(value);
    }
    function onPasswordChange(value) {
        setPassword(value);
    }
    function onRoleChange(value) {
        setRole(value);
    }
    function onContactbool(value) {
        setContactbool(value);
    }
    function onEmployeebool(value) {
        setContactbool(value);
    }


    const onPhotoChange = (e) => {
        console.log('new photo', e[0]);
        setPhoto(e[0]);
        setPhotoName(e[0].name);
        console.log("Photo name", e[0].name)
    }

    function onSubmitNewUserChanges() {

        // console.log("NEW USER DATA",userInfo.Photo[0].name)

        console.log(Photo);
        const formData = new FormData();
        formData.append("formFile", Photo);
        formData.append("fileName", PhotoName);

        console.log(formData)
        try {
            axios.post("https://webapi20220126203702.azurewebsites.net/api/blobexplorer/uploadblobfile", formData)
                .then(res => {
                    const userInfo = {

                        UserName:  `${'username' + FullName.toString().replace(/\s/g, '')}`,
                        FullName: FullName,
                        Email: userEmail,
                        PhoneNumber: Phone,
                        Company: props.object.vendorId,
                        orgType: OrgType,
                        Password: `${'ContactPassword' + props.object.vendorName}`,
                        UserRole: 'User',
                        payperHour: '0',
                        userPic: res.data.toString().replace(/\s/g, ''),
                        isContact: true,
                        isEmployee: false,
                        isActive: true,
                        isUser: false

                    }
                    axios.post('applicationuser/Register', userInfo)
                        .then(response => {
                            var editeduser = response.data;
                            console.log("NEW INFO", response.data)
                            toast.success(`${"Added  " + userInfo.FullName + " as a contact Successfully!"}`, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 5000,
                                theme: 'dark'

                            });
                            getUserData();
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    console.log("NEW USER DATA", userInfo)
             
                })
                .catch(err => {
                    console.log(err);
                    const userInfo = {

                        UserName:  `${'username' + FullName.toString().replace(/\s/g, '')}`,
                        FullName: FullName,
                        Email: userEmail,
                        PhoneNumber: Phone,
                        Company: props.object.vendorId,
                        orgType: OrgType,
                        Password: `${'ContactPassword' + props.object.vendorName.replace(/\s/g, '')}`,
                        UserRole: 'User',
                        payperHour: '0',
                        userPic: 'https://altbooksblob.blob.core.windows.net/profilepicscpntainer/anonymous.png',
                        isContact: true,
                        isEmployee: false,
                        isActive: true,
                        isUser: false

                    }
                    axios.post('applicationuser/Register', userInfo)
                        .then(response => {
                            var editeduser = response.data;
                            console.log("NEW INFO", response.data)
                            toast.success(`${"Added  " + userInfo.FullName + " as a contact Successfully!"}`, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 5000,
                                theme: 'dark'

                            });
                            getUserData();
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    console.log("NEW USER DATA", userInfo)
                  
                })
        }
        catch (ex) {
            console.log(ex);
        }


        getUserData();
        props.onHide();
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

    function getUserData() {
        axios.get(`UserProfile`)
            .then((res) => {
                setUser(res.data)
                setusername(res.data.UserName);
                setFullName(res.data.FullName);
                setPhone(res.data.PhoneNumber);
                setOrg(res.data.orgName);
                setOrgType(res.data.orgType);
                setPhoto(res.data.userPic);


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }
    return (
        <div className='UpdateUser'>
            <ToastContainer />
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width-Restock"
                contentClassName="modal-height-Restock"
            >

                <Modal.Header closeButton>
                    Add A New Contact For: {'(' + props.object.vendorId + ') ' + props.object.vendorName}
                </Modal.Header>
                <Modal.Body>
                    <Form className="UpdateUser-form-container" >
                        <div style={{width:'100%',textAlign:'center'}}onClick={clickImage}  className='sender-logo1'>
                            <input id="profile-image-upload" onChange={onChangePicture} type="file" className='hidden invoice-image-upload'>

                            </input>
                            <img style={{ borderRadius: '50px', border: 'solid #0d6efd 3px', boxShadow: '0px 6px 20px 0px rgb(0 0 0 / 30%)' }} id="profile-image5" className='sender-logo-img' src={imgData} />

                        </div>
                        {/* <Form.Label className='user-update-label'> User Name </Form.Label>
                        <Form.Control onChange={(e) => onuserNameChange(e.target.value)} type="text" className='add-user-input' /> */}
                        <Form.Label className='user-update-label'> Full Name </Form.Label>
                        <Form.Control onChange={(e) => onFullNameChange(e.target.value)} type="text" className='add-user-input' />
                        <Form.Label className='user-update-label'> Email </Form.Label>
                        <Form.Control onChange={(e) => onEmailChange(e.target.value)} type="text" className='add-user-input' />
                        {/* <Form.Label className='user-update-label'> Password </Form.Label>
                        <Form.Control onChange={(e) => onPasswordChange(e.target.value)} type="text" className='add-user-input' /> */}
                        <Form.Label className='user-update-label'> Phone Number </Form.Label>
                        <Form.Control onChange={(e) => onPhoneChange(e.target.value)} type="phone" className='add-user-input' />
                        {/* <Form.Label className='user-update-label'> Role </Form.Label> */}
                        {/* <Form.Select onChange={(e) => onRoleChange(e.target.value)} defaultValue="" placeholder='Select A Role' className='UpdateUser-select-item'>
                            <option value="" placeholder='Select A Role'> Select A Role </option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </Form.Select> */}
                        {/* <Form.Label className='user-update-label'> Pay </Form.Label>
                        <Form.Control onChange={(e) => onPayChange(e.target.value)} type="number" className='add-user-input' /> */}
                        <Form.Label className='user-update-label'> Organization Name </Form.Label>
                        <Form.Select disabled defaultValue={props.object.vendorId} onChange={(e) => onOrgChange(e.target.value)} className='add-user-input' >
                            <option value="" > Select The Organization </option>
                            {companyList.map((item) => (
                                <option value={item.vendorId} >{item.vendorName}</option>
                            ))}
                        </Form.Select>
                        <Form.Label className='user-update-label'> Organization Type </Form.Label>
                        <Form.Select disabled defaultValue={props.object.vendorType} onChange={(e) => onOrgTypeChange(e.target.value)} className='add-user-input' >
                            <option value="" > Select Your Organization's Type </option>
                            <option> Technology</option>
                            <option> Medical </option>
                            <option> Retail </option>
                            <option> Automotive </option>
                            <option> Finance </option>
                        </Form.Select>
                        {/* <Form.Label className='user-update-label'> Is Contact </Form.Label>
                        <Form.Check type="checkbox" onChange={(e) => onContactbool(e.target.checked)}  className='add-user-input'  />
                        <Form.Label className='user-update-label'> Is Employee </Form.Label>
                        <Form.Check type="checkbox" onChange={(e) => onEmployeebool(e.target.checked)}  className='add-user-input'  /> */}
                        <Button onClick={() => onSubmitNewUserChanges()}> Add User </Button>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default AddContactModal