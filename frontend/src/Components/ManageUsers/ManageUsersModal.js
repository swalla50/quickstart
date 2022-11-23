import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { textSpanIsEmpty } from 'typescript';
import moment from 'moment';
import { EditableRow } from './EditableRow'
import ReadOnlyRow from './ReadOnlyRow'
import { faBuilding, faBuildingCircleArrowRight, faContactBook, faContactCard, faEnvelope, faPencil, faPhone, faPlus, faTrashCan, faUserFriends, faUserGroup, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ManageUsersModal.css'
import EditableUserModal from './EditableUserModal';
import AddUserModal from './AddUserModal';
function ManageUsersModal(props) {
    const [user, setUser] = useState("");
    const [usersList, setuserslist] = useState([]);
    const [EmployeeList, setEmployeeList] = useState([]);
    const [ContactList, setContactList] = useState([]);
    const [editMode, setEditMode] = useState(true);
    const [Item, setItem] = useState([]);
    const [adduserModal, setAddUserModal] = useState(false);
    const [companyList, setcompanylist] = useState(false);
    const [matched,setMatched] = useState([])

    const [editusers, setEditUsers] = useState(false);
    var matchedCompany = [];

    function handleshowedituser() {
        setEditUsers(false);
    }
    function handleadduserModal (){
        setAddUserModal(false)
    }
    console.log("MODAL OPEN", editusers, "ITEM", Item)

    useEffect(() => {
        axios.get(`userList/userList`)
            .then((response) => {
                setEmployeeList(response.data.filter(ven => ven.isActive == true && ven.isEmployee == true));
                setContactList(response.data.filter(ven => ven.isActive == true && ven.isContact == true));
            })
            .catch((err) => {
                console.log(err, "Unable to get contact time info");
            });
            axios.get(`getCompanyName/getCompanyName`)
            .then((r) => {
                setuserslist(r.data.filter(ven => ven.isActive == true && ven.isUser == true))
                console.log('NEW COMP NAME',r.data);
                
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
            
    }, [])


                    console.log("Company Name",matchedCompany)

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
                    Mangage Users, Emplyees and Contacts <FontAwesomeIcon className="manage-header-icon" icon={faUserFriends} size='2x' />
                </Modal.Header>
                <Modal.Body>
                    <div className='add-vendor-btn-container' >
                        <Button className='add-vendor-btn' onClick={() => setAddUserModal(true)}> Add Employee <FontAwesomeIcon className="vendor-add-icon" icon={faPlus} size='2x' /> </Button>
                    </div>
                    <Tabs className='bookkeeping-tabs' defaultActiveKey="Users" id="uncontrolled-tab-example" >
                        <Tab eventKey="Users" title={<><p className='vendor-tab-title'>USERS</p><FontAwesomeIcon className="company-icon" icon={faUserGroup} size='1x' /></>} className="Grid-tab">

                            <table className='inventory table'>

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
                                            Role
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </thead>
                                {usersList.map((item, index) => (
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
                                            <button className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faTrashCan} size='1x' /></button>
                                            <button onClick={() => { setEditUsers(true); setItem(usersList[index]) }} className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' /></button>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </Tab>
                        <Tab eventKey="Employees" title={<><p className='vendor-tab-title'>Employee</p><FontAwesomeIcon className="company-icon" icon={faUsersRectangle} size='1x' /></>} className="list-tab">

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
                                {EmployeeList.map((item) => (
                                    <>
                                        {editInv === item.myUserId ? (
                                            <EditableRow item={item} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClickEmployee} />
                                        ) : (

                                            <ReadOnlyRow item={item} handleEditClick={handleEditClick} />
                                        )}
                                    </>
                                ))}
                            </table>
                        </Tab>
                        <Tab eventKey="Contacts" title={<><p className='vendor-tab-title'>Contacts</p><FontAwesomeIcon className="company-icon" icon={faContactCard} size='1x' /></>} className="list-tab">
                            <div className='add-vendor-btn-container'>
                                {/* <Button className='add-vendor-btn'> Add Contact <FontAwesomeIcon className="vendor-add-icon" icon={faPlus} size='2x' /> </Button> */}
                            </div>
                            <table className='inventory table'>

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
                                {ContactList.map((item) => (
                                    <>
                                        {editInv === item.myUserId ? (
                                            <EditableRow item={item} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClickContact} />
                                        ) : (

                                            <ReadOnlyRow item={item} handleEditClick={handleEditClick} />
                                        )}
                                    </>
                                ))}
                            </table>
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
            </Modal>

        </div >
    )
}
export default ManageUsersModal