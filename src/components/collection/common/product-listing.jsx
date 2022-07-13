import React, { Component } from "react";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

//import { getTotal, getCartProducts } from "../../../reducers";
import {
  addToCart,
  addToWishlist,
  addToCompare,
  clearSearch,
} from "../../../actions";
import { getVisibleproducts } from "../../../services";
import ProductListItem from "./product-list-item";
import { getActiveSKU } from "../../../services";
import uuid from "react-uuid";

class ProductListing extends Component {
  constructor(props) {
    super(props);

    this.state = { limit: 8, hasMoreItems: true };
  }

  componentDidMount() {
    //this.fetchMoreItems();
    if (!this.props.search) {
      this.setState({ hasMoreItems: true });
      this.props.clearSearch();
    }
  }

  fetchMoreItems = () => {
    console.log("Fetch Items");

    let products = this.props.products;

    if (this.state.limit >= products.length) {
      this.setState({ hasMoreItems: false });
      return;
    }
    // a fake async api call
    setTimeout(() => {
      this.setState({
        limit: this.state.limit + 4,
      });
    }, 1000);
  };

  addToCartClicked = (item) => {
    // TODO: getA null is causing error
    const SKU = getActiveSKU(item, null, null);
    console.log("ADD CART Sku", SKU);
    this.props.addToCart(item, 1, SKU);
  };

  // setProductLengthState = (products) => {
  //   if (this.state.limit >= products.length) {
  //     this.setState({ hasMoreItems: false });
  //     return;
  //   }
  // };

  render() {
    const { addToCart, symbol, addToWishlist, addToCompare } = this.props;
    console.log(this.props.colSize);

    let products = this.props.products;

    return (
      <div>
        <div className="product-wrapper-grid">
          <div className="container-fluid">
            {products.length > 0 ? (
              <InfiniteScroll
                dataLength={this.state.limit} //This is important field to render the next data
                next={this.fetchMoreItems}
                hasMore={this.state.hasMoreItems}
                loader={<div className="loading-cls" />}
                scrollThreshold="-100px"
                endMessage={
                  <p className="seen-cls seen-it-cls">
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <div className="row">
                  {products.slice(0, this.state.limit).map((product, index) => (
                    <div
                      className={`${
                        this.props.colSize === 3
                          ? "col-xl-3 col-md-6 col-grid-box"
                          : "col-lg-" + this.props.colSize
                      }`}
                      key={uuid()}
                    >
                      <ProductListItem
                        product={product}
                        symbol={symbol}
                        onAddToCompareClicked={() => addToCompare(product)}
                        onAddToWishlistClicked={() => addToWishlist(product)}
                        onAddToCartClicked={() =>
                          this.addToCartClicked(product) // TODO: for some reason product is not getting passed
                        }
                        key={uuid()}
                      />
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            ) : (
              <div className="row">
                {/* <div className="col-sm-12 text-center section-b-space mt-5 no-found">
                  <img
                    src={`${
                      process.env.PUBLIC_URL
                    }/assets/images/empty-search.jpg`}
                    className="img-fluid mb-4"
                  />
                  <h3>
                    Sorry! Couldn't find the product you were looking For!!!{" "}
                  </h3>
                  <p>
                    Please check if you have misspelt something or try searching
                    with other words.
                  </p>
                  <Link
                    to={`${process.env.PUBLIC_URL}/`}
                    className="btn btn-solid"
                  >
                    continue shopping
                  </Link>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  products: getVisibleproducts(state.data, state.filters),
  //products: state.data.products,
  symbol: state.data.symbol,
});

export default connect(
  mapStateToProps,
  { addToCart, addToWishlist, addToCompare, clearSearch }
)(ProductListing);
