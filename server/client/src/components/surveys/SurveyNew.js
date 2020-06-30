import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyReview";
import { reduxForm } from "redux-form";

class SurveyNew extends Component {
  //we can create state like the following in the class based componenet thanks to
  //babel. Instead of constructor
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div className="container">{this.renderContent()}</div>;
  }
}

//since we didnt give it the unmount key it allows us to navigate to a differnt page and
//all the values get dumped away which is the default behaviour of redux form
//checkout surveyForm for the other behaviour
export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
