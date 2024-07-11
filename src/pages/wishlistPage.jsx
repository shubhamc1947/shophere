import React, { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import SingleProduct from "../components/singleproduct/singleproduct";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

export default function WishlistPage() {
    const [wishList, setWishList] = useState([]);
    const [updateWishList, setUpdateWishList] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedWishList = localStorage.getItem("wishListData") ? JSON.parse(localStorage.getItem("wishListData")) : [];
        setWishList(savedWishList);
        setLoading(false);
    }, [updateWishList]);

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
            <h1 className="text-center">WishList</h1>
            <div className="container-fluid my-3">
                <div className="d-flex">
                    <div className="col-md-12 d-flex justify-items-center flex-wrap gap-2">
                        {loading ? (
                            // Display skeleton loading if data is still loading
                            Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className=" border">
                                    <Skeleton width={250} height={250} />
                                </div>
                            ))
                        ) : (
                            wishList.map((product) => (
                                <div key={product.id} className=" border">
                                    <SingleProduct SingleProduct={product} setUpdateWishList={setUpdateWishList} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
