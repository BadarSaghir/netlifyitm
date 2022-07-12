import React, { Component } from "react";

export default class Tiktok extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tiktok: "",
    };
  }
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    this.getTiktok(this.props.url);
  }
  getTiktok = (url) => {
    // const url ="https://www.tiktok.com/@scout2015/video/6718335390845095173"
    fetch("https://www.tiktok.com/oembed?url=" + url)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            tiktok: result,
          });
        },
        (error) => {
          console.log("Tiktok fetch error", error);
        }
      );
  };
  createMarkup = (html) => {
    return { __html: html };
  };
  render() {
    const { tiktok } = this.state;
    return (
      <div
        id="scriptTarget"
        dangerouslySetInnerHTML={this.createMarkup(this.state.tiktok.html)}
      />
    );
  }
}
