import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { textSpanIsEmpty } from 'typescript';
import moment from 'moment';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function GLSettingsModal(props) {

    const [vendorList, setvendorlist] = useState([]);
    useEffect(() => {
        axios.get(`getVendor/getvendorList`)
            .then((response) => {
                setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == false));
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
    }, [])


    return (
        <div className='GLSettings'>

            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width-sell"
                contentClassName="modal-height-sell"
                backdropClassName='edit-user-shadow'
            >

                <Modal.Header closeButton>
                    Accounting Settings <FontAwesomeIcon className="project-done-icon" icon={faGears} size='1x' />
                </Modal.Header>
                <Modal.Body>
                    <div className='accounting-setting-options-container'>
                        <div className='Add-Account-Option'>
                            Account Settings
                        </div>
                        <div className='Add-Account-Option'>
                            Allocation Settings
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default GLSettingsModal
