import { faBuilding, faBuildingShield, faPeopleGroup, faUser, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import UserModal from './UserModal';
import { Button, Modal } from 'react-bootstrap'
import './Settingsfunc.css'
import axios from 'axios';
import UserGroupModal from './UserGroupModal';
import EditCompanyModal from './EditCompanyModal';
import { ToastContainer } from 'react-toastify';

function Settingsfunc() {
    const [userModal, setUserModal] = useState(false);
    const [companyModal, setcompanyModal] = useState(false);
    const [GroupModal, setGroupModal] = useState(false);
    const [Rights, setRights] = useState([]);
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
                axios.get(`${'LoadUserRights/getUserRights/' + res.data.myUserId}`)
                    .then((response) => {
                        setRights(response.data);
                        console.log("rights", response.data)
                    })
                    .catch((err) => {
                        console.log(err, "Unable to get user time info");
                    });

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });



    }, []);

    return (
        <div className='Settings'>
            <ToastContainer/>
            <ul className='Settings-options'>
                <li onClick={() => setUserModal(true)} className='bk-option'>
                    <div className='bk-option-name'>
                        <h3 className='settings-otpion-header'>UPDATE YOUR USER</h3>
                    </div>
                    <FontAwesomeIcon className="bk-coin-icon" icon={faUser} size='5x' />
                </li>
                {user.UserRole === "Admin" ?
                    (<>
                        <li onClick={() => setGroupModal(true)} className='bk-option'>
                            <div className='bk-option-name'>
                                <h3 className='settings-otpion-header'>USER GROUPS</h3>
                            </div>
                            <FontAwesomeIcon className="bk-coin-icon" icon={faPeopleGroup} size='5x' />
                        </li>

                        {Rights.map(i => i.groupLevel).includes(1) ?
                            (
                                <li onClick={() => setcompanyModal(true)} className='bk-option'>
                                    <div className='bk-option-name'>
                                        <h3 className='settings-otpion-header'>EDIT COMPANY</h3>
                                    </div>
                                    <FontAwesomeIcon className="bk-coin-icon" icon={faBuildingShield} size='5x' />
                                </li>
                            )
                            :
                            (
                                <></>
                            )

                        }</>

                    )
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
                onHide={() => setGroupModal(false)}
            />
            <EditCompanyModal id="user-modal-modal"
                show={companyModal}
                onHide={() => handleshowcompany(false)}
            />
        </div>)
}

export default Settingsfunc