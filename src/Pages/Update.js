import React from "react";
import { useState, useEffect } from "react";
import "./css/update.css";
import logo from "../images/Logo.svg";
import { Alert, Button, TextField } from "@mui/material";
import apiRequest from "../apiRequest";

export default function Update() {
  const id = 1;
  const API_URL = "http://localhost:2000/users";

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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

  const updateProfile = async () => {
    const listUsers = users.map((user) =>
      user.id === id
        ? {
            ...user,
            fullName: fullName !== "" ? fullName : user.fullName,
            userName: userName !== "" ? userName : user.userName,
            password: password !== "" ? password : user.password,
          }
        : user
    );
    setUsers(listUsers);

    const newUser = listUsers.filter((user) => user.id === id);
    console.log(listUsers);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser[0]),
    };

    const requestURL = `${API_URL}/${id}`;
    const result = await apiRequest(requestURL, updateOptions);
    if (result) setError(result);
    document.getElementById("update-success-message").style.display = "flex";
  };

  return (
    <div className="main-update-container">
      <div className="update-container">
        <img src={logo} alt="" />
        <h2>Update your profile</h2>
        {error && (
          <div>
            <Alert id="update-failed-message" variant="filled" severity="error">
              An error occured! Try again
            </Alert>
            <p>{`Error: ${error}`}</p>
          </div>
        )}
        {users
          .filter((data, key) => data.id === id)
          .map((data, key) => {
            return (
              <div id="update-textfield-container" key={key}>
                <TextField
                  id="update-textfield"
                  variant="filled"
                  label="Fullname"
                  defaultValue={data.fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                  id="update-textfield"
                  variant="filled"
                  label="Username"
                  defaultValue={data.userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                  id="update-textfield"
                  variant="filled"
                  label="Password"
                  defaultValue={data.password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  onClick={() => {
                    updateProfile();
                  }}
                  id="update-btn"
                  color="success"
                  variant="contained"
                >
                  Save Changes
                </Button>
                <Alert
                  id="update-success-message"
                  variant="filled"
                  severity="success"
                >
                  Changes saved successfully!
                </Alert>
              </div>
            );
          })}
      </div>
    </div>
  );
}
