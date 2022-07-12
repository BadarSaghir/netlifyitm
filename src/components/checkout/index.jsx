import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
// import PaypalExpressBtn from "react-paypal-express-checkout";
import SimpleReactValidator from "simple-react-validator";
import Breadcrumb from "../common/breadcrumb";
import {
  removeFromWishlist,
  getCountries,
  getTotalShippingCost,
  resetShipingCost,
  emptyCart,
} from "../../actions";
import { getCartTotal } from "../../services";
import { orderItems } from "../../api/shop";
import PaypalButton from "./paypal-btn";

class checkOut extends Component {
  validator = null;

  constructor(props) {
    super(props);

    this.state = {
      payment: "paypal",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      country: "US",
      addressL1: "",
      addressL2: "",
      city: "",
      state: "AK",
      pincode: "99501",
      create_account: "",
      formReady: false,
    };
    this.validator = new SimpleReactValidator();
  }

  componentDidMount = () => {
    this.props.resetShipingCost();
    this.props.getCountries();
  };

  claculateshippingCost = () => {
    if (this.validator.allValid()) {
      console.log("Can Calculate shiping cost");
      this.props.getTotalShippingCost(this.props.cartItems, this.state);
    }
  };

  setStateFromInput = (event) => {
    var obj = {};
    const { name, value } = event.target;
    obj[name] = value;
    if (!this.validator.fieldValid(name)) {
      this.validator.showMessageFor(name);
    }
    this.setState(obj, () => {
      if (this.validator.allValid()) {
        this.setState({ formReady: true });
        this.claculateshippingCost();
      } else {
        this.setState({ formReady: false });
      }
    });
  };

  setStateFromCheckbox = (event) => {
    var obj = {};
    obj[event.target.name] = event.target.checked;
    this.setState(obj);

    if (!this.validator.fieldValid(event.target.name)) {
      this.validator.showMessages();
    }
  };

  checkhandle(value) {
    this.setState({
      payment: value,
    });
  }

