import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyReview = ({ formValues, onCancel, submitSurvey, history }) => {
  const reviewFields = formFields.map((field) => {
    return (
      <div key={field.name}>
        <label style={{ fontSize: "1rem", color: "#3d3d3b" }}>
          {field.label}
        </label>
        <div sytle={{ fontSize: "2rem", color: "black" }}>
          {formValues[field.name]}
        </div>
        <hr></hr>
      </div>
    );
  });

  return (
    <div>
      <h3>Please confirm your details.</h3>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat left"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text center"
      >
        Send Survey <i className="material-icons">email</i>
      </button>
    </div>
  );
};

function mapStatetoProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}
//when we define mapStatetoProps function which could be named anything but whatever
//we return will show up as props to our component
export default connect(mapStatetoProps, actions)(withRouter(SurveyReview));
