import React, {useState,useEffect} from "react";
import "./checkout.css";
import {Link} from "react-router-dom";


export default function OrderSummary({billingDetails, setBillingDetails}) {
    const products =  localStorage.getItem("cartData") ? JSON.parse(localStorage.getItem("cartData")) : [];
    const [price, setPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [tax, setTax] = useState(0);
    const [shipping, setShipping] = useState(0);

    useEffect(() => {
        if (products.length !== 0) {
            let totalPrice = 0;
            let totalPriceWithoutTax = 0;

            products?.forEach(item => {
                totalPriceWithoutTax += item.price * item.quantity;
            });

            const tax = Math.round(totalPriceWithoutTax * 0.1);
            const shipping = totalPriceWithoutTax > 1000 ? 0 : 50;

            totalPrice = totalPriceWithoutTax + tax + shipping;
            setTax(Math.round(tax));
            setShipping(Math.round(shipping));
            setPrice(Math.round(totalPriceWithoutTax));
            setTotalPrice(Math.round(totalPrice));
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        setBillingDetails({
            ...billingDetails,
            OrderSummary: {
                subTotal: price,
                tax: tax,
                shipping: shipping,
                total: totalPrice
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPrice, tax, shipping,price]);


    return (
        <>
            <div className="card checkout-order-summary">
                <div className="card-body">
                    <div className="p-3 bg-light mb-3">
                        <h5 className="font-size-16 mb-0">Order Summary <span className="float-end ms-2">{billingDetails.order_receipt}</span></h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-centered mb-0 table-nowrap">
                            <thead>
                                <tr>
                                    <th className="border-top-0" style={{ width: "110px" }} scope="col">Product</th>
                                    <th className="border-top-0" scope="col">Product Desc</th>
                                    <th className="border-top-0" scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product, index) => {
                                        return (
                                            <tr key={product.id}>
                                                <th scope="row"><img src={product.thumbnail} alt="product-img" title="product-img" className="avatar-lg rounded" /></th>
                                                <td>
                                                    <h5 className="font-size-16 text-truncate"><Link to={"/singleproduct/"+product.id} className="text-dark">{product.title}</Link></h5>
                                                    <p className="text-muted mb-0 mt-1">Rs. {product.price} x {product.quantity}</p>
                                                </td>
                                                <td>Rs. {product.price * product.quantity}</td>
                                            </tr>
                                        )
                                    })
                                }

                                <tr>
                                    <td colSpan="2">
                                        <h5 className="font-size-14 m-0">Sub Total :</h5>
                                    </td>
                                    <td>
                                        Rs. {price}
                                    </td>
                                </tr>
                                {/* <tr>
                                    <td colspan="2">
                                        <h5 className="font-size-14 m-0">Discount :</h5>
                                    </td>
                                    <td>
                                        - $ 78
                                    </td>
                                </tr> */}

                                <tr>
                                    <td colSpan="2">
                                        <h5 className="font-size-14 m-0">Shipping Charge :</h5>
                                    </td>
                                    <td>
                                        Rs. {shipping}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <h5 className="font-size-14 m-0">Estimated Tax :</h5>
                                    </td>
                                    <td>
                                        Rs. {tax}
                                    </td>
                                </tr>

                                <tr className="bg-light">
                                    <td colSpan="2">
                                        <h5 className="font-size-14 m-0">Total:</h5>
                                    </td>
                                    <td>
                                        Rs. {totalPrice}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}