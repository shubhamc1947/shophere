import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { wishListLength } from "../../contextApi/navbarValues";
import { toast } from 'react-toastify';

export default function WishListHeart(props) {
    const [wishListLengthValue, setWishListLengthValue] = useContext(wishListLength);
    const { singleProductData } = props;
    const [wishList, setWishList] = useState([]);
    const [wishListLocalStorageData, setWishListLocalStorageData] = useState(() => {
        const localData = JSON.parse(localStorage.getItem('wishListData'));
        return localData ? localData : [];

    });
    const [isExist, setIsExist] = useState(false);

    const addDataToLocalStorage = (data) => {
        // Retrieve existing data from local storage
        const existingData = JSON.parse(localStorage.getItem('wishListData')) || [];

        let updatedData = [];

        // Modify the existing data by adding newData
        if (existingData.find(item => item.id === data.id)) {
            toast.error("Removed from Wishlist");
            updatedData = [...existingData.filter(item => item.id !== data.id)];
            setWishListLengthValue(wishListLengthValue - 1);
            
        } else {
            updatedData = [...existingData, data];
            setWishListLengthValue(wishListLengthValue + 1);
            toast.success("Added to Wishlist");
        }

        // Save the updated data back to local storage
        localStorage.setItem('wishListData', JSON.stringify(updatedData));

        // Update state with the new data
        setWishList(updatedData);

    };

    const handleWishList = (data) => {
        addDataToLocalStorage(data);
        props.setUpdateWishList && props.setUpdateWishList((prev) => prev + 1);
    };

    // Update local storage when wish list changes
    useEffect(() => {
        // Retrieve data from local storage when component mounts
        const existingData = JSON.parse(localStorage.getItem('wishListData')) || [];
        setWishListLocalStorageData(existingData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wishList]);

    //updating isExist state when local storage changes
    useEffect(() => {
        setIsExist((wishListLocalStorageData.find(item => item.id === singleProductData.id)) ? true : false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wishListLocalStorageData]);



    return (
        <div>
            
            <Link to="#"
                className={"product-like-icon " + (isExist ? "text-danger" : "")}
                data-tip={(isExist ? "Remove from" : "Add to") + " Wishlist"}
                onClick={() => handleWishList(singleProductData)}>
                <i className={(isExist ? "fa-solid" : "fa-regular") + " fa-heart"}></i>
            </Link>
        </div>
    );
}
