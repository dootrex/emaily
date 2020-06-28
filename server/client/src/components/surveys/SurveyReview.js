import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyReview = ({ formValues, onCancel, submitSurvey, history }) => {
  const reviewFields = formFields.map((field) => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h1>confimr your stuff</h1>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat left"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send SurveyReview<i className="material-icons">email</i>
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
