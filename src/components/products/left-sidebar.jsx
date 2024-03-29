import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import "../common/index.scss";
import { connect } from "react-redux";

// import custom Components
import Service from "./common/service";
import BrandBlock from "./common/brand-block";
import NewProduct from "../common/new-product";
import Breadcrumb from "../common/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartUnsafe, addToWishlist } from "../../actions";
import ImageZoom from "./common/product/image-zoom";
import SmallImages from "./common/product/small-image";
import { onSelctColor, getItemDiscriptionList } from "../../services";

class LeftSideBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      nav1: null,
      nav2: null,
      colorID: null,
      loading: true,
      timer: null,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }
  // document.getElementById('idOfElement').classList.add('newClassName');

  componentDidMount() {
    this.state.timer = setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
    const selectedItem = this.props.item;
    console.log("CURENT ITEM", selectedItem);
    // console.log("props", this.props)
    // console.log("paramID",this.props.match.params.id)
    if (selectedItem) {
      getItemDiscriptionList(selectedItem);
    }
  }

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

  onMainSliderChange = (index) => {
    const item = this.props.item;
    const colorID = onSelctColor(item, index);
    console.log("SELECTED COLORID", colorID);
    this.setState({ colorID });
  };

  render() {
    const {
      symbol,
      item,
      addToCart,
      addToCartUnsafe,
      addToWishlist,
    } = this.props;
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

    const bredcumbTitle = item ? item.name : "Product";

    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title>InsideTheMafia Product</title>
          <meta
            name="description"
            content=" InsideTheMafia – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses."
          />
          {/* <script async src="https://www.tiktok.com/embed.js"/> */}
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb parent={"Product"} title={bredcumbTitle} />

        {/*Section Start*/}
        {item ? (
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
                    <Service />
                    {/*side-bar single product slider start*/}
                    <NewProduct />
                    {/*side-bar single product slider end*/}
                  </div>
                  <div className="col-lg-9 col-sm-12 col-xs-12">
                    <div className="">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="filter-main-btn mb-2">
                            <span
                              onClick={this.filterClick}
                              className="filter-btn"
                            >
                              <i className="fa fa-filter" aria-hidden="true" />{" "}
                              filter
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 product-thumbnail">
                          <Slider
                            {...products}
                            afterChange={this.onMainSliderChange}
                            asNavFor={this.state.nav2}
                            ref={(slider) => (this.slider1 = slider)}
                            className="product-slick"
                          >
                            {item.variants
                              ? item.variants
                                  //printful image get
                                  .filter(
                                    (vari) =>
                                      vari.type === "color" ||
                                      vari.type === "default"
                                  )
                                  .filter(
                                    (v, i, a) =>
                                      a.findIndex(
                                        (t) => t.color === v.color
                                      ) === i
                                  )
                                  .map((vari, index) => (
                                    <div key={index}>
                                      <ImageZoom image={vari.images} />
                                    </div>
                                  ))
                              : //printify image get
                                item.pictures.map((vari, index) => (
                                  <div key={index}>
                                    <ImageZoom image={vari} />
                                  </div>
                                ))}
                          </Slider>
                          <SmallImages
                            item={item}
                            settings={productsnav}
                            navOne={this.slider1}
                            setRef={this.setRef}
                          />
                        </div>
                        <DetailsWithPrice
                          symbol={symbol}
                          item={item}
                          colorID={this.state.colorID}
                          navOne={this.state.nav1}
                          addToCartClicked={addToCart}
                          BuynowClicked={addToCartUnsafe}
                          addToWishlistClicked={addToWishlist}
                        />
                      </div>
                    </div>
                    <DetailsTopTabs item={item} />
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

const mapStateToProps = (state, ownProps) => {
  console.log("State Data", state.data);

  let productId = ownProps.match.params.id;

  console.log(
    "product_details",
    state.data.products.find((el) => el.id == productId)
  );
  return {
    item: state.data.products.find((el) => el.id == productId) || null,
    symbol: state.data.symbol,
  };
};

export default connect(
  mapStateToProps,
  { addToCart, addToCartUnsafe, addToWishlist }
)(LeftSideBar);
