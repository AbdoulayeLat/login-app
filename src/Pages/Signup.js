import React, { useEffect, useState } from "react";
import "./css/signup.css";
import signImg from "../images/undraw_sign_up_n6im.svg";
import loginLogo from "../images/Logo.svg";
import { TextField, InputAdornment, Button, Alert } from "@mui/material";
import { Person, Password, Abc } from "@mui/icons-material";
import apiRequest from "../apiRequest";

export default function Signup() {
  const API_URL = "http://localhost:2000/users";

  const [users, setUsers] = useState([]);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw Error("Expected data not received");
        }
        const userList = await response.json();
        setUsers(userList);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const createUser = async () => {
    const user = {
      fullName: fullName,
      userName: userName,
      id: users.length,
      password: password,
    };
    const listUsers = [...users, user];
    setUsers(listUsers);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setError(result);
    if (error) {
      document.getElementById("signup-failed-message").style.display = "flex";
    } else {
      document.getElementById("signup-failed-message").style.display = "none";
      document.getElementById("signup-success-message").style.display = "flex";
    }
  };

  return (
    <div className="signup-container">
      <div className="image-container">
        <img src={signImg} alt="" />
      </div>
      <div className="create-container">
        <img src={loginLogo} alt="" />
        <div className="input-container">
          <h2>Create your account</h2>
          <TextField
            id="text-field"
            label="Enter your full name"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Abc fontSize="large" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            id="text-field"
            label="Enter your username"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Person fontSize="large" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            id="text-field"
            label="Enter your password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Password fontSize="large" />
                </InputAdornment>
              ),
            }}
            autoComplete="current-password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            id="login-btn"
            variant="outlined"
            onClick={() => createUser()}
          >
            Sign Up
          </Button>
          <Alert id="signup-failed-message" variant="filled" severity="error">
            An error occured! Try again
          </Alert>
          <Alert
            id="signup-success-message"
            variant="filled"
            severity="success"
          >
            Congratulations! You signed-in successfully
          </Alert>
          <p>
            Already have an account? <em id="signup-text">Sign in!</em>
          </p>
        </div>
      </div>
    </div>
  );
}
