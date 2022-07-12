import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ig from "fetch-instagram";
import { connect } from "react-redux";

import { Slider5, Slider7 } from "../../../services/script";

class Instagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      InstaData: [],
    };
  }

  componentWillMount() {
    const instagram = ig({
      accessToken: "8295761913.aa0cb6f.2914e9f04dd343b8a57d9dc9baca91cc",
    });

    // const users = instagram.media();
    // users.then(res => this.setState({InstaData:res.data}));
  }

  getCommonContent = () => {
    return this.props.content.pages.find((page) => page.name === "common");
  };

  render() {
    const { InstaData } = this.state;
    const { type } = this.props;

    const commonContent = this.getCommonContent();

    var Sliders = {};
    if (type === "watch") {
      Sliders = Slider5;
    } else {
      Sliders = Slider7;
    }

    return (
      <section className={`instagram`}>
        <div className={`container${type === "watch" ? "" : "-fluid"}`}>
          <div className="row">
            <div className="col-md-12 p-0">
              <a
                href={commonContent.instagramURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="title-borderless"># instagram</h2>
              </a>
              {/* <Slider {...Sliders} className="slide-7 no-arrow slick-instagram">
                {InstaData.map((pic, i) => (
                  <div key={i}>
                    <a href={} target="_blank">
                      <div className="instagram-box">
                        <img
                          src={`${pic.images.standard_resolution.url}`}
                          alt="Avatar"
                          className="w-100"
                        />
                        <div className="overlay">
                          <i className="fa fa-instagram" aria-hidden="true" />
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </Slider> */}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  content: state.content,
});

export default connect(mapStateToProps)(Instagram);
