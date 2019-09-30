import React, { Component } from "react";

import Dropzone from "react-dropzone";
import "./imageUpload.scss";
import styled from "styled-components";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 3,
  border: "1px solid #a8dbe0",
  marginBottom: 8,
  marginRight: 8,
  width: 120,
  height: 120,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover"
};
export class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadFiles: [],
      thumbs: null
    };
  }
  onDrop = acceptedFiles => {
    let fileUrl = URL.createObjectURL(acceptedFiles[0]);
    const thumbs = acceptedFiles.map(file => {
      return (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img src={URL.createObjectURL(file)} style={img} />
          </div>
        </div>
      );
    });

    this.setState({ uploadFiles: acceptedFiles, thumbs: thumbs });
    this.props.changeImage(acceptedFiles[0], fileUrl);
  };
  render() {
    return (
      <div>
        <div className="drop-zone-wrap">
          <Dropzone
            onDrop={this.onDrop}
            accept="image/png, image/jpg, image/jpeg"
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="drop-zone-wrap__instruction">
                <input {...getInputProps()} />
                <div>{this.props.title || "Kéo thả ảnh hoặc nhấn vào đây"}</div>
                <div>
                  {/* <ul>
                    {
                      this.state.uploadFiles.map((file, index) => {
                        console.log("file: " + JSON.stringify(file));
                        return (<li key={index}>{file.name}</li>)
                      })
                    }
                  </ul> */}
                </div>
              </div>
            )}
          </Dropzone>
        </div>
        <aside style={thumbsContainer}>{this.state.thumbs}</aside>
      </div>
    );
  }
}
