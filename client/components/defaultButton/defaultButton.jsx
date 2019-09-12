import * as React from "react";
import "./defaultButton.scss";
import Link from "next/link";

export class DefaultButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { content } = this.props;
    return (
      <div className="default-button">
        <span className="default-button__content">{content}</span>
        <span className="default-button__border default-button__border-left" />
        <span className="default-button__border default-button__border-top-left" />
        <span className="default-button__border default-button__border-top-right" />
        <span className="default-button__border default-button__border-right" />
        <span className="default-button__border default-button__border-bottom-left" />
        <span className="default-button__border default-button__border-bottom-right" />
      </div>
    );
  }
}
