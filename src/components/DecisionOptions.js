import React, { useState } from "react";

function DecisionOptions(props) {
  const [infoObj, setinfoObj] = useState({});

  const handleChange = (e) => {
    let obj = {};
    // console.log(e.target.name);
    obj[e.target.name] = e.target.value;
    setinfoObj({ ...infoObj, ...obj });

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
      <label style={{ paddingRight: "10px" }}>Enter the correct decision</label>
      <input
        type="text"
        placeholder="Decision Option (true/false)"
        name="decision"
        onChange={handleChange}
      ></input>
    </div>
  );
}

export default DecisionOptions;
