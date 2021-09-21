import React from "react";
import axios from "axios";

export default function Upload({ setData }) {
  const [uploadFile, setUploadFile] = React.useState();
  const [uploadResponse, setUploadResponse] = React.useState();

  const submitForm = (event) => {
    event.preventDefault();

    const dataArray = new FormData();
    dataArray.append("file", uploadFile);
    console.log({ dataArray });
    axios
      .post("http://127.0.0.1:8000/api/v1/entry/", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUploadResponse(`File uploaded successfully`);
        console.log("post response", response.data);
        setData(response.data);
      })
      .catch((error) => {
        setUploadResponse(`File uploaded successfully`);
      });
  };

  return (
    <div className="App">
      <form onSubmit={submitForm}>
        <input type="file" accept=".json" onChange={(e) => setUploadFile(e.target.files[0])} />
        <br />
        <input type="submit" />
      </form>
      <hr />
      <pre>{uploadResponse}</pre>
    </div>
  );
}
