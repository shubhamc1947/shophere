import React from "react";
import { Link } from "react-router-dom";
import ConfirmationCard from "../components/confirmationCard/confirmationCard";
import { useParams } from "react-router-dom";

export default function ConfirmationPage() {
    const { orderId } = useParams();

    return (
        <section className="h-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-10 col-xl-8">
                        <ConfirmationCard orderId={orderId}/>
                        <div class="text-end mt-3">
                            <Link to="/" class="btn btn-success" > <i class="mdi mdi-cart-outline me-1"></i> Go to Shopping </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}