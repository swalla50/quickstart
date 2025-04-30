import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faListCheck, faCheck, faCheckCircle, faTrashCan, faGrip, faList, faPencil, faPlus, faSave, faSquare, faSquareCheck, faXmark, faShoppingCart, faBoxesStacked, faDollar, faMoneyBill, faBox, faArrowUp, faArrowDown, faArrowRight, faDollarSign, faChartLine, faBoxesPacking } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import axios from 'axios';
import './InventoryModal.css'
import EditProductModal from './EditProductModal'
import ReadOnlyRow from './ReadOnlyRow'
import moment from 'moment'
import SellModal from './SellModal'
import RestockModal from './RestockModal'
import SalesRestockPieChart from '../../ChartJS/SalesRestockPieChart'
import animationData from '../../../assets/animations/3741-white-loading.json'
import animationData2 from '../../../assets/animations/89438-blue-loadingg.json'
import Lottie from 'react-lottie-player';
import AddProductModal from './AddProductModal'

function InventoryModal(props) {

    const [invList, setinvList] = useState([]);
    const [editMode, setEditMode] = useState(true);
    const [user, setUser] = useState([]);
    const [newinvCount, setnewinvCount] = useState(0);
    const [srLog, setsrLog] = useState([]);
    const [soldList, setsoldList] = useState([]);
    const [totalsold, settotalsold] = useState(0);
    const [TotalItems, setTotalItems] = useState([]);
    const [itemsSoldTotal, setItemsSoldTotal] = useState([]);
    const [vendorList, setvendorlist] = useState([]);
    const [sellModal2, setsellModal2] = useState(false)
    const [restockModal2, setrestockModal2] = useState(false)
    const [RefreshPie, setRefreshPie] = useState(false)
    const [Loading, setLoading] = useState(true);
    const [change, setchange] = useState(false);
    const [producteditModal, setproducteditModal] = useState(false);
    const [productaddModal, setproductaddModal] = useState(false);
    const [selectedProduct,setselectedProduct] = useState([]);

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    //Grab
    useEffect(() => {
        setLoading(true)
        if (props.show != false) {
            setTimeout(() => {
                // setRefreshPie(false)
                setLoading(false)
                axios.get(`getinventory/getInventoryList`)
                    .then((response) => {
                        setinvList(response.data.filter(inv => inv.isDeleted == false));
                        var invCount = 0;
                        for (let i = 0; i < response.data.filter(inv => inv.isDeleted == false).length; i++) {

                            invCount = invCount + response.data[i].NumofInventory;
                            setnewinvCount(invCount);
                            // console.log("inv num sum", invCount)

                        }
                        return invCount;

                    })
                    .catch((err) => {
                        console.log(err, "Unable to get user time info");
                    });
                getSRLog();
                axios.get(`GetVendor/getvendorList`)
                    .then((res) => {
                        setvendorlist(res.data)





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
                axios.get(`CalculatedItemsSold/GetItemsSold`)
                    .then((res) => {
                        setItemsSoldTotal(res.data)
                        console.log("sold count", res.data)



                    })
                    .catch((err) => {
                        console.log(err, "Unable to get user time info");
                    });
                axios.get(`CalculatedTotalItems/GetTotalItems`)
                    .then((res) => {
                        setTotalItems(res.data)
                        // console.log("sold count", res.data)



                    })
                    .catch((err) => {
                        console.log(err, "Unable to get user time info");
                    });

                setRefreshPie(true)
                console.log("CHANG HAPPENS")
            }, 3000)
        }

    }, [props.show, change]);

    function RefreshProducts(){
        axios.get(`getinventory/getInventoryList`)
        .then((response) => {
            setinvList(response.data.filter(inv => inv.isDeleted == false));
            var invCount = 0;
            for (let i = 0; i < response.data.filter(inv => inv.isDeleted == false).length; i++) {

                invCount = invCount + response.data[i].NumofInventory;
                setnewinvCount(invCount);
                // console.log("inv num sum", invCount)

            }
            return invCount;

        })
        .catch((err) => {
            console.log(err, "Unable to get user time info");
        });
    }

    function refreshItemsSold() {
        axios.get(`CalculatedItemsSold/GetItemsSold`)
            .then((res) => {
                setItemsSoldTotal(res.data)

                console.log("sold count", res.data)



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }
    function refreshTotalItems() {
        axios.get(`CalculatedTotalItems/GetTotalItems`)
            .then((res) => {
                setTotalItems(res.data)
                // console.log("sold count", res.data)



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }
    const getSRLog = async () => {
        const log = await axios.get(`getSRLog/getSRLog`)
            .then((response) => {
                setsrLog(response.data);
                // setsoldList(response.data.filter(inv => inv.Sold == true))
                var totalsell = 0;
                // for (let i = 0; i < soldList.length; i++) {

                //     totalsell = totalsell + (soldList[i].ItemAmount * soldList[i].numberSR);
                //     settotalsold(totalsell);


                // }
                // return totalsell;

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    };

    // console.log("total sold sum", totalsold);
    const handleshowsell = () => {
        var invCount = 0;
        setsellModal2(false);
        axios.get(`getinventory/getInventoryList`)
            .then((response) => {
                setinvList(response.data.filter(inv => inv.isDeleted == false));
                for (let i = 0; i < response.data.filter(inv => inv.isDeleted == false).length; i++) {

                    invCount = invCount + response.data[i].NumofInventory;
                    setnewinvCount(invCount);
                    // console.log("inv num sum", invCount)

                }
                return invCount;
            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`getSRLog/getSRLog`)
            .then((res) => {
                setsrLog(res.data);


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        refreshItemsSold();
        refreshTotalItems()
        setchange(true)
        setRefreshPie(false)
    }
    const handleshowrestock = () => {
        var invCount = 0;
        setrestockModal2(false);
        axios.get(`getinventory/getInventoryList`)
            .then((response) => {
                setinvList(response.data.filter(inv => inv.isDeleted == false));
                for (let i = 0; i < response.data.filter(inv => inv.isDeleted == false).length; i++) {

                    invCount = invCount + response.data[i].NumofInventory;
                    setnewinvCount(invCount);
                    // console.log("inv num sum", invCount)

                }
                return invCount;
            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        getSRLog();
        refreshItemsSold()
        setchange(true)
        refreshTotalItems()
        setRefreshPie(false)

    }
    const handleshoweditproduct = () => {
        var invCount = 0;
        setproducteditModal(false);
        RefreshProducts()
        getSRLog();
        refreshItemsSold()
        setchange(true)
        refreshTotalItems()
        setRefreshPie(false)

    }
    const handleshowaddproduct = () => {
        var invCount = 0;
        setproductaddModal(false);
        RefreshProducts()
        getSRLog();
        refreshItemsSold()
        setchange(true)
        refreshTotalItems()
        setRefreshPie(false)

    }
    // console.log("This item", invList)

    const [editInv, setEditInv] = useState(null);
    const [editFormData, setEditFormData] = useState({
        InventoryID: ""
    })

    // console.log("count", newinvCount)
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
            LastModified: item.LastModified,
            Vendor: item.Vendor
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
                        theme: 'dark'
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
                        theme: 'dark'
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
                    PRODUCTS <FontAwesomeIcon className="project-done-icon" icon={faListCheck} size='1x' />

                </Modal.Header>
                <Modal.Body>
                    <div className='inventory-metrics'>
                        <div className='metric-container'>
                            <div className='metric-header-container'>
                                <h5 className='metric-header'>TOTAL ITEMS</h5>
                            </div>
                            <div className='metric-content'><h4 className='metric'>
                                {Loading ?
                                    <Lottie
                                        loop
                                        className='loading-animation-object-inventory'
                                        animationData={animationData}
                                        play
                                        style={{ height: '15rem' }}
                                    />
                                    :
                                    <div style={{ width: '50%', textAlign: 'right' }}>{TotalItems.TotalInventory}</div>

                                }
                                <div style={{ marginLeft: '2rem', width: '50%', textAlign: 'left' }}>items</div>
                            </h4>
                            </div>
                        </div>
                        <div className='metric-container'>
                            <div className='metric-header-container'>
                                <h5 className='metric-header'>TOTAL ITEMS SOLD</h5>
                            </div>
                            <div className='metric-content'><h4 className='metric'>
                                {Loading ?
                                    <Lottie
                                        loop
                                        className='loading-animation-object-inventory'
                                        animationData={animationData}
                                        play
                                        style={{ height: '15rem', width: '50%' }}
                                    />
                                    :
                                    <div style={{ width: '50%', textAlign: 'right' }}>{itemsSoldTotal.SoldCount}</div>
                                }
                                < div style={{ marginLeft: '2rem', textAlign: 'left', width: '50%' }}>Items{/*${soldList.filter(item => item.Sold = true).reduce((a, v) => a = a + (v.ItemAmount * v.numberSR), 0).toFixed(2)}*/} <FontAwesomeIcon className="sold-total-icon" icon={faChartLine} size='1x' /></div>
                            </h4>
                            </div>
                        </div>
                    </div>
                    <div className='above-table-head'>
                        <div className='heading-container'>
                            <div class="page-title">Products</div>
                            <div class="page-desc">View and manage your products</div>
                        </div>

                        {editMode == true ?
                            (
                                <div className='new-inventory-form'>
                                    <button className='Add-inv-btn' onClick={()=>setproductaddModal(true)}>New Product <FontAwesomeIcon className="inv-add-icon" icon={faPlus} size='1x' /></button>
                                </div>
                            ) : (
                                <div className='new-inventory-form'>
                                </div>
                            )
                        }
                        {/* <div className='sell-stock-container'>
                            <button className='sell-btn' onClick={() => setsellModal2(true)}>Sell <FontAwesomeIcon className="sell-item-icon" icon={faDollar} size='1x' /></button>
                            <button className='stock-btn' onClick={() => setrestockModal2(true)}>Restock <FontAwesomeIcon className="stock-item-icon" icon={faBoxesStacked} size='1x' /></button>
                        </div> */}
                    </div>
                    <div style={{ padding: '2rem' }} className="Product-page-container">
                        {Loading ?
                            <Lottie
                                loop
                                className='loading-animation-object-inventory'
                                animationData={animationData2}
                                play
                                style={{ height: '50rem' }}
                            />
                            :
                            <ul style={{ listStyle: 'none' }} className='product-list'>
                                {invList.map((item,index) => (
                                    <li className='product-item'>


                                        <img style={{ height: '8rem', width: '8rem', borderRadius: '10px' }} className='inv-image-item' src={'https://webapi20220126203702.azurewebsites.net/api/BlobExplorerProduct/GetBlobFile?url=' + item.inventoryImage}></img>

                                        <div className='inventoryinfo'>
                                            <div className='inventory-head'>
                                                <h5>{item.InventoryName}</h5>
                                            </div>
                                            <div className='inventory-info-sub'>
                                                <p style={{ color: 'greenyellow',fontSize:'25x'}}><FontAwesomeIcon className="stock-item-icon" icon={faDollarSign} size='1x' />{item.InventoryCost}</p>
                                                <p style={{ display: 'flex',fontSize:'25x' }}><p style={{ color: '#4f86f6', marginRight: '5px',fontSize:'25x' }}>{item.NumofInventory}</p> Items</p>
                                            </div>

                                        </div>
                                        <div className='product-edit-btn'>
                                            <Button onClick={()=>{setproducteditModal(true);setselectedProduct(invList[index])}} ><FontAwesomeIcon style={{ color: 'white' }} className="stock-item-icon" icon={faPencil} size='1x' /></Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                        }

                    </div>
                    {/* <form className="table-container" onSubmit={handleEditFormSubmit}>
                        <table className='inventory table'>

                            <thead>
                                <tr className='inventory-table-headers'>
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
                                        Vendor
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
                                    {editInv === item.InventoryID ?
                                        (
                                            <tr id={item.InventoryID} key={item.InventoryID} class="content-bar">
                                                <td >
                                                    <input style={{ color: 'white' }} className="inv-edit-input" type='text' value={editFormData.InventoryID} readOnly name='InventoryID'></input>

                                                </td>
                                                <td >
                                                    <input style={{ color: 'white' }} className="inv-edit-input" type='text' value={editFormData.InventoryName} onChange={handleEditFormChange} name='InventoryName'></input>
                                                </td>
                                                <td >
                                                    <textarea style={{ color: 'white' }} className="inv-edit-input" type='text' value={editFormData.InventoryDescription} onChange={handleEditFormChange} name='InventoryDescription'></textarea>
                                                </td>
                                                <td >
                                                    <select style={{ color: 'white', borderRadius: '5px', height: '36px' }} className="inv-edit-input" type='text' value={editFormData.Vendor} onChange={handleEditFormChange} name='InventoryDescription'>
                                                        {vendorList.filter(ven => ven.isVendor == true).map(item => (
                                                            <option style={{ color: 'black' }} value={item.vendorId}>{item.vendorName}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td >
                                                    <input style={{ color: 'white' }} className="inv-edit-input" type='text' value={editFormData.InventorySerialNumber} step="0.01" min="0.00" onChange={handleEditFormChange} name='InventorySerialNumber'></input>
                                                </td>
                                                <td >
                                                    <input style={{ color: 'white' }} className="inv-edit-input" type='number' value={editFormData.InventoryCost} step="0.01" min="0.00" onChange={handleEditFormChange} name='InventoryCost'></input>
                                                </td>
                                                <td  >
                                                    <div style={{ color: 'white' }} className="inv-edit-input" name='NumofInventory'><FontAwesomeIcon className="project-done-icon" icon={faBoxesPacking} size='1x' /> {editFormData.NumofInventory} items</div>
                                                </td>
                                                <td  >
                                                    <input style={{ color: 'white' }} className="inv-edit-input" type='datetime-local' value={editFormData.LastModified} readOnly name='LastModified'></input>
                                                </td>
                                                <td class="btncontainer">
                                                    <button class="cbbtn" type="button" onClick={handleCancelClick} >
                                                        <FontAwesomeIcon className="project-done-icon" icon={faXmark} size='1x' />
                                                    </button>
                                                    <button class="cbbtn" type='submit' >
                                                        <FontAwesomeIcon className="project-done-icon" icon={faCheckCircle} size='1x' />
                                                    </button>

                                                </td>

                                            </tr>
                                            // <EditableRow item={item} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
                                        )
                                        :
                                        (

                                            <tr style={{ height: "50px" }} id={item.InventoryID} class="content-bar">
                                                <td class="itemnum">{item.InventoryID}</td>
                                                <td class="itemtitle">{item.InventoryName}</td>
                                                <td class="itemtitle">{item.InventoryDescription}</td>
                                                <td class="itemtitle">{vendorList.filter(ven => ven.vendorId == item.Vendor).map(item => item.vendorName)}</td>
                                                <td class="itemnum">{item.InventorySerialNumber}</td>
                                                <td class="itemprice"><FontAwesomeIcon className="project-done-icon" icon={faDollarSign} size='1x' />{item.InventoryCost} ea.</td>
                                                <td class="itemstock"><p className='numinstock'><FontAwesomeIcon className="project-done-icon" icon={faBoxesPacking} size='1x' />{item.NumofInventory}</p> Items</td>
                                                <td class="itemtitle">{new Date(item.LastModified).toLocaleDateString(undefined, options)}</td>
                                                <td class="btncontainer">
                                                    <button class="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faTrashCan} size='1x' /></button>
                                                    <button onClick={(event) => handleEditClick(event, item)} class="cbbtn"><FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' /></button>
                                                </td>
                                            </tr>
                                        )}
                                </>
                            ))}
                        </table>
                    </form> */}
                    {/* Sales LOGS */}
                    {/* <div className='second-row-inventory'>
                        <div className='row-2-first-srlog'>
                            <h4 className='log-heading'> RECENT SELLS AND RESTOCKS </h4>
                            <Tabs className='inventory-tabs' defaultActiveKey="Sells" id="uncontrolled-tab-example" >
                                <Tab style={{ height: '28rem', overflowY: 'scroll' }} eventKey="Sells" title={<><p className='tab-title'>Sells</p><FontAwesomeIcon className="inventory-sell-icon" icon={faMoneyBill} size='1x' /></>} className="Sell-tab">
                                    <table className='sell-restock-list'>
                                        <thead className='inventory-log-header-table'>
                                            <tr>
                                                <th className='srlog-header'></th>
                                                <th className='srlog-header'>Item</th>
                                                <th className='srlog-header'>Amount Sold</th>
                                                <th className='srlog-header'>Cost</th>
                                                <th className='srlog-header'>Clerk</th>
                                                <th className='srlog-header'>Date</th>
                                                <th className='srlog-header'></th>

                                            </tr>
                                        </thead>
                                        <tbody className='srlog-table-body'>
                                            {srLog.filter(item => item.Sold == true).map((item) => (
                                                <tr className='inventory-log-item' >
                                                    {item.Sold ?
                                                        <td className='item-name-col'>
                                                            <FontAwesomeIcon className="srlog-sold-arrow" icon={faArrowUp} size='2x' />
                                                        </td>
                                                        :
                                                        <td className='item-name-col'>
                                                            <FontAwesomeIcon className="srlog-restock-arrow" icon={faArrowRight} size='2x' />
                                                        </td>
                                                    }
                                                    <td className='item-name-col'>
                                                        {item.ItemName}
                                                    </td>
                                                    {item.Sold ?
                                                        <td className='item-name-col'>
                                                            {item.numberSR} sold
                                                        </td>
                                                        :
                                                        <td className='item-name-col'>
                                                            {item.numberSR} stocked
                                                        </td>
                                                    }
                                                    <td className='item-name-col'>
                                                        <FontAwesomeIcon className="srlog-restock-arrow" icon={faDollarSign} size='1x' />{item.ItemAmount.toFixed(2)}
                                                    </td>
                                                    <td className='item-name-col'>
                                                        {item.Clerk}
                                                    </td>
                                                    <td className='item-name-col'>
                                                        {new Date(item.Date).toLocaleDateString(undefined, options)}
                                                    </td>
                                                    <td className='item-name-col'>
                                                        <FontAwesomeIcon className="srlog-restock-arrow" icon={faDollarSign} size='1x' />{formatter.format(item.numberSR * item.ItemAmount)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Tab>
                                <Tab style={{ height: '28rem', overflowY: 'scroll' }} eventKey="Restock" title={<><p className='tab-title'>Restocks</p><FontAwesomeIcon className="inventory-restock-icon" icon={faBox} size='1x' /></>} className="Restock-tab">
                                    <table className='sell-restock-list'>
                                        <thead className='inventory-log-header-table'>
                                            <tr>
                                                <th className='srlog-header'></th>
                                                <th className='srlog-header'>Item</th>
                                                <th className='srlog-header'>Amount Stocked</th>
                                                <th className='srlog-header'>Cost</th>
                                                <th className='srlog-header'>Clerk</th>
                                                <th className='srlog-header'>Date</th>
                                                <th className='srlog-header'></th>
                                            </tr>
                                        </thead>
                                        <tbody className='srlog-table-body'>
                                            {srLog.filter(item => item.Restocked == true).map((item) => (
                                                <tr className='inventory-log-item' >
                                                    {item.Sold ?
                                                        <td className='item-name-col'>
                                                            <FontAwesomeIcon className="srlog-sold-arrow" icon={faArrowUp} size='2x' />
                                                        </td>
                                                        :
                                                        <td className='item-name-col'>
                                                            <FontAwesomeIcon className="srlog-restock-arrow" icon={faArrowRight} size='2x' />
                                                        </td>
                                                    }
                                                    <td className='item-name-col'>
                                                        {item.ItemName}
                                                    </td>
                                                    {item.Sold ?
                                                        <td className='item-name-col'>
                                                            {item.numberSR} sold
                                                        </td>
                                                        :
                                                        <td className='item-name-col'>
                                                            {item.numberSR} stocked
                                                        </td>
                                                    }
                                                    <td className='item-name-col'>
                                                        <FontAwesomeIcon className="srlog-restock-arrow" icon={faDollarSign} size='1x' /> {parseFloat(item.ItemAmount).toFixed(2)}
                                                    </td>
                                                    <td className='item-name-col'>
                                                        {item.Clerk}
                                                    </td>
                                                    <td className='item-name-col'>
                                                        {new Date(item.Date).toLocaleDateString(undefined, options)}
                                                    </td>
                                                    <td className='item-name-col'>
                                                        <FontAwesomeIcon className="srlog-restock-arrow" icon={faDollarSign} size='1x' />{formatter.format(item.numberSR * item.ItemAmount)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Tab>
                            </Tabs>
                        </div>
                        <div className='row-2-first'>
                            <h4 className='log-heading'> TODAY'S SALES AND RESTOCKS ($) </h4>
                            <SalesRestockPieChart refresh={RefreshPie} className="PieChart" />
                        </div>
                        <div className='row-2-first'>
                            <h4 className='log-heading'> RECENT Sells </h4>
                        </div>
                    </div> */}
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer> */}
            </Modal>
            <SellModal id="inventory-modal-modal"
                show={sellModal2}
                onHide={handleshowsell}
            />
            <RestockModal id="inventory-modal-modal"
                show={restockModal2}
                onHide={handleshowrestock}
            />
            <EditProductModal id="inventory-modal-modal"
                show={producteditModal}
                onHide={()=>{handleshoweditproduct();RefreshProducts()}}
                product={selectedProduct}
            />
            <AddProductModal id="inventory-modal-modal"
                show={productaddModal}
                onHide={()=>{handleshowaddproduct();RefreshProducts()}}
            />
        </div >
    )
}

export default InventoryModal