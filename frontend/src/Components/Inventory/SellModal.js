import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { textSpanIsEmpty } from 'typescript';


function SellModal(props) {
    const [invList, setinvList] = useState([]);
    const [invID, setinvID] = useState ("");
    const [invNum, setinvNum] = useState("");
    const [currNum, setcurrNum] = useState("");
    const [newNum, setnewNum] = useState("");


    useEffect(() => {
        axios.get(`getinventory/getInventoryList`)
            .then((response) => {
                setinvList(response.data.filter(inv => inv.isDeleted == false));
            })
            .catch((err) => {
                console.log(err, "Unable to get user time info");
            });
    }, [])

    function onsellIDChange( currentNum,  newid) {
        
        setcurrNum(currentNum);
        // var event = document.getElementById('item-selection').value
        
        console.log("id", currentNum, newid)

    }
    function onsellnumChange(numofitem) {
        setinvNum(numofitem);
        

    }

    function onSellChange(){
        var newNumber = currNum - invNum;
        var Sold = {
            InventoryID: invID,
            NumofInventory: invNum,
            currentNum: currNum,
            newNumber: newNumber
        }
        
        console.log("Sold:", Sold);
    }

    function onoptionclick(event){
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
                            <Form.Select onChange={(e) => onsellIDChange(e.target.id)} className='sell-select-item'>
                                <option>Select an Item</option>
                                {invList.map((item) => (
                                    <option  id={item.InventoryID} value={item.NumofInventory} onChange={(e) => onsellIDChange(e.target.id)} className='item-selection'>{item.InventoryName}</option>
                                ))}
                            </Form.Select>
                            <Form.Control onChange={(e) => onsellnumChange(e.target.value)} type="number" placeholder="Number of items" className='item-amount-sold' />
                        </div>
                        <div className='submit-sell-container'>
                            <Button onClick={onSellChange}variant="secondary" size="sm">Sell</Button>
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