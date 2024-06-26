import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../static/images/logo.png";
import { connect } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import * as authActions from "../../actions/authActions";
function LoggesOut(props) {
  return (
    <ul>
      <li className="signup ">
        <NavLink className=" btnv-2" to="/register">
          Register
        </NavLink>
      </li>
      <li className="signin">
        <NavLink className="text-black btnv-3" to="/login">
          Sign In
        </NavLink>
      </li>
    </ul>
  );
}

const Header = (props) => {
  const auth = props.auth;
  const handleLogOut = () => {
    console.log("The user will sign out");
    props.signOut();
  };

  return (
    <header className="header">
      <nav className="nav" style={{ height: "6rem" }}>
        <a href="/" className="holder-logo">
          <img className="logo" src={logo} alt="logo"></img>
        </a>
        <div className="header-links full-height">
          {isLoaded(auth) && !isEmpty(auth) ? (
            <>
              <ul>
                <li className="signin ">
                  <NavLink className="  " to="/">
                    Logged in as {auth.email}
                  </NavLink>
                </li>
                <li className="signin">
                  <button className="text-blue btnv-3" onClick={handleLogOut}>
                    Signout
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <LoggesOut></LoggesOut>
          )}

          <ul id="nav-mid">
            <li>
              <NavLink className="btn-nvt-gm" to="/resume-templates">
                Resume Templates
              </NavLink>
            </li>
            <li className="holder-pricing">
              <NavLink className="btn-nvt-gm" to="/about-us">
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(authActions.signout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
