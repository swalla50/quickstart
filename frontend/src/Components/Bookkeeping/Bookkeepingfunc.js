import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingUser, faCartFlatbed, faCoins, faReceipt, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap'
import './Bookkeepingfunc.css';
import GL from '../GeneralLedger/GL';
import InventoryModal from '../Inventory/InventoryModal';
import VendorCompanyModal from '../VendorCompany/VendorCompanyModal';
import InvoiceModal from '../Invoice/InvoiceModal';
import ManageUsersModal from '../ManageUsers/ManageUsersModal';
import axios from 'axios';

function Bookkeepingfunc() {

    const [GLModal, setGLModal] = useState(false);
    const [inventoryModal, setinventoryModal] = useState(false);
    const [vendorModal, setvendorModal] = useState(false);
    const [invoiceModal, setInvoiceModal] = useState(false);
    const [manageModal, setManageModal] = useState(false);
    const [groupRights, setGroupRights] = useState([0]);
    const [user, setUser] = useState([]);

    const handleshowgl = () => {
        setGLModal(false);
    }
    const handleshowinvoice = () => {
        setInvoiceModal(false);
    }
    const handleshowinv = () => {
        setinventoryModal(false);
    }
    const handleshowvencom = () => {
        setvendorModal(false);
    }
    const handleshowmanage = () => {
        setManageModal(false);
    }

    //Pulls in Feed
    useEffect(() => {


        axios.get(`UserProfile`)
            .then((res) => {
                setUser(res.data)


                axios.get(`groupRights/getGroupRights`)
                    .then((response) => {
                        setGroupRights(response.data.filter(item => item.vendorId == res.data.Company && item.ModuleID == 2));
                        console.log("RIGHTS  FOUND:", response.data.filter(item => (item.vendorId == res.data.Company) && (item.ModuleID == 2)))
                        
                    })
                    .catch((err) => {
                        console.log(err, "Unable to get user time info");
                    });


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

    }, []);
    console.log("THESE RIGHS", groupRights[0])
    return (
        <div className='Bookkeeping'>
            {groupRights[0].LevelID !== null ?

                (
                    <>
                        <ul className='Bookkeeping-options'>
                            <li onClick={() => setGLModal(true)} className='bk-option'>
                                <div className='bk-option-name'>

                                    <h3 className='bookkeeping-otpion-header'>GENERAL LEDGER</h3>

                                </div>
                                <FontAwesomeIcon className="bk-coin-icon" icon={faCoins} size='5x' />
                            </li>
                            <li onClick={() => setvendorModal(true)} className='bk-option'>
                                <div className='bk-option-name'>
                                    <h3 className='bookkeeping-otpion-header'>VENDORS & COMPANIES</h3>

                                </div>
                                <FontAwesomeIcon className="bk-coin-icon" icon={faBuildingUser} size='5x' />
                            </li>
                            <li onClick={() => setinventoryModal(true)} className='bk-option'>
                                <div className='bk-option-name'>
                                    <h3 className='bookkeeping-otpion-header'>INVENTORY</h3>

                                </div>
                                <FontAwesomeIcon className="bk-coin-icon" icon={faCartFlatbed} size='5x' />
                            </li>
                            <li onClick={() => setInvoiceModal(true)} className='bk-option'>
                                <div className='bk-option-name'>
                                    <h3 className='bookkeeping-otpion-header'>INVOICE</h3>

                                </div>
                                <FontAwesomeIcon className="bk-coin-icon" icon={faReceipt} size='5x' />
                            </li>
                            <li onClick={() => setManageModal(true)} className='bk-option'>
                                <div className='bk-option-name'>
                                    <h3 className='bookkeeping-otpion-header'>MANAGE USERS & EMPLOYEES</h3>

                                </div>
                                <FontAwesomeIcon className="bk-coin-icon" icon={faUserGroup} size='5x' />
                            </li>
                        </ul>
                        <ManageUsersModal id="Vendor-modal-modal"
                            show={manageModal}
                            onHide={handleshowmanage} />
                        <GL id="GL-modal-modal"
                            show={GLModal}
                            onHide={handleshowgl} />
                        <InventoryModal id="inventory-modal-modal"
                            show={inventoryModal}
                            onHide={handleshowinv} />
                        <VendorCompanyModal id="Vendor-modal-modal"
                            show={vendorModal}
                            onHide={handleshowvencom} />
                        <InvoiceModal id="Vendor-modal-modal"
                            show={invoiceModal}
                            onHide={handleshowinvoice} />
                    </>
                )
                :
                (
                    <>
                        <div className='No-Access-Container'>
                            No Access to Bookkeeping
                        </div>
                    </>
                )


            }
        </div >
    )
}

export default Bookkeepingfunc