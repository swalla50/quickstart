import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faListCheck, faCheck, faCheckCircle, faTrashCan, faGrip, faList, faPencil, faPlus, faSave, faSquare, faSquareCheck, faXmark, faGears, faGear, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import './GL.css'
import GLSettingsModal from './GLSettings'
function GL(props) {

    const [GLSetting, setGLSetting] = useState(false)
    function handleshowGLSettings() {
        setGLSetting(false)
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
                    <Tabs className='accounting-bookkeeping-tabs' defaultActiveKey="CashReciepts" id="uncontrolled-tab-example" >

                        <Tab eventKey="CashReciepts" title={"CASH RECIEPTS"} className="Grid-tab">
                            Cash Reciepts
                        </Tab>
                        {/* <Tab eventKey="Dispersments" title={"DISPERSMENTS"} className="list-tab">
                            Dispersments
                        </Tab> */}
                        <Tab eventKey="Sales" title={"SALES"} className="list-tab">
                            <li className='bk-option'>
                                <div className='bk-option-name'>

                                    <h3 className='bookkeeping-otpion-header'>PRODUCTS</h3>

                                </div>
                                <FontAwesomeIcon className="bk-coin-icon" icon={faShoppingBag} size='5x' />
                            </li>
                        </Tab>
                        <Tab eventKey="Purchases" title={"PURCHASES"} className="list-tab">
                            PURCHASES
                        </Tab>
                        <Tab eventKey="General" title={"GENERAL"} className="list-tab">
                            GENERAL
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
        </div>
    )
}

export default GL