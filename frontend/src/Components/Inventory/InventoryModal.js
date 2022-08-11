import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faListCheck, faCheck, faCheckCircle, faTrashCan, faGrip, faList, faPencil, faPlus, faSave, faSquare, faSquareCheck, faXmark, faShoppingCart, faBoxesStacked, faDollar } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import axios from 'axios';
import './InventoryModal.css'
import { EditableRow } from './EditableRow'
import ReadOnlyRow from './ReadOnlyRow'
import moment from 'moment'
import SellModal from './SellModal'
function InventoryModal(props) {

    const [invList, setinvList] = useState([]);
    const [editMode, setEditMode] = useState(true);
    const [user,setUser] = useState([]);
    const [newinvCount, setnewinvCount] = useState(0);
    
    //Grab
    useEffect(() => {
        axios.get(`getinventory/getInventoryList`)
            .then((response) => {
                setinvList(response.data.filter(inv => inv.isDeleted == false));
                var invCount= 0;
         for(let i = 0; i<response.data.filter(inv => inv.isDeleted == false).length; i++){

            invCount = invCount + response.data[i].NumofInventory;
            setnewinvCount(invCount);
            console.log("inv num sum", invCount)
            
          }
          return invCount;
            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

            axios.get(`UserProfile`)
            .then((res) => {
                setUser(res.data)
                




            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
             
       
  
        
    }, []);
console.log("This item", invList)
    
    const [editInv, setEditInv] = useState(null);
    const [editFormData, setEditFormData] = useState({
        InventoryID: ""
    })
    
    console.log("count",newinvCount)
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
        setEditInv(item.InventoryID);

        const formValues = {
            InventoryID: item.InventoryID,
            InventoryName: item.InventoryName,
            InventoryDescription: item.InventoryDescription,
            InventorySerialNumber: item.InventorySerialNumber,
            InventoryCost: item.InventoryCost,
            NumofInventory: item.NumofInventory,
            LastModified: item.LastModified
        }
        setEditFormData(formValues);
        setEditMode(false)
        console.log("This item", invList)

    }
    function handleInvAdde() {
        setinvList([...invList, {
            InventoryID: null, InventoryName: "",
            InventoryDescription: "",
            InventorySerialNumber: null,
            InventoryCost: 0,
            NumofInventory: 0,
            LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
        }])
        const formValues = {
            InventoryID: null, InventoryName: "",
            InventoryDescription: "",
            InventorySerialNumber: null,
            InventoryCost: 0,
            NumofInventory: 0,
            LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
        }
        setEditFormData(formValues);
        // handleEditClick(invList[invList.length - 1])
        setEditMode(false)
    }
    // console.log("list list: ", invList[invList.length - 1])
    //Cancel Edit
    const handleCancelClick = () => {
        setEditInv(null);
        axios.get(`getinventory/getInventoryList`)
            .then((response) => {
                setinvList(response.data.filter(inv => inv.isDeleted == false));

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        setEditMode(true)
    };
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedInventory = {
            InventoryID: editFormData.InventoryID,
            InventoryName: editFormData.InventoryName,
            InventoryDescription: editFormData.InventoryDescription,
            InventorySerialNumber: editFormData.InventorySerialNumber,
            InventoryCost: editFormData.InventoryCost,
            NumofInventory: editFormData.NumofInventory,
            LastModified: editFormData.LastModified,
            LastModifiedBy: user.FullName,
            isDeleted: false
        }
        const editedInventory2 = {
            InventoryName: editFormData.InventoryName,
            InventoryDescription: editFormData.InventoryDescription,
            InventorySerialNumber: editFormData.InventorySerialNumber,
            InventoryCost: editFormData.InventoryCost,
            NumofInventory: editFormData.NumofInventory,
            LastModified: editFormData.LastModified,
            LastModifiedBy: user.FullName,
            isDeleted: false
        }

        if (editedInventory.InventoryID === null) {
            console.log("POST: ", editedInventory2);
            axios.post('addinventory/addInventoryitem', editedInventory2)
                .then(res => {
                    console.log("edited time", res.data)
                    toast.success("Added New Inventory Item Successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme:'dark'
                    });
                    axios.get(`getinventory/getInventoryList`)
            .then((response) => {
                setinvList(response.data.filter(inv => inv.isDeleted == false));

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        console.log("This item", invList)
                })
                .catch(err => {
                    console.log(err);
            })
            
            handleCancelClick();
        }
        if (editedInventory.InventoryID !== null) {
            console.log("UPDATE: ", editedInventory);
            axios.put('addinventory/updateInventory', editedInventory)
                .then(res => {
                    console.log("edited time", res.data)
                    toast.success("Updated Inventory Item Successfully!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme:'dark'
                    });
                    axios.get(`getinventory/getInventoryList`)
            .then((response) => {
                setinvList(response.data.filter(inv => inv.isDeleted == false));

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        console.log("This item", invList)
                })
                .catch(err => {
                    console.log(err);
                })
            handleCancelClick();
        }

        
        setEditInv(null);
        setEditMode(true);

    }
    
    const [sellModal2, setsellModal2] = useState(false)

const handleshowsell = () => {
        setsellModal2(false);
    }



    return (
        <div className='GL'>

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
                    INVENTORY <FontAwesomeIcon className="project-done-icon" icon={faListCheck} size='1x' />

                </Modal.Header>
                <Modal.Body>
                    <div className='inventory-metrics'>
                        <div className='metric-container'>
                           <div className='metric-header-container'>
                                <h5 className='metric-header'>TOTAL ITEMS</h5>
                            </div>
                            <div className='metric-content'><h4 className='metric'>{newinvCount} items</h4></div>
                        </div>
                        <div className='metric-container'>
                           <div className='metric-header-container'>
                                <h5 className='metric-header'>TOTAL ITEMS</h5>
                            </div>
                            <div className='metric-content'><h4 className='metric'>{newinvCount} items</h4></div>
                        </div>
                    </div>
                    <div className='above-table-head'>
                        <div className='heading-container'>
                            <div class="page-title">Inventory</div>
                            <div class="page-desc">View and manage your stock</div>
                        </div>

                        {editMode == true ?
                            (
                                <div className='new-inventory-form'>
                                    <button className='Add-inv-btn' onClick={handleInvAdde}>New Item <FontAwesomeIcon className="inv-add-icon" icon={faPlus} size='1x' /></button>
                                </div>
                            ) : (
                                <div className='new-inventory-form'>
                                </div>
                            )
                        }
                        <div className='sell-stock-container'>
                            <button className='sell-btn' onClick={() => setsellModal2(true)}>Sell <FontAwesomeIcon className="sell-item-icon" icon={faDollar} size='1x' /></button>
                            <button className='stock-btn'>Restock <FontAwesomeIcon className="stock-item-icon" icon={faBoxesStacked} size='1x' /></button>
                        </div>
                    </div>
                    <form className="table-container" onSubmit={handleEditFormSubmit}>
                        <table className='inventory table'>

                            <thead>
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Item Name
                                    </th>
                                    <th>
                                        Item Description
                                    </th>
                                    <th>
                                        S/N
                                    </th>
                                    <th>
                                        Item Cost
                                    </th>
                                    <th>
                                        # of Items
                                    </th>
                                    <th>
                                        Last Modified
                                    </th>
                                    <th>
                                    </th>
                                </tr>
                            </thead>
                            {invList.map((item) => (
                                <>
                                    {editInv === item.InventoryID ? (
                                        <EditableRow item={item} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                                    ) : (

                                        <ReadOnlyRow item={item} handleEditClick={handleEditClick} />
                                    )}
                                </>
                            ))}
                        </table>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            <SellModal id="inventory-modal-modal"
                show={sellModal2}
                onHide={handleshowsell}
            />
        </div >
    )
}

export default InventoryModal