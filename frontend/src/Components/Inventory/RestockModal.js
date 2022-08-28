import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { textSpanIsEmpty } from 'typescript';
import moment from 'moment';


function RestockModal(props) {
    const [invList, setinvList] = useState([]);
    const [invID, setinvID] = useState ("");
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
            axios.get(`getSRLog/getSRLog`)
            .then((response) => {
                setsrLog(response.data);


            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }, [])

    function onRestockIDChange( currentNum) {
        
        
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
    function onRestocknumChange(numofitem) {
        setnewNum(numofitem);
        

    }

    function onRestockChange(){
        var newNumber = (parseInt(currNum) + parseInt(newNum));
        var Restock = {
            InventoryID: invID,
            ItemName: invList.filter(item => item.InventoryID == invID).map(name => name.InventoryName).at(0),
            ItemAmount: invList.filter(item => item.InventoryID == invID).map(name => name.InventoryCost).at(0),
            Sold: false,
            Restocked: true,
            numberSR: newNum,
            NumofInventory: newNumber,
            Clerk: user.FullName,
            Date: moment().format('YYYY-MM-DDTHH:mm:ss')
        }

        axios.put('Restockinventory/RestockInventory', Restock)
        .then(res => {
            console.log("edited time", res.data)
            toast.success(`${"Restocked " + newNum + " Items Successfully!"}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                theme:'dark'
            });
            axios.post('addSRLog/addSRLog', Restock)
            .then(res => {
                var srlog = res.data;
            })
            .catch(err => {
                console.log(err);
            })
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
        console.log("Sold:", Restock);
        props.onHide()
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
            >

                <Modal.Header closeButton>
                    Restock Items
                </Modal.Header>
                <Modal.Body>
                    <h6 className='Restock-update-header'>Restock your items here: </h6>
                    <Form className="Restock-form-container" >

                        <div className='Restock-form'>
                            <Form.Select onChange={onRestockIDChange} className='Restock-select-item'>
                                <option>Select an Item</option>
                                {invList.map((item) => (
                                    <option  id={item.InventoryID} value={item.NumofInventory} className='item-selection'>{item.InventoryName}</option>
                                ))}
                            </Form.Select>
                            <Form.Control onChange={(e) => onRestocknumChange(e.target.value)} type="number" placeholder="Number of items" className='item-amount-sold' />
                        </div>
                        <div className='submit-Restock-container'>
                            <Button onClick={() => {onRestockChange();props.onHide() }}variant="secondary" size="sm">Restock</Button>
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
export default RestockModal