import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { textSpanIsEmpty } from 'typescript';
import moment from 'moment';
import { darken, lighten, styled } from '@mui/system';

import { Autocomplete, TextField } from '@mui/material';


function NewChatRoomModal(props) {

    const [user, setUser] = useState("");
    const [userList, setuserList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [newchatUsers, setnewchatUsers] = useState([]);
    const [chatroomname, setchatroomname] = useState("");
    // const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    const GroupHeader = styled('div')(({ theme }) => ({
        textAlign: 'left',
        position: 'sticky',
        top: '-8px',
        padding: '4px 10px',
        color: 'white',
        background: '#4f86f6'

    }));

    const GroupItems = styled('ul')({
        padding: 0,
    });


    // useEffect(() => {
    //     axios.get(`getinventory/getInventoryList`)
    //         .then((response) => {
    //             setinvList(response.data.filter(inv => inv.isDeleted == false));
    //         })
    //         .catch((err) => {
    //             console.log(err, "Unable to get user time info");
    //         });
    //     axios.get(`UserProfile`)
    //         .then((res) => {
    //             setUser(res.data)

    //             console.log(user)



    //         })
    //         .catch((err) => {
    //             console.log(err, "Unable to get user time info");
    //         });
    //     axios.get(`getSRLog/getSRLog`)
    //         .then((response) => {
    //             setsrLog(response.data);


    //         })
    //         .catch((err) => {
    //             console.log(err, "Unable to get user time info");
    //         });
    // }, [])
    function getUsersValue() {
        console.log("CHAT USERS", newchatUsers)
    }
    function onAddNewRoomOpen() {
        axios.get(`userList/userList`)
            .then((res) => {
                setuserList(res.data.filter(i => i.isUser == true))

                console.log(userList)



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`UserProfile`)
            .then((response) => {
                setUser(response.data)

                console.log(user)



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }
    const options = userList.map((option) => {
        const firstLetter = option.FullName[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    function onSubmitNewChat() {

        if (newchatUsers.length == 1) {
            newchatUsers.push(user)
            var newUserChats = JSON.stringify(newchatUsers);
            // var newMyUserChats= JSON.stringify(user);
            // var together = 
            var newUserChatsJSON = JSON.parse(newUserChats);
            // var newnewMyUserChatsJSON= JSON.parse(newMyUserChats);
            console.log("new User JSON", newUserChatsJSON)
            var newChat =
            {
                chatRoomName: 'newChatRoom',
                isGroupChat: false,
                rommcreatedDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
                lastMessage: "",
                users: newUserChats
            }
            axios.post('getchatRoom/addChatRoom', newChat,)
                .then(res => {
                    toast.success(`${"New Chat Created!"}`, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: 'dark'
                    });
                })
                .catch(err => {
                    console.log(err);
                })
            console.log("SINGLE", newChat)
            props.onHide();

        }
        else if (newchatUsers.length > 1) {
            newchatUsers.push(user)
            var newUserChats = JSON.stringify(newchatUsers);
            // var newMyUserChats= JSON.stringify(user);
            // var together = 
            var newUserChatsJSON = JSON.parse(newUserChats);
            // var newnewMyUserChatsJSON= JSON.parse(newMyUserChats);
            console.log("new User JSON", newUserChatsJSON)
            var newChat =
            {
                chatRoomName: chatroomname,
                isGroupChat: true,
                rommcreatedDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
                lastMessage: "",
                users: newUserChats
            }
            if(chatroomname !=""){
                axios.post('getchatRoom/addChatRoom', newChat,)
                .then(res => {
                    toast.success(`${"New Chat Created!"}`, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: 'dark'
                    });
                })
                .catch(err => {
                    console.log(err);
                })

                var testusers= newChat.push(user)

            console.log("MULTIPLE", JSON.parse(testusers))

            props.onHide();
            }
            else if(chatroomname ==""){
                toast.error(`${"Please Enter the Chatroom Name"}`, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 5000,
                            theme: 'dark'
                        });
            }
            
        }
        else {
            toast.error(`${"Please Select At Lease 1 User"}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                theme: 'dark'
            });

            console.log("NONE: SELECT USERS")
        }

        

    }



    return (
        <div className='RestockModal'>

            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width-Restock"
                contentClassName="modal-height-Restock"
                onShow={onAddNewRoomOpen}
                onHide={()=>{setchatroomname("");props.onHide();setnewchatUsers([]) }}
            >

                <Modal.Header closeButton>
                    Create A New Chat
                </Modal.Header>
                <Modal.Body>
                    <h6 className='Restock-update-header'>Create A New Chat: </h6>
                    <Form className="Restock-form-container" >

                        <div className='New-Room-Form'>
                            {newchatUsers.length < 1 || newchatUsers.length == 1 ?
                                (
                                    <Autocomplete
                                        multiple
                                        style={{ width: '100%' }}
                                        id="grouped-demo"
                                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                        onChange={(event, value) => { setnewchatUsers(value); getUsersValue() }}
                                        groupBy={(option) => option.firstLetter}
                                        getOptionLabel={(option) => <><img style={{ borderRadius: '50px', border: 'solid #4f86f6 2px', height: '30px', boxShadow: '0 25px 15px 0 rgb(0 0 0 / 15%);' }} src={'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + option.userPic}/><p style={{ marginLeft: '1rem', fontSize: '12px' }}>{option.FullName}</p></>}
                                        // sx={{ width: 500 }}
                                        renderInput={(params) => <TextField style={{ width: '100%' }} {...params} label="Search For Users ..." />}
                                        renderGroup={(params) => (
                                            <li>
                                                <GroupHeader>{params.group}</GroupHeader>
                                                <GroupItems>{params.children}</GroupItems>
                                            </li>
                                        )}
                                    />
                                )
                                :
                                (
                                    <><Autocomplete
                                        multiple
                                        style={{ width: '100%' }}
                                        id="grouped-demo"
                                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                        onChange={(event, value) => { setnewchatUsers(value); getUsersValue(); }}
                                        groupBy={(option) => option.firstLetter}
                                        getOptionLabel={(option) => <><img style={{ borderRadius: '50px', border: 'solid #4f86f6 2px', height: '30px', boxShadow: '0 25px 15px 0 rgb(0 0 0 / 15%);' }} src={'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + option.userPic} /><p style={{ marginLeft: '1rem', fontSize: '12px' }}>{option.FullName}</p></>}
                                        // sx={{ width: 500 }}
                                        renderInput={(params) => <TextField style={{ width: '100%' }} {...params} label="Search For Users ..." />}
                                        renderGroup={(params) => (
                                            <li>
                                                <GroupHeader>{params.group}</GroupHeader>
                                                <GroupItems>{params.children}</GroupItems>
                                            </li>
                                        )} />
                                        <Form.Label>Chat Name</Form.Label>
                                        <Form.Control
                                            defaultValue=""
                                            placeholder='Chat Name'
                                            className='chat-message-input'
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            onChange={(e) => setchatroomname(e.target.value)}
                                        />
                                    </>
                                )
                            }
                        </div>
                        <div className='submit-new-chat-container'>
                            <Button onClick={onSubmitNewChat}>Create New Chat</Button>
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
export default NewChatRoomModal