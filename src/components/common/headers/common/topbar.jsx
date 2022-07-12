import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslate } from "react-redux-multilingual";

import { firebaseAuth } from "../../../../fierbase";
import { connect } from "react-redux";

class TopBar extends Component {
  constructor() {
    super();
    this.state = {
      authUser: null,
      isLoggedIn: false,
    };
  }

  onAuthChange = () => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User Signed In", user);
        this.setState({ isLoggedIn: true, authUser: user });
      } else {
        console.log("No User");
        this.setState({ isLoggedIn: false, authUser: null });
      }
    });
  };

  componentDidMount = () => {
    this.onAuthChange();
  };

  componentDidUpdate = () => {
    //this.onAuthChange();
  };

  logOut = () => {
    console.log("LOG OUT");
    firebaseAuth
      .signOut()
      .then(() => {
        this.setState({ isLoggedIn: false, authUser: null });
      })
      .catch((error) => {
        this.setState({ isLoggedIn: false, authUser: null });
      });
  };

  getCommonContent = () => {
    return this.props.content.pages.find((page) => page.name === "common");
  };

  render() {
    const { translate } = this.props;
    const { authUser, isLoggedIn } = this.state;
    const commonContent = this.getCommonContent();
    return (
      <div className="top-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="header-contact">
                <ul>
                  <li>Welcome to InsideTheMafia Store</li>
                  <li>
                    <i className="fa fa-phone" aria-hidden="true" />
                    {translate("call_us")}: {commonContent.phone}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 text-right">
              <ul className="header-dropdown">
                <li className="mobile-wishlist compare-mobile">
                  <Link to={`${process.env.PUBLIC_URL}/compare`}>
                    <i className="fa fa-random" aria-hidden="true" />
                    {translate("compare")}
                  </Link>
                </li>
                <li className="mobile-wishlist">
                  <Link to={`${process.env.PUBLIC_URL}/wishlist`}>
                    <i className="fa fa-heart" aria-hidden="true" />
                    {translate("wishlist")}
                  </Link>
                </li>
                <li className="onhover-dropdown mobile-account">
                  <i className="fa fa-user" aria-hidden="true" />{" "}
                  <Link to={`${process.env.PUBLIC_URL}/account`} data-lng="en">
                    My Account
                  </Link>
                  <ul className="onhover-show-div">
                    {isLoggedIn ? (
                      <li onClick={this.logOut}>Logout</li>
                    ) : (
                      <li>
                        <Link
                          to={`${process.env.PUBLIC_URL}/login`}
                          data-lng="en"
                        >
                          Login
                        </Link>
                      </li>
                    )}

                    {/* <li>
                      <Link
                        to={`${process.env.PUBLIC_URL}/pages/register`}
                        data-lng="en"
                      >
                        Register
                      </Link>
                    </li> */}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  content: state.content,
});

export default connect(mapStateToProps)(withTranslate(TopBar));
