import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { darken, lighten, styled } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, InputGroup, Form } from 'react-bootstrap'
import './ChatModal.css'
import NewChatRoomModal from './NewChatRoomModal';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import moment from 'moment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { io } from 'socket.io-client';
import Lottie from 'react-lottie-player'
import animationData from "../../assets/animations/4600-typing-status.json";


function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


function ChatModal(props) {
    // const [open, setOpen] = React.useState(false);
    // // const [options, setOptions] = React.useState([]);
    // const loading = open && options.length === 0;
    const [userList, setuserList] = useState([]);
    const [chatRooms, setchatRooms] = useState([]);
    const [user, setUser] = useState([]);
    const [Messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState([]);
    const [chatReceiver, setchatReceiver] = useState("");
    const [isGroupChat, setisGroupChat] = useState("");
    const [newChatModal, setnewChatModal] = useState(false);
    const [sentContent, setsentContent] = useState("");
    const [contextMenu, setContextMenu] = React.useState(null);
    const [editedMessage, seteditedMessage] = useState("");
    const [selectedMessage, setselectedMessage] = useState([]);
    const messagesEndRef = useRef(null);
    const [socketConnected, setsocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    //Socket IO
    const ENDPOINT = "http://localhost:8000"
    var socket, selectedChatCompare;



    var chatRoomss;
    var nestedUser = [];
    var listoUserId = [];

    // const GroupHeader = styled('div')(({ theme }) => ({
    //     textAlign: 'left',
    //     position: 'sticky',
    //     top: '-8px',
    //     padding: '4px 10px',
    //     color: 'white',
    //     background: '#4f86f6'

    // }));

    // const GroupItems = styled('ul')({
    //     padding: 0,
    // });

    //Socket UseEffect
    useEffect(() => {
        axios.get(`UserProfile`)
            .then((response) => {
                setUser(response.data)

                // console.log(user)
                // console.log("SOCKET USER", response.data)
                socket = io(ENDPOINT, { transports: ["websocket", "polling"] });
                socket.emit("setup", response.data);

                socket.on('connected', () => setsocketConnected(true));

                socket.on("typing", () => setIsTyping(true));

                socket.on("stop typing", () => setIsTyping(false));
                socket.on('typing received', (newMessageReceived) => {
                    if (newMessageReceived.chatRoomId != selectedChat.chatRoomId) return;
                    if (newMessageReceived.chatRoomId == selectedChat.chatRoomId) {
                        setIsTyping(true);
                        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }
                })
                socket.on('stop typing received', (newMessageReceived) => {
                    if (newMessageReceived.chatRoomId != selectedChat.chatRoomId) return;
                    if (newMessageReceived.chatRoomId == selectedChat.chatRoomId) {
                        setIsTyping(false);
                    }
                })

                // console.log("IS TYPING", istyping)
                selectedChatCompare = selectedChat

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

    }, [selectedChat]);

    // useEffect(() => {
    //     socket = io(ENDPOINT, { transports: ["websocket", "polling"] });
    //     return (() => {
    //         socket.on('typing received', (newMessageReceived) => {

    //             setIsTyping(newMessageReceived);
    //             messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    //         })
    //     })
    // })
    // useEffect(() => {
    //     socket = io(ENDPOINT, { transports: ["websocket", "polling"] });
    //     return (() => {
    //         socket.on('stop typing received', (newMessageReceived) => {

    //             setIsTyping(newMessageReceived);
    //             messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    //         })
    //     })
    // })
    useEffect(() => {
        setchatRooms([])
        axios.get(`userList/userList`)
            .then((res) => {
                setuserList(res.data)

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
        axios.get(`/getChatRoom/getChatRoom`)
            .then((res) => {

                for (var i = 0; res.data.length; i++) {
                    res.data[i].users = JSON.parse(res.data[i].users)
                    listoUserId.push(res.data[i].users.map((item) => item.myUserId))
                    // console.log("listOUSERS1:", i, res.data[0])

                    if (listoUserId[i].includes(user.myUserId)) {
                        // console.log("DATAAAA:", res.data[i])
                        // nestedUser = res.data[i].users
                        chatRooms.push(res.data[i])
                        // console.log("NESTED", nestedUser)
                        // for (var j = 0; nestedUser.length; j++) {
                        //     if (nestedUser[j].myUserId == user.myUserId) {
                        //         res.data.users = nestedUser[j]


                        //     }
                    }
                    // console.log("JSON USER", res.data)
                    // }

                }





            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });




    }, []);

    // Fetch Message UseEffect
    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat
        // console.log("Compare", selectedChatCompare)

    }, [selectedChat])
    useEffect(() => {
        socket = io(ENDPOINT, { transports: ["websocket", "polling"] });
        return (() => {
            socket.on('message received', (newMessageReceived) => {
                // console.log("COMPARED CHAT", newMessageReceived)
                if (selectedChatCompare == "") {
                    //give notification
                    toast.error(`${"Not Matching"}`, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: 'dark'
                    });
                }
                else {
                    fetchMessages();
                    setMessages([...Messages, newMessageReceived]);
                    messagesEndRef.current?.scrollIntoView();
                }
            })
        })
    })
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [Messages, selectedChat])


    function handleNewChatRoom() {
        setnewChatModal(false)
        axios.get(`userList/userList`)
            .then((res) => {
                setuserList(res.data)

                // console.log(userList)



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`UserProfile`)
            .then((response) => {
                setUser(response.data)

                // console.log(user)



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`/getChatRoom/getChatRoom`)
            .then((res) => {

                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].users = JSON.parse(res.data[i].users)
                    listoUserId.push(res.data[i].users.map((item) => item.myUserId))
                    // console.log("listOUSERS2:", i, listoUserId[i])

                    if (listoUserId[i].includes(user.myUserId)) {
                        // console.log("DATAAAA:", res.data[i])

                        // nestedUser = res.data[i].users
                        chatRooms.push(res.data[i])
                        // console.log("NESTED", nestedUser)
                        // for (var j = 0; nestedUser.length; j++) {
                        //     if (nestedUser[j].myUserId == user.myUserId) {
                        //         res.data.users = nestedUser[j]


                        //     }
                    }
                    // console.log("JSON USER", res.data)
                    // }

                }





            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

    }
    function removeChats() {

        setchatRooms([]);

    }

    function openChatModal() {
        axios.get(`userList/userList`)
            .then((res) => {
                setuserList(res.data)

                // console.log(userList)



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`UserProfile`)
            .then((response) => {
                setUser(response.data)

                // console.log(user)



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`/getChatRoom/getChatRoom`)
            .then((res) => {

                for (var i = 0; res.data.length; i++) {
                    res.data[i].users = JSON.parse(res.data[i].users)
                    listoUserId.push(res.data[i].users.map((item) => item.myUserId))
                    // console.log("listOUSERS2:", i, listoUserId[i])

                    if (listoUserId[i].includes(user.myUserId)) {
                        // console.log("DATAAAA:", res.data[i])

                        // nestedUser = res.data[i].users
                        chatRooms.push(res.data[i])
                        // console.log("NESTED", nestedUser)
                        // for (var j = 0; nestedUser.length; j++) {
                        //     if (nestedUser[j].myUserId == user.myUserId) {
                        //         res.data.users = nestedUser[j]


                        //     }
                    }
                    // console.log("JSON USER", res.data)
                    // }

                }





            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });


    };

     function fetchMessages() {
        if (!selectedChat) return;
        try {

            socket = io(ENDPOINT, { transports: ["websocket", "polling"] });
            axios.get(`${"getChat/getChat/" + selectedChat.chatRoomId}`)
            .then((response) => {
                for (var i = 0; i < response.data.length; i++) {
                    response.data[i].users = JSON.parse(response.data[i].users)
                }
                setMessages(response.data)
    
                socket.emit('join chat', selectedChat)
                // console.log(data)
                // console.log("selected CHAT", selectedChat)



            })
           
            // const { data } =  axios.get(`${"getChat/getChat/" + selectedChat.chatRoomId}`);
            // for (var i = 0; i < data.length; i++) {
            //     data[i].users = JSON.parse(data[i].users)
            // }
            // setMessages(data)
            // console.log("FETCH Data",data)

            // socket.emit('join chat', selectedChat)
            // // console.log(data)
            // // console.log("selected CHAT", selectedChat)

        }
        catch {
            console.log('no chat to get error')
        }
    }

    async function sendChat(e) {

        var newUserChats = JSON.stringify(selectedChat.users);
        var message = {
            chatRoomId: e.chatRoomId,
            content: sentContent,
            timeSent: moment().format('YYYY-MM-DDTHH:mm:ss'),
            receiverId: user.myUserId,
            users: newUserChats,
            receiverPic: user.userPic,
            receiverName: user.FullName
        }
        var chatroomLastMessage = {
            chatRoomId: e.chatRoomId,
            lastMessage: sentContent
        }

        await axios.post('SendMessage/AddMessage', message)
            .then(res => {
                toast.success(`${"Message Sent!"}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: 'dark'
                });
            })
            .catch(err => {
                console.log(err);
            })

        await axios.put('GetChatRoom/updateLastMessage', chatroomLastMessage)
            .then(res => {

            })
            .catch(err => {
                console.log(err);
            })
        const { data } = await axios.get(`${"getChat/getChat/" + selectedChat.chatRoomId}`);
        setMessages(data)

        // const { roomData } = await axios.get(`/getChatRoom/getChatRoom`);

        // var ROOMS = [];
        // for (var i = 0; roomData.length; i++) {
        //     roomData[i].users = JSON.parse(roomData[i].users)
        //     listoUserId.push(roomData[i].users.map((item) => item.myUserId))
        //     console.log("listOUSERS1:", i, roomData[0])

        //     if (listoUserId[i].includes(user.myUserId)) {
        //         console.log("DATAAAA:", roomData[i])
        //         // nestedUser = res.data[i].users
        //         ROOMS.push(roomData[i])
        //         // console.log("NESTED", nestedUser)
        //         // for (var j = 0; nestedUser.length; j++) {
        //         //     if (nestedUser[j].myUserId == user.myUserId) {
        //         //         res.data.users = nestedUser[j]


        //         //     }
        //     }
        //     console.log("JSON USER", ROOMS)
        //     // }

        // }
        // setchatRooms(ROOMS);




        var newUserChatsJSON = JSON.parse(newUserChats);
        var iomessage = {
            chatRoomId: e.chatRoomId,
            content: sentContent,
            timeSent: moment().format('YYYY-MM-DDTHH:mm:ss'),
            receiverId: user.myUserId,
            users: newUserChatsJSON,
            receiverPic: user.userPic,
            receiverName: user.FullName
        }
        socket = io(ENDPOINT, { transports: ["websocket", "polling"] });
        socket.emit('new message', iomessage)
        // setMessages([...Messages, iomessage])

        setsentContent("");
        console.log("NEW MESSAGE", message)

    }


    // const options = userList.map((option) => {
    //     const firstLetter = option.FullName[0].toUpperCase();
    //     return {
    //         firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    //         ...option,
    //     };
    // });
    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                // Other native context menus might behave different.
                // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };


    const editMessage = (e) => {
        var newMessage = {
            messageId: selectedMessage,
            message: editedMessage
        }
        console.log("EDITED MESSAGE", selectedMessage)
    }
    function timeoutFunction() {
        var iomessage = {
            chatRoomId: selectedChat.chatRoomId,
            content: sentContent,
            timeSent: moment().format('YYYY-MM-DDTHH:mm:ss'),
            receiverId: user.myUserId,
            users: selectedChat.users,
            receiverPic: user.userPic,
            receiverName: user.FullName
        }
        setTyping(false);
        socket.emit("stop typing", iomessage);
    }
    var timeout = undefined;
    const typingHandler = (e) => {
        clearTimeout(timeout);
        setsentContent(e.target.value);
        var iomessage = {
            chatRoomId: selectedChat.chatRoomId,
            content: sentContent,
            timeSent: moment().format('YYYY-MM-DDTHH:mm:ss'),
            receiverId: user.myUserId,
            users: selectedChat.users,
            receiverPic: user.userPic,
            receiverName: user.FullName
        }

        if (!socketConnected) return;

        else if (typing == false) {
            setTyping(true);
            socket.emit("typing", iomessage);

            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        else {


            timeout = setTimeout(timeoutFunction, 5000);
            console.log("time", timeout)
        }
    };
    return (
        <><Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-width"
            contentClassName="modal-height"
            onShow={openChatModal}
            onHide={() => { props.onHide(); removeChats(); }}
        >
            <ToastContainer />

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Direct Messages
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='Messages-Container'>
                    <div className='Available-Chats-Container'>
                        {/* <Autocomplete
        id="grouped-demo"
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => <><img style={{ borderRadius: '50px', border: 'solid #4f86f6 2px', height: '30px', boxShadow: '0 25px 15px 0 rgb(0 0 0 / 15%);' }} src={`${"https://webapi20220126203702.azurewebsites.net/Images/" + option.userPic}`} /><p style={{ marginLeft: '1rem', fontSize: '12px' }}>{option.FullName}</p></>}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search For Users ..." />}
        renderGroup={(params) => (
            <li>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
            </li>
        )}
    /> */}
                        <Button className='Add-New-Chat-btn' onClick={() => setnewChatModal(true)}> Add New Chat</Button>
                        <ul style={{ margin: 'none' }} className='chatRoom-container'>
                            {chatRooms.map((item, index) => (
                                <li style={item.chatRoomId == selectedChat.chatRoomId ? ({ background: 'rgb(11 42 74)' }) : ({ background: 'rgb(77, 166, 255)' })} onClick={() => { setchatReceiver(item.users.filter((i) => i.myUserId != user.myUserId).map((item) => item)); setisGroupChat(item.isGroupChat); setSelectedChat(item); fetchMessages(); }} className='ChatRoom-Item'>
                                    <div className='receiver-room-name'>
                                        {item.isGroupChat == false ?
                                            (
                                                <><img className='user-chatroom-pic' style={{ borderRadius: '50px', border: 'solid #4f86f6 2px', height: '40px', boxShadow: '0 25px 15px 0 rgb(0 0 0 / 15%);' }} src={`${"https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=" + item.users.filter((i) => i.myUserId != user.myUserId).map((item) => item.userPic)}`} />{item.users.filter((i) => i.myUserId != user.myUserId).map((item) => item.FullName)}</>
                                            )
                                            :
                                            (
                                                <><div style={{ marginLeft: '1rem' }}>{item.chatRoomName}</div><div className="userListPics">
                                                    {item.users.map((items) => (
                                                        <img style={{ borderRadius: '50px', border: 'solid #4f86f6 2px', height: '40px', boxShadow: '0 25px 15px 0 rgb(0 0 0 / 15%);' }} src={`${"https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=" + items.userPic}`} />
                                                    ))}
                                                </div></>
                                            )
                                        }

                                        <div className='last-message'>
                                            <p style={item.chatRoomId == selectedChat.chatRoomId ? ({ color: 'azure', fontStyle: 'italic' }) : ({ color: 'gray', fontStyle: 'italic' })} className='lastMessage-content'>{item.lastMessage}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='Chat-Messages-Container'>
                        <div className='upper-display-messages'>
                            {Messages != "" ?
                                (
                                    <>
                                        {isGroupChat == false ? (<h4 style={{ height: '60px', background: 'linear-gradient(0deg, rgba(49,47,47,1) 0%, rgba(111,110,110,1) 100%)', color: 'white' }} className='Receiver-Name-Heading'><img style={{ borderRadius: '50px', border: 'solid #4f86f6 2px', height: '50px', boxShadow: '0 25px 15px 0 rgb(0 0 0 / 15%);' }} src={`${"https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=" + chatReceiver[0].userPic}`} /> {chatReceiver[0].FullName}</h4>) : (< h4  className='Receiver-Name-Heading' style={{ height: '60px', background: 'linear-gradient(0deg, rgba(49,47,47,1) 0%, rgba(111,110,110,1) 100%)', color: 'white' }}>{selectedChat.chatRoomName}</h4>)}
                                        <ul className='message-list'>
                                            {Messages.map((item, index) => (
                                                <>
                                                    {item.receiverId == user.myUserId ?
                                                        (
                                                            <div style={item.receiverId == user.myUserId ? ({ textAlign: '-webkit-right' }) : ({ textAlign: '-webkit-left' })} className='message-container-container'>
                                                                <li onContextMenu={handleContextMenu} style={item.receiverId == user.myUserId ? ({ borderRadius: '50px 50px 0px 50px', display: 'inline-flex', background: 'transparent', color: 'black' }) : ({ borderRadius: '50px 50px 50px 0px', display: 'inline-flex', background: 'transparent', color: 'black' })} className='message-item'>
                                                                    <div className='message-content-wrapper'>

                                                                        <div className='chat-message-content'>
                                                                            <p className='message-sender-receiver-name'>{item.receiverName}</p>
                                                                            <div style={{ background: '#0f3d9bf5', color: 'white', padding: '2rem', borderRadius: '50px' }}>
                                                                                <div className='message-content-container'>{item.content}</div>
                                                                                <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'white' }}>{moment(item.timeSent).format('LLL')}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div style={item.receiverId == user.myUserId ? ({ textAlign: 'right' }) : ({ textAlign: 'left' })} className='chat-user-info'>
                                                                            {item.receiverId == user.myUserId ? (<><img style={{ marginLeft: '1rem', borderRadius: '50px', height: '30px' }} src={`${"https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=" + item.receiverPic}`} /></>) : (<><img style={{ marginRight: '1rem', borderRadius: '50px', height: '30px', boxShadow: '0 25px 15px 0 rgb(0 0 0 / 15%);' }} src={`${"https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=" + item.receiverPic}`} /></>)}
                                                                        </div>
                                                                        <Menu
                                                                            open={contextMenu !== null}
                                                                            onClose={handleClose}
                                                                            anchorReference="anchorPosition"
                                                                            anchorPosition={contextMenu !== null
                                                                                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                                                                : undefined}
                                                                            onShow={() => setselectedMessage(Messages[index])}
                                                                        >
                                                                            <MenuItem onClick={() => { handleClose(); editMessage(item); }}>Copy</MenuItem>
                                                                            <MenuItem onClick={handleClose}>Print</MenuItem>
                                                                            <MenuItem onClick={handleClose}>Highlight</MenuItem>
                                                                            <MenuItem onClick={handleClose}>Email</MenuItem>
                                                                        </Menu>
                                                                    </div>
                                                                </li>
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div style={item.receiverId == user.myUserId ? ({ textAlign: '-webkit-right' }) : ({ textAlign: '-webkit-left' })} className='message-container-container'>
                                                                <li onContextMenu={handleContextMenu} style={item.receiverId == user.myUserId ? ({ borderRadius: '50px 50px 0px 50px', display: 'inline-flex', background: 'transparent', color: 'black' }) : ({ borderRadius: '50px 50px 50px 0px', display: 'inline-flex', background: 'transparent', color: 'black' })} className='message-item'>
                                                                    <div className='message-content-wrapper'>
                                                                        <div style={item.receiverId == user.myUserId ? ({ textAlign: 'right' }) : ({ textAlign: 'left' })} className='chat-user-info'>
                                                                            {item.receiverId == user.myUserId ? (<><img style={{ marginLeft: '1rem', borderRadius: '50px', height: '30px', boxShadow: '0 25px 15px 0 rgb(0 0 0 / 15%);' }} src={`${"https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=" + item.receiverPic}`} /></>) : (<><img style={{ marginRight: '1rem', borderRadius: '50px', height: '30px', boxShadow: '0 25px 15px 0 rgb(0 0 0 / 15%);' }} src={`${"https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=" + item.receiverPic}`} /></>)}
                                                                        </div>
                                                                        <div className='chat-message-content'>
                                                                            <p className='message-sender-receiver-name'>{item.receiverName}</p>
                                                                            <div style={{ background: '#4da6ff', color: 'white', padding: '2rem', borderRadius: '50px' }} >
                                                                                <div className='message-content-container'>{item.content}</div>
                                                                                <p style={{ fontSize: '10px', fontStyle: 'italic', color: 'white' }}>{moment(item.timeSent).format('LLL')}</p>
                                                                            </div>
                                                                        </div>
                                                                        <Menu
                                                                            open={contextMenu !== null}
                                                                            onClose={handleClose}
                                                                            anchorReference="anchorPosition"
                                                                            anchorPosition={contextMenu !== null
                                                                                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                                                                : undefined}
                                                                            onShow={() => setselectedMessage(Messages[index])}
                                                                        >
                                                                            <MenuItem onClick={() => { handleClose(); editMessage(item); }}>Copy</MenuItem>
                                                                            <MenuItem onClick={handleClose}>Print</MenuItem>
                                                                            <MenuItem onClick={handleClose}>Highlight</MenuItem>
                                                                            <MenuItem onClick={handleClose}>Email</MenuItem>
                                                                        </Menu>
                                                                    </div>
                                                                </li>
                                                            </div>
                                                        )
                                                    }

                                                </>

                                            ))}
                                            {istyping ?
                                                (
                                                    <div className='typing-animation-container' ref={messagesEndRef}>
                                                        <Lottie
                                                            loop
                                                            className='typing-animation-object'
                                                            animationData={animationData}
                                                            play
                                                            style={{ width: 50 }}
                                                        />
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div ref={messagesEndRef}></div>
                                                )
                                            }
                                        </ul>

                                    </>
                                )
                                :
                                (
                                    <div className='no-messsage-container'>
                                        <FontAwesomeIcon className="no-message-icon" icon={faMailBulk} size='10x' />
                                        <h2 className='no-message-message'>No Messages Selected or Create a New Conversation!</h2>
                                    </div>

                                )}
                        </div>
                        <div className='text-box-message-container'>
                            {selectedChat == "" ?

                                (
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            disabled placeholder='Choose a conversation or Create a new chat ....'
                                            className='chat-message-input'
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2" />
                                        <Button className='send-chat-btn' variant="outline-secondary" id="button-addon2">
                                            Send
                                        </Button>
                                    </InputGroup>

                                )
                                :
                                (
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder='Type You Message Here ....'
                                            className='chat-message-input'
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={sentContent}
                                            onChange={typingHandler}
                                        />
                                        <Button onClick={() => sendChat(selectedChat)} className='send-chat-btn' variant="outline-secondary" id="button-addon2">
                                            Send
                                        </Button>
                                    </InputGroup>


                                )}

                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal>
        <NewChatRoomModal id="inventory-modal-modal"
            show={newChatModal}
            onHide={handleNewChatRoom} />
        </>
    )
}

export default ChatModal