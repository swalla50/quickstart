import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartFlatbed, faCoins } from '@fortawesome/free-solid-svg-icons'
import { Tabs, Tab } from 'react-bootstrap'
import './Bookkeepingfunc.css'
import GL from '../GeneralLedger/GL'
import InventoryModal from '../Inventory/InventoryModal'

function Bookkeepingfunc() {

    const [GLModal, setGLModal] = useState(false);
    const [inventoryModal, setinventoryModal] = useState(false);

    const handleshowgl = () => {
        setGLModal(false);
    }
    const handleshowinv = () => {
        setinventoryModal(false);
    }


    return (
        <div className='Bookkeeping'>
            <ul className='Bookkeeping-options'>
                <li onClick={() => setGLModal(true)} className='bk-option'>
                    <div className='bk-option-name'>
                        <h3 className='bookkeeping-otpion-header'>GENERAL LEDGER</h3>

                    </div>
                    <FontAwesomeIcon className="bk-coin-icon" icon={faCoins} size='5x' />
                </li>
                <li onClick={() => setinventoryModal(true)} className='bk-option'>
                    <div className='bk-option-name'>
                        <h3 className='bookkeeping-otpion-header'>INVENTORY</h3>

                    </div>
                    <FontAwesomeIcon className="bk-coin-icon" icon={faCartFlatbed} size='5x' />
                </li>
            </ul>
            <GL id="GL-modal-modal"
                show={GLModal}
                onHide={handleshowgl}
            />
            <InventoryModal id="inventory-modal-modal"
                show={inventoryModal}
                onHide={handleshowinv}
            />
        </div>
    )
}

export default Bookkeepingfunc