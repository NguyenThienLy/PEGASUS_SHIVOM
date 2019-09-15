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
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
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
  width: "auto",
  height: "100%"
};
export class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadFiles: [],
      thumbs: null
    }
  }
  onDrop = (acceptedFiles) => {
    const thumbs = acceptedFiles.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={URL.createObjectURL(file)} style={img} />
        </div>
      </div>
    ));
    this.setState({ uploadFiles: acceptedFiles, thumbs: thumbs });
    this.props.changeImage(acceptedFiles[0])
  }
  render() {
    return (
      <div>
        <div className="drop-zone-wrap">
          <Dropzone className="" onDrop={this.onDrop}
            accept="image/png, image/jpg, image/jpeg">
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="drop-zone-wrap__instruction">
                <input {...getInputProps()} />
                <div>Kéo thả ảnh hoặc nhấn vào đây</div>
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
