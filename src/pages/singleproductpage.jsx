import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { redirect, useParams } from 'react-router-dom';
import SingleProductImages from '../components/singleProductImages/singleProductImges';
import SingleProductDescription from '../components/singleProductDescription/singleProductDescription';
import SingleProduct from '../components/singleproduct/singleproduct';
import Skeleton from 'react-loading-skeleton';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

function SingleProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProduct, setSimilarProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setProduct(jsonData);
            fetchSimilarProduct(jsonData?.category);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    }, [id]);

    const fetchSimilarProduct = async (category) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/category/${category}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setSimilarProduct(jsonData?.products);
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (error) {
        redirect('/error');
    }

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
            <section className="py-5">
                <div className="container">
                    <div className="row ">
                        {loading ? (
                            <>
                                <div className="col-lg-6">
                                    <Skeleton height={400} />
                                </div>
                                <div className="d-flex justify-center gap-3 ">
                                    {
                                        Array.from({ length: 4 }).map((_, index) => (
                                            <div key={index}>
                                                <Skeleton height={60} width={60} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        ) : (
                            <SingleProductImages images={product?.images} thumbnail={product?.thumbnail} />
                        )}
                        <SingleProductDescription product={product} />
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container-fluid">
                    <h2 className="mb-5 text-left">Related Products</h2>
                    <div className="d-flex flex-wrap justify-content-evenly gap-3">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <div className="border" key={index}>
                                    <Skeleton height={250} width={250} />
                                </div>
                            ))
                        ) : (
                            similarProduct?.map((item, index) =>
                                item.id !== product.id ? (
                                    <div className="border" key={index}>
                                        <SingleProduct SingleProduct={item} />
                                    </div>
                                ) : null
                            )
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default SingleProductPage;
