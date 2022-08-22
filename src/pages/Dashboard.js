import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { logoutUser } from '../firebaseConfig';
import { useHistory } from "react-router";
import { useNavigate } from "react-router-dom";
import NavbarComp from '../components/NavbarComp'
const Dashboard = () => {
  const navigate = useNavigate();
    const username = useSelector((state) => state.user.username)
   
    async function logout() {
        await logoutUser()
        navigate('/login');
    }
  
    return (
    <>
      <p>Hello {username}</p>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default Dashboard;
