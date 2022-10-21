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
import { faBuilding, faBuildingCircleArrowRight, faEnvelope, faPencil, faPhone, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddVenComModal from './AddVenComModal';
import EditVenComModal from './EditVenComModal';

function VendorCompanyModal(props) {
    const [user, setUser] = useState("");
    const [vendorlist, setvendorlist] = useState([]);
    const [companylist, setcompanylist] = useState([]);
    const [editMode, setEditMode] = useState(true);
    const [vencomModal, setvencomModal] = useState(false);
    const [editvencomModal, seteditvencomModal] = useState(false);
    const [vendorObject, setvendorObject] = useState([]);


    function handleshowvencom() {
        setvencomModal(false);
        axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true));
                setcompanylist(response.data.filter(ven => ven.isActiveVendor == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
    }
    function handleshoweditvencom() {
        seteditvencomModal(false);
        axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true));
                setcompanylist(response.data.filter(ven => ven.isActiveVendor == true))
                // console.log('vendors: ', response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
    }


    useEffect(() => {
        axios.get(`getvendor/getvendorList`)
            .then((response) => {
                setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true));
                setcompanylist(response.data.filter(ven => ven.isActiveVendor == true))
                // console.log('vendors: ', response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
        axios.get(`UserProfile`)
            .then((res) => {
                setUser(res.data)

                // console.log(user)



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        handleshowvencom();
    }, [])

    const [editInv, setEditInv] = useState(null);
    const [editFormData, setEditFormData] = useState({
        vendorId: ""
    })

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
        // console.log("formdata:", newFormData);
    }
    //For the click to edit
    const handleEditClick = (item) => {
        setEditInv(item.vendorId);

        const formValues = {
            vendorId: item.vendorId,
            vendorName: item.vendorName,
            vendorType: item.vendorType,
            itemCode: item.itemCode,
            vendorEmail: item.vendorEmail,
            vendorPhone: item.vendorPhone,
            vendorContact: item.vendorContact,
            isActiveVendor: item.isActiveVendor
        }
        setEditFormData(formValues);
        setEditMode(false)
        // console.log("This item vendor", formValues)

    }
    const handleCancelClickVendor = () => {
        setEditInv(null);
        axios.get(`getvendor/getvendorlist`)
            .then((response) => {
                setvendorlist(response.data.filter(inv => inv.isActiveVendor == true && inv.isVendor == true));

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        setEditMode(true)
    };
    const handleCancelClickCompany = () => {
        setEditInv(null);
        axios.get(`getvendor/getvendorlist`)
            .then((response) => {
                setcompanylist(response.data.filter(inv => inv.isActiveVendor == true));
                // console.log('this is a test', response.data.filter(inv => inv.isActiveVendor == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        setEditMode(true)
    };
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
                <ToastContainer />
                <Modal.Header closeButton>
                    Company and Vendors
                    <div className='add-vendor-btn-container'>
                        <Button className='add-vendor-btn' onClick={() => setvencomModal(true)}> Add Company/Vendor <FontAwesomeIcon className="vendor-add-icon" icon={faPlus} size='2x' /> </Button>
                    </div>

                </Modal.Header>
                <Modal.Body>

                    <Tabs className='bookkeeping-tabs' defaultActiveKey="CashReciepts" id="uncontrolled-tab-example" >
                        <Tab eventKey="CashReciepts" title={<><p className='vendor-tab-title'>Company</p><FontAwesomeIcon className="company-icon" icon={faBuilding} size='1x' /></>} className="Grid-tab">
                            <table className='inventory table'>

                                <thead>
                                    <tr className='inventory-table-headers'>
                                        <th>
                                            Company ID
                                        </th>
                                        <th>
                                            Company Name
                                        </th>
                                        <th>
                                            Type
                                        </th>

                                        <th>
                                            Email
                                        </th>
                                        <th>
                                            Phone Number
                                        </th>
                                        <th>
                                            Contact
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </thead>
                                {companylist.map((item, index) => (
                                    // <>
                                    //     {editInv === item.vendorId ? (
                                    //     <EditableRow item={item} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClickCompany} />
                                    // ) : (
                                    <tr style={{ height: "50px" }} id={item.vendorId} className="content-bar">
                                        <td className="itemnum">{item.vendorId}</td>
                                        <td className="itemtitle">{item.vendorName}</td>
                                        <td className="itemtitle">{item.vendorType}</td>
                                        <td className="itemprice"><FontAwesomeIcon className="project-done-icon" icon={faEnvelope} size='1x' />{item.vendorEmail}</td>
                                        <td className="itemstock"><p className='numinstock'><FontAwesomeIcon className="project-done-icon" icon={faPhone} size='1x' />{item.vendorPhone}</p></td>
                                        <td className="itemtitle">{item.vendorContact}</td>
                                        <td className="btncontainer">
                                            <button className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faTrashCan} size='1x' /></button>
                                            <button onClick={() => { setvendorObject(companylist[index]); seteditvencomModal(true) }} className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' /></button>
                                        </td>
                                    </tr>
                                    // <ReadOnlyRow item={item} handleEditClick={() => {handleEditClick(item);setvendorObject(companylist[index]); seteditvencomModal(true)}} />
                                    // )}
                                    // </>
                                ))}
                            </table>
                        </Tab>
                        <Tab eventKey="Dispersments" title={<><p className='vendor-tab-title'>Vendor</p><FontAwesomeIcon className="company-icon" icon={faBuildingCircleArrowRight} size='1x' /></>} className="list-tab">

                            <table className='inventory table'>

                                <thead>
                                    <tr className='inventory-table-headers'>
                                        <th>
                                            Vendor ID
                                        </th>
                                        <th>
                                            Vendor
                                        </th>
                                        <th>
                                            Type
                                        </th>
                                        <th>
                                            Code
                                        </th>
                                        <th>
                                            Email
                                        </th>
                                        <th>
                                            Phone Number
                                        </th>
                                        <th>
                                            Contact
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </thead>
                                {vendorlist.map((item,index) => (
                                    // <>
                                    //     {editInv === item.vendorId ? (
                                    //         <EditableRow item={item} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClickVendor} />
                                    //     ) : (

                                    //         <ReadOnlyRow item={item} handleEditClick={handleEditClick} />
                                    //     )}
                                    // </>
                                    <tr style={{ height: "50px" }} id={item.vendorId} className="content-bar">
                                        <td className="itemnum">{item.vendorId}</td>
                                        <td className="itemtitle">{item.vendorName}</td>
                                        <td className="itemtitle">{item.vendorType}</td>
                                        <td className="itemnum">{item.itemCode}</td>
                                        <td className="itemprice"><FontAwesomeIcon className="project-done-icon" icon={faEnvelope} size='1x' />{item.vendorEmail}</td>
                                        <td className="itemstock"><p className='numinstock'><FontAwesomeIcon className="project-done-icon" icon={faPhone} size='1x' />{item.vendorPhone}</p></td>
                                        <td className="itemtitle">{item.vendorContact}</td>
                                        <td className="btncontainer">
                                            <button className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faTrashCan} size='1x' /></button>
                                            <button onClick={()=>{setvendorObject(vendorlist[index]); seteditvencomModal(true); }} className="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' /></button>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
                <AddVenComModal id="Vendor-modal-modal"
                    show={vencomModal}
                    onHide={handleshowvencom}
                />
                <EditVenComModal id="Vendor-modal-modal"
                    show={editvencomModal}
                    onHide={handleshoweditvencom}
                    object={vendorObject}
                />
            </Modal>
        </div >
    )
}
export default VendorCompanyModal