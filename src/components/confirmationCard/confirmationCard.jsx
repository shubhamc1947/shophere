import React from "react";



export default function ConfirmationCard(props) {
    const { orderId } = props;
    const orderDetails = (JSON.parse(localStorage.getItem("orderInfo")) || []).find(order => order.paymentId === orderId);


    return (
        <div className="card" style={{ borderRadius: '10px' }}>
            <div className="card-header px-4 py-5">
                <h5 className="text-muted mb-0">Thanks for your Order, <span style={{ color: '#3a72cb' }}>{orderDetails?.billingDetails.name}</span>!</h5>
            </div>
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0" style={{ color: '#3a72cb' }}>Receipt</p>
                    <p className="small text-muted mb-0">Receipt Voucher : {orderDetails?.paymentId}</p>
                </div>
                <div className="card shadow-0 border mb-4">
                    <div className="card-body">
                        {
                            orderDetails?.billingDetails.cartItem.map((item, index) => (
                                <>
                                    <div className="row">
                                        {/* Image */}
                                        <div className="col-md-2">
                                            <img src={item.thumbnail} className="img-fluid" alt="Phone" />
                                        </div>
                                        <div className="col-md-2">
                                            <p className="text-muted mb-0">{item.title}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <p className="text-muted mb-0 small">Category: {item.category}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <p className="text-muted mb-0 small">Brand: {item.brand}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <p className="text-muted mb-0 small">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="col-md-2 font-bold">
                                            <p className="text-muted mb-0 small">&#8377;{item.price * item.quantity}</p>
                                        </div>
                                        {/* Track Order */}
                                        {/* <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                                                <p className="text-muted mb-0 small">Track Order</p>
                                                <div className="progress" style={{ height: '6px', borderRadius: '16px' }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: '65%', borderRadius: '16px', backgroundColor: '#a8729a' }} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <div className="d-flex justify-content-around mb-1">
                                                    <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivery</p>
                                                    <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                                                </div>
                                            </div> */}
                                    </div>
                                    <hr className="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: '1' }} />

                                </>
                            ))
                        }

                    </div>
                </div>

                {/* Order Summary */}
                <div className="d-flex justify-content-between pt-2">
                    <p className="fw-bold mb-0">Order Details</p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span>&#8377;{orderDetails?.billingDetails?.OrderSummary?.subTotal}</p>
                </div>

                {/* Additional details */}
                <div className="d-flex justify-content-between pt-2">
                    <p className="text-muted mb-0">Invoice Number : {orderDetails?.billingDetails.order_receipt}</p>
                    {/* <p className="text-muted mb-0"><span className="fw-bold me-4">Discount</span> ${orderDetails.billingDetails.OrderSummary.discount}</p> */}
                </div>
                <div className="d-flex justify-content-between">
                    <p className="text-muted mb-0">Invoice Date : {orderDetails?.date}</p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4">TAX </span>&#8377; {orderDetails?.billingDetails.OrderSummary.tax}</p>
                </div>
                <div className="d-flex justify-content-between mb-5">
                    <p className="text-muted mb-0">Receipts Voucher : {orderDetails?.paymentId}</p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges</span>&#8377; {orderDetails?.billingDetails.OrderSummary.shipping}</p>
                </div>
            </div>
            <div className="card-footer border-0 px-4 py-5" style={{ backgroundColor: '#3a72cb', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total paid: <span className="h2 mb-0 ms-2">&#8377;{orderDetails?.billingDetails.OrderSummary.total}</span></h5>
            </div>
        </div>
    )
}