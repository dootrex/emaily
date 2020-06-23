import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StripeBilling from "./StripeBilling";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <ul className="right">
            <li>Login with</li>
            <li>
              <a className="btn-floating btn-large pulse" href="/auth/google">
                <i class="fab fa-google"></i>
              </a>
            </li>
            <li>
              <a className="btn-floating btn-large pulse" href="/auth/facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
          </ul>
        );
      default:
        return (
          <ul className="right">
            <li>
              <StripeBilling />
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </ul>
        );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper teal">
          <div className="container">
            <Link
              style={{ marginLeft: "5px" }}
              to={this.props.auth ? "/surveys" : "/"}
              className="left brand-logo"
            >
              <i class="fas fa-angle-double-down"></i>Emaily
            </Link>
            {this.renderContent()}
          </div>
        </div>
      </nav>
    );
  }
}
function mapStatetoProps({ auth }) {
  return { auth };
}

export default connect(mapStatetoProps)(Header);
