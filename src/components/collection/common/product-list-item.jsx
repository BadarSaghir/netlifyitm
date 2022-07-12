import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import StarRatingComponent from "react-star-rating-component";

class ProductListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      // stock: "InStock",
      quantity: 1,
      image: "",
      rating: 3,
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onClickHandle(img) {
    this.setState({ image: img });
  }

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ stock: "InStock" });
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  plusQty = () => {
    if (this.props.product.stock >= this.state.quantity) {
      this.setState({ quantity: this.state.quantity + 1 });
    } else {
      this.setState({ stock: "Out of Stock !" });
    }
  };
  changeQty = (e) => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  render() {
    const {
      product,
      symbol,
      onAddToCartClicked,
      onAddToWishlistClicked,
      onAddToCompareClicked,
    } = this.props;
    const { open } = this.state;

    let RatingStars = [];
    // for (var i = 0; i < product.rating; i++) {
    //   RatingStars.push(<i className="fa fa-star" key={i} />);
    // }

    return (
      <div className="product-box">
        <div className="img-wrapper">
          <div className="front">
            <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
              <img
                src={
                  product.variants
                    ? this.state.image
                      ? this.state.image
                      : product.variants[0].images
                    : product.pictures[0]
                }
                className="img-fluid"
                alt=""
              />
            </Link>
          </div>
          <div className="cart-info cart-wrap">
            <button
              title="Add to cart"
              onClick={() => onAddToCartClicked(product, 1)}
            >
              <i className="fa fa-shopping-cart" aria-hidden="true" />
            </button>
            <a
              href="javascript:void(0)"
              title="Add to Wishlist"
              onClick={onAddToWishlistClicked}
            >
              <i className="fa fa-heart" aria-hidden="true" />
            </a>
            <a
              href="javascript:void(0)"
              data-toggle="modal"
              data-target="#quick-view"
              title="Quick View"
              onClick={this.onOpenModal}
            >
              <i className="fa fa-search" aria-hidden="true" />
            </a>
            <Link
              to={`${process.env.PUBLIC_URL}/compare`}
              title="Compare"
              onClick={onAddToCompareClicked}
            >
              <i className="fa fa-refresh" aria-hidden="true" />
            </Link>
          </div>
          {/* {product.variants ? (
            <ul className="product-thumb-list">
              {product.variants.map((vari, i) => (
                <li
                  className={`grid_thumb_img ${
                    vari.images === this.state.image ? "active" : ""
                  }`}
                  key={i}
                >
                  <a href="javascript:void(0)" title="Add to Wishlist">
                    <img
                      src={`${vari.images}`}
                      onClick={() => this.onClickHandle(vari.images)}
                    />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )} */}
        </div>
        <div className="product-detail">
          <div>
            <div>
              <StarRatingComponent
                name={product.name}
                starCount={5}
                value={product.rating}
              />
            </div>
            <Link
              to={`${process.env.PUBLIC_URL}/left-sidebar/product/${
                product.id
              }`}
            >
              <h6>{product.name}</h6>
            </Link>
            <h4>
              {symbol}
              {(product.price - product.discount).toFixed(2)}
              {product.discount > 0 && (
                <del>
                  <span className="money">
                    {symbol}
                    {product.price.toFixed(2)}
                  </span>
                </del>
              )}
            </h4>
            {/* {product.variants ? (
              <ul className="color-variant">
                {product.variants
                  .filter((vari) => vari.type === "color")
                  .map((vari, i) => {
                    console.log("Variant For Colors", vari);
                    return (
                      <li
                        className={vari.color}
                        style={{
                          backgroundColor: vari.colorHEX,
                        }}
                        key={i}
                        title={vari.color}
                        onClick={() => this.onClickHandle(vari.images)}
                      />
                    );
                  })}
              </ul>
            ) : (
              ""
            )} */}
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content quick-view-modal">
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6  col-xs-12">
                    <div className="quick-view-img">
                      <img
                        src={
                          product.variants
                            ? this.state.image
                              ? this.state.image
                              : product.variants[0].images
                            : product.pictures[0]
                        }
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 rtl-text">
                    <div className="product-right">
                      <h2> {product.name} </h2>
                      <h3>
                        {symbol}
                        {product.price -
                          (product.price * product.discount) / 100}
                        {product.discount > 0 && (
                          <del>
                            <span className="money">
                              {symbol}
                              {product.price - product.discount}
                            </span>
                          </del>
                        )}
                      </h3>
                      {product.variants ? (
                        <ul className="color-variant">
                          {product.variants.map((vari, i) => (
                            <li
                              className={vari.color}
                              key={i}
                              title={vari.color}
                              onClick={() => this.onClickHandle(vari.images)}
                            />
                          ))}
                        </ul>
                      ) : (
                        ""
                      )}
                      <div className="border-product">
                        <h6 className="product-title">product details</h6>
                        <p>{product.shortDetails}</p>
                      </div>
                      <div className="product-description border-product">
                        {product.size ? (
                          <div className="size-box">
                            <ul>
                              {product.size.map((size, i) => {
                                return (
                                  <li key={i}>
                                    <a href="#">{size}</a>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ) : (
                          ""
                        )}
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
                        <button
                          className="btn btn-solid"
                          onClick={() =>
                            onAddToCartClicked(product, this.state.quantity)
                          }
                        >
                          add to cart
                        </button>
                        <Link
                          to={`${process.env.PUBLIC_URL}/left-sidebar/product/${
                            product.id
                          }`}
                          className="btn btn-solid"
                        >
                          view detail
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ProductListItem;
