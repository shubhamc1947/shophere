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
        // Check for empty fields and create precise error messages
        const emptyFields = [];

        if (billingDetails.name === "") emptyFields.push("Name");
        if (billingDetails.address === "") emptyFields.push("Address");
        if (billingDetails.postalCode === "") emptyFields.push("Postal Code");
        if (billingDetails.phone === "") emptyFields.push("Phone");
        if (billingDetails.city === "") emptyFields.push("City");
        if (billingDetails.country === "") emptyFields.push("Country");
        if (billingDetails.shippingAddress.name === "") emptyFields.push("Shipping Name");
        if (billingDetails.shippingAddress.phone === "") emptyFields.push("Shipping Phone");
        if (billingDetails.shippingAddress.address === "") emptyFields.push("Shipping Address");

        if (emptyFields.length > 0) {
            let errorMessage;
            
            if (emptyFields.length === 1) {
                errorMessage = `${emptyFields[0]} is required`;
            } else if (emptyFields.length === 2) {
                errorMessage = `${emptyFields[0]} and ${emptyFields[1]} are required`;
            } else {
                // For 3 or more fields
                const lastField = emptyFields.pop();
                errorMessage = `${emptyFields.join(', ')}, and ${lastField} are required`;
            }
            
            return toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000, // Increased time for longer messages
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
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
    const [orderReceipt] = useState(() => 'order_rcptid_' + Math.round(Math.random() * 10000000000));

    const [cartData, setCartData] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("cartData")) || {};
        } catch {
            return {};
        }
    });
    
    // Optional: Add an effect to listen for storage changes (if needed)
    useEffect(() => {
        function handleStorageChange() {
            try {
                const newCart = JSON.parse(localStorage.getItem("cartData")) || {};
                setCartData(prev => {
                    // Only update if changed (simple shallow check)
                    if (JSON.stringify(prev) !== JSON.stringify(newCart)) {
                        return newCart;
                    }
                    return prev;
                });
            } catch {
                // ignore parse errors
            }
        }
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    
    useEffect(() => {
        if (!userData) return;
    
        setBillingDetails(prev => {
            // Avoid unnecessary updates if values are the same
            const newCartItem = cartData;
            const newName = [userData?.firstName, userData?.lastName].filter(Boolean).join(" ");
            const newEmail = userData?.email;
            const newId = userData?.id;
            const newUserName = userData?.username;
            const newAddress = userData?.address?.address;
            const newCity = userData?.address?.city;
            const newPostalCode = userData?.address?.postalCode;
    
            // Check if anything changed to avoid updating state unnecessarily
            if (
                prev.cartItem === newCartItem &&
                prev.name === newName &&
                prev.email === newEmail &&
                prev.id === newId &&
                prev.userName === newUserName &&
                prev.address === newAddress &&
                prev.city === newCity &&
                prev.postalCode === newPostalCode &&
                prev.order_receipt === orderReceipt
            ) {
                return prev; // no changes, no update
            }
    
            return {
                ...prev,
                cartItem: newCartItem,
                name: newName,
                email: newEmail,
                id: newId,
                userName: newUserName,
                address: newAddress,
                city: newCity,
                postalCode: newPostalCode,
                order_receipt: orderReceipt,
            };
        });
    }, [userData, cartData, orderReceipt]);
    

    // useEffect(() => {
    //     console.log("userData updated", userData);
    // }, [userData]);


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
                        <div className="row my-4">
                            <div className="col">
                                <Link to={"/shop"} className="btn btn-link text-muted">
                                    <i className="mdi mdi-arrow-left me-1"></i> Continue Shopping
                                </Link>
                            </div>
                            <div className="col">
                                <div className="text-end mt-2 mt-sm-0">
                                    <button className="btn btn-success" id="form-submit" onClick={proceesToPayButtonHandler}> <i className="mdi mdi-cart-outline me-1"></i> Procced </button>
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