import React, { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import "../../components/filter/filter.css";

// function titleCase(str) {
//     str = str.toLowerCase().split(' ');
//     for (let i = 0; i < str.length; i++) {
//         str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
//     }
//     return str.join(' ');
// }

export default function Filter({ setSelectedCategories, selectedCategories, setSortByPrice, sortByPrice}) {
    const [allCategory, setAllCategory] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchAllCategory = async () => {
        const response = await fetch("https://dummyjson.com/products/categories");
        const data = await response.json();
        setAllCategory(data);
        setLoading(false);
    }

    const handleCategoryChange = (categoryName) => {
        if (selectedCategories.includes(categoryName)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
        } else {
            setSelectedCategories([...selectedCategories, categoryName]);
        }
    };

    useEffect(() => {
        fetchAllCategory();
    }, [])
    
    return (
        <div className="filter border position-fixed" style={{width:"25%",height:"100vh", overflowY:"scroll"}} >
            <aside className="p-3 mx-2">
                <h4 className="text-center">Filter </h4>
                <div className="card  position-relative" style={{width:"100%",height:"45vh", overflowY:"scroll"}}>
                    <article className="card-group-item "  >
                        <header className="card-header position-sticky top-0" style={{width:"auto", backgroundColor:"#DDDDDD"}}>
                            <h6 className="title ">Category </h6>
                        </header>
                        <div className="filter-content">
                            <div className="card-body">
                                <label className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="All"
                                        checked={selectedCategories.length === 0}
                                        onChange={() => {
                                            setSelectedCategories([]);
                                        }}
                                    />
                                    <span className="form-check-label">All</span>
                                </label>
                                {loading ? (
                                    // Skeleton loading for categories
                                    Array.from({ length: 10 }).map((_, index) => (
                                        <div key={index} className="form-check">
                                            <Skeleton width={100} />
                                        </div>
                                    ))
                                ) : (
                                    allCategory?.map((category) => (
                                        <label key={category.slug} className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={category.slug}
                                                checked={selectedCategories.includes(category.slug)}
                                                onChange={() => handleCategoryChange(category.slug)}
                                            />
                                            <span className="form-check-label">{category.name}</span>
                                        </label>
                                    ))
                                )}
                            </div>
                        </div>
                    </article>
                </div>
                <div className="card mt-4 position-relative" style={{height:"20vh", bottom:"10px"}}>
                    <article className="card-group-item ">
                        <header className="card-header position-sticky top-0" style={{width:"auto", backgroundColor:"#DDDDDD"}}>
                            <h6 className="title">Sort </h6>
                        </header>
                        <div className="filter-content">
                            <div className="card-body">
                                <label className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="reset"
                                        checked={sortByPrice === "reset"}
                                        onChange={() => {
                                            setSortByPrice("reset");
                                        }}
                                    />
                                    <span className="form-check-label">Reset</span>
                                </label>
                                <label className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="asc"
                                        checked={sortByPrice === "asc"}
                                        onChange={() => {
                                            setSortByPrice("asc");
                                        }}
                                    />
                                    <span className="form-check-label">Low to High</span>
                                </label>
                                <label className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value="Reset"
                                        checked={sortByPrice === "desc"}
                                        onChange={() => {
                                            setSortByPrice("desc");
                                        }}
                                    />
                                    <span className="form-check-label">High to Low</span>
                                </label>
                                
                            </div>
                        </div>
                    </article>
                </div>
            </aside>
        </div>
    );
}
