import React, { useState } from "react";

function SentenceOptions(props) {
  const [infoObj, setinfoObj] = useState({});

  const handleChange = (e) => {
    let obj = {};
    // console.log(e.target.name);
    obj[e.target.name] = e.target.value;
    setinfoObj({ ...infoObj, ...obj });

    console.log(infoObj);
    props.changeInformation(infoObj);
  };

  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      <label style={{ paddingRight: "10px" }}>
        Can you please translate the sentence
      </label>
      <input
        type="text"
        placeholder="Translation:"
        name="sentence"
        onChange={handleChange}
      ></input>
    </div>
  );
}

export default SentenceOptions;
