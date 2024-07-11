import React from "react";
import { Link } from "react-router-dom";

export default function OrderHistoryPage() {
    const orderInfo = localStorage.getItem("orderInfo") ? JSON.parse(localStorage.getItem("orderInfo")) : [];

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-sm-1"></div>
                <div id="content" className="col-sm-10">
                    <h2 className="title">Order History</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">Order ID</th>
                                    <th className="text-center">Payment ID</th>
                                    <th className="text-right">Total</th>
                                    <th className="text-center">Date Added</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderInfo?.map((order, index) => {
                                        
                                        return (
                                            <tr key={order.paymentId+index}>
                                                <td className="text-center">{order.billingDetails.order_receipt}</td>
                                                <td className="text-center">{order.paymentId}</td>
                                                <td className="text-center">&#8377; {order.billingDetails.OrderSummary.total}</td>
                                                <td className="text-center">{order.date}</td>
                                                <td className="text-right">Processing</td>
                                                <td className="text-center"><Link to={"/orderhistory/"+order.paymentId} className="btn btn-info" title="" data-toggle="tooltip"  data-original-title="View"><i className="fa fa-eye"></i></Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }

                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col-sm-1"></div>
            </div>
        </div>
    );
}
