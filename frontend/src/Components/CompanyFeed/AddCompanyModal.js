import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { textSpanIsEmpty } from 'typescript';
import moment from 'moment';


function AddCompanyModal(props) {
    const [newpostMessage, setnewpostMessage] = useState("");
    const [newpostImage, setnewPostImage] = useState("");
    const [newFullName, setnewFullName] = useState("");
    const [newpostSubject, setnewpostSubject] = useState("");
    const [newpostUserPic, setnewpostUserPic] = useState("");


    useEffect(() => {
        axios.get(`UserProfile`)
            .then((res) => {
                setnewFullName(res.data.FullName);
                setnewpostUserPic('https://webapi20220126203702.azurewebsites.net/Images/' + res.data.userPic)
                

        



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }, [])

    function addPost() {
        setnewPostImage(null);
        const newPost = {
            postMessage: newpostMessage,
            postImage: newpostImage,
            FullName: newFullName,
            postTime:  moment().format('l'),
            postSubject: newpostSubject,
            postUserPic: newpostUserPic
        }

        console.log("NEW POST", newPost)

        axios.post('addCP/addCPitem', newPost)
        .then(res => {
            var newpostdata = res.data;
            
        })
        .catch(err => {
            console.log(err);
        })
toast.success(`${"You added a new post!"}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                theme: 'dark'
            });
        setnewFullName(null);
        setnewpostUserPic(null);
        props.onHide();
    }
    return (
        <div className='NewPostModal'>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width-Restock"
                contentClassName="modal-height-Restock"
            >

                <Modal.Header closeButton>
                    Add a new post!
                </Modal.Header>
                <Modal.Body>
                    
                    <Form className="Restock-form-container" >

                        <div className='new-post-form'>
                            <h6 className='Restock-update-header'>Post Subject</h6>
                            <input type="text"className='post-subject' onChange={(e) => setnewpostSubject(e.target.value)} />
                            <h6 className='Restock-update-header'>Post Message</h6>
                            <textarea className='post-message' onChange={(e) => setnewpostMessage(e.target.value)}></textarea>
                        </div>
                        
                        <div className='submit-Restock-container'>
                            <Button onClick={addPost} variant="secondary" size="sm">+</Button>
                        </div>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
export default AddCompanyModal