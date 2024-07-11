import React, { useEffect } from "react";
import { useState } from "react";
import "./singleProductImages.css";
import { Link } from "react-router-dom";


export default function SingleProductImages(props) {
    
    const [thumbnail, setThumbnail] = useState(props?.thumbnail);

    useEffect(() => {
        setThumbnail(props?.thumbnail);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[thumbnail, props?.thumbnail])
    return (
        <>
            <aside className="col-lg-6 " >
                <div className="border rounded-4 mb-3 d-flex justify-content-center" >
                    <img className="single-page-thumbnail" width="400" height="400" src={thumbnail} alt="..." />
                </div>
                <div className="d-flex justify-content-center mb-3">
                    {
                          (props.images.map((image, index) => {
                            
                            return (
                                <>
                                    <Link  to = "#" data-fslightbox="mygalley" className="border mx-1 rounded-2" data-type="image" onMouseOver={() => (setThumbnail(image))} key={index}>

                                        <img width="60" height="60" className="rounded-2" src={image} key={index} alt="..."/>
                                    </Link>
                                </>
                            )
                        }))
                    }
                </div>
            </aside>

        </>
    );
}