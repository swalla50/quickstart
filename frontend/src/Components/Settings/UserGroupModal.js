import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AssignModuleRightsModal from './AssignModuleRightsModal';

function AddUserModal(props) {
    const [user, setUser] = useState([]);

    const [groupList, setGroupList] = useState([]);
    const [moduleModal, setmoduleModal] = useState(false);
    const [group, setGroup] = useState([]);

    function handlemodalModal(){
        setmoduleModal(false);
    }



    useEffect(() => {

        axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setGroupList(response.data.filter(gr => gr.isActiveVendor == true && gr.isVendor == false && gr.isGroup == true));

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


    console.log("select GROUP",group)



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

                <Modal.Header closeButton>
                    Update Your User
                </Modal.Header>
                <Modal.Body>
                    <div className='groups-container'>
                        <div className='group-item'>
                            {groupList.map((item,index) => (
                                <>
                                    <div className='group-title-container'>
                                        <div className='title-container'>
                                            <h5 className='group-text'>({item.vendorId})</h5>
                                            <p className='group-name'>{item.vendorName}</p>
                                        </div>

                                        <DropdownButton menuVariant="dark" className='group-dropdown' id="dropdown-item-buttonpost" title=". . .">
                                            <Dropdown.Item style={{ color: 'white' }} onClick= {() => {setmoduleModal(true); setGroup(groupList[index])}}className="group-option-btn" as="button">Assign Modules</Dropdown.Item>
                                        </DropdownButton>
                                    </div>

                                </>
                            ))}
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
            </Modal>
        </div >
    )
}

export default AddUserModal