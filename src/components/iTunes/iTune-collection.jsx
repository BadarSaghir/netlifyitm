import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../common/breadcrumb";
// import NewProduct from "../common/new-product";
// import Filter from "./common/filter";
import ITunesListing from "./iTune-listing";
import StickyBox from "react-sticky-box";
import db from "../../fierbase";
import { connect } from "react-redux";

class ITunesCollection extends Component {
  state = {
    layoutColumns: 3,
    iTunes: "",
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
    db.collection("itunes")
      .doc("im_itunes")
      .onSnapshot((doc) => {
        console.log("itune Data received", doc.data().itunes);
        this.setState({ iTunes: doc.data().itunes });
      });
  };

  getPageContent = () => {
    console.log("pages", this.props.content.pages);
    return this.props.content.pages.find((page) => page.name === "itunes");
  };

  render() {
    const pageContent = this.getPageContent() || {};

    console.log("Editable content", pageContent);

    return (
      <div>
        {/*SEO Support*/}
        <Helmet>
          <title>InsideTheMafia |iTunes Collection </title>
          <meta name="description" content="InsideTheMafia" />
        </Helmet>
        {/*SEO Support End */}

        <Breadcrumb title={"iTunes Collection"} />

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
                        <img
                          src={`${
                            process.env.PUBLIC_URL
                          }/assets/images/ITunes_logo.png`}
                          className="img-fluid"
                          alt=""
                        />
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
                            <ITunesListing
                              colSize={this.state.layoutColumns}
                              iTunes={this.state.iTunes}
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

export default connect(mapStateToProps)(ITunesCollection);
