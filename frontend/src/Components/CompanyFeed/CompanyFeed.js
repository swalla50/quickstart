import { faMailForward, faMessage, faPaperPlane, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './CompanyFeed.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import AddCompanyModal from './AddCompanyModal'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function CompanyFeed() {

    const [feedList, setfeedList] = useState([]);
    const [commentList, setcommentList] = useState([]);
    const [user, setUser] = useState([]);
    const [replyMessage, setreplyMessage] = useState("");
    const [postModal, setPostModal] = useState(false);

    //Pulls in Feed
    useEffect(() => {
        axios.get(`getCP/getCPFeed`)
            .then((response) => {
                setfeedList(response.data.filter(item => item.isActive === true));
                console.log("FEED:", response.data)
            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`getComment/getComment`)
            .then((res) => {
                setcommentList(res.data);
                console.log("COMMENTS:", res.data)
            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`UserProfile`)
            .then((res) => {
                setUser(res.data)





            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

    }, []);

    function CommentType({ items }) {
        if (items.Id == user.MyUserId) {
            return (
                <div className='my-comment-content-container'>
                    <div className='comment-header'>
                        <img className='comment-profile-pic' src={items.postreplyUserPic} style={{ height: '20px', width: '20px', borderRadius: '50px', marginRight: '1rem' }} />
                        <h6 className='commenter'>{items.FullName}</h6>
                    </div>
                    <div className='comment-content'>
                        <p className='my-comment-text'>
                            {items.commenttext}
                        </p>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='comment-content-container'>
                    <div className='comment-header'>
                        <img className='comment-profile-pic' src={items.postreplyUserPic} style={{ height: '20px', width: '20px', borderRadius: '50px', marginRight: '1rem' }} />
                        <h6 className='commenter'>{items.FullName}</h6>
                    </div>
                    <div className='comment-content'>
                        <p className='comment-text'>
                            {items.commenttext}
                        </p>
                    </div>
                </div>
            )
        }
    }

    //Opens Comments
    function CustomToggle({ children, eventKey, callback }) {
        const decoratedOnClick = useAccordionButton(
            eventKey,
            () => callback && callback(eventKey),
        );
        return (
            <button
                type="button"
                style={{ backgroundColor: 'transparent', height: '10px', border: 'none', color: 'white', width: '100%' }}
                onClick={decoratedOnClick}
            >
                {children}
            </button>
        );
    }


    //Opens Replies
    function CustomReplyToggle({ children, eventKey, callback }) {
        const decoratedOnClick = useAccordionButton(
            eventKey,
            () => callback && callback(eventKey),
        );
        return (
            <button
                type="button"
                style={{ backgroundColor: 'transparent', height: '20px', border: 'none', color: 'white', width: '80px', background: '#4f86f6', borderRadius: '10px', fontSize: '13px' }}
                onClick={decoratedOnClick}
            >
                {children}
            </button>
        );
    }

    //Refreshes comments
    function refreshComment() {
        axios.get(`getComment/getComment`)
            .then((res) => {
                setcommentList(res.data);
                console.log("COMMENTS:", res.data)
            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }
    //Refreshes posts
    function refreshPost() {
        axios.get(`getCP/getCPFeed`)
            .then((response) => {
                setfeedList(response.data.filter(item => item.isActive === true));
            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }
    //Reply Data Sent Function
    /* public int cfId { get; set; }
        public string FullName { get; set; }
        public string postMessage { get; set; }
        public string postImage { get; set; }
        public string postTime { get; set; }
        public string postSubject { get; set; }
        public string postUserPic { get; set; }
    */
    const sendReply = (postid) => {
        const replyDataSent = {
            parentcommentid: postid,
            FullName: user.FullName,
            postreplyUserPic: `${'https://webapi20220126203702.azurewebsites.net/Images/' + user.userPic}`,
            commenttext: replyMessage,
            Id: user.MyUserId
        }
        axios.post('AddComment/addCommentitem', replyDataSent,)
            .then(res => {
                console.log('NEW REPLY', res.data)


                toast.success(`${"Comment added to post!"}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: 'dark'
                });
                refreshComment();
            })
            .catch(err => {
                console.log(err);
            })
        setreplyMessage("");
        refreshComment();
    }

    function deletePost(id) {
        const deletedPost = {
            cfId: id,
            isActive: 0
        }
        axios.put('AddCP/deleteCPitem', deletedPost,)
            .then(res => {
                console.log('NEW DELETE', res.data)

                refreshPost();
            })
            .catch(err => {
                console.log(err);
            })
        toast.error(`${"Deleted your post."}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: 'dark'
        });
        refreshPost();
    }
    function handleshowpost() {
        setPostModal(false);
        refreshPost();
    }
    //onmessagereplychange
    const onMessgeReplyChange = (e) => {
        setreplyMessage(e);
    }

    return (
        <div className='company-feed'>
            <div className='add-project-container'>
                <h3 className='company-feed-title'> Feed </h3> <FontAwesomeIcon onClick={() => setPostModal(true)} className="new-post-add-icon" icon={faPlus} size='2x' />
            </div>
            <div className='feed-list-container'>
                {feedList.map((item) => (

                    <div>
                        <div id={item.cfId} key={item.cfId} className='post-container'>
                            <div className='post-header'>
                                <div className='user-photo'>
                                    <img className='post-profile-pic' src={item.postUserPic} style={{ height: '60px', width: '60px', borderRadius: '50px' }} />
                                </div><div className='user-name'>
                                    {item.FullName}
                                </div>
                                <DropdownButton menuVariant="dark" className='post-option-dropdown' id="dropdown-item-buttonpost" title=". . .">
                                    <Dropdown.Item style={{ color: 'white' }} onClick={() => deletePost(item.cfId)} className="delete-post-btn" as="button">Delete  <FontAwesomeIcon style={{ color: 'white' }} className="delete-post-icon" icon={faTrashCan} size='1x' /></Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <div className='post-content-container'>
                                <h4 className='post-title'>
                                    {item.postSubject}
                                </h4>
                                <p className='post-message'>
                                    {item.postMessage}
                                </p>

                            </div>
                            <p className='post-date-time'>
                                {item.postTime}
                            </p>
                        </div>
                        <Accordion defaultActiveKey="0">
                            <div className='post-comments'>
                                <Card.Header className='post-comment-header' style={{ borderRadius: '0px 0px 5px 5px' }}>
                                    <CustomToggle eventKey="1">Comments <FontAwesomeIcon className="project-done-icon" icon={faCommentAlt} size='1x' /></CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">

                                    <Card.Body className='post-comment-container'>
                                        {commentList.filter(items => items.parentcommentid == item.cfId).map(items => (
                                            <CommentType items={items}></CommentType>
                                        )
                                        )}
                                        <Accordion defaultActiveKey="1">
                                            <div className='reply-comments'>
                                                <Card.Header className='reply-comment-header'>
                                                    <CustomReplyToggle eventKey="0">Reply<FontAwesomeIcon className="reply-btn-icon" icon={faMailForward} size='1x' /></CustomReplyToggle>
                                                </Card.Header>
                                                <Accordion.Collapse style={{ padding: '0px' }} eventKey="0">

                                                    <Card.Body className='reply-comment-container'>

                                                        <textarea onChange={(e) => onMessgeReplyChange(e.target.value)} value={replyMessage} className='reply-text'></textarea>
                                                        <button onClick={(element) => { sendReply(element.target.id); refreshComment(); }} id={item.cfId} className='reply-submit-btn'>Send <FontAwesomeIcon className="reply-btn-icon" icon={faPaperPlane} size='1x' /></button>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </div>
                                        </Accordion>
                                    </Card.Body>

                                </Accordion.Collapse>
                            </div>

                        </Accordion>
                    </div>
                ))}

            </div>
            <AddCompanyModal id="inventory-modal-modal"
                show={postModal}
                onHide={handleshowpost}
            />
        </div>
    )
}

export default CompanyFeed