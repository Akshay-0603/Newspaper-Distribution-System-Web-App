import React, { useState } from "react";
import "./agency.scss";
import { registerUser } from "../../firebaseConfig";
import { Link } from 'react-router-dom'
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Agency = () => {
  const [agencyName, setAgencyName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [st, setSt] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agencyName.trim() === "") {
      toast("Please provide agency name.");
      return;
    }
    if (addressLine1.trim() === "") {
      toast("Please provide Address Line.");
      return;
    }
    if (addressLine2.trim() === "") {
      toast("Please provide Address Line.");
      return;
    }
    if (city.trim() === "") {
      toast("Please provide your city.");
      return;
    }
    if (district.trim() === "") {
      toast("Please provide your district.");
      return;
    }
    if (st.trim() === "") {
      toast("Please provide your state.");
      return;
    }
    if (country.trim() === "") {
      toast("Please provide your country.");
      return;
    }
    if (pincode.trim() === "") {
      toast("Please provide your pincode.");
      return;
    }
    if (phone.trim() === "") {
      toast("Please provide your contact number.");
      return;
    }
    if (email.trim() === "") {
      toast("Please provide your email.");
      return;
    }
    if (password.trim() === "") {
      toast("Please provide password.");
      return;
    }
    if (cpassword.trim() === "") {
      toast("Please provide password.");
      return;
    }
    if (password !== cpassword) {
      toast("Please confirm your password.");
      return;
    }
    const agencyRef = db.collection("Agency");
    const snapshot = await agencyRef.where("email", "==", email).get();
    if (!snapshot.empty) {
      toast("Already there is an account with this email!");
      return;
    }

    db.collection("Agency")
      .add({
        agencyName,
        addressLine1,
        addressLine2,
        city,
        district,
        state: st,
        country,
        pincode,
        phone,
        email,
      })
      .then(async () => {
        console.log("data added");
        const res = await registerUser(email, password);
        if (res) {
          console.log("data added");
          toast("Registered successfully!");
        } else {
          toast("Error!");
        }
      });
  };

  return (
    <div className="agency">
        <h1 className="title">REGISTER AS AGENCY</h1>
      <div className="bottom" id="new-form">
        <form action="">
          <div className="formInput">
            <label>Agency Name</label>
            <input
              type="text"
              placeholder="Agency Name"
              onChange={(e) => setAgencyName(e.target.value)}
              required={true}
            />
          </div>
          <div className="formInput">
            <label>Address Line1</label>
            <input
              type="text"
              placeholder="Address Line1"
              onChange={(e) => setAddressLine1(e.target.value)}
              required={true}
            />
          </div>
          <div className="formInput">
            <label>Address Line2</label>
            <input
              type="text"
              placeholder="Address Line2"
              onChange={(e) => setAddressLine2(e.target.value)}
              required={true}
            />
          </div>
          <div className="formInput">
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              required={true}
            />
          </div>
          <div className="formInput">
            <label>District</label>
            <input
              type="text"
              placeholder="District"
              onChange={(e) => setDistrict(e.target.value)}
              required={true}
            />
          </div>
          <div className="formInput">
            <label>State</label>
            <input
              type="text"
              placeholder="State"
              onChange={(e) => setSt(e.target.value)}
              required={true}
            />
          </div>
          <div className="formInput">
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              required={true}
            />
          </div>
          <div className="formInput">
            <label>Pincode</label>
            <input
              type="text"
              placeholder="Pincode"
              onChange={(e) => setPincode(e.target.value)}
              required={true}
            />
          </div>
          <div className="formInput">
            <label>Phone</label>
            <input
              type="text"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
              required={true}
            />
          </div>
          <div className="formInput">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </div>
          <div className="formInput">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>
          <div className="formInput">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="********"
              onChange={(e) => setCPassword(e.target.value)}
              required={true}
            />
          </div>
          <div className="formInput">
            <button onClick={(e) => handleSubmit(e)}>Register</button>
            <Link to="/agency-login" style={{ color: "white" }}>
                <button>Go To Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Agency;
