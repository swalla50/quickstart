import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faListCheck, faCheck, faCheckCircle, faTrashCan, faGrip, faList, faPencil, faPlus, faSave, faSquare, faSquareCheck, faXmark, faFileInvoice, faDollarSign, faFilePdf, faArrowCircleRight, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap'
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import './InvoiceModal.css'
import { EditableRow } from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import axios from 'axios';
import $ from 'jquery';
import jsPDF from 'jspdf';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Tooltip from 'react-bootstrap/Tooltip';
import { Mailer } from 'nodemailer-react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { MDBSelect } from 'mdb-react-ui-kit';
import defaultLogo from '../../assets/images/Default_Image_Thumbnail.png'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const nodemailer = require("nodemailer");



function InvoiceModal(props) {

    const [user, setUser] = useState([]);
    const [editInvoiceMode, seteditInvoiceMode] = useState(true);
    const [invoiceList, setinvoiceList] = useState([]);
    const [SenderName, setSenderName] = useState("");
    const [SenderPhone, setSenderPhone] = useState("");
    const [SenderEmail, setSenderEmail] = useState("");
    const [SenderAddress, setSenderAddress] = useState("");
    const [AdditionalNotes, setAdditionalNotes] = useState("");
    const [TotalCostInvoice, setTotalCostInvoice] = useState("");
    const [sendList, setsendList] = useState([]);
    const [userList, setuserList] = useState([]);
    const [Arr, setArr] = React.useState([]);

    useEffect(() => {
        axios.get(`UserProfile`)
            .then((res) => {
                setUser(res.data)




            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`userList/userList`)
            .then((res) => {
                setuserList(res.data)




            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
            
            

    }, []);







    // const popover = (
    //     <Popover show="true" defaultShow="true" id="popover-basic">
    //         <Popover.Header as="h3">Popover right</Popover.Header>
    //         <Popover.Body>
    //             And here's some <strong>amazing</strong> content. It's very engaging.
    //             right?
    //         </Popover.Body>
    //     </Popover>
    // );

    function previewFile(e) {
        e.preventDefault();
        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    // $(function () {
    //     $('#profile-image1').on('click', function (e) {

    //         $(document.getElementById('profile-image-upload')).click();
    //     });
    // });

    function clickImage() {
        $(function () {
            $('#profile-image1').on('click', function (e) {

                $(document.getElementById('profile-image-upload')).click();
            });
        });
    }
    const [invoiceData, setEditInvoiceData] = useState({
        InvoiceID: ""
    })


    function previewModeFalse(e) {
        e.preventDefault()
        seteditInvoiceMode(false);
        console.log("value", editInvoiceMode)
    }
    function previewModeTrue(e) {
        e.preventDefault()
        seteditInvoiceMode(true);
    }
    function handleInvoiceAdde() {
        setinvoiceList([...invoiceList, {
            InvoiceID: null,
            InvoiceItem: "",
            InvoicePrice: 0,
            InvoiceQuantity: 0,
            InvoiceTotalCost: 0,
            LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
        }])
        const formValues = {
            InvoiceID: null,
            InvoiceItem: "",
            InvoicePrice: 0,
            InvoiceQuantity: 0,
            InvoiceTotalCost: 0,
            LastModified: moment().format('YYYY-MM-DDTHH:mm:ss')
        }
        setEditInvoiceData(formValues);
        // handleEditClick(invList[invList.length - 1])
        seteditInvoiceMode(true);
        console.log("img data add", imgData)


    }

    function handleInvoiceRemove(index) {

        var array = [...invoiceList]
        console.log('array', array)

        if (index !== -1) {
            array.splice(index, 1);
            setinvoiceList(array);

        }
        // console.log("THESE VALUES", index, Arr)

    }
    // handleInvoiceChange(index){
    //     invoiceList[index].InvoiceItem
    // }
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(defaultLogo);
    const onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
            console.log("IMG Reader: ", reader)

        }
    };
    const [personName, setPersonName] = React.useState([]);
    const [Names, setNames] = useState([]);
    const handleChange = (event) => {
        const {
            target: { value }, target: { id }
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,

        );



        console.log("SEND", value)
    };
    // const [mailerState, setMailerState] = useState({
    //     name: "",
    //     email: "",
    //     message: "",
    // });


    const PrintPDF = async (e) => {
        e.preventDefault();
        var doc = new jsPDF("p", "pt", "a0");
        doc.page = 1;
        var totalPages = 1;
        var str = "Page " + doc.page + " of " + totalPages;
        doc.setFontSize(9);// optional
        doc.text(str, 250, doc.internal.pageSize.height - 10);
        doc.text("Confidential", 490, doc.internal.pageSize.height - 10);
        var pageCount = doc.internal.getNumberOfPages();
        doc.deletePage()
        doc.addImage(imgData, 'JPEG', 2380, 400, 180, 180);

        console.log('img DATA', doc, doc.internal.pageSize.getWidth());
        doc.html(document.querySelector('#content'), {
            callback: function (pdf) {
                // pdf.addImage(imgData, 'JPEG', 1300, 130, 150, 150);
                var pageCount = doc.internal.getNumberOfPages();
                pdf.deletePage(pageCount);
                pdf.setFontSize(6);
                pdf.save("Invoice.pdf");
            }
        });





        // for (var i = 0; i < personName.length; i++) {
        // console.log("SENT TO", personName[i])

        // transporter.sendMail(mailOptions, function (err, info) {
        //     if (err)
        //         console.log(err);
        //     else {
        //         console.log("EMAILSENT", info)
        //     }
        // })


        // }

    }
    const mailerState = {
        email: "stevenwallacejr@aol.com",
        name: "Steven",
        message: "Hello",
    }
    async function sendInvoiceEmail(e) {
        e.preventDefault();
        var doc = new jsPDF("p", "pt", "a0");
        doc.page = 1;
        var totalPages = 1;
        var str = "Page " + doc.page + " of " + totalPages;
        doc.setFontSize(9);// optional
        doc.text(str, 250, doc.internal.pageSize.height - 10);
        doc.text("Confidential", 490, doc.internal.pageSize.height - 10);
        var pageCount = doc.internal.getNumberOfPages();
        doc.deletePage(2)
        doc.deletePage(3)
        doc.addImage(imgData, 'JPEG', 2380, 400, 180, 180);

        console.log('img DATA', doc, doc.internal.pageSize.getWidth());
        doc.html(document.querySelector('#content'), {
            callback: async function (pdf) {
                // pdf.addImage(imgData, 'JPEG', 1300, 130, 150, 150);
                var pageCount = doc.internal.getNumberOfPages();
                pdf.deletePage(pageCount);
                pdf.setFontSize(6);
                // pdf.save("Invoice.pdf");
                const out = pdf.output('datauristring');
                for (var i = 0; i < personName.length; i++) {
                    const mailOptions = {
                        fromObject: 'Altbooks@gmail.com',
                        toObject: personName[i],
                        subjectObject: `${personName[i] + " - Altbooks Invoice"}`,
                        textObject: `<p>Attached is your invoice from: <br/>${user.FullName} <br/> Date: ${moment().format('MMMM Do YYYY, h:mm:ss a')}</p>`,
                        pdf: out.split('base64,')[1]
                    }
                    console.log("SENT TO", personName[i])

                    const response = await fetch("http://localhost:8000/sendMail", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({ mailOptions }),
                    })
                        .then((res) => {
                            res.json()
                            toast.success("Invoice Sent Successfully!", {
                                className: "export-Toast",
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 5000,
                                theme: 'dark'
                            });
                        })
                        .then((res) => {
                            const resData = res;
                            toast.success("Invoice Sent Successfully!", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 5000,
                                theme: 'dark'
                            });
                            console.log(resData);
                            if (resData.status === "success") {
                                console.log("Message Sent");
                            } else if (resData.status === "fail") {
                                console.log("Message failed to send");
                            }
                        })
                        ;


                }
                console.log("PDF Output", pdf.output('datauristring'));
            }
        })

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'srw130@gmail.com',
                pass: 'miami2002'
            }
        });




        // console.log("RESPONSEEE", JSON.parse(JSON.stringify(mailOptions)), response);

    }
    // console.log('invoice-list', invoiceList)
    // console.log("THESE VALUES", Arr)
    return (
        <div className='GL'>

            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width-invoice"
                contentClassName="modal-height-invoice"
                onHide={() =>{props.onHide();setPersonName([]);setAdditionalNotes("");setinvoiceList([]);setSenderName("");setSenderEmail("");setSenderPhone("");setSenderAddress("");setImgData(defaultLogo) }}
            >
                <ToastContainer />

                <Modal.Header closeButton>
                    <div className='invoice-header-container'>
                        Invoice <FontAwesomeIcon style={{ marginLeft: "1rem", marginTop: "5px" }} className="project-done-icon" icon={faFileInvoice} size='1x' />
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip defaultShow="true" style={{ fontSize: "15px" }} id="button-tooltip-2">This is where you can toggle between edit and preview mode. Once you are ready to generate the invoice, please go to the preview mode!!</Tooltip>}
                        >
                            {editInvoiceMode ?
                                (
                                    <>
                                        <button className='change-invoice-view' onClick={(e) => previewModeFalse(e)} style={{ background: 'linear-gradient(0deg, rgba(49,47,47,1) 0%, rgba(111,110,110,1) 100%);', color: 'white' }}>
                                            Preview Mode: <FontAwesomeIcon style={{ color: '#1dc71d' }} className="pdf-invoice-icon" icon={faCheckCircle} size='1x' />
                                        </button>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <button className='change-invoice-view' onClick={(e) => previewModeTrue(e)} style={{ background: 'linear-gradient(0deg, rgba(49,47,47,1) 0%, rgba(111,110,110,1) 100%);', color: 'white' }}>
                                            Preview Mode: <FontAwesomeIcon style={{ color: 'red' }} className="pdf-invoice-icon" icon={faXmarkCircle} size='1x' />
                                        </button>
                                        <FormControl sx={{ marginLeft: '1rem', width: 300 }}>
                                            <InputLabel id="demo-multiple-checkbox-label">Send To: </InputLabel>
                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={personName}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Send To: " />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {userList.map((name) => (
                                                    <MenuItem key={name.Email} value={name.Email}>
                                                        <Checkbox checked={personName.indexOf(name.Email) > -1} />
                                                        <ListItemText primary={name.FullName} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <button className='change-invoice-view' onClick={sendInvoiceEmail} style={{ background: 'linear-gradient(0deg, rgba(49,47,47,1) 0%, rgba(111,110,110,1) 100%);', color: 'white' }}>
                                            Send Invoice <FontAwesomeIcon className="pdf-invoice-icon" icon={faArrowCircleRight} size='1x' />
                                        </button>
                                    </>
                                )

                            }

                        </OverlayTrigger>
                        {!editInvoiceMode ? (<button onClick={(e) => PrintPDF(e)} className='btn btn-success btn-lg pdf-invoice-btn'>Export <FontAwesomeIcon className="pdf-invoice-icon" icon={faFilePdf} size='1x' /></button>) : (<div></div>)}

                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form className="invoice-table-container" id="content">

                        <h3 className='invoice-header'>{user.Comapny} Invoice</h3>




                        {editInvoiceMode ?
                            (
                                <>
                                    <div className='invoice-row1'>
                                        <div className='sender-info'>
                                            <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
                                            <input defaultValue={SenderName} onChange={(e) => setSenderName(e.target.value)} type="text" placeholder='Name' className='sender-info-input' />
                                            <input defaultValue={SenderEmail} onChange={(e) => setSenderEmail(e.target.value)} type="email" placeholder='Email' className='sender-info-input' />
                                            <input defaultValue={SenderPhone} onChange={(e) => setSenderPhone(e.target.value)} type="phone" placeholder='Phone' className='sender-info-input' />
                                            <input defaultValue={SenderAddress} onChange={(e) => setSenderAddress(e.target.value)} type="address" placeholder='Address' className='sender-info-input' />
                                        </div>
                                        <div onClick={clickImage} className='sender-logo1'>
                                            <input id="profile-image-upload" onChange={onChangePicture} type="file" className='hidden invoice-image-upload'>

                                            </input>
                                            <img id="profile-image1" className='sender-logo-img' src={imgData} />

                                        </div>
                                        {/* <div className="sender-logo">
                                            <img alt="User Pic" src="https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png" id="profile-image1" height="200"/>
                                                <input id="profile-image-upload" class="hidden" type="file" onchange="previewFile()"/>
                                                    <div style="color:#999;">  </div>

                                                </div> */}
                                    </div>

                                    <div className='invoice-row2'>
                                        <div className='add-invoice-btn-container'>
                                            <button className="add-invoice-btn" type="button" onClick={handleInvoiceAdde} >
                                                Add Invoice Item<FontAwesomeIcon className="project-done-icon" icon={faPlus} size='1x' />
                                            </button>
                                        </div>

                                        <table className='inventory table'>


                                            <thead>
                                                <tr className='inventory-table-headers'>
                                                    <th>
                                                        Item
                                                    </th>
                                                    <th>
                                                        Price
                                                    </th>
                                                    <th>
                                                        Quantity
                                                    </th>
                                                    <th>
                                                        Total Cost
                                                    </th>
                                                    <th>
                                                    </th>
                                                </tr>
                                            </thead>
                                            {invoiceList.map((item, index) => (
                                                <>
                                                    <tr id={item.InvoiceID} key={item.InvoiceID} class="content-bar">
                                                        <td >
                                                            <input defaultValue={invoiceList[index].InvoiceItem} className="invoice-edit-input" type='text' onChange={(e) => invoiceList[index].InvoiceItem = e.target.value} name='InvoiceItem'></input>
                                                        </td>
                                                        <td >
                                                            <FontAwesomeIcon className="project-done-icon" icon={faDollarSign} size='1x' /><input defaultValue={invoiceList[index].InvoicePrice} className="invoice-edit-input" type='number' onChange={(e) => { invoiceList[index].InvoicePrice = e.target.value; setTotalCostInvoice(e.target.value * invoiceList[index].InvoiceQuantity) }} step="0.01" min="0.00" name='InvoicePrice' />
                                                        </td>
                                                        <td >
                                                            <input defaultValue={invoiceList[index].InvoiceQuantity} className="invoice-edit-input" type='number' onChange={(e) => { invoiceList[index].InvoiceQuantity = e.target.value; setTotalCostInvoice(e.target.value * invoiceList[index].InvoicePrice) }} step="0.01" min="0.00" name='InvoiceQuantity' />
                                                        </td>
                                                        <td >
                                                            <FontAwesomeIcon defaultValue={invoiceList[index].InvoiceTotalCost} className="project-done-icon" icon={faDollarSign} size='1x' /> <input className="invoice-edit-input" readOnly type='number' value={(invoiceList[index].InvoiceTotalCost = invoiceList[index].InvoicePrice * invoiceList[index].InvoiceQuantity)} name='InvoiceTotalCost' />
                                                        </td>

                                                        <td className="btncontainer">
                                                            <button onClick={() => handleInvoiceRemove(index)} className="add-invoice-btn" type="button"  >
                                                                <FontAwesomeIcon className="invoice-delete-icon" icon={faTrashCan} size='1x' />
                                                            </button>

                                                        </td>

                                                    </tr>
                                                </>
                                            ))}
                                        </table>
                                        <div className='totalcost-final-container'>
                                            <h5 className='totalcost-final'>
                                                Total: $
                                            </h5>{invoiceList.reduce((prev, next) => prev + next.InvoiceTotalCost, 0)}
                                        </div>
                                        <h4 className='additional-notes-header'> Additional Notes</h4>
                                        <textarea defaultValue={AdditionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} className='invoice-additional-notes'></textarea>
                                    </div>
                                </>
                            )
                            :
                            (
                                <><div className='invoice-row1'>
                                    <div className='sender-info'>
                                        <p style={{ fontWeight: 'bold' }}>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
                                        <p type="text" placeholder='Name' className='sender-info-input'>{SenderName}</p>
                                        <p type="email" placeholder='Email' className='sender-info-input'>{SenderEmail}</p>
                                        <p type="phone" placeholder='Phone' className='sender-info-input'>{SenderPhone}</p>
                                        <p type="address" placeholder='Address' className='sender-info-input'>{SenderAddress}</p>
                                    </div>
                                    <div className='sender-logo'>
                                        <img id="profile-image1" className='sender-logo-img' src={imgData} />
                                    </div>
                                </div>
                                    <div className='invoice-row2'>
                                        <div className='add-invoice-btn-container'>

                                        </div>

                                        <table className='inventory table'>


                                            <thead>
                                                <tr className='inventory-table-headers'>
                                                    <th>
                                                        Item
                                                    </th>
                                                    <th>
                                                        Price
                                                    </th>
                                                    <th>
                                                        Quantity
                                                    </th>
                                                    <th>
                                                        Total Cost
                                                    </th>
                                                </tr>
                                            </thead>
                                            {invoiceList.map((item, index) => (
                                                <>
                                                    <tr id={item.InvoiceID} key={item.InvoiceID} class="content-bar">
                                                        <td>
                                                            <p className="invoice-edit-input" type='text' name='InvoiceItem'>{invoiceList[index].InvoiceItem}</p>
                                                        </td>
                                                        <td>
                                                            <FontAwesomeIcon className="project-done-icon" icon={faDollarSign} size='1x' /><p className="invoice-edit-input" type='number' name='InvoicePrice' >{invoiceList[index].InvoicePrice}</p>
                                                        </td>
                                                        <td>
                                                            <p className="invoice-edit-input" type='number' onChange={(e) => invoiceList[index].InvoiceQuantity = e.target.value} step="0.01" min="0.00" name='InvoiceQuantity' >{invoiceList[index].InvoiceQuantity}</p>
                                                        </td>
                                                        <td>
                                                            <FontAwesomeIcon className="project-done-icon" icon={faDollarSign} size='1x' /> <p className="invoice-edit-input" readOnly type='number' name='InvoiceTotalCost'>{invoiceList[index].InvoiceTotalCost = invoiceList[index].InvoicePrice * invoiceList[index].InvoiceQuantity}</p>
                                                        </td>

                                                    </tr>
                                                </>
                                            ))}
                                        </table>
                                        <div className='totalcost-final-container'>
                                            <h5 className='totalcost-final'>
                                                Total: $
                                            </h5>{invoiceList.reduce((prev, next) => prev + next.InvoiceTotalCost, 0)}
                                        </div>
                                        <h4 className='additional-notes-header'> Additional Notes</h4>
                                        <p value={AdditionalNotes} className='invoice-additional-notes'>{AdditionalNotes}</p>

                                    </div>

                                </>

                            )
                        }
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() =>{props.onHide();setPersonName([]);setAdditionalNotes("");setinvoiceList([]);setSenderName("");setSenderEmail("");setSenderPhone("");setSenderAddress("");setImgData(defaultLogo) }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default InvoiceModal