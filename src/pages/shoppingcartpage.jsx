import React, { useEffect, useState } from "react";
import CartItem from "../components/shoppingcart/cartItem";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const ShoppingCartPage = () => {
    const [cart, setCart] = useState(localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : []);
    const [price, setPrice] = useState(0);
    const [toalPrice, setTotalPrice] = useState(0);
    const [tax, setTax] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [wishList, setWishList] = useState(localStorage.getItem('wishListData') ? JSON.parse(localStorage.getItem('wishListData')) : []);



    useEffect(() => {
        const cart = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : [];
        if (cart.length !== 0) {

            let totalPrice = 0;
            let totalPriceWithoutTax = 0;

            cart?.forEach(item => {
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
    }, [cart, wishList, quantity])

    return (
        <div>
            <ToastContainer position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                limit={3} />
            <section className="h-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Cart - {cart.length} items</h5>
                                </div>
                                <div className="card-body">
                                    {
                                        cart?.map((product, index) => (
                                            <CartItem product={product} key={index}
                                                setCart={setCart}
                                                setWishList={setWishList}
                                                setQuantity={setQuantity}
                                            />
                                        ))}

                                </div>
                            </div>

                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body">
                                    <p><strong>We accept</strong></p>
                                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg" alt="Visa" />
                                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg" alt="American Express" />
                                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg" alt="Mastercard" />
                                    {/* <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp" alt="PayPal acceptance mark" /> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Products Price
                                            <span>Rs. {price}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                            Shipping Charge
                                            <span>Rs. {shipping}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                            Tax
                                            <span>Rs. {tax}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Total amount</strong>
                                                <strong>
                                                    <p className="mb-0">(including VAT)</p>
                                                </strong>
                                            </div>
                                            <span><strong>Rs. {toalPrice}</strong></span>
                                        </li>
                                    </ul>
                                    <Link to="/checkout" type="button" className="btn btn-primary btn-lg btn-block">Go to checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default ShoppingCartPage;