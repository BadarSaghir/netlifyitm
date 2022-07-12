import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslate } from "react-redux-multilingual";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navClose: { right: "0px" },
    };
  }

  componentWillMount() {
    if (window.innerWidth < 750) {
      this.setState({ navClose: { right: "-410px" } });
    }
    if (window.innerWidth < 1199) {
      this.setState({ navClose: { right: "-300px" } });
    }
  }

  openNav() {
    console.log("open");
    this.setState({ navClose: { right: "0px" } });
  }
  closeNav() {
    this.setState({ navClose: { right: "-410px" } });
  }

  onMouseEnterHandler() {
    if (window.innerWidth > 1199) {
      document.querySelector("#main-menu").classList.add("hover-unset");
    }
  }

  handleSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensubmenu"))
      event.target.nextElementSibling.classList.remove("opensubmenu");
    else {
      document.querySelectorAll(".nav-submenu").forEach(function(value) {
        value.classList.remove("opensubmenu");
      });
      document
        .querySelector(".mega-menu-container")
        .classList.remove("opensubmenu");
      event.target.nextElementSibling.classList.add("opensubmenu");
    }
  };

  handleMegaSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (
      event.target.parentNode.nextElementSibling.classList.contains(
        "opensubmegamenu"
      )
    )
      event.target.parentNode.nextElementSibling.classList.remove(
        "opensubmegamenu"
      );
    else {
      document.querySelectorAll(".menu-content").forEach(function(value) {
        value.classList.remove("opensubmegamenu");
      });
      event.target.parentNode.nextElementSibling.classList.add(
        "opensubmegamenu"
      );
    }
  };

  render() {
    const { translate } = this.props;
    return (
      <div>
        <div className="main-navbar">
          <div id="mainnav">
            <div className="toggle-nav" onClick={this.openNav.bind(this)}>
              <i className="fa fa-bars sidebar-bar" />
            </div>
            <ul className="nav-menu" style={this.state.navClose}>
              <li className="back-btn" onClick={this.closeNav.bind(this)}>
                <div className="mobile-back text-right">
                  <span>Back</span>
                  <i className="fa fa-angle-right pl-2" aria-hidden="true" />
                </div>
              </li>
              <li>
                <Link
                  to={`${process.env.PUBLIC_URL}/home`}
                  className="nav-link"
                >
                  {translate("home")}
                  {/* <span className="sub-arrow"></span> */}
                </Link>
                {/* <ul className="nav-submenu" >
                                    <li><Link to={`${process.env.PUBLIC_URL}/fashion`} >{translate('fashion')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/beauty`} >{translate('beauty')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/electronic`} >{translate('electronic')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/furniture`} >{translate('furniture')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/kids`} >{translate('kids')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pets`} >{translate('pets')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/vegetables`} >{translate('vegetables')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/watch`} >{translate('watch')}</Link></li>
                                </ul> */}
              </li>
              <li>
                <Link
                  to={`${process.env.PUBLIC_URL}/shop`}
                  className="nav-link"
                >
                  {translate("shop")}
                </Link>
              </li>

              <li>
                <Link
                  to={`${process.env.PUBLIC_URL}/books`}
                  className="nav-link"
                >
                  Books
                </Link>
              </li>

              <li>
                <Link
                  to={`${process.env.PUBLIC_URL}/music`}
                  className="nav-link"
                >
                  Music
                </Link>
              </li>

              <li>
                <Link
                  to={`${process.env.PUBLIC_URL}/about-us`}
                  className="nav-link"
                >
                  {translate("about_us")}
                </Link>
                {/* <ul className="nav-submenu">
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/about-us`} >{translate('about_us')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/404`} >404</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/lookbook`} >{translate('lookbook')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/login`} >{translate('login')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/register`} >{translate('register')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/search`} >{translate('search')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/collection`} >{translate('collection')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/forget-password`} >{translate('forget_password')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/contact`} >{translate('contact')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/dashboard`} >{translate('dashboard')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/pages/faq`} >{translate('FAQ')}</Link></li>
                                </ul> */}
              </li>
              {/* <li >
                                <Link to="#" className="nav-link" onClick={(e) => this.handleSubmenu(e)}>
                                    {translate('blog')}
                                    <span className="sub-arrow"></span>
                                </Link>
                                <ul className="nav-submenu">
                                    <li><Link to={`${process.env.PUBLIC_URL}/blog/blog-page`} >{translate('blog_left_sidebar')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/blog/right-sidebar`} >{translate('blog_right_sidebar')}</Link></li>
                                    <li><Link to={`${process.env.PUBLIC_URL}/blog/details`} >{translate('blog_detail')}</Link></li>
                                </ul>
                            </li> */}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslate(NavBar);
