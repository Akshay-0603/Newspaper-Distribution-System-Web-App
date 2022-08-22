import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./vendor.scss";
import { db } from "../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../firebaseConfig";
import emailjs from "emailjs-com";
toast.configure();
const Vendor = () => {
  const [vendorName, setVendorName] = useState("");
  const [firmName, setFirmName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [st, setSt] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [agencyCode, setAgencyCode] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [vendors, setVendors] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [vendorId, setVendorId] = useState(false);
  const [email, setEmail] = useState("");
  const [agencyDetails, setAgencyDetails] = useState([]);

  const handleUpdateForm = (data) => {
    setVendorId(data.id);
    setVendorName(data.vendorName);
    setFirmName(data.firmName);
    setAddressLine1(data.addressLine1);
    setAddressLine2(data.addressLine2);
    setCity(data.city);
    setDistrict(data.district);
    setSt(data.state);
    setCountry(data.country);
    setPincode(data.pincode);
    setPhone(data.phone);
    setAgencyCode(data.agencyCode);
    setAgencyName(data.agencyName);
    setEmail(data.email);
    console.log(data.agencyCode, data.agencyName);
    setIsUpdate(true);
  };

  const handleDelete = (id) => {
    const docRef = doc(db, "vendors", id);
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
            {/* <div className="detailsButton">View</div> */}
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

  const vendorColumns = [
    {
      field: "vendorName",
      headerName: "Vendor Name",
      width: 200,
    },
    {
      field: "firmName",
      headerName: "Firm Name",
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
      field: "email",
      headerName: "E-mail",
      width: 120,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 120,
    },
    {
      field: "agencyCode",
      headerName: "Agency Code",
      width: 120,
    },
    {
      field: "agencyName",
      headerName: "Agency Name",
      width: 120,
    },
  ];

  useEffect(() => {
    db.collection("Agency").onSnapshot((snapshot) => {
      console.log(snapshot, "ehllo");
      setAgencyDetails(
        snapshot.docs.map((doc) => ({
          ac: doc.id,
          aname: doc.data().agencyName,
        }))
      );
    });
    console.log(agencyDetails, "hi");
    db.collection("vendors").onSnapshot((snapshot) => {
      setVendors(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          vendorName: doc.data().vendorName,
          firmName: doc.data().firmName,
          addressLine1: doc.data().addressLine1,
          addressLine2: doc.data().addressLine2,
          city: doc.data().city,
          district: doc.data().district,
          state: doc.data().state,
          country: doc.data().country,
          pincode: doc.data().pincode,
          phone: doc.data().phone,
          email: doc.data().email,
          agencyCode: doc.data().agencyCode,
          agencyName: doc.data().agencyName,
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
    if(agencyName === "---Select Agency Name---")
    {
      toast("Please provide agency name");
      return;
    }
    if (vendorName.trim() === "") {
      toast("Please provide vendor name.");
      return;
    }
    if (firmName.trim() === "") {
      toast("Please provide firm name.");
      return;
    }
    if (addressLine1.trim() === "") {
      toast("Please provide address line.");
      return;
    }
    if (addressLine2.trim() === "") {
      toast("Please provide address line.");
      return;
    }
    if (city.trim() === "") {
      toast("Please provide city.");
      return;
    }
    if (district.trim() === "") {
      toast("Please provide district.");
      return;
    }
    if (st.trim() === "") {
      toast("Please provide state.");
      return;
    }
    if (country.trim() === "") {
      toast("Please provide country.");
      return;
    }
    if (pincode.trim() === "") {
      toast("Please provide pincode.");
      return;
    }
    if (phone.trim() === "") {
      toast("Please provide contact number.");
      return;
    }
    if (email.trim() === "") {
      toast("Please provide contact number.");
      return;
    }
    if (agencyCode.trim() === "") {
      toast("Please provide agency code.");
      return;
    }
    if (agencyName.trim() === "") {
      toast("Please provide agency name.");
      return;
    }
    const vendorRef = db.collection("vendors");
    const snapshot = await vendorRef.where("email", "==", email).get();
    if (!snapshot.empty) {
      toast("Already there is an account with this email!");
      return;
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });

    db.collection("vendors")
      .add({
        vendorName,
        firmName,
        addressLine1,
        addressLine2,
        city,
        district,
        state: st,
        country,
        pincode,
        phone,
        agencyCode,
        agencyName,
        email,
      })
      .then(async (data) => {
        console.log(data.id);
        let code = randomStr(8, "123456789abcdefgh@$");
        console.log(code);
        await registerUser(email, code)
          .then((res) => {
            if (!res) {
              const docRef = doc(db, "vendors", data.id);
              deleteDoc(docRef).then(() => {});
              return;
            }

            let obj = {
              agencyName: agencyName,
              email: email,
              pass: code,
              name: vendorName,
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
              );

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
    if(agencyName === "---Select Agency Name---")
    {
      toast("Please provide agency name");
      return;
    }
    if (vendorName.trim() === "") {
      toast("Please provide vendor name.");
      return;
    }
    if (firmName.trim() === "") {
      toast("Please provide firm name.");
      return;
    }
    if (addressLine1.trim() === "") {
      toast("Please provide address line.");
      return;
    }
    if (addressLine2.trim() === "") {
      toast("Please provide address line.");
      return;
    }
    if (city.trim() === "") {
      toast("Please provide city.");
      return;
    }
    if (district.trim() === "") {
      toast("Please provide district.");
      return;
    }
    if (st.trim() === "") {
      toast("Please provide state.");
      return;
    }
    if (country.trim() === "") {
      toast("Please provide country.");
      return;
    }
    if (pincode.trim() === "") {
      toast("Please provide pincode.");
      return;
    }
    if (phone.trim() === "") {
      toast("Please provide contact number.");
      return;
    }
    if (email.trim() === "") {
      toast("Please provide contact number.");
      return;
    }
    if (agencyCode.trim() === "") {
      toast("Please provide agency code.");
      return;
    }
    if (agencyName.trim() === "") {
      toast("Please provide agency name.");
      return;
    }
    db.collection("vendors")
      .doc(vendorId)
      .update({
        vendorName,
        firmName,
        addressLine1,
        addressLine2,
        city,
        district,
        state: st,
        country,
        pincode,
        phone,
        agencyCode,
        agencyName,
      })
      .then(() => {
        toast("Successfully Updated!");
        setIsUpdate(false);
      });
  };
  const handleAgency = (data) => {
    setAgencyName(data);
    for (let i = 0; i < agencyDetails.length; i++) {
      if (agencyDetails[i].aname === data) {
        setAgencyCode(agencyDetails[i].ac);
        break;
      }
    }
    console.log(agencyCode,"this is ac");
    console.log(agencyName,"this is an");
  };
  return (
    <div className="vendor">
      <Sidebar />
      <div className="vendorContainer">
        <Navbar />
        {!isNewForm && !isUpdate ? (
          <div className="datatable">
            <div className="datatableTitle">
              Add New Vendor
              <div className="link" onClick={() => setIsNewForm(true)}>
                Add New
              </div>
            </div>

            <DataGrid
              className="datagrid"
              rows={vendors}
              columns={vendorColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
            />
          </div>
        ) : !isUpdate && isNewForm ? (
          <div className="bottom" id="new-form">
            <form action="">
              <div className="formInput">
                <label>Vendor Name</label>
                <input
                  type="text"
                  placeholder="Vendor Name"
                  onChange={(e) => setVendorName(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Firm Name</label>
                <input
                  type="text"
                  placeholder="Firm Name"
                  onChange={(e) => setFirmName(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Address Line1</label>
                <input
                  type="text"
                  placeholder="Address Line1"
                  onChange={(e) => setAddressLine1(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Address Line2</label>
                <input
                  type="text"
                  placeholder="Address Line2"
                  onChange={(e) => setAddressLine2(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>District</label>
                <input
                  type="text"
                  placeholder="District"
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>State</label>
                <input
                  type="text"
                  placeholder="State"
                  onChange={(e) => setSt(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Pincode</label>
                <input
                  type="text"
                  placeholder="Pincode"
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>E-mail</label>
                <input
                  type="email"
                  placeholder="E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* <div className="formInput">
                <label>Agency Code</label>
                <input
                  type="text"
                  placeholder="Agency Code"
                  onChange={(e) => setAgencyCode(e.target.value)}
                  required
                />
              </div> */}
              <div className="formInput">
                <label>Agency Name</label>
                <select
                  name="Select Agency"
                  onChange={(e) => handleAgency(e.target.value)}
                >
                  <option>---Select Agency Name---</option>
                  {agencyDetails.map((ad) => (
                    <option key={ad.ac} value={ad.aname}>
                      {ad.aname}
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
                <label>Vendor Name</label>
                <input
                  type="text"
                  placeholder="Vendor Name"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Firm Name</label>
                <input
                  type="text"
                  placeholder="Firm Name"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Address Line1</label>
                <input
                  type="text"
                  placeholder="Address Line1"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Address Line2</label>
                <input
                  type="text"
                  placeholder="Address Line2"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>District</label>
                <input
                  type="text"
                  placeholder="District"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>State</label>
                <input
                  type="text"
                  placeholder="State"
                  value={st}
                  onChange={(e) => setSt(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Pincode</label>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {/* <div className="formInput">
                <label>Agency Code</label>
                <input
                  type="text"
                  placeholder="Agency Code"
                  value={agencyCode}
                  onChange={(e) => setAgencyCode(e.target.value)}
                />
              </div> */}
               <div className="formInput">
                <label>Agency Name</label>
                <select
                  name="Select Agency"
                  onChange={(e) => handleAgency(e.target.value)}
                >
                  <option>---Select Agency Name---</option>
                  {agencyDetails.map((ad) => (
                    <option key={ad.ac} value={ad.aname}>
                      {ad.aname}
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

export default Vendor;
