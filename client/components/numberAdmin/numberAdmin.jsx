import * as React from "react";
import "./numberAdmin.scss";

export class NumberAdmin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { numberAdmin } = this.props;

    return (
      <div className="numberAdmin">
        <div className="numberAdmin__inner">
          <div
            className="numberAdmin__inner__icon"
            dangerouslySetInnerHTML={{ __html: numberAdmin.icon }}
          />
          <div className="numberAdmin__inner__info">
            <div className="numberAdmin__inner__info__about">
              {numberAdmin.about}
            </div>
            <div className="numberAdmin__inner__info__quantity">
              {numberAdmin.quantity}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
