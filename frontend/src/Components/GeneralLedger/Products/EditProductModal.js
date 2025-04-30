import React, { useState, useEffect } from 'react'
import { faBriefcase, faMoneyBill1Wave, faBuildingColumns, faReceipt, faClock, faPlus, faCheckCircle, faXmark, faBoxesPacking, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Modal, Tab, Tabs } from 'react-bootstrap';
import $ from 'jquery'
import moment from 'moment';
function EditProductModal(props) {
    const [defaultLogo, setdefaultLogo] = useState("");
    const [user, setUser] = useState([]);
    const [imgData, setImgData] = useState(defaultLogo);
    const [companylist, setcompanylist] = useState([]);
    const [Photo, setPhoto] = useState();
    const [PhotoName, setPhotoName] = useState("");
    const [picture, setPicture] = useState(null);
    const [prodCost, setprodCost] = useState("");
    const [prodName, setprodName] = useState("");
    // const [prodNum, setprodNum] = useState("");
    const [prodDescription, setprodDescription] = useState("");
    const [prodSN, setprodSN] = useState("");
    const [prodVendor, setprodVendor] = useState("");

    useEffect(() => {
        axios.get(`getvendor/getvendorList2`)
            .then((response) => {
                setcompanylist(response.data.filter(ven => ven.isActiveVendor == true && (ven.isCompany == true || ven.isVendor == true)))
                setImgData('https://webapi20220126203702.azurewebsites.net/api/BlobExplorerProduct/GetBlobFile?url=' + props.product.inventoryImage)
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
        axios.get(`UserProfile`)
            .then((res) => {
                setUser(res.data)


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        setprodCost(props.product.InventoryCost)
        setprodName(props.product.InventoryName)
        setprodDescription(props.product.InventoryDescription)
        setprodSN(props.product.InventorySerialNumber)
        setprodVendor(props.product.Vendor)





    }, [props.show])

    function clickImage() {
        $(function () {
            $('#profile-image1').on('click', function (e) {

                $(document.getElementById('profile-image-upload')).click();
            });
        });
    }
    const onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            setPhoto(e.target.files[0]);
            setPhotoName(e.target.files[0].name);
            reader.readAsDataURL(e.target.files[0]);
            // console.log("IMG Reader: ", e.target.files)

        }
    };

    function submitProductChange() {
        console.log(Photo);
        const formData = new FormData();
        formData.append("formFile", Photo);
        formData.append("fileName", PhotoName);
        axios.post("https://webapi20220126203702.azurewebsites.net/api/BlobExplorerProduct/UploadBlobFileProduct", formData)
            .then(res => {

                const updatedProduct = {
                    InventoryName: prodName,
                    InventoryCost: prodCost,
                    InventoryDescription: prodDescription,
                    InventorySerialNumber: prodSN,
                    LastModified: moment().format('YYYY-MM-DDTHH:mm:ss'),
                    LastModifiedBy: user.FullName,
                    isDeleted: false,
                    Vendor: prodVendor,
                    NumofInventory: props.product.NumofInventory,
                    InventoryID: props.product.InventoryID,
                    inventoryImage: res.data.toString().replace(/\s/g, '')
                }
                console.log("New Prod Data", updatedProduct)
                axios.put(`addinventory/updateInventory`, updatedProduct)
                    .then((response) => {
                        // setImgData('https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + props.product.inventoryImage)
                    })
                    .catch((err) => {
                        console.log(err, "Unable to get vendor time info");
                    });
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
                const updatedProduct = {
                    InventoryName: prodName,
                    InventoryCost: prodCost,
                    InventoryDescription: prodDescription,
                    InventorySerialNumber: prodSN,
                    LastModified: moment().format('YYYY-MM-DDTHH:mm:ss'),
                    LastModifiedBy: user.FullName,
                    isDeleted: false,
                    Vendor: prodVendor,
                    NumofInventory: props.product.NumofInventory,
                    inventoryImage: props.product.inventoryImage,
                    InventoryID: props.product.InventoryID
                }
                console.log("New Prod Data", updatedProduct)
                axios.put(`addinventory/updateInventory`, updatedProduct)
                    .then((response) => {
                        // setImgData('https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + props.product.inventoryImage)
                    })
                    .catch((err) => {
                        console.log(err, "Unable to get vendor time info");
                    });
            });
        props.onHide();
    }
    return (
        <div>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width-Restock"
                contentClassName="modal-height-Restock"
            >

                <Modal.Header closeButton>
                    Product Details
                </Modal.Header>
                <Modal.Body>
                    <h6 className='Restock-update-header'>Edit Product: {'(' + props.product.InventoryID + ') ' + props.product.InventoryName} </h6>
                    <Form className="Restock-form-container" >
                        <div onClick={clickImage} style={{}} className='sender-logo1'>
                            <input id="profile-image-upload" onChange={onChangePicture} type="file" className='hidden invoice-image-upload'>

                            </input>
                            <img style={{ borderRadius: '10px', border: 'solid gray 2px', boxShadow: '0px 6px 20px 0px rgb(0 0 0 / 30%)' }} id="profile-image1" className='sender-logo-img' src={imgData} />

                        </div>
                        <Tabs defaultActiveKey="ProductInfo" id="uncontrolled-tab-example" >
                            <Tab eventKey="ProductInfo" title="Product Information" className="7-day-tab">
                                <div className='Product-detail-form'>
                                    <div className='product-detail-left'>
                                        <Form.Label className='edit-users-label'>Product Name</Form.Label>
                                        <Form.Control onChange={(e) => setprodName(e.target.value)} className="product-form-input" type="text" defaultValue={props.product.InventoryName}></Form.Control>
                                        <Form.Label className='edit-users-label'><FontAwesomeIcon className="edit-users-label" icon={faDollarSign} size='1x' />Product Cost </Form.Label>
                                        <Form.Control onChange={(e) => setprodCost(e.target.value)} className="product-form-input" min="0.01" step="0.01" type="number" defaultValue={props.product.InventoryCost}></Form.Control>
                                        <Form.Label className='edit-users-label'>Associated Vendor</Form.Label>
                                        <Form.Select onChange={(e) => setprodVendor(e.target.value)} className='edit-user-dropdown' type='text' defaultValue={props.product.Vendor} >
                                            <option value='0'>None</option>
                                            {companylist.map((item) => (
                                                <option value={item.vendorId}>{item.vendorName}</option>
                                            ))}
                                        </Form.Select>

                                    </div>
                                    <div className='product-detail-right'>
                                        <Form.Label className='edit-users-label'>Product Description</Form.Label>
                                        <Form.Control onChange={(e) => setprodDescription(e.target.value)} className="product-form-input" as="textarea" defaultValue={props.product.InventoryDescription}></Form.Control>
                                        <Form.Label className='edit-users-label'><FontAwesomeIcon className="edit-users-label" icon={faDollarSign} size='1x' />Number of Products </Form.Label>
                                        <Form.Control disabled className="product-form-input" min="0.01" step="0.01" type="number" defaultValue={props.product.NumofInventory}></Form.Control>
                                        <Form.Label className='edit-users-label'>Serial Number (S/N)</Form.Label>
                                        <Form.Control onChange={(e) => setprodSN(e.target.value)} className="product-form-input" type="text" defaultValue={props.product.InventorySerialNumber}></Form.Control>
                                    </div>

                                </div>
                                <div className='submit-Restock-container'>
                                    <Button onClick={submitProductChange} variant="secondary" size="sm">Save Product</Button>
                                </div>
                            </Tab>
                        </Tabs>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{ display: 'flex', alignItems: 'center' }} className='last-modified-product'>
                        <p style={{ marginRight: '1rem' }}>{moment(props.product.LastModified).format('MMMM Do YYYY, h:mm:ss a')}</p>  <p style={{ display: 'flex' }}><h5 style={{ marginRight: '1rem' }}>By:</h5>{props.product.LastModifiedBy}</p>
                    </div>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
        // {/* <tr id={item.InventoryID} key={item.InventoryID} class="content-bar">
        //     <td >
        //         <input className="inv-edit-input" type='text' value={editFormData.InventoryID} readOnly name='InventoryID'></input>

        //     </td>
        //     <td >
        //         <input className="inv-edit-input" type='text' value={editFormData.InventoryName}  onChange={handleEditFormChange} name='InventoryName'></input>
        //     </td>
        //     <td >
        //         <textarea className="inv-edit-input" type='text' value={editFormData.InventoryDescription}  onChange={handleEditFormChange} name='InventoryDescription'></textarea>
        //     </td>
        //     <td >
        //         <input className="inv-edit-input" type='text' value={editFormData.InventorySerialNumber}  step="0.01" min="0.00" onChange={handleEditFormChange} name='InventorySerialNumber'></input>
        //     </td>
        //     <td >
        //         <input className="inv-edit-input" type='number' value={editFormData.InventoryCost}  step="0.01" min="0.00" onChange={handleEditFormChange} name='InventoryCost'></input>
        //     </td>
        //     <td  >
        //         <div className="inv-edit-input"  name='NumofInventory'><FontAwesomeIcon className="project-done-icon" icon={faBoxesPacking} size='1x' /> {editFormData.NumofInventory} items</div>
        //     </td>
        //     <td  >
        //         <input className="inv-edit-input" type='datetime-local' value={editFormData.LastModified} readOnly  name='LastModified'></input>
        //     </td>
        //     <td class="btncontainer">
        //         <button class="cbbtn" type="button" onClick={handleCancelClick} >
        //             <FontAwesomeIcon className="project-done-icon" icon={faXmark} size='1x' />
        //         </button>
        //         <button class="cbbtn" type='submit' >
        //             <FontAwesomeIcon className="project-done-icon" icon={faCheckCircle} size='1x' />
        //         </button>

        //     </td>

        // </tr> */}
    )

}
export default EditProductModal
