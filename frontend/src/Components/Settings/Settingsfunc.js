import { faBuilding, faUser, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import UserModal from './UserModal';
import { Button, Modal } from 'react-bootstrap'
import './Settingsfunc.css'
import axios from 'axios';
import UserGroupModal from './UserGroupModal';

function Settingsfunc() {
    const [userModal, setUserModal] = useState(false);
    const [companyModal, setcompanyModal] = useState(false);
    const [GroupModal, setGroupModal] = useState(false);
    const [user, setUser] = useState([]);

    const handleshowuser = () => {
        setUserModal(false);
    }
    const handleshowcompany = () => {
        setcompanyModal(false);
    }
    const handleshowgroup = () => {
        setcompanyModal(false);
    }

    useEffect(() => {

        axios.get(`UserProfile`)
            .then((res) => {
                setUser(res.data);

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });



    }, []);

    return (
        <div className='Settings'>
            <ul className='Settings-options'>
                <li onClick={() => setUserModal(true)} className='bk-option'>
                    <div className='bk-option-name'>
                        <h3 className='settings-otpion-header'>UPDATE YOUR USER</h3>
                    </div>
                    <FontAwesomeIcon className="bk-coin-icon" icon={faUser} size='5x' />
                </li>
                {user.UserRole === "Admin" ?
                    <li onClick={() => setGroupModal(true)} className='bk-option'>
                        <div className='bk-option-name'>
                            <h3 className='settings-otpion-header'>USER GROUPS</h3>
                        </div>
                        <FontAwesomeIcon className="bk-coin-icon" icon={faUserGroup} size='5x' />
                    </li>
                    
                    :
                    (
                        <div></div>
                    )
                }

            </ul>
            <UserModal id="user-modal-modal"
                show={userModal}
                onHide={setUserModal}
            />

            <UserGroupModal id="user-modal-modal"
                show={GroupModal}
                onHide={setGroupModal}
            />
        </div>)
}

export default Settingsfunc