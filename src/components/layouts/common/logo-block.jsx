import React, { Component } from "react";
import Slider from "react-slick";

import { Slider6 } from "../../../services/script";
import { connect } from "react-redux";

class LogoBlock extends Component {
  render() {
    return (
      <section className="section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Slider {...Slider6} className="slide-6 no-arrow">
                <div>
                  <div className="logo-block">
                    <a href={null}>
                      <img
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/logos/1.png`}
                        alt=""
                      />
                    </a>
                  </div>
                </div>
                <div>
                  <div className="logo-block">
                    <a href={null}>
                      <img
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/logos/2.png`}
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </Slider>
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
export default connect(mapStateToProps)(LogoBlock);
