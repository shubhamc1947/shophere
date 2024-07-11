import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import "./loginCard.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function LoginCard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");

    const signInButtonHandler = () => {
        const response = async () => {
            const res = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await res.json();

            if (data.message !== "Invalid credentials") {
                toast.success("Login Successfully!");
                const wholeData = await fetch("https://dummyjson.com/user/me", {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer '+data.token,
                    },
                })
                const userData = await wholeData.json();
                sessionStorage.setItem("userData", JSON.stringify(userData));
                navigate(-1);
            }else{
                toast.error("Invalid Credential!")
            
            }
        }
        response();
    }
    
    return (
        <div>
            <ToastContainer />
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <div
                    className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <div className="row justify-content-center w-100">
                            <div className="col-md-8 col-lg-6 col-xxl-3">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <Link to="#" className="text-nowrap logo-img text-center  py-3 w-100">
                                            <img src={logo} width="60" height="60" alt="" />
                                            <h4>ShopHere</h4>
                                        </Link>
                                        <h4 className="text-center">Login</h4>

                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Username</label>
                                            <input type="text" className="form-control" id="email" value={username} aria-describedby="emailHelp" onChange={(e) => (setUsername(e.target.value))} />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => (setPassword(e.target.value))} />
                                        </div>

                                        <button className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2" onClick={signInButtonHandler}>Sign In</button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}