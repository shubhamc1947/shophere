import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import BillingDetails from "../components/checkout/billingDetails";
import OrderSummary from "../components/checkout/orderSummary";
import { useNavigate } from "react-router-dom";
import { cartLength } from "../contextApi/navbarValues";
import useRazorpay from "react-razorpay";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
export default function CheckoutPage() {
    const navigate = useNavigate()
    const [Razorpay] = useRazorpay();
    const getPreviousOrder = JSON.parse(localStorage.getItem("orderInfo")) || [];
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    //eslint-disable-next-line
    const [cartLengthValue, setCartLengthValue] = useContext(cartLength);
    const [billingDetails, setBillingDetails] = useState({
        id: "",
        userName: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        city: "",
        postalCode: "",
        shippingAddress: {
            name: "",
            phone: "",
            address: "",
        },
        cartItem: {},
        OrderSummary: {
            subTotal: 0,
            tax: 0,
            shipping: 0,
            total: 0
        }

    });


    const proceesToPayButtonHandler = () => {
        if (userData == null) {
            navigate("/login")
        }

        handlePayment();
    }
    const handlePayment = async () => {
        if (billingDetails.name === "" || billingDetails.address === "" || billingDetails.postalCode === "" || billingDetails.phone === ""
            || billingDetails.city === "" || billingDetails.country === "" || billingDetails.shippingAddress.name === "" || billingDetails.shippingAddress.phone === "" || billingDetails.shippingAddress.address === "") {
            return toast.error("All fields are required", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
        if (billingDetails.phone.length !== 10) {
            return toast.error("Mobile no must be 10 digits", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

        var options = {
            key: "rzp_test_AiaIOGJgyjsVV0",
            key_secret: "TRw0SgAKJdjHYhyJQ2jFlEjh",
            amount: parseInt(billingDetails.OrderSummary.total * 100),
            currency: "INR",
            order_receipt: 'order_rcptid_123',
            name: "ShopHere",
            description: "for testing purpose",
            prefill: {
                contact: billingDetails.phone,
                name: billingDetails.name
            },
            handler: function (response) {
                const paymentId = response.razorpay_payment_id
                // store in localStorage 
                const orderInfo = {
                    billingDetails: billingDetails,
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    ),
                    paymentId
                }

                localStorage.setItem("orderInfo", JSON.stringify([...getPreviousOrder, orderInfo]))
                localStorage.removeItem("cartData");
                setCartLengthValue(0);
                navigate("/confirmation/" + orderInfo.paymentId)
            },

            theme: {
                color: "#3399cc"
            }
        };
        // var pay = new window.Razorpay(options);
        // pay.open();
        const rzpay = new Razorpay(options);
        rzpay.open();


    }
    useEffect(() => {
        if (!userData) return;
    
        setBillingDetails(prev => ({
            ...prev,
            cartItem: JSON.parse(localStorage.getItem("cartData")),
            name: [userData?.firstName, userData?.lastName].filter(Boolean).join(" "),
            email: userData?.email,
            id: userData?.id,
            userName: userData?.username,
            address: userData?.address?.address,
            city: userData?.address?.city,
            postalCode: userData?.address?.postalCode,
            order_receipt: 'order_rcptid_' + Math.round(Math.random() * 10000000000),
        }));
    }, []);    


    return (
        <>

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
            <div className="container checkout mt-5">
                <div className="row">
                    <div className="col-xl-8 mb-3">
                        <BillingDetails billingDetails={billingDetails} setBillingDetails={setBillingDetails} />
                        <div class="row my-4">
                            <div class="col">
                                <Link to={"/shop"} class="btn btn-link text-muted">
                                    <i class="mdi mdi-arrow-left me-1"></i> Continue Shopping
                                </Link>
                            </div>
                            <div class="col">
                                <div class="text-end mt-2 mt-sm-0">
                                    <button class="btn btn-success" id="form-submit" onClick={proceesToPayButtonHandler}> <i class="mdi mdi-cart-outline me-1"></i> Procced </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <OrderSummary billingDetails={billingDetails} setBillingDetails={setBillingDetails} />
                    </div>
                </div>
            </div>


        </>
    )
}