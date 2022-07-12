import React, { Component } from 'react';

export default class ImageZoom extends Component {
    render() {
        const {image} = this.props;

        return (
            <img src={`${image}`}  className="img-fluid image_zoom_cls-0"  style={{border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "5px",
            width: "300px"}}/>
        );
    }
}