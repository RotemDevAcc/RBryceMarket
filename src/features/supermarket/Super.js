import React, { useEffect, useState } from 'react'
import { addProduct } from './cartSlice'
import { selectproducts, purchaseCart, selectstatus, getDataAsync } from './superSlice';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './Cart';
const Super = () => {
    const MY_SERVER = 'http://127.0.0.1:8000/'
    const superproducts = useSelector(selectproducts)
    const [mappedProducts, setMappedProducts] = useState([]);
    const status = useSelector(selectstatus)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDataAsync())
    }, [dispatch])

    useEffect(() => {
        if (status === "Done") {
            const productsList = superproducts.products.map((prod, index) => (
                <div key={index} className="card mb-3" style={{maxWidth:540}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={MY_SERVER + prod.img} alt="" className="img-fluid" style={{ width: 100, height: 100 }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{prod.name}</h5>
                                <p className="card-text">Description: {prod.desc}</p>
                                <p className="card-text">Category: {null}</p>
                                <p className="card-text">Price: ${prod.price}</p>
                                <button className="btn btn-primary" onClick={() => dispatch(addProduct({ id: prod.id, name: prod.name, price: prod.price }))}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            ));
            setMappedProducts(productsList);
        } else {
            setMappedProducts([]);
        }
    }, [status, superproducts.products, dispatch]);
    return (
    
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div id="productlist">
                        {mappedProducts}
                        <button className="btn btn-success" onClick={() => dispatch(purchaseCart({}))}>
                            Checkout
                        </button>
                    </div>
                </div>
                <div className="col-md-4">
                    <Cart />
                </div>
            </div>
        </div>
        
    )
}

export default Super