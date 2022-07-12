import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { getItemDiscriptionList } from "../../../services";
import "./details-top-tabs.scss";
import { saveReview, loadreviews } from "../../../api/reviews";
import Tiktok from "./tiktok";

class DetailsTopTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      name: "",
      email: "",
      reviewTitle: "",
      review: "",
      reviews: [],
    };
  }

  componentDidMount = () => {
    const reviews = [];
    const { item } = this.props;
    loadreviews(item.id).then((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
        reviews.push(doc.data());
      });
      this.setState({ reviews: reviews });
    });
  };

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue });
  };

  setStateFromInput = (event) => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  onReviewSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    const product = this.props.item;
    console.log("PRODUCT", product);
    const reviewData = {
      product: product.id,
      ...this.state,
    };
    saveReview(reviewData);
  };

  render() {
    const { item } = this.props;

    const discList = getItemDiscriptionList(item);

    const { rating, reviews } = this.state;

    console.log("Reveiews", reviews);

    return (
      <section className="tab-product m-0">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <Tabs className="tab-content nav-material">
              <TabList className="nav nav-tabs nav-material">
                <Tab className="nav-item">
                  <span className="nav-link active">
                    <i className="icofont icofont-ui-home" />
                    Description
                  </span>
                  <div className="material-border" />
                </Tab>
                {/* <Tab className="nav-item">
                  <span className="nav-link">
                    <i className="icofont icofont-man-in-glasses" />
                    Details
                  </span>
                  <div className="material-border" />
                </Tab> */}
                <Tab className="nav-item">
                  <span className="nav-link">
                    <i className="icofont icofont-contacts" />
                    Video
                  </span>
                  <div className="material-border" />
                </Tab>
                <Tab className="nav-item">
                  <span className="nav-link">
                    <i className="icofont icofont-contacts" />
                    Facebook
                  </span>
                  <div className="material-border" />
                </Tab>
                <Tab className="nav-item">
                  <span className="nav-link">
                    <i className="icofont icofont-contacts" />
                    TikTok
                  </span>
                  <div className="material-border" />
                </Tab>
                <Tab className="nav-item">
                  <span className="nav-link">
                    <i className="icofont icofont-contacts" />
                    Write Review
                  </span>
                  <div className="material-border" />
                </Tab>
                <Tab className="nav-item">
                  <span className="nav-link">
                    <i className="icofont icofont-contacts" />
                    Reviews
                  </span>
                  <div className="material-border" />
                </Tab>
              </TabList>
              <TabPanel className="tab-pane fade mt-4 show active">
                <table className="table table-striped mb-0">
                  <tbody>
                    {discList.map((str, index) => (
                      <tr key={index}>
                        <td>{str}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              {/* <TabPanel>
                <p className="mt-4 p-0">{item.description}</p>
              </TabPanel> */}
              <TabPanel>
                <div className="mt-4 text-center">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                      title="video Promo"
                      src={`https://www.youtube.com/embed/${item.youtubeURL}`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <iframe
                    title="facebook"
                    src={item.facebookURL || ""}
                    width="672"
                    height="500"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameborder="0"
                    allowTransparency="true"
                    allow="encrypted-media"
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <Tiktok url={item.tiktokURL} />
              </TabPanel>
              <TabPanel>
                <form
                  className="theme-form mt-4"
                  onSubmit={this.onReviewSubmit}
                >
                  <div className="form-row">
                    <div className="col-md-12 ">
                      <div className="media m-0">
                        <label>Rating</label>
                        <div className="media-body ml-3 details-top-rating-component">
                          <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={rating}
                            onStarClick={this.onStarClick}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter Your name"
                        required
                        onChange={this.setStateFromInput}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={this.setStateFromInput}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="review">Review Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="reviewTitle"
                        name="reviewTitle"
                        placeholder="Enter your Review Subjects"
                        onChange={this.setStateFromInput}
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="review">Review Title</label>
                      <textarea
                        className="form-control"
                        placeholder="Wrire Your Testimonial Here"
                        id="review"
                        name="review"
                        rows="6"
                        onChange={this.setStateFromInput}
                      />
                    </div>
                    <div className="col-md-12">
                      <button className="btn btn-solid" type="submit">
                        Submit Your Review
                      </button>
                    </div>
                  </div>
                </form>
              </TabPanel>
              <TabPanel>
                <div className="mt-4">
                  {reviews.map((review) => (
                    <div key={review.reviewTitle}>
                      <StarRatingComponent
                        starCount={5}
                        value={review.rating}
                      />
                      <li>{review.reviewTitle}</li>
                      <br />
                      <li>{review.review}</li>
                    </div>
                  ))}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    );
  }
}

export default DetailsTopTabs;
