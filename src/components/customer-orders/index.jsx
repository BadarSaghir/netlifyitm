import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../../fierbase";
import { getCustomerOrdersByEmail } from "../../api/shop";
import "./customer-orders.scss";

class CustomerOrders extends Component {
  constructor() {
    super();
    this.state = {
      authUser: null,
      isLoggedIn: false,
      Items: [],
    };
  }

  onAuthChange = () => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User Signed In", user);
        const orders = await getCustomerOrdersByEmail(user.email);
        this.setState({ isLoggedIn: true, authUser: user, Items: orders });
      } else {
        console.log("No User");
        this.setState({ isLoggedIn: false, authUser: null });
      }
    });
  };

  componentDidMount = () => {
    this.onAuthChange();
  };
  changeQty = (e) => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  render() {
    const { symbol } = this.props;
    const { authUser, Items } = this.state;

    function getUserName() {
      const userName = authUser ? authUser.displayName : "";
      return userName;
    }

    return (
      <div>
        <div className="breadcrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="page-title">
                  <h2>{getUserName()}</h2>
                </div>
              </div>
              <div className="col-md-6">
                <nav aria-label="breadcrumb" className="theme-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to={`${process.env.PUBLIC_URL}`}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Account
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {Items.length > 0 ? (
          <section className="wishlist-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="CustomerOrders-table-container">
                    <table className="table cart-table">
                      <thead>
                        <tr className="table-head">
                          <th scope="col">image</th>
                          <th scope="col">Order ID</th>
                          <th scope="col">product name</th>
                          <th scope="col">price</th>
                          <th scope="col">Qty</th>
                          <th scope="col">
                            Shipping
                            <br />
                            (calculted per order)
                          </th>
                          <th scope="col">Order Date</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      {Items.map((item, index) => {
                        return (
                          <tbody key={index}>
                            <tr>
                              <td>
                                <Link
                                  to={`${
                                    process.env.PUBLIC_URL
                                  }/left-sidebar/product/${item.id}`}
                                >
                                  <img
                                    src={
                                      item.variants
                                        ? item.variants[0].images
                                        : item.pictures[0]
                                    }
                                    alt=""
                                  />
                                </Link>
                              </td>
                              <td>{item.orderID}</td>
                              <td>
                                <Link
                                  to={`${
                                    process.env.PUBLIC_URL
                                  }/left-sidebar/product/${item.id}`}
                                >
                                  {item.name}
                                </Link>
                              </td>
                              <td>
                                <h2>
                                  {symbol}
                                  {(item.price - item.discount).toFixed(2)}
                                  {item.discount > 0 && (
                                    <del>
                                      <span className="money">
                                        {symbol}
                                        {item.price.toFixed(2)}
                                      </span>
                                    </del>
                                  )}
                                </h2>
                              </td>
                              <td>{item.qty}</td>
                              <td>
                                <h3>
                                  {symbol} {item.shippingCost}
                                </h3>
                              </td>
                              <td>
                                {item.orderDate.toLocaleDateString("en-US")}
                              </td>
                              <td>{item.orderStatus}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>
              <div className="row wishlist-buttons">
                {/* <div className="col-12">
                  <Link
                    to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}
                    className="btn btn-solid"
                  >
                    continue shopping
                  </Link>
                  <Link
                    to={`${process.env.PUBLIC_URL}/checkout`}
                    className="btn btn-solid"
                  >
                    check out
                  </Link>
                </div> */}
              </div>
            </div>
          </section>
        ) : (
          <section className="cart-section section-b-space">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div>
                    <div className="col-sm-12 empty-cart-cls text-center">
                      {/* <img
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/empty-wishlist.png`}
                        className="img-fluid mb-4"
                        alt=""
                      /> */}
                      {/* <h3>
                        <strong>No orders to show</strong>
                      </h3> */}
                      {/* <h4>Explore more shortlist some items.</h4> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  Items: state.wishlist.list,
  symbol: state.data.symbol,
});

export default connect(mapStateToProps)(CustomerOrders);
