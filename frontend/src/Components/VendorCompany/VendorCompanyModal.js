import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { textSpanIsEmpty } from 'typescript';
import moment from 'moment';
import { EditableRow } from './EditableRow'
import ReadOnlyRow from './ReadOnlyRow'
import './VendorCompanyModal.css'
import { faArrowRight, faBuilding, faBuildingCircleArrowRight, faEnvelope, faPencil, faPhone, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddVenComModal from './AddVenComModal';
import EditVenComModal from './EditVenComModal';
import animationData from '../../assets/animations/3741-white-loading.json'

import { useTheme } from '@mui/material/styles';
import {
    Grid,
    TextField,
    Card,
    CardContent,
    Typography,
    Checkbox,
    Autocomplete,
    Chip,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    ListItemText,
    Paper,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import { CheckBoxOutlineBlank, ExpandMoreOutlined } from '@material-ui/icons'
import { CheckBoxOutlined } from '@material-ui/icons'
import ClientInventoryChart from '../ChartJS/ClientInventoryChart';
import ClientTaskProgress from '../ChartJS/ClientTaksProgress';
import ClientProjectProgress from '../ChartJS/ClientProjectProgress';
import ClientProjectTable from './ClientProjectTable';
import AddContactModal from './AddContactModal';
import EditableContactModal from './EditableContactModal';
import Lottie from 'react-lottie-player';
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

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
function VendorCompanyModal(props) {
    const [user, setUser] = useState("");
    const [userList, setUserList] = useState([]);
    const [venUserList, setvenUserList] = useState([]);
    const [vendorlist, setvendorlist] = useState([]);
    const [companylist, setcompanylist] = useState([]);
    const [editMode, setEditMode] = useState(true);
    const [vencomModal, setvencomModal] = useState(false);
    const [editvencomModal, seteditvencomModal] = useState(false);
    const [vendorObject, setvendorObject] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [loading, setloading] = useState(true);
    const [query, setQuery] = useState([]);
    const [queryName, setQueryName] = useState([]);
    const [addcontactModal, setaddcontactModal] = useState(false);
    const [editcontactModal, seteditcontactModal] = useState(false);
    const [targetContact, settargetClient] = useState([]);
    function handleshowvencom() {
        setvencomModal(false);
        axios.get(`getvendor/getvendorList2`)
            .then((response) => {
                setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true));
                setcompanylist(response.data.filter(ven => ven.isActiveVendor == true && ven.isCompany == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
    }
    function handleshoweditvencom() {
        seteditvencomModal(false);
        axios.get(`getvendor/getvendorList2`)
            .then((response) => {
                setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true));
                setcompanylist(response.data.filter(ven => ven.isActiveVendor == true && ven.isCompany == true))
                // console.log('vendors: ', response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });

    }

    function handleshowaddcontact() {
        setaddcontactModal(false);
        axios.get(`getvendor/getvendorList2`)
            .then((response) => {
                setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true));
                setcompanylist(response.data.filter(ven => ven.isActiveVendor == true && ven.isCompany == true))
                // console.log('vendors: ', response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
        // axios.get(`userList/userlist`)
        // .then((res) => {
        //     setUserList(res.data.filter(comp => comp.Company === parseInt(personName) && comp.isContact == true))
        //     setvenUserList(res.data.filter(comp => comp.Company === parseInt(personName) && comp.isContact == true))

        //     console.log("User List", res.data, personName)



        // })
        // .catch((err) => {
        //     console.log(err, "Unable to get user time info");
        // });
    }
    function handleshoweditcontact() {
        seteditcontactModal(false);
        axios.get(`getvendor/getvendorList2`)
            .then((response) => {
                setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true));
                setcompanylist(response.data.filter(ven => ven.isActiveVendor == true && ven.isCompany == true))
                // console.log('vendors: ', response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get vendor time info");
            });
        // axios.get(`userList/userlist`)
        // .then((res) => {
        //     setUserList(res.data.filter(comp => comp.Company === parseInt(personName) && comp.isContact == true))
        //     setvenUserList(res.data.filter(comp => comp.Company === parseInt(personName) && comp.isContact == true))

        //     console.log("User List", res.data, personName)



        // })
        // .catch((err) => {
        //     console.log(err, "Unable to get user time info");
        // });
    }

    useEffect(() => {
        if (props.show != false) {
            setloading(true)

            setTimeout(() => {

                axios.get(`getvendor/getvendorList2`)
                    .then((response) => {
                        setvendorlist(response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true));
                        setcompanylist(response.data.filter(ven => ven.isActiveVendor == true && ven.isCompany == true))
                        // console.log('vendors: ', response.data.filter(ven => ven.isActiveVendor == true && ven.isVendor == true))
                        setloading(false)
                    })
                    .catch((err) => {
                        console.log(err, "Unable to get vendor time info");
                    });
                axios.get(`userList/userlist`)
                    .then((res) => {
                        setUserList(res.data.filter(comp => comp.Company === parseInt(personName) && comp.isContact == true))
                        setvenUserList(res.data.filter(comp => comp.Company === parseInt(personName2) && comp.isContact == true))

                        console.log("User List", res.data, personName)
                    })
                    .catch((err) => {
                        console.log(err, "Unable to get user time info");
                    });


                axios.get(`UserProfile`)
                    .then((res) => {
                        setUser(res.data)

                        // console.log(user)



                    })
                    .catch((err) => {
                        console.log(err, "Unable to get user time info");
                    });
                setcompanylist(companylist.filter(company => company.vendorId.toString().toLocaleLowerCase()?.includes(query)))
                setcompanylist(companylist.filter(company => company.vendorName.toString().toLocaleLowerCase()?.includes(queryName)))
                console.log("COMP LIST", companylist)
                handleshowvencom();

            }, 3500)
        }
    }, [props.show, addcontactModal, editcontactModal])

    const [editInv, setEditInv] = useState(null);
    const [editFormData, setEditFormData] = useState({
        vendorId: ""
    })

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
        // console.log("formdata:", newFormData);
    }
    //For the click to edit
    const handleEditClick = (item) => {
        setEditInv(item.vendorId);

        const formValues = {
            vendorId: item.vendorId,
            vendorName: item.vendorName,
            vendorType: item.vendorType,
            itemCode: item.itemCode,
            vendorEmail: item.vendorEmail,
            vendorPhone: item.vendorPhone,
            vendorContact: item.vendorContact,
            isActiveVendor: item.isActiveVendor
        }
        setEditFormData(formValues);
        setEditMode(false)
        // console.log("This item vendor", formValues)

    }
    const handleCancelClickVendor = () => {
        setEditInv(null);
        axios.get(`getvendor/getvendorlist2`)
            .then((response) => {
                setvendorlist(response.data.filter(inv => inv.isActiveVendor == true && inv.isVendor == true));

            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        setEditMode(true)
    };
    const handleCancelClickCompany = () => {
        setEditInv(null);
        axios.get(`getvendor/getvendorlist2`)
            .then((response) => {
                setcompanylist(response.data.filter(inv => inv.isActiveVendor == true));
                // console.log('this is a test', response.data.filter(inv => inv.isActiveVendor == true))
            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        setEditMode(true)
    };
    // function onRestockIDChange( currentNum) {


    //     const select = currentNum.target;
    //     const id = select.children[select.selectedIndex].id;
    //     const newNumber = select.children[select.selectedIndex].value
    //     setcurrNum(newNumber);
    //     setinvID(id);
    //     // var event = document.getElementById('item-selection').value
    //     axios.get(`getSRLog/getSRLog`)
    //     .then((response) => {
    //         setsrLog(response.data);


    //     })
    //     .catch((err) => {
    //         console.log(err, "Unable to get user time info");
    //     });
    //     console.log("id", newNumber, id)

    // }
    // function onRestocknumChange(numofitem) {
    //     setnewNum(numofitem);


    // }

    // function onRestockChange(){
    //     var newNumber = (parseInt(currNum) + parseInt(newNum));
    //     var Restock = {
    //         InventoryID: invID,
    //         ItemName: invList.filter(item => item.InventoryID == invID).map(name => name.InventoryName).at(0),
    //         ItemAmount: invList.filter(item => item.InventoryID == invID).map(name => name.InventoryCost).at(0),
    //         Sold: false,
    //         Restocked: true,
    //         numberSR: newNum,
    //         NumofInventory: newNumber,
    //         Clerk: user.FullName,
    //         Date: moment().format('YYYY-MM-DDTHH:mm:ss')
    //     }

    //     axios.put('Restockinventory/RestockInventory', Restock)
    //     .then(res => {
    //         console.log("edited time", res.data)
    //         toast.success(`${"Restocked " + newNum + " Items Successfully!"}`, {
    //             position: toast.POSITION.TOP_RIGHT,
    //             autoClose: 5000,
    //             theme:'dark'
    //         });
    //         axios.post('addSRLog/addSRLog', Restock)
    //         .then(res => {
    //             var srlog = res.data;
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //         axios.get(`getinventory/getInventoryList`)
    // .then((response) => {
    //     setinvList(response.data.filter(inv => inv.isDeleted == false));

    // })
    // .catch((err) => {
    //     console.log(err, "Unable to get user time info");
    // });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    //     console.log("Sold:", Restock);
    //     props.onHide()
    // }
    // var CompanyIDS = [];
    // for (let i = 0; i < companylist.length; i++) {
    //     CompanyIDS.push(companylist[i].vendorId)
    //     let setOfValue = new Set(CompanyIDS)
    //     //   //distinct building name values from array
    //     let uniqueBuildingValues = [...setOfValue]
    //     CompanyIDS = uniqueBuildingValues
    // }

    const [searchTextBox, setsearchTextBox] = useState("");
    const [searchTextBoxName, setsearchTextBoxName] = useState("");
    const [searchTextBoxType, setsearchTextBoxType] = useState("");
    const [searchTextBoxEmail, setsearchTextBoxEmail] = useState("");
    const [searchTextBoxNumber, setsearchTextBoxNumber] = useState("");
    const [searchTextBoxContact, setsearchTextBoxContact] = useState("");
    const icon = <CheckBoxOutlineBlank fontSize="small" />;
    const checkedIcon = <CheckBoxOutlined fontSize="small" />;

    const search = () => {


        return companylist.filter(company => company.vendorId.toString().toLocaleLowerCase()?.includes(query) || company.vendorName.toString().toLocaleLowerCase().includes(query));



        // ||  report.reportName?.toLocaleLowerCase().includes(query) || report.reportType?.includes(query) || report.reportType?.toLocaleLowerCase().includes(query) || report.reportCreation?.includes(query)
    }
    const searchName = () => {
        return companylist.filter(company => company.vendorName.toString().toLocaleLowerCase()?.includes(queryName));
        // ||  report.reportName?.toLocaleLowerCase().includes(query) || report.reportType?.includes(query) || report.reportType?.toLocaleLowerCase().includes(query) || report.reportCreation?.includes(query)
    }
    // else if(searchTextBoxName != ""){
    //     return companylist.filter(company => company.vendorName.toString().toLocaleLowerCase()?.includes(queryName) && company.vendorId.toString().toLocaleLowerCase()?.includes(query));
    // }
    // else if(searchTextBoxType){
    //     return companylist.filter(company => company.vendorType.toString().toLocaleLowerCase()?.includes(query));
    // }
    // else if (searchTextBoxEmail != ""){
    //     return companylist.filter(company => company.vendorEmail.toString().toLocaleLowerCase()?.includes(query));
    // }
    // else if (searchTextBoxNumber != ""){
    //     return companylist.filter(company => company.vendorPhone.toString().toLocaleLowerCase()?.includes(query));
    // }
    // else{
    //     return companylist.filter(company => company.vendorContact.toString().toLocaleLowerCase()?.includes(query));
    // }

    const theme = useTheme();
    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        axios.get(`userList/userlist`)
            .then((res) => {
                setUserList(res.data.filter(comp => comp.Company === parseInt(value)))

                console.log("User List", value, res.data.filter(comp => comp.Company === parseInt(value)))



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });

    };
    const [personName2, setPersonName2] = useState([]);

    const handleChange2 = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName2(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        axios.get(`userList/userlist`)
            .then((res) => {
                setvenUserList(res.data.filter(comp => comp.Company === parseInt(value)))

                console.log("User List2", value, res.data.filter(comp => comp.Company === parseInt(value)))



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        console.log("Value", personName2[0])
    };
    return (
        <div className='RestockModal'>

            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width"
                contentClassName="modal-height"
                onHide={() => { props.onHide(); setPersonName([]); }}
            >
                <ToastContainer />
                <Modal.Header>
                    Clients and Vendors
                    <div className='add-vendor-btn-container'>
                        <Button className='add-vendor-btn' onClick={() => setvencomModal(true)}> Add Client/Vendor <FontAwesomeIcon className="vendor-add-icon" icon={faPlus} size='2x' /> </Button>
                    </div>

                </Modal.Header>
                <Modal.Body>
                    {/* <input type="text" placeholder='Search Company ID' value={searchTextBox} className='search-companyid' onChange={(e) => { setQuery(e.target.value.toLocaleLowerCase()); setsearchTextBox(e.target.value); }} /> */}

                    <Tabs className='bookkeeping-tabs' defaultActiveKey="CashReciepts" id="uncontrolled-tab-example" >
                        <Tab eventKey="CashReciepts" title={<><p className='vendor-tab-title'>Client</p><FontAwesomeIcon className="company-icon" icon={faBuilding} size='1x' /></>} className="Grid-tab">
                            <div className='client-dropdown-container' >

                                {loading == true ?
                                    (
                                        <FormControl sx={{ m: 1, width: 300 }} disabled>
                                            <InputLabel id="demo-multiple-name-label">Choose A Client</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                value={personName}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Choose A Client" />}
                                                MenuProps={MenuProps}
                                            >
                                                {companylist.sort((a, b) => a.vendorName.localeCompare(b.vendorName)).map((name) => (
                                                    <MenuItem
                                                        key={name.vendorId}
                                                        value={name.vendorId.toString()}
                                                        style={getStyles(name.vendorName, personName, theme)}
                                                    >
                                                        {name.vendorName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )
                                    :
                                    (
                                        <FormControl sx={{ m: 1, width: 300 }}>
                                            <InputLabel id="demo-multiple-name-label">Choose A Client</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                value={personName}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Choose A Client" />}
                                                MenuProps={MenuProps}
                                            >
                                                {companylist.map((name) => (
                                                    <MenuItem
                                                        key={name.vendorId}
                                                        value={name.vendorId.toString()}
                                                        style={getStyles(name.vendorName, personName, theme)}
                                                    >
                                                        {name.vendorName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )

                                }

                                {/* <input type="text" placeholder='Search Company ID' value={searchTextBox} className='search-companyid' onChange={(e) => { setQuery(e.target.value.toLocaleLowerCase()); setsearchTextBox(e.target.value); }} /> */}
                                <div className='Client-Name-Head'>
                                    {personName != "" ?
                                        (
                                            <div style={{ display: 'flex' }}>
                                                <div style={{ width: '50%' }} className='sender-logo1'>
                                                    <img style={{ borderRadius: '50px', border: 'solid #0d6efd 3px', boxShadow: '0px 6px 20px 0px rgb(0 0 0 / 30%)' }} id="profile-image1" className='sender-logo-img' src={'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + companylist.filter(comp => comp.vendorId === parseInt(personName[0])).map(item => item.vendorPic)} />
                                                </div>
                                                <div style={{ alignSelf: 'center' }} className='chosen-client'>
                                                    <h2>
                                                        {companylist.filter(comp => comp.vendorId === parseInt(personName[0])).map(item => item.vendorName.toUpperCase())}
                                                    </h2>
                                                </div>


                                            </div>
                                        )
                                        :
                                        (
                                            <div>

                                            </div>

                                        )
                                    }

                                </div>
                                <div className='edit-client-btn-container'>
                                    {personName != "" ?
                                        (
                                            <Button className='edit-client-btn'>
                                                <FontAwesomeIcon onClick={() => { setvendorObject(...companylist.filter(comp => comp.vendorId === parseInt(personName[0])).map(item => item)); seteditvencomModal(true); console.log('CHOSEN', ...companylist.filter(comp => comp.vendorId === parseInt(personName[0]))) }} className="edit-client-icon" icon={faPencil} size='2x' />
                                            </Button>
                                        )
                                        :
                                        (
                                            <div></div>

                                        )
                                    }

                                </div>
                            </div>
                            <div className='client-grid-container'>
                                <div className='client-upper'>
                                    <div className='client-contact-list-container'>
                                        <h4 className='client-contact-container-head'>
                                            Client Contacts {personName != "" ? <Button onClick={() => { setaddcontactModal(true); setvendorObject(...companylist.filter(comp => comp.vendorId === parseInt(personName[0])).map(item => item)) }} className='add-new-contact-btn'>Add Contact <FontAwesomeIcon style={{ color: 'white' }} className="goInv-icon" icon={faPlus} size='1x' /> </Button> : <div></div>}
                                        </h4>
                                        <ul className='list-of-client-contacts'>
                                            {loading == true ?
                                                (
                                                    <Lottie
                                                        loop
                                                        className='loading-animation-object-contact'
                                                        animationData={animationData}
                                                        play
                                                        style={{ height: '30rem' }}
                                                    />
                                                )
                                                :
                                                (
                                                    (userList != "" ?
                                                        (
                                                            (userList.map(contact => (
                                                                <li className='contact-item'>
                                                                    <table className='inventory table'>

                                                                        <tr >
                                                                            <div className='client-contact-info'>
                                                                                <td className="client-contact-id"><img style={{ height: '20px', width: '20px', borderRadius: '50px' }} src={'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + contact.userPic}></img></td>
                                                                                <td className="client-contact-id">{contact.myUserId}</td>
                                                                                <td className="client-contact-name">{contact.FullName}</td>
                                                                                <td className="client-contact-phone">{contact.PhoneNumber}</td>
                                                                                <td className="client-contact-phone">{contact.Email}</td>
                                                                            </div>
                                                                            <td className="className='button-contact-edit">
                                                                                <Button onClick={() => { seteditcontactModal(true); settargetClient(contact); console.log("TARGETED CLIENT", contact) }} className='edit-class-btn'>
                                                                                    <FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' />
                                                                                </Button>
                                                                            </td>
                                                                        </tr></table>
                                                                    {/* <div className='client-contact-info'>
                                                                <p className='client-contact-id'>({contact.myUserId})</p>
                                                                <p className='client-contact-name'>{contact.FullName}</p>
                                                                <p className='client-contact-phone'>{contact.PhoneNumber}</p>
                                                            </div>
                                                            <div className='button-contact-edit'>

                                                            </div> */}

                                                                </li>
                                                            ))
                                                            )
                                                        )
                                                        :
                                                        (
                                                            <h5>No Contacts For This Client</h5>
                                                        )
                                                    )
                                                )

                                            }
                                        </ul>
                                    </div>
                                    <div className='client-information-container'>
                                        <h4 className='client-contact-container-head'>
                                            Client Projects <Button href='project' className='gotoInventory-btn'>Go To Projects <FontAwesomeIcon style={{ color: 'white' }} className="goInv-icon" icon={faArrowRight} size='1x' /> </Button>
                                        </h4>
                                        <div className='client-inventory-chart'>
                                            {/* <ClientInventoryChart Vendor={personName[0]} className='PieChartClientInventory' /> */}
                                            <div className='project-metric-client'>
                                                <ClientTaskProgress Id={personName[0]} className='PieChartClientTask' />
                                                <ClientProjectProgress Id={personName[0]} className='PieChartClientProject' />
                                            </div>
                                            <div className='client-project-details'>
                                                <ClientProjectTable className='project-table-client' clientId={personName[0]} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='client-lower'>

                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="Dispersments" title={<><p className='vendor-tab-title'>Vendor</p><FontAwesomeIcon className="company-icon" icon={faBuildingCircleArrowRight} size='1x' /></>} className="list-tab">

                            <div className='client-dropdown-container' >
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-name-label">Choose A Vendor</InputLabel>
                                    <Select

                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={personName2}
                                        onChange={handleChange2}
                                        input={<OutlinedInput label="Choose A Client" />}
                                        MenuProps={MenuProps}
                                    >
                                        {vendorlist.map((name) => (
                                            <MenuItem
                                                key={name.vendorId}
                                                value={name.vendorId.toString()}
                                                style={getStyles(name.vendorName, personName2, theme)}
                                            >
                                                {name.vendorName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {/* <input type="text" placeholder='Search Company ID' value={searchTextBox} className='search-companyid' onChange={(e) => { setQuery(e.target.value.toLocaleLowerCase()); setsearchTextBox(e.target.value); }} /> */}
                                <div className='Client-Name-Head'>
                                    {personName2 != "" ?
                                        (
                                            <div style={{ display: 'flex' }}>
                                                <div style={{ width: '50%' }} className='sender-logo1'>
                                                    <img style={{ borderRadius: '50px', border: 'solid #0d6efd 3px', boxShadow: '0px 6px 20px 0px rgb(0 0 0 / 30%)' }} id="profile-image1" className='sender-logo-img' src={'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + vendorlist.filter(comp => comp.vendorId === parseInt(personName2[0])).map(item => item.vendorPic)} />
                                                </div>
                                                <div style={{ alignSelf: 'center' }} className='chosen-client'>
                                                    <h2>
                                                        {vendorlist.filter(comp => comp.vendorId === parseInt(personName2[0])).map(item => item.vendorName.toUpperCase())}
                                                    </h2>
                                                </div>


                                            </div>
                                        )
                                        :
                                        (
                                            <div>

                                            </div>

                                        )
                                    }

                                </div>
                                <div className='edit-client-btn-container'>
                                    {personName2 != "" ?
                                        (
                                            <Button className='edit-client-btn'>
                                                <FontAwesomeIcon onClick={() => { setvendorObject(...vendorlist.filter(comp => comp.vendorId === parseInt(personName2[0])).map(item => item)); seteditvencomModal(true); console.log('CHOSEN', ...vendorlist.filter(comp => comp.vendorId === parseInt(personName2[0]))) }} className="edit-client-icon" icon={faPencil} size='2x' />
                                            </Button>
                                        )
                                        :
                                        (
                                            <div></div>

                                        )
                                    }

                                </div>
                            </div>
                            <div className='client-grid-container'>
                                <div className='client-upper'>
                                    <div className='client-contact-list-container'>
                                        <h4 className='client-contact-container-head'>
                                            Vendor Contacts {personName2 != "" ? <Button onClick={() => { setaddcontactModal(true); setvendorObject(...companylist.filter(comp => comp.vendorId === parseInt(personName2[0])).map(item => item)) }} className='add-new-contact-btn'> Add Contact <FontAwesomeIcon style={{ color: 'white' }} className="goInv-icon" icon={faPlus} size='1x' /> </Button> : <div></div>}
                                        </h4>
                                        <ul className='list-of-client-contacts'>
                                            {venUserList != "" ?
                                                (
                                                    (venUserList.map(contact => (
                                                        <li className='contact-item'>
                                                            <table className='inventory table'>

                                                                <tr >
                                                                    <div className='client-contact-info'>
                                                                        <td className="client-contact-id"><img style={{ height: '20px', width: '20px', borderRadius: '50px' }} src={'https://webapi20220126203702.azurewebsites.net/api/blobexplorer/GetBlobFile?url=' + contact.userPic}></img></td>
                                                                        <td className="client-contact-id">{contact.myUserId}</td>
                                                                        <td className="client-contact-name">{contact.FullName}</td>
                                                                        <td className="client-contact-phone">{contact.PhoneNumber}</td>
                                                                        <td className="client-contact-phone">{contact.Email}</td>
                                                                    </div>
                                                                    <td className="className='button-contact-edit">
                                                                        <Button className='edit-class-btn'>
                                                                            <FontAwesomeIcon className="project-done-icon" icon={faPencil} size='1x' />
                                                                        </Button>
                                                                    </td>
                                                                </tr></table>
                                                            {/* <div className='client-contact-info'>
                                                                <p className='client-contact-id'>({contact.myUserId})</p>
                                                                <p className='client-contact-name'>{contact.FullName}</p>
                                                                <p className='client-contact-phone'>{contact.PhoneNumber}</p>
                                                            </div>
                                                            <div className='button-contact-edit'>

                                                            </div> */}

                                                        </li>
                                                    ))
                                                    )
                                                )
                                                :
                                                (
                                                    <h5>No Contacts For This Vendor</h5>
                                                )
                                            }
                                        </ul>
                                    </div>
                                    <div className='client-information-container'>
                                        <h4 className='client-contact-container-head'>
                                            Vendor Inventory <Button href='bookkeeping/inventory' className='gotoInventory-btn'>Go To Inventory <FontAwesomeIcon style={{ color: 'white' }} className="goInv-icon" icon={faArrowRight} size='1x' /> </Button>
                                        </h4>
                                        <div className='client-inventory-chart'>
                                            <ClientInventoryChart Vendor={personName2[0]} className='PieChartClientInventory' />
                                        </div>
                                    </div>
                                </div>
                                <div className='client-lower-vendor'>

                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
                <AddVenComModal id="Vendor-modal-modal"
                    show={vencomModal}
                    onHide={handleshowvencom}
                />
                <EditVenComModal id="Vendor-modal-modal"
                    show={editvencomModal}
                    onHide={handleshoweditvencom}
                    object={vendorObject}
                />
                <AddContactModal id="Vendor-modal-modal"
                    show={addcontactModal}
                    onHide={handleshowaddcontact}
                    object={vendorObject}
                />
                <EditableContactModal id="Vendor-modal-modal"
                    show={editcontactModal}
                    onHide={handleshoweditcontact}
                    object={targetContact}
                />
            </Modal>
        </div >
    )
}
export default VendorCompanyModal