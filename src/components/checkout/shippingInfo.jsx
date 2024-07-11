import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function ShippingInfo(props) {
    const [address, setAddress] = useState(JSON.parse(localStorage.getItem("address")) ? JSON.parse(localStorage.getItem("address")) : []);
    // eslint-disable-next-line
    const [updatedAddress, setUpdatedAddress] = useState(JSON.parse(localStorage.getItem("address")) ? JSON.parse(localStorage.getItem("address")) : []);
    const [newName, setNewName] = useState("");
    const [newMobile, setNewMobile] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    const addAddressButtonHandler = () => {
        if (newName === "" ||  newMobile ===""  || newAddress === "") {
            return toast.error("All fields are required", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
        if (newMobile.length !== 10) {
            return toast.error("Mobile no must be 10 digits", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
        let getAddress = JSON.parse(localStorage.getItem("address")) ? JSON.parse(localStorage.getItem("address")) : [];
        if (editIndex === -1) {
            getAddress = [...getAddress, { name: newName, mobile: newMobile, address: newAddress }]
            localStorage.setItem("address", JSON.stringify(getAddress));
            toast.success("New Address Added Successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
        else {
            getAddress[editIndex] = { name: newName, mobile: newMobile, address: newAddress };
            localStorage.setItem("address", JSON.stringify(getAddress));
            toast.success("Address updated successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
        setAddress(getAddress);
        setNewName("");
        setNewMobile("");
        setNewAddress("");
        setEditIndex(-1);
        document.getElementById("modelButton").click();
    }
    const handleDeleteButton = (index) => {
        address.splice(index, 1);
        localStorage.setItem("address", JSON.stringify(address));
        setAddress(address);
        toast.error("Address deleted successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }
    const handleEditButton = (item, index) => {
        setNewName(item.name);
        setNewMobile(item.mobile);
        setNewAddress(item.address);
        setEditIndex(index);
        document.getElementById("addNewAddressButton").click();
    }
    const addressHandler = (index) => {
        const getAddress = JSON.parse(localStorage.getItem("address")) ? JSON.parse(localStorage.getItem("address")) : [];
        props.setBillingDetails({ ...props.billingDetails, shippingAddress: getAddress[index] });
    }
    useEffect(() => {
        setUpdatedAddress(localStorage.getItem("address") ? JSON.parse(localStorage.getItem("address")) : []);
    }, [address]);
    
    return (
        <>
            <div>
                <button className="btn btn-primary float-end mt-2" data-toggle="modal" data-target="#addNewAddressModel" id="addNewAddressButton">Add New Address</button>
                <h5 className="font-size-16 mb-1">Shipping Info</h5>
                <p className="text-muted text-truncate mb-4">Enter Shipping Address</p>
                <div className="mb-3" >
                    <div className="row">
                        {
                            address?.map((item, index) => {
                                return (
                                    <>
                                        <div className="col-lg-4 col-sm-6" key={index + 1}>
                                            <div data-bs-toggle="collapse">
                                                <label className="card-radio-label mb-0">
                                                    <input type="radio" name="address" id="info-address" className="card-radio-input" value={index} onClick={(e) => { addressHandler(e.target.value) }} />
                                                    <div className="card-radio text-truncate p-3">
                                                        <span className="fs-14 mb-4 d-block">Address {index + 1}</span>
                                                        <span className="fs-14 mb-2 d-block">{item.name}</span>
                                                        <span className="text-muted fw-normal text-wrap mb-1 d-block">{item.address}</span>
                                                        <span className="text-muted fw-normal d-block">Mo. {item.mobile}</span>
                                                    </div>
                                                </label>
                                                <div className="edit-btn bg-light  rounded ">
                                                    <Link to="#" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Edit" onClick={() => { handleEditButton(item, index) }}>
                                                        <i className="bx bx-pencil font-size-16"></i>
                                                    </Link>
                                                </div>
                                                <div className="delete-btn bg-light rounded ">
                                                    <Link to="#" data-bs-toggle="tooltip" data-placement="top" title="" data-bs-original-title="Edit" onClick={() => { handleDeleteButton(index) }}>
                                                        <i className="fa fa-trash font-size-16 "></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }


                    </div>
                </div>
                <div className="modal fade" id="addNewAddressModel" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">{editIndex === -1 ? "Add New" : "Edit "} Address</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="modelButton" >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="shipping-name">Name</label>
                                    <input type="text" className="form-control" id="shipping-name" placeholder="Enter Name" name="shipping-name" value={newName} onChange={(e) => { setNewName(e.target.value) }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="shipping-mobile-no">Mobile No.</label>
                                    <input type="number" className="form-control" id="shipping-mobile-no" placeholder="Enter Mobile No" name="shipping-mobile-no" value={newMobile} onChange={(e) => { setNewMobile(e.target.value) }} />

                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="shipping-address">Address</label>
                                    <textarea className="form-control" id="shipping-address" rows="3" placeholder="Enter full address" value={newAddress} onChange={(e) => { setNewAddress(e.target.value) }}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => (addAddressButtonHandler())}>{editIndex === -1 ? "Add " : "Update "} Address</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}