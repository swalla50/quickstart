import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress,faListCheck, faCheck, faCheckCircle, faTrashCan, faGrip, faList, faPencil, faPlus, faSave, faSquare, faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
function GL(props) {
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
                    General Ledgers <FontAwesomeIcon className="project-done-icon" icon={faListCheck} size='1x' />
                </Modal.Header>
                <Modal.Body>
                    <Tabs className='bookkeeping-tabs' defaultActiveKey="CashReciepts" id="uncontrolled-tab-example" >
                        <Tab eventKey="CashReciepts" title={"CASH RECIEPTS"} className="Grid-tab">
                            Cash Reciepts
                        </Tab>
                        <Tab eventKey="Dispersments" title={"DISPERSMENTS"} className="list-tab">
                            Dispersments
                        </Tab>
                        <Tab eventKey="Sales" title={"SALES"} className="list-tab">
                            Sales
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
        </div>
    )
}

export default GL