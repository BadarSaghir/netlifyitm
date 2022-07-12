import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Slider from "react-slick";
import Modal from "react-responsive-modal";
import { getActiveSKU } from "../../../../services";

import "./detail-price.scss";

class DetailsWithPrice extends Component {
  SKU = null;
  selectedSize = null;

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      quantity: 1,
      stock: "InStock",
      nav3: null,
      buyNowClicked: false,
      selectedSize:this.props.item.size[0],
    };
    // this.sizeRefsArray = [];
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  // setDefaultSize = () => {
  //   const ref = this.sizeRefsArray[0];
  //   ref.classList.add("active");
  // };

  componentDidMount() {
    this.setState({
      nav3: this.slider3,
    });
    // this.setDefaultSize();
  }

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ stock: "InStock" });
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  plusQty = () => {
    if (this.props.item.stock >= this.state.quantity) {
      this.setState({ quantity: this.state.quantity + 1 });
    } else {
      this.setState({ stock: "Out of Stock !" });
    }
  };
  changeQty = (e) => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  // onSizeSelect = (size, i) => {
  //   const ref = this.sizeRefsArray[i];
  //   this.sizeRefsArray.forEach((ref) => ref.classList.remove("active"));
  //   ref.classList.add("active");
  //   this.selectedSize = size;
  // };

  onBuyNowClick = () => {
    const { item, colorID } = this.props;
    this.SKU = getActiveSKU(item, this.state.selectedSize, colorID);
    this.props.BuynowClicked(item, this.state.quantity, this.SKU);
    this.setState({ buyNowClicked: true });
  };

  onAddTocartClick = () => {
    const { item, colorID } = this.props;
    this.SKU = getActiveSKU(item, this.state.selectedSize, colorID);
    console.log("ADD CART Sku", this.SKU);
    console.log("Size",this.state.selectedSize)
    this.props.addToCartClicked(item, this.state.quantity, this.SKU);
  };

  getDescription = (item) => {
    let description = "";
    if (item.descStatus === "APPEND") {
      description = item.description + (item.customDescription || "");
    } else if (item.descStatus === "OVERRIDE") {
      description = item.customDescription || "";
    } else {
      description = item.description;
    }
    return description;
  };
  handleChange=(e)=>{
    this.setState({selectedSize:e.target.value});
  }
  render() {
    const { buyNowClicked } = this.state;

    if (buyNowClicked) {
      return <Redirect to={`${process.env.PUBLIC_URL}/checkout`} />;
    }

    const { symbol, item, addToWishlistClicked } = this.props;

    console.log("ITEM TO BUY NOW", item);

    var colorsnav = {
      slidesToShow: 6,
      swipeToSlide: true,
      arrows: false,
      dots: false,
      focusOnSelect: true,
    };

    return (
      <div className="col-lg-6 rtl-text">
        <div className="product-right">
          <h2> {item.name} </h2>
          <h4>
            {/* <del>
              {symbol}
              {item.price}
            </del> */}
            {/* <span>{item.discount}% off</span> */}
          </h4>
          <h3>
            {symbol}
            {item.price}{" "}
          </h3>
          {/* {item.variants ? (
            <ul class="color-list">
              <Slider
                {...colorsnav}
                asNavFor={this.props.navOne}
                ref={(slider) => (this.slider1 = slider)}
                className="color-variant"
              >
                {
               
                item.variants.filter((v, i, a) => a.findIndex(t => (t.color === v.color)) === i)
                .map((vari, i) => {
                  return (
                  <li  key={i} title={vari.color} style={{background:vari.colorHEX}}/>
                  
                  );
                })}
              </Slider>
            </ul>
          ) : (
            ""
          )} */}
          <div className="product-description border-product">
            {item.size.length !=1 ? (
              <div>
               
              
                <div className="size-box">
                  {/* <ul>
                    {item.size.map((size, i) => {
                      return (
                        <li
                          key={i}
                          onClick={() => this.onSizeSelect(size, i)}
                          className="size-list"
                        >
                          <span ref={(ref) => (this.sizeRefsArray[i] = ref)}>
                            {size}
                          </span>
                        </li>
                      );
                    })}
                  </ul> */}
                <div className="size-container">
                <h6 className="product-title size-text">
                  select size
                </h6>
                  <div className='select-box'>
                 {/* {item.size.length ==1?(''):('')} */}
                  <select
                   value={this.state.selectedSize} 
                   onChange={this.handleChange} 
                  >
                  {item.size.map((size, i) => {
                      return (
                      <option
                      value={size}
                      >{size}</option>
                      );
                    })}
                  </select>
                  </div>
                  </div>
                </div>
                </div>
            ) : (
              ""
            )}
            <span className="instock-cls">{this.state.stock}</span>
            <h6 className="product-title">quantity</h6>
            <div className="qty-box">
              <div className="input-group">
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-left-minus"
                    onClick={this.minusQty}
                    data-type="minus"
                    data-field=""
                  >
                    <i className="fa fa-angle-left" />
                  </button>
                </span>
                <input
                  type="text"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.changeQty}
                  className="form-control input-number"
                />
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-right-plus"
                    onClick={this.plusQty}
                    data-type="plus"
                    data-field=""
                  >
                    <i className="fa fa-angle-right" />
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="product-buttons">
            <button className="btn btn-solid" onClick={this.onAddTocartClick}>
              add to cart
            </button>
            <button
              // to={`${process.env.PUBLIC_URL}/checkout`}
              className="btn btn-solid"
              onClick={this.onBuyNowClick}
            >
              buy now
            </button>
          </div>
          <div className="border-product">
            <h6 className="product-title">product details</h6>
            <p
              style={{ textAlign: "justify" }}
              dangerouslySetInnerHTML={{
                __html: this.getDescription(item),
              }}
            />
          </div>
          <div className="border-product">
            <h6 className="product-title">share it</h6>
            <div className="product-icon">
              <ul className="product-social">
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a href="https://plus.google.com/discover" target="_blank">
                    <i className="fa fa-google-plus" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/" target="_blank">
                    <i className="fa fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank">
                    <i className="fa fa-instagram" />
                  </a>
                </li>
              </ul>
              <button
                className="wishlist-btn"
                onClick={() => addToWishlistClicked(item)}
              >
                <i className="fa fa-heart" />
                <span className="title-font">Add To WishList</span>
              </button>
            </div>
          </div>
          <div className="border-product">
            <h6 className="product-title">Time Reminder</h6>
            <div className="timer">
              <p id="demo">
                <span>
                  25
                  <span className="padding-l">:</span>
                  <span className="timer-cal">Days</span>
                </span>
                <span>
                  22
                  <span className="padding-l">:</span>
                  <span className="timer-cal">Hrs</span>
                </span>
                <span>
                  13
                  <span className="padding-l">:</span>
                  <span className="timer-cal">Min</span>
                </span>
                <span>
                  57
                  <span className="timer-cal">Sec</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Sheer Straight Kurta
                </h5>
              </div>
              <div className="modal-body">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default DetailsWithPrice;
