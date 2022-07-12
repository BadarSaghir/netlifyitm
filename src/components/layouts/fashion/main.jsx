import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../../common/index.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";

// Import custom components
import TopCollection from "./top-collection";
import SpecialProducts from "../common/products";
//import BlogSection from "../common/blogsection";
import Instagram from "../common/instagram";
//import LogoBlock from "../common/logo-block";
import { svgservice, svgoffer } from "../../../services/script";
import HeaderOne from "../../common/headers/header-one";
import { connect } from "react-redux";
import { getAllProducts, clearSearch } from "../../../actions";
import queryString from "query-string";

class Fashion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPageContent = () => {
    return this.props.content.pages.find((page) => page.name === "home");
  };

  componentDidMount() {
    //this.props.getAllProducts();
    document.getElementById("color").setAttribute("href", `#`);
    setTimeout(function() {
      const loadrerWrapper = document.querySelector(".loader-wrapper");
      loadrerWrapper.style.display = "none";
    }, 2000);

    // eslint-disable-next-line no-restricted-globals
    const parsed = queryString.parse(location.search);
    const serchFor = parsed.search;
    if (!serchFor) {
      this.props.clearSearch();
    }
  }

  render() {
    const pageContent = this.getPageContent();

    return (
      <div>
        <Helmet>
          <title> InsideTheMafia | Fashion Store</title>
          <meta
            name="description"
            content=" InsideTheMafia – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses."
          />
        </Helmet>

        {/*Home Slider*/}
        <section className="p-0">
          <Slider className="slide-1 home-slider">
            <div>
              <div className="home home1 text-center">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="slider-contain">
                        <div>
                          <h4>{pageContent.slidersub1}</h4>
                          <h1>{pageContent.sliderTitle1}</h1>
                          <Link
                            to={`${process.env.PUBLIC_URL}/shop`}
                            className="btn btn-solid"
                          >
                            shop now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="home home2 text-center">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="slider-contain">
                        <div>
                          <h4>{pageContent.slidersub2}</h4>
                          <h1>{pageContent.sliderTitle2}</h1>
                          <Link
                            to={`${process.env.PUBLIC_URL}/shop`}
                            className="btn btn-solid"
                          >
                            shop now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </section>
        {/*Home Section End*/}

        {/*collection banner*/}
        <section className="pb-0">
          <div className="container">
            <div className="row partition2">
              <div className="col-md-6">
                <Link to={`${process.env.PUBLIC_URL}/shop`}>
                  <div className="collection-banner p-right text-center">
                    <img
                      src={`${
                        process.env.PUBLIC_URL
                      }/assets/images/sub-banner1.jpg`}
                      className="img-fluid"
                      alt=""
                    />
                    <div className="contain-banner">
                      <div>
                        <h4>{pageContent.subBannersub2}</h4>
                        <h2>{pageContent.subBannerTitle1}</h2>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6">
                <Link to={`${process.env.PUBLIC_URL}/shop`}>
                  <div className="collection-banner p-right text-center">
                    <img
                      src={`${
                        process.env.PUBLIC_URL
                      }/assets/images/sub-banner2.jpg`}
                      className="img-fluid"
                      alt=""
                    />
                    <div className="contain-banner">
                      <div>
                        <h4>{pageContent.subBannersub2}</h4>
                        <h2 style={{ color: "#ffffff" }}>
                          {pageContent.subBannerTitle2}
                        </h2>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/*collection banner end*/}

        <TopCollection />

        {/*Parallax banner*/}
        <section className="p-0">
          <div className="full-banner parallax-banner1 parallax text-center p-left">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="banner-contain">
                    <h2>{pageContent.paralaxTitle}</h2>
                    <h3>{pageContent.paralaxsub1}</h3>
                    <h4>{pageContent.paralaxsub2}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Parallax banner End*/}

        <SpecialProducts />

        {/*service layout*/}
        <div className="container">
          <section className="service border-section small-section ">
            <div className="row">
              {/* <div className="col-md-4 service-block">
                <div className="media">
                  <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                  <div className="media-body">
                    <h4>free shipping</h4>
                    <p>free shipping world wide</p>
                  </div>
                </div>
              </div> */}
              <div className="col-md-6 service-block">
                <div className="media">
                  <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                  <div className="media-body">
                    <h4>24 X 7 service</h4>
                    <p>online service for new customer</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 service-block">
                <div className="media">
                  <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                  <div className="media-body">
                    <h4>Great Discounts</h4>
                    <p>Discount Prices Available</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/*Blog Section end*/}
        {/* <div className="container">
          <div className="row">
            <div className="col">
              <div className="title1 section-t-space">
                <h4>Recent Story</h4>
                <h2 className="title-inner1">from the blog</h2>
              </div>
            </div>
          </div>
        </div>
        <section className="blog p-t-0">
          <BlogSection />
        </section> */}
        {/*Blog Section End*/}

        <Instagram />

        {/*logo section*/}
        {/* <LogoBlock /> */}
        {/*logo section end*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  content: state.content,
});

export default connect(
  mapStateToProps,
  { getAllProducts, clearSearch }
)(Fashion);
