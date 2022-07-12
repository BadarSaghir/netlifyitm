import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

const CLIENT = {
  sandbox:
    "Ab3YWX6dW7YwI5cAMt1CZvy7RG6dZ-cYxrX7UbRya-U4DJofXNZZGAYbiVhMGIApQzCvocjCN1-iUE6V",
  production:
    "Ab3YWX6dW7YwI5cAMt1CZvy7RG6dZ-cYxrX7UbRya-U4DJofXNZZGAYbiVhMGIApQzCvocjCN1-iUE6V",
};

const CLIENT_ID =
  process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }

    console.log("User Props", nextProps.userInfo);
  }
  createOrder = (data, actions, userInfo, totalCost) => {
    const {
      first_name,
      last_name,
      phone,
      email,
      addressL1,
      addressL2,
      city,
      state,
      pincode,
    } = userInfo;

    return actions.order.create({
      intent: "CAPTURE",
      payer: {
        name: {
          given_name: first_name,
          surname: last_name,
        },
        address: {
          address_line_1: addressL1,
          address_line_2: addressL2,
          admin_area_2: city,
          admin_area_1: state,
          postal_code: pincode,
          country_code: "US",
        },
        email_address: email,
        phone: {
          phone_number: {
            national_number: phone,
          },
        },
      },
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalCost,
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    });
  };

  onApprove = (data, actions, onSuccess) => {
    actions.order.capture().then((details) => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID,
      };
      console.log("Payment Approved: ", paymentData);
      onSuccess(paymentData);
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, paid } = this.state;
    const { userInfo, totalCost, onSuccess } = this.props;

    return (
      <div className="main">
        {showButtons && (
          <div>
            <PayPalButton
              createOrder={(data, actions) =>
                this.createOrder(data, actions, userInfo, totalCost)
              }
              onApprove={(data, actions) =>
                this.onApprove(data, actions, onSuccess)
              }
            />
          </div>
        )}
        {/* 
        {paid && (
          <div className="main">
            <h2>
              Congrats! you just paid for that picture. Work a little harder and
              you'll be able to afford the car itself{" "}
              <span role="img" aria-label="emoji" />
            </h2>
          </div>
        )} */}
      </div>
    );
  }
}

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&debug=true`
)(PaypalButton);
