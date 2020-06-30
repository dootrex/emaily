import React, { Component } from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <SurveyList />
        <div className="fixed-action-btn">
          <Link to="/surveys/new" className="btn-floating btn-large red pulse">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}
export default Dashboard;
