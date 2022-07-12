import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../common/breadcrumb";
// import NewProduct from "../common/new-product";
// import Filter from "./common/filter";
import BooksListing from "./book-listing";
import StickyBox from "react-sticky-box";
import db from "../../fierbase";
import { connect } from "react-redux";

class BookCollection extends Component {
  state = {
    layoutColumns: 3,
    books: "",
  };

  LayoutViewClicked(colums) {
    this.setState({
      layoutColumns: colums,
    });
  }

  openFilter = () => {
    document.querySelector(".collection-filter").style = "left: -15px";
  };

  componentDidMount = () => {
    db.collection("books")
      .doc("amazon_books")
      .onSnapshot((doc) => {
        console.log("Books Data received", doc.data().books);
        this.setState({ books: doc.data().books });
      });
  };

  getPageContent = () => {
    return this.props.content.pages.find((page) => page.name === "books");
  };

  render() {
    const pageContent = this.getPageContent();

    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title>InsideTheMafia |Books Collection </title>
          <meta name="description" content="InsideTheMafia." />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={"Books Collection"} />

        <section className="section-b-space">
          <div className="collection-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-sm-3 collection-filter">
                  <StickyBox offsetTop={140} offsetBottom={20}>
                    <div>
                      {/* <Filter/> */}
                      {/* <NewProduct/> */}
                      <div className="collection-sidebar-banner">
                        <a href="#">
                          <img
                            src={`${
                              process.env.PUBLIC_URL
                            }/assets/images/amazon_k_logo.png`}
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </StickyBox>
                  {/*side-bar banner end here*/}
                </div>
                <div className="collection-content col">
                  <div className="page-main-content ">
                    <div className="">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="top-banner-wrapper">
                            <span>
                              <img
                                src={pageContent.featuredImage}
                                className="img-fluid"
                                alt=""
                              />
                            </span>
                            <div className="top-banner-content small-section">
                              <h4>{pageContent.title}</h4>
                              <h5>{pageContent.subtitle}</h5>
                              <p style={{ textAlign: "justify" }}>
                                {pageContent.body}
                              </p>
                            </div>
                          </div>
                          <div className="collection-product-wrapper">
                            <BooksListing
                              colSize={this.state.layoutColumns}
                              books={this.state.books}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  content: state.content,
});

export default connect(mapStateToProps)(BookCollection);
