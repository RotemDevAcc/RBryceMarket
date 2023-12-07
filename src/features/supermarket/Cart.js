import React from 'react'
import { addProduct, clearCart, removeProduct, selectCart } from './cartSlice'
import { useSelector, useDispatch } from 'react-redux';
import { purchaseCart } from './superSlice';
const Cart = () => {
    const myCart = useSelector(selectCart)
    const dispatch = useDispatch();
    return (
        <div className="card">
            <div className="card-header">
                Shopping Cart
            </div>
            <ul className="list-group list-group-flush" id="cart-items">
                {myCart.map((prod, index) => (
                    <li key={index} className="list-group-item">
                        {prod.name} - {prod.id}
                        <div className="d-flex justify-content-between align-items-center">
                            <span>{prod.name} (Count: {prod.count}) - {5000}</span>
                            <button className="btn btn-sm btn-danger" onClick={() => dispatch(removeProduct({ prodid: prod.id }))}>X</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="card-body">
                <div className="card-header">
                    {}
                </div>
                <button className="btn btn-primary" onClick={()=>dispatch(purchaseCart({}))}>
                    Checkout
                </button>
                <button className="btn btn-danger" onClick={()=>dispatch(clearCart())}>
                    Clear Cart
                </button>
            </div>
        </div>
    )
}

export default Cart