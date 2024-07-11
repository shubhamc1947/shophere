import React from "react";
import './footerquicklinks.css';
import FooterQuickLinksData from "../../constants/footerquicklinksData";

export default function FooterQuickLinks() {

    return (
        <section className="shipping_area md-50">
            <div className="container-fluid">
                <div className=" row">
                    <div className="col-12">
                        <div className="shipping_inner">

                            {
                                FooterQuickLinksData.map((item, index) => {
                                    return (
                                        <div className="single_shipping" key={item.id}>
                                            <div className="shipping_icone">
                                                <img src={item.img} alt="" />
                                            </div>
                                            <div className="shipping_content">
                                                <h2>{item.title}</h2>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}