  StripeClick = () => {
    const cartItems = this.props.cartItems;

    if (this.validator.allValid()) {
      //alert("You submitted the form and stuff!");

      var handler = window.StripeCheckout.configure({
        key: "pk_test_glxk17KhP7poKIawsaSgKtsL",
        locale: "auto",
        token: async (token) => {
          console.log(token);
          try {
            await orderItems(cartItems, this.state);
            console.log("PropS FOR CHECKOUT", this.props);
            this.props.emptyCart();
            this.props.history.push({
              pathname: "/order-success",
              state: {
                payment: token,
                items: this.props.cartItems,
                orderTotal: this.props.total,
                symbol: this.props.symbol,
                userInfo: this.state,
              },
            });
          } catch (error) {
            console.log("ERROR");
          }
        },
      });
      handler.open({
        name: "PP & CITY",
        description: "Online Fashion Store",
        amount: this.amount * 100,
      });
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };

  getCountryStates = (countryList = [], countryName = "United States") => {
    const country = countryList.find((country) => country.name === countryName);
    if (country) {
      return country.states;
    }
    return [];
  };

  // onSuccess = async (payment) => {
  //   const cartItems = this.props.cartItems;
  //   console.log("The payment was succeeded!", payment);
  //   await orderItems(cartItems, this.state);
  //   this.props.history.push({
  //     pathname: "/order-success",
  //     state: {
  //       payment: payment,
  //       items: cartItems,
  //       orderTotal: this.getToatalCost(),
  //       symbol: "$",
  //     },
  //   });
  // };

  render() {
    let canRenderPayapalBtn = true;

    const {
      cartItems,
      symbol,
      total,
      countries,
      shippingCost,
      shippingCostReceived,
    } = this.props;

    const { formReady } = this.state;

    if (shippingCostReceived && formReady) {
      canRenderPayapalBtn = true;
    }

    const states = this.getCountryStates(countries);

    console.log("CART ITEMS", cartItems, states);

    const getToatalCost = () => {
      const showTotal = +total + +shippingCost;
      return showTotal.toFixed(2);
    };

    const { city, state, pincode } = this.state;

    // Paypal Integration
    const onSuccess = async (payment) => {
      const cartItems = this.props.cartItems;
      console.log("The payment was succeeded!", payment);
      await orderItems(cartItems, this.state, +shippingCost);
      const totalCost = getToatalCost();
      this.props.emptyCart();
      this.props.history.push({
        pathname: "/order-success",
        state: {
          payment: payment,
          items: cartItems,
          orderTotal: +total,
          shippingCost: +shippingCost,
          symbol: symbol,
          userInfo: this.state,
          totalCost: +totalCost,
        },
      });
    };

    // const onCancel = (data) => {
    //   console.log("The payment was cancelled!", data);
    // };

    // const onError = (err) => {
    //   console.log("Error!", err);
    // };

    const client = {
      sandbox:
        "Ab3YWX6dW7YwI5cAMt1CZvy7RG6dZ-cYxrX7UbRya-U4DJofXNZZGAYbiVhMGIApQzCvocjCN1-iUE6V",
      production:
        "Ab3YWX6dW7YwI5cAMt1CZvy7RG6dZ-cYxrX7UbRya-U4DJofXNZZGAYbiVhMGIApQzCvocjCN1-iUE6V",
    };

    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title>CheckOut Page</title>
          <meta
            name="description"
            content=" websites. Multikart Bootstrap 4 Template will help you run multiple businesses."
          />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={"Checkout"} />

        <section className="section-b-space">
          <div className="container padding-cls">
            <div className="checkout-page">
              <div className="checkout-form">
                <form>
                  <div className="checkout row">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <div className="checkout-title">
                        <h3>Shipping Details</h3>
                      </div>
                      <div className="row check-out">
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">First Name</div>
                          <input
                            type="text"
                            name="first_name"
                            value={this.state.first_name}
                            onChange={this.setStateFromInput}
                          />
                          {this.validator.message(
                            "first_name",
                            this.state.first_name,
                            "required"
                          )}
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Last Name</div>
                          <input
                            type="text"
                            name="last_name"
                            value={this.state.last_name}
                            onChange={this.setStateFromInput}
                          />
                          {this.validator.message(
                            "last_name",
                            this.state.last_name,
                            "required"
                          )}
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Phone</div>
                          <input
                            type="text"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.setStateFromInput}
                          />
                          {this.validator.message(
                            "phone",
                            this.state.phone,
                            "required|phone"
                          )}
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <div className="field-label">Email Address</div>
                          <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.setStateFromInput}
                          />
                          {this.validator.message(
                            "email",
                            this.state.email,
                            "required|email"
                          )}
                        </div>
                        {/* <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">Country</div>
                          <select
                            name="country"
                            value={this.state.country}
                            onChange={this.setStateFromInput}
                          >
                            <option value="India">India</option>
                            <option value="US">United State</option>
                          </select>
                          {this.validator.message(
                            "country",
                            this.state.country,
                            "required"
                          )}
                        </div> */}

                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">Address Line 1</div>
                          <input
                            type="text"
                            name="addressL1"
                            value={this.state.addressL1}
                            onChange={this.setStateFromInput}
                            placeholder="Address Line 1"
                          />
                          {this.validator.message(
                            "address L1",
                            this.state.addressL1,
                            "required"
                          )}
                        </div>

                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">Address Line 2</div>
                          <input
                            type="text"
                            name="addressL2"
                            value={this.state.addressL2}
                            onChange={this.setStateFromInput}
                            placeholder="Address Line 2"
                          />
                        </div>

                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">Town/City</div>
                          <input
                            type="text"
                            name="city"
                            value={this.state.city}
                            onChange={this.setStateFromInput}
                          />
                          {this.validator.message(
                            "city",
                            this.state.city,
                            "required"
                          )}
                        </div>

                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <div className="field-label">State</div>
                          <select
                            name="state"
                            value={this.state.state}
                            onChange={this.setStateFromInput}
                          >
                            {states.map((state) => (
                              <option value={state.code} key={state.code}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                          {this.validator.message(
                            "state",
                            this.state.state,
                            "required"
                          )}
                        </div>

                        {/* <div className="form-group col-md-12 col-sm-6 col-xs-12">
                          <div className="field-label">State / County</div>
                          <input
                            type="text"
                            name="state"
                            value={this.state.state}
                            onChange={this.setStateFromInput}
                          />
                          {this.validator.message(
                            "state",
                            this.state.state,
                            "required"
                          )}
                        </div> */}

                        <div className="form-group col-md-12 col-sm-6 col-xs-12">
                          <div className="field-label">Postal Code</div>
                          <input
                            type="text"
                            name="pincode"
                            value={this.state.pincode}
                            onChange={this.setStateFromInput}
                          />
                          {this.validator.message(
                            "pincode",
                            this.state.pincode,
                            "required|integer"
                          )}
                        </div>
                        {/* <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <input
                            type="checkbox"
                            name="create_account"
                            id="account-option"
                            checked={this.state.create_account}
                            onChange={this.setStateFromCheckbox}
                          />
                          &ensp;{" "}
                          <label htmlFor="account-option">
                            Create An Account?
                          </label>
                          {this.validator.message(
                            "checkbox",
                            this.state.create_account,
                            "create_account"
                          )}
                        </div> */}
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <div className="checkout-details">
                        <div className="order-box">
                          <div className="title-box">
                            <div>
                              Product <span> Total</span>
                            </div>
                          </div>
                          <ul className="qty">
                            {cartItems.map((item, index) => {
                              return (
                                <li key={index}>
                                  {item.name} × {item.qty}{" "}
                                  <span>
                                    {symbol} {item.sum.toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                          <ul className="sub-total">
                            <li>
                              Subtotal{" "}
                              <span className="count">
                                {symbol}
                                {total}
                              </span>
                            </li>
                            {canRenderPayapalBtn && (
                              <li>
                                Shipping{" "}
                                <span className="count">
                                  {symbol}
                                  {shippingCost}
                                </span>
                              </li>
                            )}

                            {canRenderPayapalBtn && (
                              <li>
                                Shipped to{" "}
                                <span className="count">
                                  {city},
                                  <br />
                                  {state},
                                  <br />
                                  {pincode}
                                </span>
                              </li>
                            )}
                          </ul>

                          <ul className="total">
                            <li>
                              Total{" "}
                              <span className="count">
                                {symbol}
                                {getToatalCost()}
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="payment-box">
                          {canRenderPayapalBtn ? (
                            <PaypalButton
                              userInfo={this.state}
                              totalCost={getToatalCost()}
                              onSuccess={onSuccess}
                            />
                          ) : (
                            <img
                              src={`${
                                process.env.PUBLIC_URL
                              }/assets/images/paypal-powered.png`}
                              className="img-fluid"
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row section-t-space" />
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("CHECKOUT STATE", state);
  return {
    cartItems: state.cartList.cart,
    symbol: state.data.symbol,
    total: getCartTotal(state.cartList.cart),
    countries: state.countries.countriesList,
    shippingCost: state.shipping.cost,
    shippingCostReceived: state.shipping.costReceived,
  };
};

export default connect(
  mapStateToProps,
  {
    removeFromWishlist,
    resetShipingCost,
    getCountries,
    getTotalShippingCost,
    emptyCart,
  }
)(checkOut);
