import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StripeBilling from "./StripeBilling";
import M from "materialize-css/dist/js/materialize";

const Header = (props) => {
  // let sidenav = document.querySelector('#slide-out');
  // M.Sidenav.init(sidenav, {});
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const classSelect = isLogged ? "#loggedIn" : "#loggedOut";
    console.log(classSelect);
    console.log("this is the state:" + isLogged);
    let sidenav = document.querySelector(classSelect);
    M.Sidenav.init(sidenav, {});
  }, [isLogged]);

  const renderContent = () => {
    switch (props.auth) {
      case null:
        return;
      case false:
        if (isLogged) {
          setIsLogged(false);
        }
        return (
          <>
            <a
              href="#"
              data-target="loggedOut"
              className="sidenav-trigger right"
            >
              <i className="material-icons">menu</i>
            </a>

            <ul className="hide-on-med-and-down right">
              <li>Login/SignUp with</li>
              <li>
                <a className="btn-floating btn-large pulse" href="/auth/google">
                  <i className="fab fa-google"></i>
                </a>
              </li>
              <li>
                <a
                  className="btn-floating btn-large pulse"
                  href="/auth/facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
            </ul>
          </>
        );
      default:
        if (!isLogged) {
          setIsLogged(true);
        }
        return (
          <>
            <a href="#" data-target="loggedIn" class="sidenav-trigger right">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-med-and-down">
              <li>{props.auth.userName}</li>
              <li style={{ margin: "0 10px" }}>
                <StripeBilling btnType="btn" />
              </li>
              <li>Balance: {props.auth.credits}</li>
              <li>
                <a href="/api/logout">Logout</a>
              </li>
            </ul>
            <ul className="sidenav" id="loggedIn">
              <li>
                <a className="btn-large disabled">{props.auth.userName}</a>
              </li>
              <li className="center">
                <StripeBilling btnType="btn-large blue pulse" />
              </li>
              <li>
                <a className="btn-large disabled">
                  Balance: {props.auth.credits}
                </a>
              </li>
              <li>
                <a className="btn-large red lighten-3" href="/api/logout">
                  Logout
                </a>
              </li>
            </ul>
          </>
        );
    }
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper teal">
          <div className="container">
            <Link
              style={{ marginLeft: "5px" }}
              to={props.auth ? "/surveys" : "/"}
              className="left brand-logo"
            >
              <div style={{ fontFamily: "cursive" }}>Emaily</div>
            </Link>
            {renderContent()}
          </div>
        </div>
      </nav>
      <ul className="sidenav" id="loggedOut">
        <li>
          <a className="btn-large disabled">Login With</a>
        </li>
        <li>
          <a className=" btn-large pulse" href="/auth/facebook">
            <i className="fab fa-facebook-f"></i>facebook
          </a>
        </li>
        <li>
          <a className=" btn pulse" href="/auth/google">
            <i className="fab fa-google"></i>google
          </a>
        </li>
      </ul>
    </>
  );
};

function mapStatetoProps({ auth }) {
  return { auth };
}

export default connect(mapStatetoProps)(Header);
