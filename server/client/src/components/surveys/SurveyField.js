import React from "react";

//redux form is sending a whole bunch of props to this component
//most of them are event handlers
//we are destructing and pulling input property from props object
//and then sending them to the input
//double destructing form meta
//this component is being used as a component which gets send through field component
//of redux form and gets these arguements automatically send through redux form
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label style={{ fontSize: "2rem", color: "black" }}>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
