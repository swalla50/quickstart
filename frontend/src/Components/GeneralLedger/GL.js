import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faListCheck, faCheck, faCheckCircle, faTrashCan, faGrip, faList, faPencil, faPlus, faSave, faSquare, faSquareCheck, faXmark, faGears, faGear, faShoppingBag, faReceipt, faMoneyBills, faPersonCircleCheck, faMoneyBillTransfer, faMoneyBillAlt, faShippingFast, faMoneyCheckDollar, faBoxesPacking, faJournalWhills, faObjectGroup, faMoneyBill1Wave, faHandPaper, faBookBookmark } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import './GL.css'
import InvoiceModal from '../Invoice/InvoiceModal'
import GLSettingsModal from './GLSettings'
import InventoryModal from './Products/InventoryModal'
function GL(props) {

    const [GLSetting, setGLSetting] = useState(false)
    const [ProductModal, setProductModal] = useState(false)
    const [invoiceModal, setInvoiceModal] = useState(false);


    const handleshowinvoice = () => {
        setInvoiceModal(false);
    }
    function handleshowGLSettings() {
        setGLSetting(false)
    }
    function handleshowProductModal() {
        setProductModal(false)
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
                    Accounting <FontAwesomeIcon className="project-done-icon" icon={faListCheck} size='1x' />
                </Modal.Header>
                <Modal.Body>
                    <Button onClick={() => setGLSetting(true)} style={{ float: 'right', borderRadius: '50px', height: '4rem', width: '4rem' }} className='Account-setting-btn'><FontAwesomeIcon style={{ color: 'white' }} className="project-done-icon" icon={faGear} size='2x' /></Button>
                    <Tabs className='accounting-bookkeeping-tabs' defaultActiveKey="FileTax" id="uncontrolled-tab-example" >

                        <Tab eventKey="FileTax" title={"TAX FILING"} className="Grid-tab">
                            <ul className='Bookkeeping-options'>
                                <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>PRODUCTS</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faShoppingBag} size='5x' />
                                </li>
                                <li onClick={() => setInvoiceModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>CUSTOMER INVOICES</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faReceipt} size='5x' />
                                </li>
                                <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>PAYMENTS</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faMoneyBills} size='5x' />
                                </li>
                                <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>CUSTOMERS</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faPersonCircleCheck} size='5x' />
                                </li>
                            </ul>
                        </Tab>
                        {/* <Tab eventKey="Dispersments" title={"DISPERSMENTS"} className="list-tab">
                            Dispersments
                        </Tab> */}
                        <Tab eventKey="Sales" title={"SALES"} className="list-tab">
                            <ul className='Bookkeeping-options'>
                            <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>ESITMATES</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faCheck} size='5x' />
                                </li>
                                <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>PRODUCTS</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faShoppingBag} size='5x' />
                                </li>
                                <li onClick={() => setInvoiceModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>CUSTOMER INVOICES</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faReceipt} size='5x' />
                                </li>
                                <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>PAYMENTS</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faMoneyBills} size='5x' />
                                </li>
                                <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>CUSTOMERS</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faPersonCircleCheck} size='5x' />
                                </li>
                            </ul>
                        </Tab>
                        <Tab eventKey="Purchases" title={"PURCHASES"} className="list-tab">
                            <ul className='Bookkeeping-options'>
                                <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>VENDOR BILLS</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faMoneyBillTransfer} size='5x' />
                                </li>
                                <li onClick={() => setInvoiceModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>PAYMENTS</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faMoneyCheckDollar} size='5x' />
                                </li>
                                <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>PURCHASE ORDERS</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faShippingFast} size='5x' />
                                </li>
                            </ul>
                        </Tab>
                        <Tab eventKey="General" title={"ACCOUNTANT"} className="list-tab">
                            <ul className='Bookkeeping-options'>
                                <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>MANAGE INVENTORY</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faBoxesPacking} size='5x' />
                                </li>
                                <li onClick={() => setInvoiceModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>JOURNAL ENTRIES</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faBookBookmark} size='5x' />
                                </li>
                                <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>CHART OF ACCOUNTS</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faObjectGroup} size='5x' />
                                </li>
                                <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>MANUAL PAYMENTS & INVOICES MATCHING</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faMoneyBill1Wave} size='5x' />
                                </li>
                                <li onClick={() => setProductModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>

                                        <h3 className='bookkeeping-otpion-header'>MAKE MANUAL TAX ADJUSTMENTS</h3>

                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faHandPaper} size='5x' />
                                </li>
                            </ul>
                        </Tab>
                    </Tabs>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            <GLSettingsModal id="inventory-modal-modal"
                show={GLSetting}
                onHide={handleshowGLSettings}
            />
            <InventoryModal id="inventory-modal-modal"
                show={ProductModal}
                onHide={handleshowProductModal}
            />
            <InvoiceModal id="Vendor-modal-modal"
                show={invoiceModal}
                onHide={handleshowinvoice}
            />
        </div>
    )
}

export default GL