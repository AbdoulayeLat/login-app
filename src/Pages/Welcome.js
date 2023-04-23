import React from "react";
import { useState, useEffect } from "react";
import "./css/welcome.css";
import welcomeLogo from "../images/undraw_welcome_cats_thqn.svg";

export default function Welcome() {
  const API_URL = "http://localhost:2000/users";
  const id = 1;

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [exist, setExist] = useState(false); //Checks if user exist in db

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

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

  useEffect(() => {
    const checkUser = async () => {
      users
        .filter((data, key) => data.id === id)
        .map((data, key) => {
          setExist(true);
        });
    };

    checkUser();
  });

  return (
    <div className="welcome-container">
      <img src={welcomeLogo} alt="" />
      {error && <p>{`Error: ${error}`}</p>}
      {error === null && exist === false && <p>This user doesn't exist</p>}
      {error === null &&
        exist === true &&
        users
          .filter((data, key) => data.id === id)
          .map((data, key) => {
            return (
              <div key={key}>
                <p>{data.fullName}</p>
                <p>Today's date: {date}</p>
              </div>
            );
          })}
    </div>
  );
}
