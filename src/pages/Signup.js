import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import { registerUser } from "../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    console.log(username, password, cpassword);
    if (password !== cpassword) {
      toast("Password do not match.");
      return;
    }
    if (username.trim() === "" || password.trim() === "") {
      toast("Username and password are required");
      return;
    }
    const res = await registerUser(username, password);
    if (res) {
      toast("Registration successful!");
    }
  }

  return (
    <div
      style={{
        paddingTop: "10vh",
      }}
    >
      <Card style={{ backgroundColor: "#fdba70" }} className="cardcontainer">
        <Card.Header as="h5" className="text-center p-5">
          <strong>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "50px",
                textAlign: "center",
              }}
            >
              REGISTER
            </h1>
          </strong>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                style={{ padding: "12px", margin: "4px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                style={{ padding: "12px", margin: "4px",  }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter Password Again"
                onChange={(event) => {
                  setCPassword(event.target.value);
                }}
                style={{ padding: "12px", margin: "4px",  }}
              />
            </Form.Group>
            <Button
              variant="dark"
              size="lg"
              className="btn"
              type="submit"
              onClick={(e) => register(e)}
              style={{ padding: "12px", margin: "4px",  }}
            >
              SIGN-UP
            </Button>
            <p className="text-center mt-3">
              Already have and account? <Link to="/login" style={{color: "black"}}>LOGIN..</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
