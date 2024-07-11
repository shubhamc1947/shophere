import React from "react";
import ConfirmationCard from "../components/confirmationCard/confirmationCard";
import { useParams } from "react-router-dom";

export default function OrderHistoryViewPage() {
    const {orderId} = useParams();
    return (
        <section className="h-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-10 col-xl-8">
                        <ConfirmationCard orderId={orderId}/>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}