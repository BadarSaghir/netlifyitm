import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../common/breadcrumb";
import NewProduct from "../common/new-product";
import Filter from "./common/filter";
import FilterBar from "./common/filter-bar";
import ProductListing from "./common/product-listing";
import StickyBox from "react-sticky-box";
import { connect } from "react-redux";
import queryString from "query-string";

class CollectionLeftSidebar extends Component {
  state = {
    layoutColumns: 3,
  };

  LayoutViewClicked(colums) {
    this.setState({
      layoutColumns: colums,
    });
  }

  openFilter = () => {
    document.querySelector(".collection-filter").style = "left: -15px";
  };

  getPageContent = () => {
    return this.props.content.pages.find((page) => page.name === "shop");
  };

  render() {
    const pageContent = this.getPageContent();

    // eslint-disable-next-line no-restricted-globals
    const parsed = queryString.parse(location.search);
    const serchFor = parsed.search;

    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title> InsideTheMafia | Collection of Products</title>
          <meta
            name="description"
            content=" InsideTheMafia – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses."
          />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={"Collection"} />

        <section className="section-b-space">
          <div className="collection-wrapper">
            <div className="container">
              <div className="row">
                {/* <div className="col-sm-3 collection-filter">
                  <StickyBox offsetTop={20} offsetBottom={20}>
                    <div>
                      <Filter />
                      <NewProduct />
                      <div className="collection-sidebar-banner">
                        <a href="#">
                          <img
                            src={`${
                              process.env.PUBLIC_URL
                            }/assets/images/side-banner.png`}
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </StickyBox>
                </div> */}
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
                              <p>{pageContent.body}</p>
                            </div>
                          </div>
                          <div className="collection-product-wrapper">
                            <div className="product-top-filter">
                              <div className="container-fluid p-0">
                                <div className="row">
                                  <div className="col-xl-12">
                                    <div className="filter-main-btn">
                                      <span
                                        onClick={this.openFilter}
                                        className="filter-btn btn btn-theme"
                                      >
                                        <i
                                          className="fa fa-filter"
                                          aria-hidden="true"
                                        />{" "}
                                        Filter
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <FilterBar
                                      onLayoutViewClicked={(colmuns) =>
                                        this.LayoutViewClicked(colmuns)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/*Products Listing Component*/}
                            <ProductListing
                              colSize={this.state.layoutColumns}
                              search={serchFor}
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

export default connect(mapStateToProps)(CollectionLeftSidebar);
