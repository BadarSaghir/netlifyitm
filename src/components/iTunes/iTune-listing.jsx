import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

// import { getTotal, getCartProducts } from "../../../reducers";
// import { addToCart, addToWishlist, addToCompare } from "../../../actions";
// import { getVisibleproducts } from "../../../services";
import ITunesListItem from "./iTune-list-item";

class ITunesListing extends Component {
  constructor(props) {
    super(props);

    this.state = { limit: 500, hasMoreItems: true };
  }

  componentWillMount() {
    this.fetchMoreItems();
  }

  fetchMoreItems = () => {
    if (this.state.limit >= this.props.iTunes.length) {
      this.setState({ hasMoreItems: false });
      return;
    }
    // a fake async api call
    setTimeout(() => {
      this.setState({
        limit: this.state.limit + 5,
      });
    }, 3000);
  };

  render() {
    const { iTunes } = this.props;
    console.log(this.props);
    return (
      <div>
        <div className="product-wrapper-grid">
          <div className="container-fluid">
            {iTunes.length > 0 ? (
              <InfiniteScroll
                dataLength={this.state.limit} //This is important field to render the next data
                next={this.fetchMoreItems}
                hasMore={this.state.hasMoreItems}
                loader={<div className="loading-cls" />}
                endMessage={
                  <p className="seen-cls seen-it-cls">
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <div className="row">
                  {iTunes.slice(0, this.state.limit).map((iTune, index) => (
                    <div
                      className={`${
                        this.props.colSize === 3
                          ? "col-xl-3 col-md-6 col-grid-box"
                          : "col-lg-" + this.props.colSize
                      }`}
                      key={index}
                    >
                      <ITunesListItem iTune={iTune} key={index} />
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            ) : (
              <div className="row">
                <div className="col-sm-12 text-center section-b-space mt-5 no-found">
                  <img
                    alt=""
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = (state) => ({
//   products: getVisibleproducts(state.data, state.filters),
//   symbol: state.data.symbol,
// });

export default ITunesListing;
