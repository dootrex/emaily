import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    if (this.props.surveys.length > 0) {
      return this.props.surveys.reverse().map((survey) => {
        return (
          <div className="card blue-grey darken-1 hoverable" key={survey._id}>
            <div className="card-content white-text">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <hr></hr>
              <a> Yes: {survey.yes}</a>

              <a>
                {"  "}NO: {survey.no}
              </a>
            </div>
            <div className="card-action">
              <a>
                Last Active:{" "}
                {new Date(survey.lastResponded).toLocaleDateString()}
              </a>
              <a className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </a>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="center">
        <h3>Your survey list is empty.</h3>
        <hr></hr>
        <h5>Start by clicking on the red icon to send a survey.</h5>
      </div>
    );
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}
function mapStateToProps({ surveys }) {
  return { surveys };
}
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
