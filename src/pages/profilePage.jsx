import React from 'react';

export default function ProfileHistory() {
    const userData = JSON.parse(sessionStorage.getItem("userData")) || [];

    return (
        <div className="container rounded bg-white mt-5 mb-5 profile" style={{ textAlign: 'left' }}>
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px" src={userData?.image} alt="Profile" />
                        <span className="font-weight-bold">{userData?.firstName} {userData?.lastName}</span>
                        <span className="text-black-50">{userData?.email}</span>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">Name</label>
                                <input type="text" className="form-control" placeholder="First Name" value={userData.firstName} readOnly/>
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Surname</label>
                                <input type="text" className="form-control" placeholder="Surname" value={userData.lastName} readOnly/>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels">Mobile Number</label>
                                <input type="text" className="form-control" placeholder="Enter Phone Number" value={userData.phone} readOnly/>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Email ID</label>
                                <input type="text" className="form-control" placeholder="Enter Email ID" value={userData.email} readOnly/>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Address Line 1</label>
                                <input type="text" className="form-control" placeholder="Enter Address Line 1" value={userData.address.address} readOnly/>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Address Line 2</label>
                                <input type="text" className="form-control" placeholder="Enter Address Line 2" value="" readOnly/>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Postal code</label>
                                <input type="text" className="form-control" placeholder="Enter Postcode" value={userData.address.postalCode} readOnly/>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">City</label>
                                <input type="text" className="form-control" placeholder="Enter Area" value={userData.address.city} readOnly/>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <label className="labels">Country</label>
                                <input type="text" className="form-control" placeholder="Country" value="India" readOnly/>
                            </div>
                            <div className="col-md-6">
                                <label className="labels">State/Region</label>
                                <input type="text" className="form-control" placeholder="State/Region" value={userData.address.state} readOnly/>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}


