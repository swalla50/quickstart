import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import axios from 'axios';

function UserModal(props) {
    const [user, setUser] = useState([]);

    const [username, setusername] = useState("");
    const [FullName, setFullName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Org, setOrg] = useState(0);
    const [OrgType, setOrgType] = useState("");
    const [Photo, setPhoto] = useState();
    const [PhotoName, setPhotoName] = useState("");
    const [userEmail, setuserEmail] = useState("");
    const [vendorList, setvendorlist] = useState([]);

    useEffect(() => {


        axios.get(`getVendor/getvendorList2`)
            .then((response) => {
                setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isCompany == true));
                axios.get(`UserProfile`)
                    .then((res) => {
                        setUser(res.data)
                        setusername(res.data.UserName);
                        setuserEmail(res.data.Email);
                        setFullName(res.data.FullName);
                        setPhone(res.data.PhoneNumber);
                        setOrg(res.data.Company);
                        setOrgType(res.data.orgType);
                        setPhotoName(res.data.userPic);


                    })
                    .catch((err) => {
                        console.log(err, "Unable to get user time info");
                    });
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
        console.log("new company", value)
    }
    function onOrgTypeChange(value) {
        setOrgType(value);
    }
    function onEmailChange(value) {
        setuserEmail(value);
    }
    const onPhotoChange = (e) => {
        console.log('new photo', e[0]);
        setPhoto(e[0]);
        setPhotoName(e[0].name);
        console.log("Photo name", e[0].name)
    }

    function onSubmitUserChanges() {

        // console.log("NEW USER DATA",userInfo.Photo[0].name)



        const formData = new FormData();
        formData.append("formFile", Photo);
        formData.append("fileName", PhotoName);
        // console.log(Photo);
        const blobData = {
            filePath: Photo,
            fileName: PhotoName
        }

        console.log("form data", formData.get('formFile'))
        try {
            axios.post("https://webapi20220126203702.azurewebsites.net/api/blobexplorer/uploadblobfile", formData)
                .then(response => {
                    console.log("SUCCESS!!!", response.data.toString().replace(/\s/g, ''))
                    const userInfo = {
                        MyUserId: user.myUserId,
                        UserName: username,
                        FullName: FullName,
                        Email: userEmail,
                        PhoneNumber: Phone,
                        Company: Org,
                        orgType: OrgType,
                        payperHour: user.payperHour,
                        userPic: response.data.toString().replace(/\s/g, ''),
                        isActive: user.isActive,
                        isUser: user.isUser,
                        isContact: user.isContact

                    }
                    // toast.success(`${"Updated  " + userInfo.FullName + " Successfully!"}`, {
                    //     position: toast.POSITION.TOP_RIGHT,
                    //     autoClose: 5000,
                    //     theme: 'dark'

                    // });
                    axios.put('applicationuser/edituser', userInfo)
                        .then(res => {
                            var editeduser = res.data;
                            console.log("NEW INFO", res.data)
                            toast.success(`${"Updated  " + userInfo.FullName + " Successfully!"}`, {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 5000,
                                theme: 'dark'

                            });
                            getUserData();
                        })
                        .catch(err => {
                            console.log(err);
                        })

                    // console.log("PHOTO SUCCESS", response);
                })
                .catch(err => {
                    console.log(err);
                })

        }
        catch (ex) {
            console.log(ex);
        }

        //

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
                    Update Your User
                </Modal.Header>
                <Modal.Body>
                    <Form className="UpdateUser-form-container" >
                        <Form.Label className='user-update-label'> User Name </Form.Label>
                        <Form.Control onChange={(e) => onuserNameChange(e.target.value)} type="text" defaultValue={user.UserName} className='myuser-input' />
                        <Form.Label className='user-update-label'> Full Name </Form.Label>
                        <Form.Control onChange={(e) => onFullNameChange(e.target.value)} type="text" defaultValue={user.FullName} className='myuser-input' />
                        <Form.Label className='user-update-label'> Email </Form.Label>
                        <Form.Control onChange={(e) => onEmailChange(e.target.value)} type="text" defaultValue={user.Email} className='myuser-input' />
                        <Form.Label className='user-update-label'> Phone Number </Form.Label>
                        <Form.Control onChange={(e) => onPhoneChange(e.target.value)} type="phone" defaultValue={user.PhoneNumber} className='myuser-input' />
                        <Form.Label className='user-update-label'> Company </Form.Label>
                        <Form.Select onChange={(e) => onOrgChange(e.target.value)} className='UpdateUser-select-item' type='text' defaultValue={Org} >
                            {vendorList.sort((a, b) => a.vendorName.localeCompare(b.vendorName)).map((item) => (
                                <option value={item.vendorId}>{item.vendorName}</option>
                            ))}
                        </Form.Select>
                        {/* <Form.Control onChange={(e) => onOrgChange(e.target.value)} type="text" defaultValue={user.orgName} className='item-amount-sold' /> */}
                        <Form.Label className='user-update-label'> Organization Type </Form.Label>
                        <Form.Select onChange={(e) => onOrgTypeChange(e.target.value)} defaultValue={user.orgType} className='UpdateUser-select-item'>
                            <option> Select Your Organization's Type </option>
                            <option> Technology</option>
                            <option> Medical </option>
                            <option> Retail </option>
                            <option> Automotive </option>
                            <option> Finance </option>
                        </Form.Select>
                        <Form.Label className='user-update-label'> Choose A Profile Picture </Form.Label>
                        <Form.Control onChange={(e) => onPhotoChange(e.target.files)} type="file" className='item-amount-sold' />
                        <Button onClick={() => onSubmitUserChanges()}> Submit </Button>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default UserModal