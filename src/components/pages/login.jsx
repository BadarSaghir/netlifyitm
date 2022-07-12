import React, { Component } from "react";

import Breadcrumb from "../common/breadcrumb";

import { signInWithGoogle } from "../../fierbase";

import "./login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  login = async (e) => {
    e.preventDefault();
    const authResult = await signInWithGoogle();
    console.log(authResult.user);
    this.props.history.push({
      pathname: "/account",
    });
  };

  render() {
    return (
      <div>
        <Breadcrumb title={"Login"} />

        {/*Login section*/}
        <section className="login-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="theme-card">
                  <form className="theme-form LoginComp-form">
                    <div class="google-btn" onClick={this.login}>
                      <div class="google-icon-wrapper">
                        <img
                          class="google-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        />
                      </div>
                      <p class="btn-text">
                        <b>Sign in with google</b>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
