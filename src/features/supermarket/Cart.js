import React, { useState } from 'react'
import { clearCart, removeProduct, selectCart, selectPrice } from './cartSlice'
import { useSelector, useDispatch } from 'react-redux';
import { purchaseCart } from './superSlice';
import { Modal, Button } from 'react-bootstrap';
import { get_user_token } from '../login/loginSlice';

const Cart = () => {
    const myCart = useSelector(selectCart)
    const token = useSelector(get_user_token);
    const totalPrice = useSelector(selectPrice)
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [modalmessage, setModalMessage] = useState("")
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // const show_dialog = async () => {
    //     const confirmationMessage = `Are you sure you want to purchase all the items for $${totalPrice}?`;
    //     setModalMessage(confirmationMessage);
    //     handleShow();

    //     const isConfirmed = await myconfirm();
    //     if (isConfirmed) {
    //         Message('Purchasing', 'success');
    //         // Proceed with the purchase logic
    //         // ...
    //     } else {
    //         Message('Purchase canceled.', 'error');
    //     }
    // };
    const show_dialog = async () => {
        const confirmationMessage = `Are you sure you want to purchase all the items for $${totalPrice}?`;
        setModalMessage(confirmationMessage);
        handleShow();
    };

    const handleConfirm = () => {
        handleClose();
        
        console.log(myCart)
        dispatch(purchaseCart({"cart":myCart,"token":token,"price":Number(totalPrice)}));
    };

    const handleCancel = () => {
        handleClose();
    };


    // const myconfirm = () => {
    //     return new Promise((resolve) => {
    //         // Resolve the promise with true when Confirm button is clicked
    //         const handleConfirm = () => {
    //             handleClose();
    //             resolve(true);
    //         };

    //         // Resolve the promise with false when Cancel button is clicked
    //         const handleCancel = () => {
    //             handleClose();
    //             resolve(false);
    //         };

    //         return { handleConfirm, handleCancel };
    //     });
    // };

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    Shopping Cart
                </div>
                <ul className="list-group list-group-flush" id="cart-items">
                    {myCart.map((prod, index) => (
                        <li key={index} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                                <span>{prod.name} (Count: {prod.count}) - {(prod.price * prod.count).toFixed(2)}</span>
                                <button className="btn btn-sm btn-danger" onClick={() => dispatch(removeProduct({ prodid: prod.id }))}>X</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="card-body">
                    <h5>${totalPrice}</h5>
                    {/* <div className="card-header"> */}


                    {/* </div> */}
                    <button className="btn btn-primary" onClick={() => show_dialog()} style={{ margin: 5 }}>
                        Checkout
                    </button>
                    <button className="btn btn-danger" onClick={() => dispatch(clearCart())}>
                        Clear Cart
                    </button>


                </div>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalmessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Cart