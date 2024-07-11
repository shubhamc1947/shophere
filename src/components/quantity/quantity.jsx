
import React from "react";
import { useState } from "react";

export default function Quantity({productId, setQuantity}) {
    const products = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : [];
    const productFind = products.find((item) => item.id === productId);
    const [qty, setQty] = useState(productFind.quantity);


    const updateLocalStorageCart = ()=>{
        localStorage.setItem('cartData', JSON.stringify(products));
        setQuantity(productFind.quantity);
        setQty(productFind.quantity);
    }

    const handleMinusButton = () => {
        productFind.quantity = qty - 1 > 0 ? (qty - 1) : 1;
        updateLocalStorageCart();
    }
    const handlePlusButton = () => {
        productFind.quantity = qty < productFind.stock ? qty + 1 : qty;
        updateLocalStorageCart();
    }




    return (
        <>
            <div className="col-md-4 col-6 mb-3">
                <label className="mb-2 d-block">Quantity</label>
                <div className="input-group mb-3" style={{ width: "170px" }}>
                    <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark" onClick={() => (handleMinusButton())}>
                        <i className="fas fa-minus"></i>
                    </button>
                    <input type="text" className="form-control text-center border border-secondary" value={qty} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                    <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark" onClick={() => (handlePlusButton())}>
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </>
    )
}