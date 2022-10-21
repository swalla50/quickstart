import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import axios from 'axios';

function AddUserModal(props) {
    const [user, setUser] = useState([]);

    const [username, setusername] = useState("");
    const [FullName, setFullName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Org, setOrg] = useState("");
    const [OrgType, setOrgType] = useState("");
    const [Photo, setPhoto] = useState();
    const [PhotoName, setPhotoName] = useState("");
    const [userEmail, setuserEmail] = useState("");
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


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
            axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setcompanylist(response.data.filter(ven => ven.isActiveVendor == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });

    }, []);

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
    function onContactbool(value){
        setContactbool(value);
    }
    function onEmployeebool(value){
        setContactbool(value);
    }


    const onPhotoChange = (e) => {
        console.log('new photo', e[0]);
        setPhoto(e[0]);
        setPhotoName(e[0].name);
        console.log("Photo name", e[0].name)
    }

    function onSubmitNewUserChanges() {
        const userInfo = {
            
            UserName: username,
            FullName: FullName,
            Email: userEmail,
            PhoneNumber: Phone,
            orgName: Org,
            orgType: OrgType,
            Password: password,
            UserRole: Role,
            payperHour: payPerHour,
            userPic: PhotoName,
            isContact: Contactbool,
            isEmployee: Employeebool,
            isActive: Activebool,
            isUser: true

        }
        // console.log("NEW USER DATA",userInfo.Photo[0].name)

        console.log(Photo);
        const formData = new FormData();
        formData.append("formFile", Photo);
        formData.append("fileName", PhotoName);

        console.log(formData)
        try {
            const res = axios.post("https://webapi20220126203702.azurewebsites.net/api/ApplicationUser/saveFile", formData);
            console.log("PHOTO SUCCESS", res);
        }
        catch (ex) {
            console.log(ex);
        }
        axios.post('applicationuser/Register', userInfo)
            .then(res => {
                var editeduser = res.data;
                console.log("NEW INFO", res.data)
                toast.success(`${"Added  " + userInfo.FullName + " Successfully!"}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: 'dark'

                });
                getUserData();
            })
            .catch(err => {
                console.log(err);
            })

        getUserData();
        props.onHide();
    }


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
                    Update Your User
                </Modal.Header>
                <Modal.Body>
                    <Form className="UpdateUser-form-container" >
                        <Form.Label className='user-update-label'> User Name </Form.Label>
                        <Form.Control onChange={(e) => onuserNameChange(e.target.value)} type="text"  className='add-user-input' />
                        <Form.Label className='user-update-label'> Full Name </Form.Label>
                        <Form.Control onChange={(e) => onFullNameChange(e.target.value)} type="text" className='add-user-input'  />
                        <Form.Label className='user-update-label'> Email </Form.Label>
                        <Form.Control onChange={(e) => onEmailChange(e.target.value)} type="text"   className='add-user-input' />
                        <Form.Label className='user-update-label'> Password </Form.Label>
                        <Form.Control onChange={(e) => onPasswordChange(e.target.value)} type="text"   className='add-user-input'  />
                        <Form.Label className='user-update-label'> Phone Number </Form.Label>
                        <Form.Control onChange={(e) => onPhoneChange(e.target.value)} type="phone"  className='add-user-input'  />
                        <Form.Label className='user-update-label'> Role </Form.Label>
                        <Form.Select onChange={(e) => onRoleChange(e.target.value)} defaultValue="" placeholder='Select A Role'className='UpdateUser-select-item'>
                            <option value ="" placeholder='Select A Role'> Select A Role </option>
                            <option value = "Admin">Admin</option>
                            <option value = "User">User</option>
                        </Form.Select>
                        <Form.Label className='user-update-label'> Pay </Form.Label>
                        <Form.Control onChange={(e) => onPayChange(e.target.value)} type="number"   className='add-user-input'  />
                        <Form.Label className='user-update-label'> Organization Name </Form.Label>
                        <Form.Select defaultValue="" onChange={(e) => onOrgChange(e.target.value)}   className='add-user-input' >
                            <option value ="" > Select The Organization </option>
                            {companyList.map((item) => (
                                <option value={item.vendorId} >{item.vendorName}</option>
                            ))}
                        </Form.Select>
                        <Form.Label className='user-update-label'> Organization Type </Form.Label>
                        <Form.Select defaultValue="" onChange={(e) => onOrgTypeChange(e.target.value)}   className='add-user-input' >
                            <option value ="" > Select Your Organization's Type </option>
                            <option> Technology</option>
                            <option> Medical </option>
                            <option> Retail </option>
                            <option> Automotive </option>
                            <option> Finance </option>
                        </Form.Select>
                        <Form.Label className='user-update-label'> Is Contact </Form.Label>
                        <Form.Check type="checkbox" onChange={(e) => onContactbool(e.target.checked)}  className='add-user-input'  />
                        <Form.Label className='user-update-label'> Is Employee </Form.Label>
                        <Form.Check type="checkbox" onChange={(e) => onEmployeebool(e.target.checked)}  className='add-user-input'  />
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

export default AddUserModal