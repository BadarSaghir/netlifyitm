import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";

class BookListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      stock: "InStock",
      quantity: 1,
      image: "",
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
    const { book, symbol } = this.props;
    const { open } = this.state;

    return (
      <div className="product-box">
        <div className="img-wrapper">
          <div className="front">
            <Link
              to={{
                pathname: `${process.env.PUBLIC_URL}/book/${book.id}`,
                state: book,
              }}
            >
              <img
                src={book.image}
                className="img-fluid"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "5px",
                  width: "300px",
                }}
                alt=""
              />
            </Link>
          </div>
          <div className="cart-info cart-wrap">
            <a
              href="javascript:void(0)"
              data-toggle="modal"
              data-target="#quick-view"
              title="Quick View"
              onClick={this.onOpenModal}
            >
              <i className="fa fa-search" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="product-detail">
          <div>
            <Link to={`${process.env.PUBLIC_URL}/left-sidebar/book/${book.id}`}>
              <h6>{book.name}</h6>
            </Link>
            <h4>
              {/* {product.price - (product.price * product.discount) / 100} */}
              <del>
                <span className="money">
                  {symbol}
                  {/* {product.price} */}
                </span>
              </del>
            </h4>
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
                      <img src={book.image} alt="" className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-lg-6 rtl-text">
                    <div className="product-right">
                      <h2> {book.name} </h2>
                      <h3>
                        {symbol}
                        {/* {product.price -
                          (product.price * product.discount) / 100} */}
                        <del>
                          <span className="money">
                            {symbol}
                            {/* {product.price} */}
                          </span>
                        </del>
                      </h3>

                      <div className="border-product">
                        <h6 className="product-title">product details</h6>
                        <div
                          style={{
                            marginBottom: "60px",
                            textAlign: "justify",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: book.description,
                          }}
                        />
                      </div>
                      {/* <div className="product-description border-product">
                        
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
                      </div> */}
                      <div className="product-buttons">
                        <button className="btn btn-solid">
                          <a
                            href={book.book_url}
                            style={{ textDecoration: "none", color: "#fff" }}
                          >
                            Buy
                          </a>
                        </button>
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

export default BookListItem;
