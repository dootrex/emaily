import React, { Component } from "react";
//reduxform is simmilar to connect from redux.
//Field can be used to show any html element or any component you make
//handlesubmit is also provided by reduxform
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        {formFields.map(({ label, name }) => (
          <Field
            key={name}
            type="text"
            label={label}
            name={name}
            //component could also be a simple input statement or any other
            //html component
            component={SurveyField}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link
            to="/surveys"
            className="red btn-flat left white-text waves-effect"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="teal btn-flat right white-text waves-effect"
          >
            Next
          </button>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || "");
  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = "This field cannot be left empty.";
    }
  });
  //if errors is returned empty redux form think its all good
  return errors;
}
//reduxForm only takes one argument
export default reduxForm({
  validate: validate,
  //he name of your form and the key to where your form's state will be mounted under the redux-form reducer
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
