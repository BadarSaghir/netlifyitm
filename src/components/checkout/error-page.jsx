import React, { Component } from "react";

class orderError extends Component {
  render() {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var current = new Date();
    var next5days = new Date(Date.now() + 5 * 86400000);

    return (
      <div>
        <section className="section-b-space light-layout">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="success-text">
                  <i className="fa fa-check-circle" aria-hidden="true" />
                  <h2>Something Went Wrong</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default orderError;
