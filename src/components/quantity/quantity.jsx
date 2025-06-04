import React from "react";
import { useState, useEffect } from "react";

export default function Quantity({productId, setQuantity}) {
    const [qty, setQty] = useState(1);
    const [productData, setProductData] = useState(null);

    // Initialize component state
    useEffect(() => {
        const products = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : [];
        const productFind = products.find((item) => item.id === productId);
        
        if (productFind) {
            setQty(productFind.quantity);
            setProductData(productFind);
        }
    }, [productId]);

    const updateLocalStorageCart = (newQuantity) => {
        const products = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : [];
        const productIndex = products.findIndex((item) => item.id === productId);
        
        if (productIndex !== -1) {
            products[productIndex].quantity = newQuantity;
            localStorage.setItem('cartData', JSON.stringify(products));
            setQuantity(newQuantity); // Update parent component
        }
    }

    const handleMinusButton = () => {
        const newQty = qty - 1 > 0 ? qty - 1 : 1;
        setQty(newQty);
        updateLocalStorageCart(newQty);
    }

    const handlePlusButton = () => {
        const maxQty = productData?.stock || 99; // Fallback if stock is undefined
        const newQty = qty < maxQty ? qty + 1 : qty;
        setQty(newQty);
        updateLocalStorageCart(newQty);
    }

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        const maxQty = productData?.stock || 99;
        const newQty = Math.max(1, Math.min(value, maxQty)); // Ensure value is between 1 and stock
        
        setQty(newQty);
        updateLocalStorageCart(newQty);
    }

    return (
        <>
            <div className="col-md-4 col-6 mb-3">
                <label className="mb-2 d-block">Quantity</label>
                <div className="input-group mb-3" style={{ width: "170px" }}>
                    <button 
                        className="btn btn-white border border-secondary px-3" 
                        type="button" 
                        id="button-addon1" 
                        data-mdb-ripple-color="dark" 
                        onClick={handleMinusButton}
                        disabled={qty <= 1}
                    >
                        <i className="fas fa-minus"></i>
                    </button>
                    <input 
                        type="number" 
                        className="form-control text-center border border-secondary" 
                        value={qty} 
                        onChange={handleInputChange}
                        min="1"
                        max={productData?.stock || 99}
                        aria-label="Quantity input"
                    />
                    <button 
                        className="btn btn-white border border-secondary px-3" 
                        type="button" 
                        id="button-addon2" 
                        data-mdb-ripple-color="dark" 
                        onClick={handlePlusButton}
                        disabled={qty >= (productData?.stock || 99)}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </>
    )
}