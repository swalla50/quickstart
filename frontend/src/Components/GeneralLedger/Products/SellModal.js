import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { textSpanIsEmpty } from 'typescript';
import moment from 'moment';


function SellModal(props) {
    const [invList, setinvList] = useState([]);
    const [invID, setinvID] = useState("");
    const [invNum, setinvNum] = useState("");
    const [currNum, setcurrNum] = useState("");
    const [newNum, setnewNum] = useState("");
    const [user, setUser] = useState("");
    const [srLog, setsrLog] = useState([]);


    useEffect(() => {
        axios.get(`getinventory/getInventoryList`)
            .then((response) => {
                setinvList(response.data.filter(inv => inv.isDeleted == false));
            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
        axios.get(`UserProfile`)
            .then((res) => {
                setUser(res.data)

                console.log(user)



            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }, [])

    function onsellIDChange(currentNum) {


        const select = currentNum.target;
        const id = select.children[select.selectedIndex].id;
        const newNumber = select.children[select.selectedIndex].value
        setcurrNum(newNumber);
        setinvID(id);
        // var event = document.getElementById('item-selection').value
        axios.get(`getSRLog/getSRLog`)
        .then((response) => {
            setsrLog(response.data);


        })
        .catch((err) => {
            console.log(err, "Unable to get user time info");
        });
        console.log("id", newNumber, id)

    }
    function onsellnumChange(numofitem) {
        setnewNum(numofitem);


    }

    function onSellChange() {
        var newNumber = currNum - newNum;
        var Sold = {
            InventoryID: invID,
            ItemName: invList.filter(item => item.InventoryID == invID).map(name => name.InventoryName).at(0),
            ItemAmount: invList.filter(item => item.InventoryID == invID).map(name => name.InventoryCost).at(0),
            Sold: true,
            Restocked: false,
            numberSR: newNum,
            NumofInventory: newNumber,
            Clerk: user.FullName,
            Date: moment().format('YYYY-MM-DDTHH:mm:ss')
        }

        axios.put('sellinventory/sellInventory', Sold)
            .then(res => {
                console.log("edited time", res.data)
                toast.success(`${"Sold " + newNum + " Items Successfully!"}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: 'dark'
                });
                axios.get(`getinventory/getInventoryList`)
                    .then((response) => {
                        setinvList(response.data.filter(inv => inv.isDeleted == false));

                    })
                    .catch((err) => {
                        console.log(err, "Unable to get user time info");
                    });
            })
            .catch(err => {
                console.log(err);
            })
            axios.post('addSRLog/addSRLog', Sold)
            .then(res => {
                var srlog = res.data;
            })
            .catch(err => {
                console.log(err);
            })
            axios.get(`getSRLog/getSRLog`)
            .then((response) => {
                setsrLog(response.data);


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
            props.onHide()
        console.log("Sold:", Sold);
    }

    function onoptionclick(event) {
        setinvID(event);
        console.log("ccon: ", event)
    }
    return (
        <div className='SellModal'>

            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-width-sell"
                contentClassName="modal-height-sell"
            >

                <Modal.Header closeButton>
                    Sell Items
                </Modal.Header>
                <Modal.Body>
                    <h6 className='sell-update-header'>Sell your items here: </h6>
                    <Form className="sell-form-container" >

                        <div className='sell-form'>
                            <Form.Select onChange={onsellIDChange} className='sell-select-item'>
                                <option>Select an Item</option>
                                {invList.map((item) => (
                                    <option id={item.InventoryID} value={item.NumofInventory} className='item-selection'>{item.InventoryName}</option>
                                ))}
                            </Form.Select>
                            <Form.Control onChange={(e) => onsellnumChange(e.target.value)} type="number" placeholder="Number of items" className='item-amount-sold' />
                        </div>
                        <div className='submit-sell-container'>
                            <Button onClick={() => { onSellChange(); props.onHide() }} variant="secondary" size="sm">Sell</Button>
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
export default SellModal