import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { textSpanIsEmpty } from 'typescript';
import moment from 'moment';
import { EditableRow } from './EditableRow'
import ReadOnlyRow from './ReadOnlyRow'
import { faBuilding, faBuildingCircleArrowRight, faContactBook, faContactCard, faEnvelope, faFileExcel, faInfoCircle, faPencil, faPhone, faPlus, faTrashCan, faUserFriends, faUserGroup, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ManageUsersModal.css'
import EditableUserModal from './EditableUserModal';
import AddUserModal from './AddUserModal';
import AssignGroupsModal from './AssignGroupsModal';
import { Checkbox } from '@mui/material';
import { Users } from 'plaid-threads';
import * as XLSX from "xlsx";
import animationData from '../../assets/animations/89438-blue-loadingg.json'
import Lottie from 'react-lottie-player';


function ManageUsersModal(props) {
    const [user, setUser] = useState("");
    const [usersList, setuserslist] = useState([]);
    const [EmployeeList, setEmployeeList] = useState([]);
    const [ContactList, setContactList] = useState([]);
    const [editMode, setEditMode] = useState(true);
    const [Item, setItem] = useState([]);
    const [adduserModal, setAddUserModal] = useState(false);
    const [usersGroups, setusersGroups] = useState(false);
    const [companyList, setcompanylist] = useState(false);
    const [matched, setMatched] = useState([])
    const [show, setShow] = useState(false)
    const [loading, setloading] = useState(true)

    const [editusers, setEditUsers] = useState(false);
    var matchedCompany = [];

    function handleshowedituser() {
        setEditUsers(false);
    }
    function handleadduserModal() {
        setAddUserModal(false)
    }
    function handleassigngroupModal() {
        setusersGroups(false)
    }

    useEffect(() => {
        if (props.show != false) {
            setTimeout(() => {


                axios.get(`getCompanyName/getCompanyName`)
                    .then((response) => {
                        // setEmployeeList(response.data.filter(ven => ven.isActive == true && ven.isEmployee == true));
                        setContactList(response.data.filter(ven => ven.isActive == true && ven.isContact == true));
                        console.log("CONTACTS",response.data.filter(ven => ven.isActive == true && ven.isContact == true))
                    })
                    .catch((err) => {
                        console.log(err, "Unable to get contact time info");
                    });
                axios.get(`getCompanyName/getCompanyName`)
                    .then((r) => {
                        setuserslist(r.data.filter(ven => ven.isActive == true && ven.isUser == true || ven.isEmployee))
                        setloading(false)
                        console.log('NEW COMP NAME', r.data);

                    })
                    .catch((err) => {
                        console.log(err, "Unable to get vendor time info");
                    });
                axios.get(`UserProfile`)
                    .then((res) => {
                        setUser(res.data)

                        console.log(user)



                    })
                    .catch((err) => {
                        console.log(err, "Unable to get user time info");
                    });
            }, 4000)
        }

    }, [props.show])

    function handleOnExport() {
        let element = document.getElementById("UserTable");
        var wb = XLSX.utils.book_new();

        var ws = XLSX.utils.table_to_sheet(element);
        delete (ws['O5'])

        XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
        XLSX.writeFile(wb, "UserListExport.xlsx");
    }
    function handleOnExport2() {
        let element = document.getElementById("ContactTable");
        var wb = XLSX.utils.book_new();

        var ws = XLSX.utils.table_to_sheet(element);
        delete (ws['O5'])

        XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
        XLSX.writeFile(wb, "ContactListExport.xlsx");
    }
    const successExport = () => {
        toast.success("Exported UserListExport.xlsx Successfully!", {
            className: "export-Toast",
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: 'dark'
        });
    }


    const [editInv, setEditInv] = useState(null);
    const [editFormData, setEditFormData] = useState({
        myUserId: ""
    })

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
        console.log("formdata:", newFormData);
    }
    //For the click to edit
    const handleEditClick = (event, item) => {
        event.preventDefault();
        setEditInv(item.myUserId);
        setEditUsers(true);

        const formValues = {
            myUserId: item.myUserId,
            UserName: item.UserName,
            FullName: item.FullName,
            PhoneNumber: item.PhoneNumber,
            Email: item.Email,
            Company: item.Company,
            UserRole: item.UserRole
        }
        setEditFormData(formValues);
        setEditMode(false)
        console.log("This item vendor", formValues)

    }
    const handleCancelClickUser = () => {
        setEditInv(null);
        axios.get(`userList/userList`)
            .then((response) => {
                setuserslist(response.data.filter(ven => ven.isActive == true && ven.isUser == true));
                // console.log('vendors: ', response.data.filter(ven => ven.isActive == true && ven.isVendor == true));
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
        setEditMode(true)
    };
    const handleCancelClickEmployee = () => {
        setEditInv(null);
        axios.get(`userList/userList`)
            .then((response) => {
                setEmployeeList(response.data.filter(ven => ven.isActive == true && ven.isEmployee == true));
                // console.log('vendors: ', response.data.filter(ven => ven.isActive == true && ven.isVendor == true));
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
        setEditMode(true)
    };
    const handleCancelClickContact = () => {
        setEditInv(null);
        axios.get(`userList/userList`)
            .then((response) => {
                setContactList(response.data.filter(ven => ven.isActive == true && ven.isContact == true));
                // console.log('vendors: ', response.data.filter(ven => ven.isActive == true && ven.isVendor == true));
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
        setEditMode(true)
    };
    // const handleCancelClickCompany = () => {
    //     setEditInv(null);
    //     axios.get(`getvendor/getvendorlist`)
    //         .then((response) => {
    //             setcompanylist(response.data.filter(inv => inv.isActive == true && inv.isVendor == false));

    //         })
    //         .catch((err) => {
    //             console.log(err, "Unable to get user time info");
    //         });
    //     setEditMode(true)
    // };
    // function onRestockIDChange( currentNum) {


    //     const select = currentNum.target;
    //     const id = select.children[select.selectedIndex].id;
    //     const newNumber = select.children[select.selectedIndex].value
    //     setcurrNum(newNumber);
    //     setinvID(id);
    //     // var event = document.getElementById('item-selection').value
    //     axios.get(`getSRLog/getSRLog`)
    //     .then((response) => {
    //         setsrLog(response.data);


    //     })
    //     .catch((err) => {
    //         console.log(err, "Unable to get user time info");
    //     });
    //     console.log("id", newNumber, id)

    // }
    // function onRestocknumChange(numofitem) {
    //     setnewNum(numofitem);


    // }

    // function onRestockChange(){
    //     var newNumber = (parseInt(currNum) + parseInt(newNum));
    //     var Restock = {
    //         InventoryID: invID,
    //         ItemName: invList.filter(item => item.InventoryID == invID).map(name => name.InventoryName).at(0),
    //         ItemAmount: invList.filter(item => item.InventoryID == invID).map(name => name.InventoryCost).at(0),
    //         Sold: false,
    //         Restocked: true,
    //         numberSR: newNum,
    //         NumofInventory: newNumber,
    //         Clerk: user.FullName,
    //         Date: moment().format('YYYY-MM-DDTHH:mm:ss')
    //     }

    //     axios.put('Restockinventory/RestockInventory', Restock)
    //     .then(res => {
    //         console.log("edited time", res.data)
    //         toast.success(`${"Restocked " + newNum + " Items Successfully!"}`, {
    //             position: toast.POSITION.TOP_RIGHT,
    //             autoClose: 5000,
    //             theme:'dark'
    //         });
    //         axios.post('addSRLog/addSRLog', Restock)
    //         .then(res => {
    //             var srlog = res.data;
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //         axios.get(`getinventory/getInventoryList`)
    // .then((response) => {
    //     setinvList(response.data.filter(inv => inv.isDeleted == false));

    // })
    // .catch((err) => {
    //     console.log(err, "Unable to get user time info");
    // });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    //     console.log("Sold:", Restock);
    //     props.onHide()
    // }
    const onExportClick1 = () => {
        handleOnExport()
        successExport()
    }
    const onExportClick2 = () => {
        handleOnExport2()
        successExport()
    }
    return (
        <div className='RestockModal'>

            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width"
                contentClassName="modal-height"

            >

                <Modal.Header closeButton>
                    Mangage Users and Contacts <FontAwesomeIcon className="manage-header-icon" icon={faUserFriends} size='2x' />
                </Modal.Header>
                <Modal.Body>
                    {user.UserRole == 'Admin' ?
                        (
                            <div className='add-vendor-btn-container' >
                                <Button className='add-vendor-btn' onClick={() => setAddUserModal(true)}> Add User/Contact <FontAwesomeIcon className="vendor-add-icon" icon={faPlus} size='2x' /> </Button>
                            </div>
                        )
                        :
                        (
                            <></>

                        )
                    }

                    <Tabs className='bookkeeping-tabs' defaultActiveKey="Users" id="uncontrolled-tab-example" >
                        <Tab eventKey="Users" title={<><p className='vendor-tab-title'>Users</p><FontAwesomeIcon className="company-icon" icon={faUserGroup} size='1x' /></>} className="Grid-tab">
                            <p style={{ textAlign: 'left' }}><FontAwesomeIcon className="manage-header-icon" icon={faInfoCircle} size='1x' />This view includes Active users and employees. (Employees do not have to be active users)</p>
                            <Button className='excel-export' onClick={onExportClick1}><FontAwesomeIcon className="excel-icon" icon={faFileExcel} size='1x' /></Button>
                            {loading == false ?
                                (
                                    <table id="UserTable" className='inventory table'>

                                        <thead>
                                            <tr className='inventory-table-headers'>
                                                <th>

                                                </th>
                                                <th>
                                                    User ID
                                                </th>
                                                <th>
                                                    Name
                                                </th>
                                                <th>
                                                    User Name
                                                </th>
                                                <th>
                                                    Phone Number
                                                </th>
                                                <th>
                                                    Email
                                                </th>
                                                <th>
                                                    Organizaiton
                                                </th>
                                                <th>
                                                    Employee
                                                </th>
                                                <th>
                                                    Role
                                                </th>
                                                <th>
                                                </th>
                                            </tr>
                                        </thead>
                                        {usersList.map((item, index) => (
                                            <tr style={item.MyUserId == user.myUserId? { height: "50px",  backgroundColor: "#c4d9ff" } : { height: "50px" }} id={item.myUserId} className="content-bar">
                                                <td className="itemnum">
                                                    <img style={{ height: '35px',width:'35px', borderRadius: '50%' }} src={`${'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + item.userPic}`} />
                                                </td>
                                                <td className="itemtitle" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white'  } : { height: "50px"}}>{item.MyUserId}</td>
                                                <td className="itemnum" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white' } : { height: "50px" }}>{item.FullName}</td>
                                                <td className="itemnum" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white' } : { height: "50px" }}>{item.UserName}</td>
                                                <td className="itemprice" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white' } : { height: "50px", color:'black' }}><FontAwesomeIcon className="project-done-icon" icon={faPhone} size='1x' />{item.PhoneNumber}</td>
                                                <td className="itemstock" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white' } : { height: "50px" }}><p className='numinstock'><FontAwesomeIcon className="project-done-icon" icon={faEnvelope} size='1x' />{item.Email}</p></td>
                                                <td className="itemtitle" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white' } : { height: "50px" }}>{item.CompanyName}</td>
                                                <td style={{ marginLeft: '1rem' }} className="itemtitle"><Checkbox style={{ color: '#4f86f6' }} disabled checked={item.isEmployee} /></td>
                                                <td className="itemtitle"style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white' } : { height: "50px" }}>{item.UserRole}</td>
                                                <td className="btncontainer">
                                                    {/* <button className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faTrashCan} size='1x' /></button> */}
                                                    <DropdownButton className='project-done-icon' id="dropdown-item-button-edit-user" title={". . ."}>
                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setusersGroups(true); setItem(usersList[index]) }} className="group-option-btn" as="button">Assign Groups to {item.FullName}</Dropdown.Item>
                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setEditUsers(true); setItem(usersList[index]) }} className="group-option-btn" as="button">Edit User: ({item.FullName})</Dropdown.Item>
                                                    </DropdownButton>
                                                    {/* <button onClick={() => { setEditUsers(true); setItem(usersList[index]) }} className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' /></button> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </table>
                                )
                                :
                                (
                                    <div style={{ width: '100%', textAlign: '-webkit-center' }} className='loading-animation-container'>
                                        <Lottie
                                            loop
                                            className='typing-animation-object'
                                            animationData={animationData}
                                            play
                                            style={{ width: '40rem' }}
                                        />
                                    </div>

                                )
                            }

                        </Tab>
                        {/* <Tab eventKey="Employees" title={<><p className='vendor-tab-title'>Employee</p><FontAwesomeIcon className="company-icon" icon={faUsersRectangle} size='1x' /></>} className="list-tab">

                            <table className='inventory table'>

                                <thead>
                                    <tr className='inventory-table-headers'>
                                        <th>

                                        </th>
                                        <th>
                                            Employee ID
                                        </th>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            User Name
                                        </th>
                                        <th>
                                            Phone Number
                                        </th>
                                        <th>
                                            Email
                                        </th>
                                        <th>
                                            Organizaiton
                                        </th>
                                        <th>
                                            Role
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </thead>
                                {EmployeeList.map((item, index) => (
                                    <tr style={item.myUserId == user.MyUserId ? { height: "50px", backgroundColor: "#c4d9ff" } : { height: "50px" }} id={item.myUserId} className="content-bar">
                                        <td className="itemnum">
                                            <img style={{ height: '35px', borderRadius: '50%' }} src={`${'https://webapi20220126203702.azurewebsites.net/images/' + item.userPic}`} />
                                        </td>
                                        <td className="itemtitle">{item.MyUserId}</td>
                                        <td className="itemnum">{item.FullName}</td>
                                        <td className="itemnum">{item.UserName}</td>
                                        <td className="itemprice"><FontAwesomeIcon className="project-done-icon" icon={faPhone} size='1x' />{item.PhoneNumber}</td>
                                        <td className="itemstock"><p className='numinstock'><FontAwesomeIcon className="project-done-icon" icon={faEnvelope} size='1x' />{item.Email}</p></td>
                                        <td className="itemtitle">{item.CompanyName}</td>
                                        <td className="itemtitle">{item.UserRole}</td>
                                        <td className="btncontainer">
                                            {/* <button className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faTrashCan} size='1x' /></button> */}
                        {/* <DropdownButton className='project-done-icon' id="dropdown-item-button-edit-user" title={". . ."}>
                                                {/* <Dropdown.Item style={{ color: 'white' }} onClick={() => { setusersGroups(true); setItem(usersList[index]) }} className="group-option-btn" as="button">Assign Groups to {item.FullName}</Dropdown.Item> */}
                        {/* <Dropdown.Item style={{ color: 'white' }} onClick={() => { setEditUsers(true); setItem(usersList[index]) }} className="group-option-btn" as="button">Edit Employee: ({item.FullName})</Dropdown.Item> */}
                        {/* </DropdownButton> */}
                        {/* <button onClick={() => { setEditUsers(true); setItem(usersList[index]) }} className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' /></button> */}
                        {/* </td>
                                    </tr>
                                ))} */}
                        {/* </table>
                        </Tab> */}
                        <Tab eventKey="Contacts" title={<><p className='vendor-tab-title'>Contacts</p><FontAwesomeIcon className="company-icon" icon={faContactCard} size='1x' /></>} className="list-tab">
                            <p style={{ textAlign: 'left' }}><FontAwesomeIcon className="manage-header-icon" icon={faInfoCircle} size='1x' />This view includes Contacts for vendors and clients. (These contacts can be either active users or inactive users.)</p>
                            <Button className='excel-export' onClick={onExportClick2}><FontAwesomeIcon className="excel-icon" icon={faFileExcel} size='1x' /></Button>
                            <div className='add-vendor-btn-container'>
                                {/* <Button className='add-vendor-btn'> Add Contact <FontAwesomeIcon className="vendor-add-icon" icon={faPlus} size='2x' /> </Button> */}
                            </div>
                            {loading == false ?
                                (
                                    <table id='ContactTable' className='inventory table'>

                                        <thead>
                                            <tr className='inventory-table-headers'>
                                                <th>

                                                </th>
                                                <th>
                                                    Contact ID
                                                </th>
                                                <th>
                                                    Name
                                                </th>
                                                <th>
                                                    Phone Number
                                                </th>
                                                <th>
                                                    Email
                                                </th>
                                                <th>
                                                    Organizaiton
                                                </th>
                                                <th>
                                                    Role
                                                </th>
                                                <th>
                                                </th>
                                            </tr>
                                        </thead>
                                        {ContactList.map((item, index) => (
                                            <tr style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff" } : { height: "50px" }} id={item.MyUserId} className="content-bar">
                                                <td className="itemnum">
                                                    <img style={{ height: '35px', width:'35px', borderRadius: '50%' }} src={`${'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + item.userPic}`} />
                                                </td>
                                                <td className="itemtitle" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white'  } : { height: "50px"}}>{item.MyUserId}</td>
                                                <td className="itemnum" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white'  } : { height: "50px"}}>{item.FullName}</td>
                                                {/* <td className="itemnum" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white'  } : { height: "50px"}}>{item.UserName}</td> */}
                                                <td className="itemprice" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white'  } : { height: "50px", color:'black'}}><FontAwesomeIcon className="project-done-icon" icon={faPhone} size='1x' />{item.PhoneNumber}</td>
                                                <td className="itemstock" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white'  } : { height: "50px"}}><p className='numinstock'><FontAwesomeIcon className="project-done-icon" icon={faEnvelope} size='1x' />{item.Email}</p></td>
                                                <td className="itemtitle" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white'  } : { height: "50px"}}>{item.CompanyName}</td>
                                                <td className="itemtitle" style={item.MyUserId == user.myUserId? { height: "50px", backgroundColor: "#c4d9ff",color:'white'  } : { height: "50px"}}>{item.UserRole}</td>
                                                <td className="btncontainer">
                                                    {/* <button className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faTrashCan} size='1x' /></button> */}
                                                    <DropdownButton className='project-done-icon' id="dropdown-item-button-edit-user" title={". . ."}>
                                                        {/* <Dropdown.Item style={{ color: 'white' }} onClick={() => { setusersGroups(true); setItem(usersList[index]) }} className="group-option-btn" as="button">Assign Groups to {item.FullName}</Dropdown.Item> */}
                                                        <Dropdown.Item style={{ color: 'white' }} onClick={() => { setEditUsers(true); setItem(ContactList[index]);console.log("SELECT CONTACCT",ContactList[index]) }} className="group-option-btn" as="button">Edit Contact: ({item.FullName})</Dropdown.Item>
                                                    </DropdownButton>
                                                    {/* <button onClick={() => { setEditUsers(true); setItem(usersList[index]) }} className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' /></button> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </table>
                                )
                                :
                                (
                                    <div style={{ width: '100%', textAlign: '-webkit-center' }} className='loading-animation-container'>
                                        <Lottie
                                            loop
                                            className='typing-animation-object'
                                            animationData={animationData}
                                            play
                                            style={{ width: '40rem' }}
                                        />
                                    </div>
                                )
                            }
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
                <EditableUserModal id="Vendor-modal-modal"
                    Item={Item}
                    onHide={handleshowedituser}
                    show={editusers}
                />
                <AddUserModal id="user-modal-modal"
                    show={adduserModal}
                    onHide={handleadduserModal}
                />
                <AssignGroupsModal id="user-modal-modal"
                    show={usersGroups}
                    onHide={handleassigngroupModal}
                    Group={Item}
                />
            </Modal>

        </div >
    )
}
export default ManageUsersModal