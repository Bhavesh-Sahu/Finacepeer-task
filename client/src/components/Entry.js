import React, { useState, useEffect, Fragment } from "react";
import ReactJson from "react-json-view";
import Upload from "./Upload";
function Entry() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/entry/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading === false && (
        <Fragment>
         <Upload setData={setData}/>        
          <ReactJson src={data} theme="monokai" groupArraysAfterLength={1000} />
          ;
        </Fragment>
      )}
    </div>
  );
}

export default Entry;
