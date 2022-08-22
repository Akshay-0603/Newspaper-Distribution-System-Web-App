import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";
import { loginUser } from "../firebaseConfig";
import "./Login.css";
import { setUserState } from "../redux/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function login(e) {
    e.preventDefault();
    try {
      const res = await loginUser(username, password);
      console.log(res);
      if (res) {
        dispatch(setUserState(res.user.email));
        toast("You have logged in!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      style={{
        paddingTop: "10vh",
      }}
    >
      <Card className="cardcontainer">
        <Card.Header as="h5" className="text-center p-5">
          <strong>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "50px",
                textAlign: "center",
                color: "gray"
              }}
            >
              WELCOME
            </h1>
          </strong>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Your User ID"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                style={{
                  padding: "12px",
                  margin: "4px",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Your Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                style={{
                  padding: "12px",
                  margin: "4px",
                }}
              />
            </Form.Group>
            <Button
              variant="dark"
              size="lg"
              className="btn"
              type="submit"
              onClick={(e) => login(e)}
              style={{ padding: "12px", margin: "4px", backgroundColor: "teal"}}
            >
              LOGIN
            </Button>
          </Form>
          <Button
            // variant="dark"
            size="lg"
            className="btn signupbtn mt-2"
            type="submit"
            style={{ padding: "12px", margin: "4px", backgroundColor: "teal"}}
          >
            <Link to="/agency-signup" style={{ color: "white" }}>
              REGISTER
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
