import * as React from "react";
import "./defaultButton.scss";
import Link from "next/link";

export class DefaultButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { link, content } = this.props;

    console.log("NguyenThienLy", this.props);

    return (
      <div className="default-button">
        <Link href={`/blog/blog?slug=${link}`} as={`/tin-tuc/${link}`}>
          <a href={`/tin-tuc/${link}`} className="default-button__link">
            <span className="default-button__link__content">{content}</span>
            <span className="default-button__link__btn default-button__link__btn-left" />
            <span className="default-button__link__btn default-button__link__btn-top-left" />
            <span className="default-button__link__btn default-button__link__btn-top-right" />
            <span className="default-button__link__btn default-button__link__btn-right" />
            <span className="default-button__link__btn default-button__link__btn-bottom-left" />
            <span className="default-button__link__btn default-button__link__btn-bottom-right" />
          </a>
        </Link>
      </div>
    );
  }
}
