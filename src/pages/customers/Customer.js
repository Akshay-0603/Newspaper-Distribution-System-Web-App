import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./customer.scss";
import { useSelector } from "react-redux";
import { db, auth } from "../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { registerUser } from "../../firebaseConfig";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const Customer = () => {
  const agencyEmail = useSelector((state) => state.user.username);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [st, setSt] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deposit, setDeposit] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [areaName, setAreaName] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [vendors, setVendors] = useState([]);
  const [vendorName, setVendorName] = useState("");
  const [vendorId, setVendorId] = useState("");

  const handleUpdateForm = (data) => {
    setCustomerId(data.id);
    const names = data.name.split(" ");
    setFirstName(names[0]);
    setLastName(names[1]);
    setAddressLine1(data.addressLine1);
    setAddressLine2(data.addressLine2);
    setCity(data.city);
    setDistrict(data.district);
    setSt(data.state);
    setCountry(data.country);
    setPincode(data.pincode);
    setPhone(data.phone);
    setEmail(data.email);
    setDeposit(data.deposit);
    setAreaCode(data.areaCode);
    setAreaName(data.areaName);
    setIsUpdate(true);
  };

  const handleDelete = (id) => {
    const docRef = doc(db, "customers", id);
    deleteDoc(docRef).then(() => {
      toast("Successfully Deleted!");
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="updateButton"
              onClick={() => {
                handleUpdateForm(params.row);
                console.log(params.row);
              }}
            >
              Update
            </div>
            <div
              className="deleteButton"
              onClick={() => {
                handleDelete(params.row.id);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const customerColumns = [
    {
      field: "name",
      headerName: "Customer Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 200,
    },

    {
      field: "addressLine1",
      headerName: "Address Line1",
      width: 200,
    },
    {
      field: "addressLine2",
      headerName: "Address Line2",
      width: 200,
    },
    {
      field: "city",
      headerName: "City",
      width: 120,
    },
    {
      field: "district",
      headerName: "District",
      width: 120,
    },
    {
      field: "state",
      headerName: "State",
      width: 120,
    },
    {
      field: "country",
      headerName: "Country",
      width: 120,
    },
    {
      field: "pincode",
      headerName: "Pincode",
      width: 120,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 120,
    },
    {
      field: "deposit",
      headerName: "Deposit",
      width: 120,
    },
    {
      field: "areaCode",
      headerName: "Area Code",
      width: 120,
    },
    {
      field: "areaName",
      headerName: "Area Name",
      width: 120,
    },
  ];

  useEffect(() => {
    setVendors(vendors.filter((d) => {
      return d.vendorCity.includes(city);
    }))
    console.log(vendors, "ven");
  }, [city])

  useEffect(() => {
    db.collection("vendors").onSnapshot((snapshot) => {
      setVendors(
        snapshot.docs.map((doc) => ({
          vendodId: doc.id,
          vendorName: doc.data().vendorName,
          vendorCity: doc.data().city
        }))
      );
    });
    const agencyRef = db.collection("Agency");
    console.log(agencyEmail, "hii");
    agencyRef
      .where("email", "==", agencyEmail)
      .get()
      .then((res) => {
        setAgencyName(res);
        console.log(res);
        res.forEach((doc) => {
          console.log(doc);
          console.log(doc.data().agencyName);
          setAgencyName(doc.data().agencyName);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    db.collection("customers").onSnapshot((snapshot) => {
      setCustomers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().firstName + " " + doc.data().lastName,
          addressLine1: doc.data().addressLine1,
          addressLine2: doc.data().addressLine2,
          city: doc.data().city,
          district: doc.data().district,
          state: doc.data().state,
          country: doc.data().country,
          pincode: doc.data().pincode,
          phone: doc.data().phone,
          email: doc.data().email,
          deposit: doc.data().deposit,
          areaCode: doc.data().areaCode,
          areaName: doc.data().areaName,
        }))
      );
    });
  }, []);
  function randomStr(len, arr) {
    var ans = "";
    for (var i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(vendorName === "---Select Vendor Name---")
    {
      toast("Please provide vendor name");
      return;
    }
    if (firstName.trim() === "") {
      toast("Please provide first name.");
      return;
    }
    if (lastName.trim() === "") {
      toast("Please provide last name.");
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
    if (areaCode.trim() === "") {
      toast("Please provide your area code.");
      return;
    }
    if (areaName.trim() === "") {
      toast("Please provide your area name.");
      return;
    }
    const customerRef = db.collection("customers");
    const snapshot = await customerRef.where("email", "==", email).get();
    if (!snapshot.empty) {
      console.log(snapshot);
      toast("Already there is an account with this email!");
      return;
    }

    db.collection("customers")
      .add({
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        district,
        state: st,
        country,
        pincode,
        phone,
        deposit,
        email,
        areaCode,
        areaName,
        vendorId,
        vendorName
      })
      .then(async (data) => {
        let code = randomStr(8, "123456789abcdefgh@$");
        console.log(code);
        await registerUser(email, code)
          .then((res) => {
            if(!res){
              const docRef = doc(db, "customers", data.id);
              deleteDoc(docRef).then(() => {
              });
              return;
            }
            let obj = {
              agencyName,
              email: email,
              pass: code,
              name: firstName + " " + lastName,
            };
            emailjs
              .send(
                "service_z9l2xhe",
                "template_d7vzgk6",
                obj,
                "dIRd4XvPi2BZIh_M7"
              )
              .then(
                (result) => {
                  console.log(result.text);
                },
                (error) => {
                  console.log(error.text);
                }
              );;
            // toast("Registration successful!");
            console.log("data added");
            toast("Added successfully!");
            setIsNewForm(false);
          })
          .catch((err) => {
            toast(err);
          });
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if(vendorName === "---Select Vendor Name---")
    {
      toast("Please provide vendor name");
      return;
    }
    if (firstName.trim() === "") {
      toast("Please provide first name.");
      return;
    }
    if (lastName.trim() === "") {
      toast("Please provide last name.");
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
    if (areaCode.trim() === "") {
      toast("Please provide your area code.");
      return;
    }
    if (areaName.trim() === "") {
      toast("Please provide your area name.");
      return;
    }

    db.collection("customers")
      .doc(customerId)
      .update({
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        district,
        state: st,
        country,
        pincode,
        phone,
        deposit,
        email,
        areaCode,
        areaName,
        vendorId,
        vendorName
      })
      .then(() => {
        toast("Successfully Updated!");
      });
    setIsUpdate(false);
  };

  const handleVendor = (data) =>{
    let tmp;
    setVendorName(data);
    for(let i = 0; i < vendors.length; i++)
    {
      if(vendors[i].vendorName === data)
      {
        tmp = vendors[i].vendodId;
        break;
      }
    }
    console.log(tmp)
    setVendorId(tmp);
  }

  return (
    <div className="customer">
      <Sidebar />
      <div className="customerContainer">
        <Navbar />
        {!isNewForm && !isUpdate ? (
          <div className="datatable">
            <div className="datatableTitle">
              Add New Customer
              <div className="link" onClick={() => setIsNewForm(true)}>
                Add New
              </div>
            </div>

            <DataGrid
              className="datagrid"
              rows={customers}
              columns={customerColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
            />
          </div>
        ) : !isUpdate && isNewForm ? (
          <div className="bottom" id="new-form">
            <form action="">
              <div className="formInput">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
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
                <label>Deposit</label>
                <input
                  type="number"
                  placeholder="Deposit"
                  onChange={(e) => setDeposit(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Area Code</label>
                <input
                  type="text"
                  placeholder="Area Code"
                  onChange={(e) => setAreaCode(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Area Name</label>
                <input
                  type="text"
                  placeholder="Area Name"
                  onChange={(e) => setAreaName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Vendor Name</label>
                <select
                  name="Select Vendor"
                  onChange={(e) => handleVendor(e.target.value)}
                >
                  <option>---Select Vendor Name---</option>
                  {vendors.map((vd) => (
                    <option key={vd.vendorId} value={vd.vendorName}>
                      {vd.vendorName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <button onClick={(e) => handleSubmit(e)}>ADD</button>
                <button onClick={(e) => setIsNewForm(false)}>CANCEL</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bottom" id="new-form">
            <form action="">
              <div className="formInput">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Address Line1</label>
                <input
                  type="text"
                  placeholder="Address Line1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Address Line2</label>
                <input
                  type="text"
                  placeholder="Address Line2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>District</label>
                <input
                  type="text"
                  placeholder="District"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>State</label>
                <input
                  type="text"
                  placeholder="State"
                  value={st}
                  onChange={(e) => setSt(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Pincode</label>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>E-mail</label>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                  readOnly
                />
              </div>
              <div className="formInput">
                <label>Deposit</label>
                <input
                  type="number"
                  placeholder="Deposit"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Area Code</label>
                <input
                  type="text"
                  placeholder="Area Code"
                  value={areaCode}
                  onChange={(e) => setAreaCode(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Area Name</label>
                <input
                  type="text"
                  placeholder="Area Name"
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="formInput">
                <label>Vendor Name</label>
                <select
                  name="Select Agency"
                  onChange={(e) => handleVendor(e.target.value)}
                >
                  <option>---Select Vendor Name---</option>
                  {vendors.map((vd) => (
                    <option key={vd.vendorId} value={vd.vendorName}>
                      {vd.vendorName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <button onClick={(e) => handleUpdate(e)}>UPDATE</button>
                <button onClick={(e) => setIsUpdate(false)}>CANCEL</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customer;
