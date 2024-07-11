import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./relatedProduct.css";
export default function RelatedProduct(props) {
    const [relatedProuctData, setRelatedProuctData] = useState(props.SingleProduct);

    return (
        <div className="col-md-2 col-sm-6 related-product p-2 m-3 ">
            <div className="product-grid">
                <div className="product-image">
                    <Link to={"/singleproduct/"+relatedProuctData.id} className="image">
                        <img className="pic-1" src={(relatedProuctData.images[1]? relatedProuctData.images[1]:relatedProuctData.images[0]) } />
                        <img className="pic-2" src={relatedProuctData.images[2]? relatedProuctData.images[2]:relatedProuctData.images[0]} />
                    </Link>
                    <a href="#" className="product-like-icon" data-tip="Add to Wishlist">
                        <i className="fa-regular fa-heart"></i>
                    </a>
                    <ul className="product-links">
                        {/* <li><a href="#"><i className="fa fa-search"></i></a></li> */}
                        <li><a href="#"><i className="fa-solid fa-cart-plus"></i></a></li>
                        {/* <li><a href="#"><i className="fa fa-random"></i></a></li> */}
                    </ul>
                </div>
                <div className="product-content">
                    <h3 className="title"><Link to={"/singleproduct/"+relatedProuctData.id}>{relatedProuctData.title && relatedProuctData.title}</Link></h3>
                    <div className="price">${relatedProuctData.price && relatedProuctData.price}</div>
                </div>
            </div>
        </div>
    )
}