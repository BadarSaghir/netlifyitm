import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "../common/index.scss";
import { connect } from "react-redux";

// import custom Components
import Service from "../products/common/service";
// import BrandBlock from "./common/brand-block";
// import NewProduct from "../common/new-product";
import Breadcrumb from "../common/breadcrumb";
// import DetailsWithPrice from "./common/product/details-price";
// import DetailsTopTabs from "./common/details-top-tabs";
// import { addToCart, addToCartUnsafe, addToWishlist } from "../../actions";
import ImageZoom from "./image-zoom";
// import SmallImages from "./common/product/small-image";
// import { onSelctColor } from "../../services";

class BookView extends Component {
  state = {
    open: false,
    nav1: null,
    nav2: null,
    colorID: null,
    book: this.props.location.state,
  };

  // document.getElementById('idOfElement').classList.add('newClassName');
  //  componentDidMount =()=>{

  //      this.setState({book:this.props.location.state})
  //  }

  setRef = (ref) => {
    console.log("Setting ref", ref);
    this.setState({
      nav2: ref,
    });
  };

  filterClick() {
    document.getElementById("filter").style.left = "-15px";
  }
  backClick() {
    document.getElementById("filter").style.left = "-365px";
  }

  //   onMainSliderChange = (index) => {
  //     const item = this.props.item;
  //     const colorID = onSelctColor(item, index);
  //     console.log("SELECTED COLORID", colorID);
  //     this.setState({ colorID });
  //   };

  render() {
    const { symbol, item } = this.props;
    const { book } = this.state;
    var products = {
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      fade: true,
    };
    var productsnav = {
      slidesToShow: 3,
      swipeToSlide: true,
      arrows: false,
      dots: false,
      focusOnSelect: true,
    };

    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title>PP&City | Books |</title>
          <meta
            name="description"
            content="PP&City – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses."
          />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb parent={"Books"} title={book.name} />

        {/*Section Start*/}

        {book ? (
          <section className="section-b-space">
            <div className="collection-wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-sm-3 collection-filter" id="filter">
                    <div className="collection-mobile-back pl-5">
                      <span onClick={this.backClick} className="filter-back">
                        <i className="fa fa-angle-left" aria-hidden="true" />{" "}
                        back
                      </span>
                    </div>

                    {/* <BrandBlock/> */}
                    {/* <Service /> */}
                    <div>
                      <img
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/amazon_k_logo.png`}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    {/*side-bar single product slider start*/}
                    {/* <NewProduct /> */}
                    {/*side-bar single product slider end*/}
                  </div>
                  <div className="col-lg-9 col-sm-12 col-xs-12">
                    <div className="">
                      <div className="row">
                        <div className="col-xl-12" />
                      </div>
                      <div className="row">
                        {/* <div className="col-lg-6 product-thumbnail">
                                                    <img
                                                        className="product-slick"
                                                        src={book.image}
                                                        style={{border: "1px solid #ddd",
                                                            borderRadius: "4px",
                                                            padding: "5px",
                                                            width: "300px"}}
                                                    />
                                                </div> */}

                        <div className="col-lg-6 product-thumbnail">
                          <Slider
                            {...products}
                            afterChange={this.onMainSliderChange}
                            asNavFor={this.state.nav2}
                            ref={(slider) => (this.slider1 = slider)}
                            className="product-slick"
                          >
                            <div>
                              <ImageZoom image={book.image} />
                            </div>
                          </Slider>
                        </div>

                        <div className="col-lg-6">
                          <h2>{book.name}</h2>

                          <div
                            style={{
                              marginBottom: "60px",
                              textAlign: "justify",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: book.description,
                            }}
                          />

                          <div className="product-buttons">
                            <div className="product-buttons">
                              <a className="btn btn-solid" href={book.book_url}>
                                Buy Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <DetailsTopTabs item={book} /> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        {/*Section End*/}
      </div>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   console.log("State Data", state.data);
//   let productId = ownProps.match.params.id;
//   return {
//     item: state.data.products.find((el) => el.id == productId),
//     symbol: state.data.symbol,
//   };
// };

export default BookView;
