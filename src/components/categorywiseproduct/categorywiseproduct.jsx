import React, { useEffect, useState } from 'react';
import './categorywiseproduct.css';
import SingleProduct from '../singleproduct/singleproduct';
import Skeleton from 'react-loading-skeleton';
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

export default function CategoryWiseProduct() {
    const [productData, setProductData] = useState(null);

    // Fetch products from API
    const fetchData = async () => {
        const response = await fetch("https://dummyjson.com/products?limit=40");
        const data = await response.json();
        // console.log(data)
        setProductData(data);
    }

    // Group products by category
    const groupedProducts = {};

    productData?.products && productData.products.forEach((product) => {
        if (!groupedProducts[product.category]) {
            groupedProducts[product.category] = [];
        }
        // extracing all the category from the api
        groupedProducts[product.category].push(product);
    });




    const rightButtonHandler = (index) => {
        const scroller = document.getElementById('category-wise-product'+index);
        if (scroller.scrollLeft < scroller.scrollWidth - 100) {
            scroller.scrollLeft += 100;
        } else {
            scroller.scrollLeft = scroller.scrollWidth;
        }
        // checkButtonVisibility();
    }

    const leftButtonHandler = (index) => {
        const scroller = document.getElementById('category-wise-product'+index);
        if (scroller.scrollLeft > 100) {
            scroller.scrollLeft -= 100;
        } else {
            scroller.scrollLeft = 0;
        }
        // checkButtonVisibility();
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div >
                {productData ? (
                    Object.keys(groupedProducts).map((category, index) => (
                        <div className="container" id="category-wise-product-corousel"  key={"category" + index}>
                            <h2 >Trending <b>{category}</b></h2>
                            <div className='d-flex'>
                                <div className='button-icon-container button-icon-container-left' onClick={() => leftButtonHandler(index)}>
                                    <button className='d-flex justify-center items-center'><GoChevronLeft /></button>
                                </div>
                                <div className="d-flex category-wise-product" id={"category-wise-product"+index} key={"product" + index}>
                                    {
                                        groupedProducts[category].map((productItem, index) => {
                                            return (
                                                <SingleProduct SingleProduct={productItem} />
                                            )
                                        })
                                    }
                                </div>
                                <div className='button-icon-container button-icon-container-right ' onClick={() => rightButtonHandler(index)}>
                                    <button className=' d-flex justify-center items-center  ' ><GoChevronRight /></button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Display skeleton loading while fetching data
                    <div className="container">
                        <div className="d-flex justify-evenly gap-4 m-2">
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <>
                                        <div key={index}>
                                            <Skeleton height={300} width={300} />
                                        </div>
                                    </>
                                ))
                            }

                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
