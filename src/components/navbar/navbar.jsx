import React,{useContext,useState} from "react";
import logoPath from "../../assets/images/logo.png";
import "../../components/navbar/navbar.css";
import { Link,  useNavigate } from "react-router-dom";
import { wishListLength, cartLength } from "../../contextApi/navbarValues";
import {toast} from "react-toastify";


function Navbar() {
    const wishListLengthValues = useContext(wishListLength);
    const cartLengthValues = useContext(cartLength);
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userData")));
    const history = useNavigate();
    const navItems = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Shop',
            link: '/shop'
        },
    ];

    const logoutButtonHandler = () => {
        sessionStorage.removeItem("userData");
        setUserData("");
        history.push("/");
        toast.success("Logout Successfully");
    }

    return (
        <>
            <div className="main-navbar shadow-sm sticky-top">
                <div className="top-navbar">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                                <Link className="navbar-brand d-flex align-items-center g-3"  to={"/"}>
                                    <img src={logoPath} width="50" height="50" alt="" className="" />
                                    {/* <h3 className="" style={{marginLeft:"10px",color:"aliceblue"}}>ShopHere</h3> */}
                                </Link>
                            </div>

                            <div className="col-md-5 my-auto">
                                <form role="search" method="get" action="/shop">
                                    <div className="input-group">
                                        <input type="search" placeholder="Search your product" className="form-control" id="searchinput" name="search"/>
                                        <button className="btn bg-white" type="submit">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-5 my-auto">
                                <ul className="nav justify-content-end">

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cart">
                                            <i className="fa fa-shopping-cart"></i> Cart ({cartLengthValues?cartLengthValues[0]:0})
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/wishlist"}>
                                            <i className="fa fa-heart"></i> Wishlist ({wishListLengthValues?wishListLengthValues[0]:0})
                                        </Link>
                                    </li>
                                    <li className={userData? "nav-item dropdown":"nav-item"}>
                                        {
                                            userData ? <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa fa-user"></i> {userData.username}
                                            </Link> : <Link to="/login" className="nav-link " id="login" role="button"  >
                                                Login
                                            </Link>
                                        }
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><Link className="dropdown-item" to="/profile"><i className="fa fa-user"></i> Profile</Link></li>
                                            <li><Link className="dropdown-item" to="/history"><i className="fa fa-list"></i> Order History</Link></li>
                                            <li><Link className="dropdown-item" to="/wishlist"><i className="fa fa-heart"></i> My Wishlist</Link></li>
                                            <li><Link className="dropdown-item" to="/cart"><i className="fa fa-shopping-cart"></i> My Cart</Link></li>
                                            <li><Link to="#" className="dropdown-item" onClick={logoutButtonHandler}><i className="fa fa-sign-out"></i> Logout</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link className="navbar-brand d-block d-sm-block d-md-none d-lg-none" to={"/"}>
                            ShopHere
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="container collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {
                                    navItems.map((item, index) => {

                                        return (
                                            <li className="nav-item" key={index}>
                                                <Link className="nav-link" to={item.link}>{item.name}</Link>
                                            </li>
                                        )
                                    })
                                }


                            </ul>
                        </div>
                    </div>
                </nav>
            </div>



        </>
    );
}




export default Navbar;