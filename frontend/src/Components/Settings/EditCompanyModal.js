import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { Country, State, City } from "country-state-city";
import { textSpanIsEmpty } from 'typescript';
import moment from 'moment';
// import { EditableRow } from './EditableRow'
// import ReadOnlyRow from './ReadOnlyRow'
// import './VendorCompanyModal.css'
import { faBuilding, faBuildingCircleArrowRight, faBuildingCircleCheck, faBuildingUser, faCode, faCoins, faContactBook, faMapLocation, faPalette, faPallet, faPerson, faPhoneSquare, faPlus, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery'
import { ppid } from 'process';



function EditCompanyModal(props) {
    const [user, setUser] = useState("");
    const [Company, setCompany] = useState([]);
    // var venName,venType,venEmail,venphone,venContact,vendorbool,companybool,venIsVendor;
    const [venName, setvenName] = useState("")
    const [venType, setvenType] = useState("");
    const [codeItem, setCodeItem] = useState("");
    const [venEmail, setvenEmail] = useState("");
    const [venphone, setvenPhone] = useState("");
    const [venContact, setvenContact] = useState("");
    const [venCountry, setvenCountry] = useState("");
    const [venCurrency, setvenCurrency] = useState("");
    const [venStreet, setvenStreet] = useState("");
    const [venCity, setvenCity] = useState("");
    const [venState, setvenState] = useState("");
    const [venZip, setvenZip] = useState("");
    const [vendorbool, setvendorbool] = useState(false);
    const [companybool, setcompanybool] = useState(false);
    const [vendId, setvendId] = useState("");
    const [defaultLogo, setdefaultLogo] = useState("");
    const [defaultPic, setdefaultPic] = useState("");
    const [imgData, setImgData] = useState(defaultLogo);
    const [Photo, setPhoto] = useState();
    const [PhotoName, setPhotoName] = useState("");
    const [picture, setPicture] = useState(null);
    const [countryList, setcountryList] = useState([]);
    const [currencyList, setcurrencyList] = useState([]);
    const [unique, setunique] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);


    useEffect(() => {

        // console.log("Name", Company[0].vendorName)
        axios.get(`UserProfile`)
            .then((res) => {
                setPhoto()
                setPhotoName("")
                setUser(res.data)

                // console.log("user",user)
                axios.get(`getvendor/getvendorList`)
                    .then((response) => {
                        setSelectedCountry(JSON.parse(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.country)))
                        setSelectedState(JSON.parse(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.stateprovince)))

                        setCompany(response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company));
                        setImgData('https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorPic))
                        // console.log("Pic", 'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorPic))
                        // console.log('USERS: ', response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i=>i.vendorType));
                        setvendId(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorId));
                        setvenName(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorName));
                        setvenType(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorType));
                        setdefaultPic(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorPic));
                        // var codeItem = Company[0].itemCode;
                        setvenEmail(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorEmail));
                        setvenPhone(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorPhone));
                        setvenContact(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorContact));
                        setvendorbool(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.isVendor));
                        setcompanybool(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.isCompany));
                        setvenCountry(JSON.stringify(JSON.parse(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.country))));

                        setvenState(JSON.stringify(JSON.parse(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.stateprovince))));
                        setvenStreet(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.street));
                        setvenZip(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.zipcode));
                        setvenCurrency(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.currency));
                        setvenCity(JSON.stringify(JSON.parse(...response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.city))));
                        // console.log("CURRENCY", response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company))

                    })
                    .catch((err) => {
                        // console.log(err, "Unable to get vendor time info");
                    });


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`getcurrency/getcurrency`)
            .then((response) => {
                setcurrencyList(response.data)
                setcountryList(response.data.map(i => i.country))
                setunique([...new Set(response.data.map(item => item.code))]);
            })
            .catch((err) => {
                // console.log(err, "Unable to get vendor time info");
            });
    }, [props.show])

    useEffect(() => {
        console.log("Refreshhhhhhh");
        console.log(selectedCountry);
        console.log(selectedCountry?.isoCode);
        console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
        console.log("Countries", Country.getAllCountries())
    }, [selectedCountry]);

    // console.log("vend ID", Company[0].vendorId)
    // function submitnewVenCom() {
    //     const newcomven = {
    //         vendorName: venName,
    //         vendorType: venType,
    //         // itemCode: codeItem,
    //         vendorEmail: venEmail,
    //         vendorPhone: venphone,
    //         vendorContact: venContact,
    //         isVendor: vendorbool,
    //         isActive: true,
    //         isGroup: false
    //     }

    //     if (venType == '') {
    //         console.log('Did not select a vendor')
    //         toast.error(`${"Please Select A Vendor"}`, {
    //             position: toast.POSITION.TOP_RIGHT,
    //             autoClose: 5000,
    //             theme: 'dark'
    //         });
    //     }
    //     else if (venContact == '') {
    //         console.log('Did not select a contact')
    //         toast.error(`${"Please Select A Contact"}`, {
    //             position: toast.POSITION.TOP_RIGHT,
    //             autoClose: 5000,
    //             theme: 'dark'
    //         });
    //     }
    //     else {
    //         axios.post(`addvendor/addvendor`, newcomven)
    //             .then((response) => {
    //                 console.log('newvencom POST', response.data)
    //                 toast.success(`${"Added " + venName}`, {
    //                     position: toast.POSITION.TOP_RIGHT,
    //                     autoClose: 5000,
    //                     theme: 'dark'
    //                 });
    //             })
    //             .then(
    //                 axios.get(`getvendor/getvendorList`)
    //                     .then((response) => {

    //                         console.log('vendors: ', response.data.filter(ven => ven.isActive == true && ven.isVendor == true))
    //                     })
    //                     .catch((err) => {
    //                         console.log(err, "Unable to get vendor time info");
    //                     })

    //             )
    //             .catch((err) => {
    //                 console.log(err, "Unable to get vendor time info");
    //             });

    //         axios.get(`getvendor/getvendorList`)
    //             .then((response) => {

    //                 console.log('vendors: ', response.data.filter(ven => ven.isActive == true && ven.isVendor == true))
    //             })
    //             .catch((err) => {
    //                 console.log(err, "Unable to get vendor time info");
    //             });

    //         props.onHide();
    //     }



    // }

    function clickImage() {
        $(function () {
            $('#profile-image1').on('click', function (e) {

                $(document.getElementById('profile-image-upload')).click();
            });
        });
    }
    const onvendorNameChange = (e) => {
        setvenName(e)
        console.log(e)
    }
    const onvendorTypeChange = (e) => {
        setvenType(e)
        console.log(e)
    }
    // const onvendorcodeItemChange = (e) =>{
    //     codeItem=e
    // }
    const onvendorEmailChange = (e) => {
        setvenEmail(e)
    }
    const onvendorPhoneChange = (e) => {
        setvenPhone(e)
    }
    const onvendorContactChange = (e) => {
        setvenContact(e)
    }
    const onvendorBoolChange = (e) => {
        setvendorbool(e)
    }
    const oncompanyBoolChange = (e) => {
        setcompanybool(e)
    }
    const oncurrencyChange = (e) => {
        setvenCurrency(e)
    }
    const oncountryChange = (e) => {
        setvenCountry(e)
    }
    const onstreetChange = (e) => {
        setvenStreet(e)
    }
    const onstateChange = (e) => {
        setvenState(e)
    }
    const onzipChange = (e) => {
        setvenZip(e)
    }
    // const onPhotoChange = (e) => {
    //     console.log('new photo', e[0]);

    //     console.log("Photo name", e[0].name)
    // } 
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

    function submiteditVenCom() {


        const formData = new FormData();
        formData.append("formFile", Photo);
        formData.append("fileName", PhotoName);
        axios.post("https://webapi20220126203702.azurewebsites.net/api/blobexplorer/uploadblobfile", formData)
            .then(res => {
                const editcomven = {
                    vendorId: Company[0].vendorId,
                    vendorName: venName,
                    vendorType: venType,
                    // itemCode: codeItem,
                    vendorEmail: venEmail,
                    vendorPhone: venphone,
                    vendorContact: venContact,
                    isVendor: vendorbool,
                    isCompany: companybool,
                    currency: venCurrency,
                    country: venCountry,
                    stateprovince: venState,
                    city: venCity,
                    zipcode: venZip,
                    street: venStreet,
                    vendorPic: res.data.toString().replace(/\s/g, '')

                }
                console.log("NEW COMPANY DATA", editcomven)
                axios.put(`updateCompany/updateCompany`, editcomven)
                    .then((response) => {
                        // console.log('newvencom POST', response.data)

                        toast.success(`${"Updated " + venName}`, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 5000,
                            theme: 'dark'
                        });
                        props.onHide();
                    })
                    .catch((err) => {
                        console.log(err, "Unable to get vendor time info");
                    });
            })
            .catch(err => {
                console.log(err);
                const editcomven = {
                    vendorId: Company[0].vendorId,
                    vendorName: venName,
                    vendorType: venType,
                    // itemCode: codeItem,
                    vendorEmail: venEmail,
                    vendorPhone: venphone,
                    vendorContact: venContact,
                    isVendor: vendorbool,
                    isCompany: companybool,
                    currency: venCurrency,
                    country: venCountry,
                    stateprovince: venState,
                    city: venCity,
                    zipcode: venZip,
                    street: venStreet,
                    vendorPic: defaultPic

                }
                console.log("NEW COMPANY DATA", editcomven)
                axios.put(`updateCompany/updateCompany`, editcomven)
                    .then((response) => {
                        // console.log('newvencom POST', response.data)

                        toast.success(`${"Updated " + venName}`, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 5000,
                            theme: 'dark'
                        });
                        props.onHide();
                    })
                    .catch((err) => {
                        console.log(err, "Unable to get vendor time info");
                    });
            })


        // axios.get(`UserProfile`)
        // .then((res) => {
        //     setUser(res.data)

        //     // console.log("user",user)
        //     // axios.get(`getvendor/getvendorList`)
        //     //     .then((response) => {
        //     //         setCompany(response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company));
        //     //         setImgData('https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorPic))
        //     //         console.log("Pic", 'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorPic))
        //     //         // console.log('USERS: ', response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i=>i.vendorType));
        //     //         setvenName(response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorName));
        //     //         setvenType(response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorType));
        //     //         // var codeItem = Company[0].itemCode;
        //     //         setvenEmail(response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorEmail));
        //     //         setvenPhone(response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorPhone));
        //     //         setvenContact(response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.vendorContact));
        //     //         setvendorbool(response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.isVendor));
        //     //         setcompanybool(response.data.filter(com => com.isActiveVendor == true && com.vendorId == res.data.Company).map(i => i.isCompany));
        //     //     })
        //     //     .catch((err) => {
        //     //         // console.log(err, "Unable to get vendor time info");
        //     //     });


        // })
        // .catch((err) => {
        //     console.log(err, "Unable to get user time info");
        // });


        props.onHide();
        // console.log("EDITED", editcomven)
    }


    // console.log("EMIAL", Company[0].vendorEmail, venEmail, venName, codeItem)
    // console.log(venName)

    // console.log("SET COUNTRY DEFAULT", venCountry)

    return (
        <div className='RestockModal'>

            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width-Restock"
                contentClassName="modal-height-Restock"
            >
                <ToastContainer />

                <Modal.Header closeButton>
                    Edit Company/Vendor

                </Modal.Header>
                <Modal.Body>
                    <Form className='addcomven-form'>
                        <div className='addvencom-header'>
                            <h4 className='ComVenModal-header'>Update Company: {venName}</h4>
                        </div>
                        <div className='addvencom-inputs-container'>
                            <div onClick={clickImage} style={{ width: '100%' }} className='sender-logo1'>
                                <input id="profile-image-upload" onChange={onChangePicture} type="file" className='hidden invoice-image-upload'>

                                </input>
                                <img style={{ borderRadius: '50px', border: 'solid #0d6efd 3px', boxShadow: '0px 6px 20px 0px rgb(0 0 0 / 30%)' }} id="profile-image1" className='sender-logo-img' src={imgData} />

                            </div>
                            <Tabs defaultActiveKey="General" id="uncontrolled-tab-example" >
                                <Tab eventKey="General" title="INFO" className="7-day-tab">
                                    <div className='vencom-form-columns-container'>
                                        <div className='left-vencom-form'>
                                            <Form.Label className='addvencom-label'> Company Name <FontAwesomeIcon className="excel-icon" icon={faBuilding} size='1x' /></Form.Label>
                                            <Form.Control defaultValue={venName} onChange={(e) => { onvendorNameChange(e.target.value); e.preventDefault() }} type='text' className='addvencom-input'></Form.Control>
                                            <Form.Label className='addvencom-label'> Type <FontAwesomeIcon className="excel-icon" icon={faPalette} size='1x' /> </Form.Label>
                                            <Form.Select defaultValue={venType} onChange={(e) => onvendorTypeChange(e.target.value)} type='text' className='addvencom-input'>
                                                <option value="food">food</option>
                                                <option value="Technology">Technology</option>
                                                <option value="Office Supply">Office Supply</option>
                                                <option value="Logistics">Logistics</option>
                                                <option value="Retaier">Retailer</option>
                                                <option value="B2B">B2B</option>
                                                <option value="B2G">B2G</option>
                                            </Form.Select>
                                            {/* <Form.Label className='addvencom-label'> Item Code <FontAwesomeIcon className="excel-icon" icon={faCode} size='1x' /></Form.Label>
                            <Form.Control defaultValue={Company[0].itemCode} onChange={(e) => onvendorcodeItemChange(e.target.value)} type='text' className='addvencom-input'></Form.Control> */}
                                            <Form.Label className='addvencom-label'> Email <FontAwesomeIcon className="excel-icon" icon={faVoicemail} size='1x' /> </Form.Label>
                                            <Form.Control defaultValue={venEmail} onChange={(e) => onvendorEmailChange(e.target.value)} type='email' className='addvencom-input'></Form.Control>
                                            <Form.Label className='addvencom-label'> Phone <FontAwesomeIcon className="excel-icon" icon={faPhoneSquare} size='1x' /></Form.Label>
                                            <Form.Control defaultValue={venphone} onChange={(e) => onvendorPhoneChange(e.target.value)} type='phone' className='addvencom-input'></Form.Control>
                                            <Form.Label className='addvencom-label'> Country <FontAwesomeIcon className="excel-icon" icon={faMapLocation} size='1x' /> </Form.Label>
                                            <Form.Select defaultValue={venCountry} onChange={(e) => { setSelectedCountry(JSON.parse(e.target.value)); setvenCountry(e.target.value) }} type='text' className='addvencom-input'>
                                                <option value={null}></option>
                                                {Country.getAllCountries().map(i => (
                                                    <option value={JSON.stringify({ name: i.name, isoCode: i.isoCode })}>{i.name}</option>
                                                ))}

                                            </Form.Select>
                                            <Form.Label className='addvencom-label'> State/Province <FontAwesomeIcon className="excel-icon" icon={faMapLocation} size='1x' /></Form.Label>
                                            <Form.Select defaultValue={venState} onChange={(e) => { setSelectedState(JSON.parse(e.target.value)); setvenState(e.target.value) }} type='text' className='addvencom-input'>
                                                <option value={null}></option>
                                                {State.getStatesOfCountry(selectedCountry?.isoCode).map(i => (
                                                    <option value={JSON.stringify({ name: i.name, isoCode: i.isoCode, countryCode: i.countryCode })}>{i.name}</option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                        <div className='right-vencom-form'>
                                            <Form.Label className='addvencom-label'> City <FontAwesomeIcon className="excel-icon" icon={faMapLocation} size='1x' /></Form.Label>
                                            <Form.Select defaultValue={venCity} onChange={(e) => { setSelectedCity(JSON.parse(e.target.value)); setvenCity(e.target.value) }} type='text' className='addvencom-input'>
                                                <option value={null}></option>
                                                {City.getCitiesOfState(
                                                    selectedState?.countryCode,
                                                    selectedState?.isoCode
                                                ).map(i => (
                                                    <option value={JSON.stringify({ name: i.name, isoCode: i.isoCode, countryCode: i.countryCode })}>{i.name}</option>
                                                ))}
                                            </Form.Select>
                                            <Form.Label className='addvencom-label'> Street <FontAwesomeIcon className="excel-icon" icon={faMapLocation} size='1x' /></Form.Label>
                                            <Form.Control defaultValue={venStreet} onChange={(e) => onstreetChange(e.target.value)} type='text' className='addvencom-input'></Form.Control>


                                            <Form.Label className='addvencom-label'> Zip Code <FontAwesomeIcon className="excel-icon" icon={faMapLocation} size='1x' /></Form.Label>
                                            <Form.Control defaultValue={venZip} onChange={(e) => onzipChange(e.target.value)} type='text' className='addvencom-input'></Form.Control>
                                            <Form.Label className='addvencom-label'> Currency <FontAwesomeIcon className="excel-icon" icon={faCoins} size='1x' /> </Form.Label>
                                            <Form.Select defaultValue={venCurrency} onChange={(e) => oncurrencyChange(e.target.value)} type='text' className='addvencom-input'>
                                                <option value={null}></option>
                                                {unique.map(i => (
                                                    <option value={i}>{Array.from(currencyList.filter(item => item.code == i))[0].symbol + ' ' + i}</option>
                                                ))}
                                            </Form.Select>

                                            {/* <Form.Label className='addvencom-label'> Contact <FontAwesomeIcon className="excel-icon" icon={faContactBook} size='1x' /></Form.Label> */}

                                            <Form.Label className='addvencom-label'> Vendor <FontAwesomeIcon className="excel-icon" icon={faBuildingCircleCheck} size='1x' /> </Form.Label>
                                            <Form.Check defaultChecked={vendorbool} onChange={(e) => onvendorBoolChange(e.target.checked)} type='checkbox' className='addvencom-input'></Form.Check>
                                            {/* <Form.Label className='addvencom-label'> Client <FontAwesomeIcon className="excel-icon" icon={faBuildingUser} size='1x' /> </Form.Label>
                            <Form.Check defaultChecked={Company[0].isCompany} onChange={(e) => oncompanyBoolChange(e.target.checked)} type='checkbox' className='addvencom-input'></Form.Check> */}
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>



                            <Button onClick={submiteditVenCom} className='addnewVendCom-btn'>Submit</Button>

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
export default EditCompanyModal