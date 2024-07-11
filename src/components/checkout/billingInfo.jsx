import React from "react";


export default function BillingInfo(props) {
    const { billingDetails, setBillingDetails } = props;

    

    return (
        <>
            <div>
                <h5 className="font-size-16 mb-1">Billing Info</h5>
                <p className="text-muted text-truncate mb-4">Enter Billing Address</p>
                <div className="mb-3">

                    <div>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="billing-name">Name</label>
                                    <input type="text" className="form-control" id="billing-name" value={billingDetails.name} placeholder="Enter name" required="required" name="billing-name" onChange={(e)=>{setBillingDetails({ ...billingDetails, name: e.target.value });}}  />
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="billing-email-address">Email Address</label>
                                    <input type="email" className="form-control" id="billing-email-address" value={billingDetails.email} placeholder="Enter email" required="required" onChange={(e)=>{setBillingDetails({ ...billingDetails, email: e.target.value });}}/>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="billing-phone">Phone</label>
                                    <input type="number" className="form-control" id="billing-phone" value={billingDetails.phone} placeholder="Enter Phone no." required="required" onChange={(e)=>{setBillingDetails({ ...billingDetails, phone: e.target.value });}}/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="billing-address">Address</label>
                            <textarea className="form-control" id="billing-address" rows="3" placeholder="Enter full address" value={billingDetails.address} required="required" onChange={(e)=>{setBillingDetails({ ...billingDetails, address: e.target.value });}}></textarea>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="mb-4 mb-lg-0">
                                    <label className="form-label">Country</label>
                                    <select className="form-control form-select" title="Country" required="required" onChange={(e)=>{setBillingDetails({ ...billingDetails, country: e.target.value });}}>
                                        <option value="0" selected={billingDetails?.country==="0"? "selected":""}>Select Country</option>
                                        <option value="India" selected={billingDetails?.country==="India"? "selected":""}>India</option>


                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-4 mb-lg-0">
                                    <label className="form-label" htmlFor="billing-city">City</label>
                                    <input type="text" className="form-control" id="billing-city" value={billingDetails.city} placeholder="Enter City" required="required" onChange={(e)=>{setBillingDetails({ ...billingDetails, city: e.target.value });}}/>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-0">
                                    <label className="form-label" htmlFor="zip-code">Zip / Postal code</label>
                                    <input type="number" className="form-control" id="zip-code" value={billingDetails.postalCode} placeholder="Enter Postal code" required="required" onChange={(e)=>{setBillingDetails({ ...billingDetails, postalCode: e.target.value });}}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}