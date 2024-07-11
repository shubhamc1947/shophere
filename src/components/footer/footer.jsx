import  React from 'react'; 
import './footer.css';
import {Link } from 'react-router-dom';
export default function Footer() {

    return (
        <div className="position-relative">
        <div className="footer-area " >
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h4 className="footer-heading">ShopHere</h4>
                        <div className="footer-underline"></div>
                        <p style={{textAlign:"justify"}}>
                        Welcome to our e-commerce platform, where convenience meets quality. Discover a seamless shopping experience with a wide range of products tailored to your needs. </p>
                    </div>
                    <div className="col-md-3">
                        <h4 className="footer-heading">Quick Links</h4>
                        <div className="footer-underline"></div>
                        <div className="mb-2"><Link to = "/" className="text-white">Home</Link></div>
                        <div className="mb-2"><Link to = "/" className="text-white">About Us</Link></div>
                        <div className="mb-2"><Link to = "/contact" className="text-white">Contact Us</Link></div>
                    </div>
                    <div className="col-md-3">
                        <h4 className="footer-heading">Shop Now</h4>
                        <div className="footer-underline"></div>
                        <div className="mb-2"><Link to = "/shop" className="text-white">Collections</Link></div>
                        <div className="mb-2"><Link to = "/shop" className="text-white">New Arrivals Products</Link></div>
                        <div className="mb-2"><Link to = "/shop" className="text-white">Featured Products</Link></div>
                        <div className="mb-2"><Link to = "/cart" className="text-white">Cart</Link></div>
                    </div>
                    <div className="col-md-3">
                        <h4 className="footer-heading">Reach Us</h4>
                        <div className="footer-underline"></div>
                        <div className="mb-2">
                            <p>
                                <i className="fa fa-map-marker"></i> Ayodhya Utter Pradesh 224001 , India
                            </p>
                        </div>
                        <div className="mb-2">
                            <Link to = "#" className="text-white">
                                <i className="fa fa-phone"></i> +91 987-XXX-XXXX
                            </Link>
                        </div>
                        <div className="mb-2">
                            <Link to = "#" className="text-white">
                                <i className="fa fa-envelope"></i> shophere@gmail.com
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright-area">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <p className=""> &copy; 2024 - All rights reserved.</p>
                    </div>
                    <div className="col-md-4">
                        <div className="social-media">
                            Get Connected:
                            <Link to = "#"><i className="fa-brands fa-facebook"></i></Link>
                            <Link to = "#"><i className="fa-brands fa-x-twitter"></i></Link>
                            <Link to = "#"><i className="fa-brands fa-instagram"></i></Link>
                            <Link to = "#"><i className="fa-brands fa-youtube"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
}
