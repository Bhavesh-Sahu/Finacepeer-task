import React, { useState, useEffect, Fragment } from "react";
import Entry from "../../components/Entry";


const Dashboard = () => {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.replace("http://localhost:3000/login");
    } else {
      fetch("http://127.0.0.1:8000/api/v1/users/auth/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserEmail(data.email);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className>
      {loading === false && (
        <Fragment>
          <h1 className="primary2">Dashboard</h1>
          <h3 className="hello">Hello {userEmail}!</h3>
         
          <Entry />
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
