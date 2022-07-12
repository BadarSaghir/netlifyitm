import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";

// Custom Components
import HeaderOne from "./common/headers/header-one";
import HeaderTwo from "./common/headers/header-two";
import HeaderThree from "./common/headers/header-three";

import FooterOne from "./common/footers/footer-one";
import FooterTwo from "./common/footers/footer-two";
import FooterThree from "./common/footers/footer-three";

// ThemeSettings
//import ThemeSettings from "./common/theme-settings";
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <LoadingOverlay active={this.props.isActive} spinner>
        <div>
          <HeaderOne logoName={"logo.png"} />
          {this.props.children}
          <FooterOne logoName={"logo.png"} />

          {/* <ThemeSettings /> */}
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("TEST STATE", state);
  return {
    isActive: state.loadingOverlay.isLoading,
  };
};

export default connect(mapStateToProps)(withTranslate(App));
