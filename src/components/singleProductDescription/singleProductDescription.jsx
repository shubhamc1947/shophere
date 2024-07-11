import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import "./singleProductDescription.css";
import { wishListLength, cartLength } from "../../contextApi/navbarValues";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from 'react-toastify';

export default function SingleProductDescription(props) {
    const [wishListLengthValue,setWishListLengthValue] = useContext(wishListLength);
    const [cartLengthValue,setCartLengthValue] = useContext(cartLength);
    const [cart, setCart] = useState(localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : []);
    const [wishList, setWishList] = useState(localStorage.getItem('wishListData') ? JSON.parse(localStorage.getItem('wishListData')) : []);


    const addToCartButtonHandler = (product) => {
        toast.success("Added to Cart");
        setCart([...cart, {...product, "quantity": 1}]);
        localStorage.setItem('cartData', JSON.stringify([...cart, product]));
        setCartLengthValue(cartLengthValue+1);
    }
    const addToWishListButtonHandler = (product) => {
        toast.success("Added to Wishlist");
        setWishList([...wishList, product]);
        localStorage.setItem('wishListData', JSON.stringify([...wishList, product]));
        setWishListLengthValue(wishListLengthValue+1);
    }


    return (
        <>
            <main className="col-lg-6 singleProductDescription">
                <div className="ps-lg-3">
                    <div className="">
                        <h4 className="title text-dark ">
                            {(props.product && props.product.title) || <Skeleton />}
                        </h4>
                    </div>
                    <div className="d-flex flex-row my-3">
                        <div className="text-warning mb-1 me-2">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            <span className="ms-1">
                                {(props.product && parseFloat(props.product.rating)) || <Skeleton />}
                            </span>

                        </div>
                        <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>{(props.product && props.product.stock) || <Skeleton />} orders</span>
                        <span className="text-success ms-2">In stock</span>
                    </div>
                    <div className="mb-3 ">
                        <span className="h6 px-2 text-decoration-line-through" style={{ color: "red" }}>Rs.{(props.product && props.product.price + Math.round(props.product.price * props.product.discountPercentage / 100)) || <Skeleton />}</span>
                        <span className="h5">Rs.{(props.product && props.product.price) || <Skeleton />}</span>
                        {/* <span className="text-muted">/per box</span> */}
                    </div>
                    <p>
                        {props.product && props.product.description}
                    </p>
                    <div className="row">
                        <dt className="col-3">Category:</dt>
                        <dd className="col-9">{(props.product && props.product.category) || <Skeleton />}</dd>

                        <dt className="col-3">Brand</dt>
                        <dd className="col-9">{(props.product && props.product.brand) || <Skeleton />}</dd>
                    </div>
                    <hr />
                    <form>
                        {/* <Quantity stock={props.product ? props.product.stock : "No stock"} /> */}
                        <div className="d-flex justify-start gap-2" >
                            {/* <Link to="/" className="btn btn-warning shadow-0 px-4 py-2 "> Buy now </Link> */}
                            {
                                cart.find((item) => item.id === props?.product?.id) ? <Link to="/cart" className="btn btn-primary shadow-0 px-4 py-2" >Go to Cart</Link> 
                                : <Link className="btn btn-primary shadow-0 px-4 py-2" onClick={() => { addToCartButtonHandler(props.product) }}>Add to cart</Link>
                            }
                            {
                                wishList.find((item) => item.id === props?.product?.id) ? <Link to="#" className="btn btn-danger border border-secondary py-2 icon-hover px-3 " onClick={() => { addToWishListButtonHandler(props.product) }}> <i className="me-1 fa fa-heart fa-lg"></i> Saved </Link>
                                    : <Link to="#" className="btn btn-light border border-secondary py-2 icon-hover px-3 " onClick={() => { addToWishListButtonHandler(props.product) }}> <i className="me-1 fa fa-heart fa-lg"></i> Save for Later</Link>


                            }


                        </div>
                    </form>
                </div>
            </main>


        </>
    )
}