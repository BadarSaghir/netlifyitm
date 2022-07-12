import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SlideUpDown } from "../../../services/script";
import LogoImage from "../headers/common/logo";
import db from "./../../../fierbase";
import { connect } from "react-redux";

class FooterOne extends Component {
  state = {
    email: "",
    error: "",
  };

  email_validation = () => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        this.state.email
      )
    ) {
      this.add_subscribers();
    } else {
      this.setState({ error: 1 });
      setTimeout(() => this.setState({ error: "" }), 2000);
    }
  };

  add_subscribers = () => {
    const data = {
      Email: this.state.email,
    };
    const dbRef = db.collection("Subscribers");
    dbRef.add(data).then(() => {
      this.setState({ error: 0 });
      setTimeout(() => this.setState({ error: "", email: "" }), 2000);
      console.log("Subscriber Added");
    });
  };

  handleChange = (evt) => {
    this.setState({ email: evt.target.value });
    console.log(this.state.email);
  };
  componentDidMount() {
    var contentwidth = window.innerWidth;
    if (contentwidth < 750) {
      SlideUpDown("footer-title");
    } else {
      var elems = document.querySelectorAll(".footer-title");
      [].forEach.call(elems, function(elemt) {
        let el = elemt.nextElementSibling;
        el.style = "display: block";
      });
    }
  }

  getPageContent = () => {
    return this.props.content.pages.find((page) => page.name === "footer");
  };

  getCommonContent = () => {
    return this.props.content.pages.find((page) => page.name === "common");
  };

  render() {
    const { email, error } = this.state;

    const pageContent = this.getPageContent();
    const commonContent = this.getCommonContent();

    return (
      <footer className="footer-light">
        <div className="light-layout">
          <div className="container">
            <section className="small-section border-section border-top-0">
              <div className="row">
                <div className="col-lg-6">
                  <div className="subscribe">
                    <div>
                      <h4>KNOW IT ALL FIRST!</h4>
                      <p>
                        Never Miss Anything From InsideTheMafia By Signing Up To
                        Our Newsletter.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  {error === 0 ? (
                    <h5 style={{ color: "#449148", marginLeft: "40%" }}>
                      Subscribed
                    </h5>
                  ) : error == 1 ? (
                    <h5 style={{ color: "#f53e31", marginLeft: "40%" }}>
                      invalid email
                    </h5>
                  ) : (
                    ""
                  )}

                  <div className="form-inline subscribe-form">
                    <div className="form-group mx-sm-3">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(evt) => this.handleChange(evt)}
                      />
                    </div>
                    <button
                      className="btn btn-solid"
                      onClick={() => this.email_validation()}
                    >
                      subscribe
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <section className="section-b-space light-layout">
          <div className="container">
            <div className="row footer-theme partition-f">
              <div className="col-lg-4 col-md-6">
                <div className="footer-title footer-mobile-title">
                  <h4>about</h4>
                </div>
                <div className="footer-contant">
                  <div className="footer-logo">
                    <LogoImage logo={this.props.logoName} />
                  </div>
                  <p>{pageContent.body}</p>
                  <div className="footer-social">
                    <ul>
                      <li>
                        <a
                          href={commonContent.facebookURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={commonContent.twitterURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={commonContent.instagramURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col offset-xl-1">
                <div className="sub-title">
                  <div className="footer-title">
                    <Link to={`${process.env.PUBLIC_URL}/account`}>
                      <h4> MY Account </h4>
                    </Link>
                  </div>
                  <div className="footer-contant">
                    {/* <ul>
                      <li>
                        <Link
                          to={`${
                            process.env.PUBLIC_URL
                          }/left-sidebar/collection`}
                        >
                          women's
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${
                            process.env.PUBLIC_URL
                          }/left-sidebar/collection`}
                        >
                          clothing
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${
                            process.env.PUBLIC_URL
                          }/left-sidebar/collection`}
                        >
                          accessories
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`${
                            process.env.PUBLIC_URL
                          }/left-sidebar/collection`}
                        >
                          featured
                        </Link>
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="sub-title">
                  <div className="footer-title">
                    <h4>why we choose</h4>
                  </div>
                  <div className="footer-contant">
                    <ul>
                      <li>shipping & return</li>
                      <li>secure shopping</li>
                      <li>
                        <Link to={`${process.env.PUBLIC_URL}/shop`}>
                          gallary
                        </Link>
                      </li>
                      <li>
                        <Link to={`${process.env.PUBLIC_URL}/about-us`}>
                          about
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="sub-title">
                  <div className="footer-title">
                    <h4>store information</h4>
                  </div>
                  <div className="footer-contant">
                    <ul className="contact-list">
                      <li>
                        <i className="fa fa-map-marker" />
                        {commonContent.location}
                      </li>
                      <li>
                        <i className="fa fa-phone" />
                        Call Us: {commonContent.phone}
                      </li>
                      <li>
                        <i className="fa fa-envelope-o" />
                        Email Us: {commonContent.email}
                      </li>
                      <li>
                        <i className="fa fa-fax" />
                        Fax:{commonContent.fax}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="sub-footer ">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="footer-end">
                  <p>
                    <i className="fa fa-copyright" aria-hidden="true" /> 2020
                    powered by TSD
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="payment-card-bottom">
                  <ul>
                    <li>
                      <a href="#">
                        <img
                          src={`${
                            process.env.PUBLIC_URL
                          }/assets/images/icon/visa.png`}
                          alt=""
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src={`${
                            process.env.PUBLIC_URL
                          }/assets/images/icon/mastercard.png`}
                          alt=""
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src={`${
                            process.env.PUBLIC_URL
                          }/assets/images/icon/paypal.png`}
                          alt=""
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src={`${
                            process.env.PUBLIC_URL
                          }/assets/images/icon/american-express.png`}
                          alt=""
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src={`${
                            process.env.PUBLIC_URL
                          }/assets/images/icon/discover.png`}
                          alt=""
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
const mapStateToProps = (state) => ({
  content: state.content,
});
export default connect(mapStateToProps)(FooterOne);
