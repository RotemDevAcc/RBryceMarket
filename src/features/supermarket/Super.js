import React, { useEffect, useState } from 'react'
import { addProduct } from './cartSlice'
import { selectproducts, selectstatus, getDataAsync, selectcategories } from './superSlice';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './Cart';
import { TargetServer } from '../settings/Settings';
const Super = () => {
    const MY_SERVER = TargetServer
    const superproducts = useSelector(selectproducts)
    const [mappedProducts, setMappedProducts] = useState([]);
    const [mappedCategories, setMappedCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const supercategories = useSelector(selectcategories)
    const status = useSelector(selectstatus)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataAsync())
    }, [dispatch])


    useEffect(() => {
        if (status === "done") {
            const productsList = superproducts.map((prod, index) => (
                <div key={index} className="card mb-3" style={{ maxWidth: 540 }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={`${MY_SERVER}static${prod.img}`} alt="" className="img-fluid" style={{ width: 100, height: 100 }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{prod.name}</h5>
                                <p className="card-text">Description: {prod.desc}</p>
                                <p className="card-text">Category: {supercategories.filter(category => category.id === prod.category)[0].desc || "None"}</p>
                                <p className="card-text">Price: ${prod.price}</p>
                                <button className="btn btn-primary" onClick={() => dispatch(addProduct({ id: prod.id, name: prod.name, price: prod.price }))}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            ));
            const categoriesList = supercategories.map((category, index) => (
                <li key={index} className="nav-item">
                    <button className="nav-link btn btn-link" onClick={() => console.log(category.id)}>{category.desc}</button>
                </li>
            ))
            setMappedCategories(categoriesList);
            setMappedProducts(productsList);
        } else {
            setMappedProducts([]);
            setMappedCategories([]);
        }
    }, [MY_SERVER,status, superproducts, supercategories, dispatch]);

    useEffect(() => {
        if (status === 'done') {
            const filteredData = superproducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            const productsList = filteredData.map((prod, index) => (
                <div key={index} className="card mb-3" style={{ maxWidth: 540 }}>
                    <div key={index} className="card mb-3" style={{ maxWidth: 540 }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={`${MY_SERVER}static${prod.img}`} alt="" className="img-fluid" style={{ width: 100, height: 100 }} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{prod.name}</h5>
                                    <p className="card-text">Description: {prod.desc}</p>
                                    <p className="card-text">Category: {supercategories.filter(category => category.id === prod.category)[0].desc || "None"}</p>
                                    <p className="card-text">Price: ${prod.price}</p>
                                    <button className="btn btn-primary" onClick={() => dispatch(addProduct({ id: prod.id, name: prod.name, price: prod.price }))}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ));

            setFilteredProducts(productsList);
        }
    }, [MY_SERVER,supercategories, searchQuery, status, superproducts, dispatch]);

    useEffect(() => {
        if (status === 'done') {
            const productsList = superproducts
                .filter((prod) => selectedCategoryId === null || prod.category === selectedCategoryId)
                .map((prod, index) => (
                    <div key={index} className="card mb-3" style={{ maxWidth: 540 }}>

                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={`${MY_SERVER}static${prod.img}`} alt="" className="img-fluid" style={{ width: 100, height: 100 }} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{prod.name}</h5>
                                    <p className="card-text">Description: {prod.desc}</p>
                                    <p className="card-text">Category: {supercategories.filter(category => category.id === prod.category)[0].desc || "None"}</p>
                                    <p className="card-text">Price: ${prod.price}</p>
                                    <button className="btn btn-primary" onClick={() => dispatch(addProduct({ id: prod.id, name: prod.name, price: prod.price }))}>Add To Cart</button>
                                </div>
                            </div>
                        </div>

                    </div>
                ));

            const categoriesList = supercategories.map((category, index) => (
                <li key={index} className="nav-item">
                    <button className="nav-link btn btn-link" onClick={() => handleCategoryClick(category.id)}>
                        {category.desc}
                    </button>
                </li>
            ));

            setMappedCategories(categoriesList);
            setMappedProducts(productsList);
        } else {
            setMappedProducts([]);
            setMappedCategories([]);
        }
    }, [MY_SERVER,status, superproducts, supercategories, selectedCategoryId, dispatch]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    return (
        <div>
            {status === "done" ? <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <span className="navbar-brand">Categories:</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item"> <button className="nav-link btn btn-link" onClick={() => handleCategoryClick(null)}>All Products</button> </li>
                            {mappedCategories}
                        </ul>
                    </div>
                </nav>
                <div className="row">
                    <div className="col-md-8">
                        <div>
                            {searchQuery.length > 0 ? filteredProducts : mappedProducts}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input type="text" placeholder="Search products..." className="form-control" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <Cart />
                    </div>
                </div>
            </div> : (
                status === "rejected" ? <h1 style={{ textAlign: "center" }}>The Supermarket is currently unavailable</h1> : <h1 style={{ textAlign: "center" }}>Loading Products...</h1>
            )}

        </div>

    )
}

export default Super