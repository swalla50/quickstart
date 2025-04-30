import { faCheckCircle, faListCheck, faQuestionCircle, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProjectModal.css'
import moment from 'moment'


function TeamDeletionWarn(props) {

    console.log('Team Discarded', props.team)


    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ToastContainer />

            <Modal.Header>
                Are You Sure You Want To Discard Changes for: {props.team.PTeamName} <FontAwesomeIcon className="project-done-icon" icon={faQuestionCircle} size='2x' />
            </Modal.Header>
            <Modal.Body>
                <div className='discard-team-container-btn'>
                    <Button className='team-discard-no' onClick={props.onHideNo}> No </Button>
                    <Button className='team-discard-yes' onClick={props.onHide}> Yes </Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TeamDeletionWarn