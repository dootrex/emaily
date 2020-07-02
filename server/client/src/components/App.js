import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import ParticlesBg from "particles-bg";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser(); //fetchuser is being imported from actions
  }

  render() {
    return (
      <div style={{ fontFamily: "Helvetica" }}>
        <ParticlesBg type="square" bg={true} />
        {/* BrowserRouter only takes one child */}
        <BrowserRouter>
          <Header />
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
