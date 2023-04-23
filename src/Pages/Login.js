import React from "react";
import "./css/login.css";
import { useState, useEffect } from "react";
import loginImg from "../images/undraw_secure_login_pdn4.svg";
import loginLogo from "../images/Logo.svg";
import { TextField, InputAdornment, Button, Alert } from "@mui/material";
import { Person, Password } from "@mui/icons-material";

export default function Login() {
  const API_URL = "http://localhost:2000/users";

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
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

  const signIn = () => {
    const filter = users.filter((data, key) => data.userName === userName);
    if (filter.length === 0) {
      document.getElementById("no-user-message").style.display = "flex";
    } else {
      document.getElementById("no-user-message").style.display = "none";
      filter.map((data, key) => {
        if (data.password === password) {
          document.getElementById("wrongPassword").style.display = "none";
          document.getElementById("success-message").style.display = "flex";
        } else {
          document.getElementById("wrongPassword").style.display = "flex";
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <img src={loginLogo} alt="" />
        <div className="input-container">
          <h2>Sign in to your account</h2>
          <div>
            <Alert id="no-user-message" variant="filled" severity="warning">
              This user doesn't exist!
            </Alert>
            <TextField
              id="text-field"
              label="Your Username"
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
          </div>
          <div>
            <TextField
              id="text-field"
              label="Password"
              type="password"
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
            <p id="wrongPassword">Wrong password! Try again.</p>
          </div>
          <Button id="login-btn" variant="outlined" onClick={() => signIn()}>
            Sign In
          </Button>
          <Alert id="success-message" variant="filled" severity="success">
            You signed in successfully!
          </Alert>
          <p>
            Don't have an account yet? <em id="signup-text">Sign up!</em>
          </p>
        </div>
      </div>
      <div className="image-container">
        <img src={loginImg} alt="" />
      </div>
    </div>
  );
}
