import React, { useState } from "react";

function ChoiceOptions(props) {
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
      <div style={{ paddingRight: "8px" }}>
        <label style={{ paddingRight: "8px" }}>choice 1</label>
        <input
          type="text"
          placeholder="option 1"
          name="option1"
          onChange={handleChange}
        ></input>
      </div>
      <div style={{ paddingRight: "8px" }}>
        <label style={{ paddingRight: "8px" }}>choice 2</label>
        <input
          type="text"
          placeholder="option 2"
          name="option2"
          onChange={handleChange}
        ></input>
      </div>
      <div style={{ paddingRight: "8px" }}>
        <label style={{ paddingRight: "8px" }}>choice 3</label>
        <input
          type="text"
          placeholder="option 3"
          name="option3"
          onChange={handleChange}
        ></input>
      </div>
      <div style={{ paddingRight: "8px" }}>
        <label style={{ paddingRight: "8px" }}>choice 4</label>
        <input
          type="text"
          placeholder="option 4"
          name="option4"
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
}

export default ChoiceOptions;
