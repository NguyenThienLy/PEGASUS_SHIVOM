import * as React from "react";
import "./numberAdmin.scss";
import { Loading, LoadingSmall } from "../../components";

export class NumberAdmin extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  render() {
    const { numberAdmin, isFetching, isEmpty } = this.props;

    return (
      <div className="numberAdmin">
        <div className="numberAdmin__inner">
          <div
            className="numberAdmin__inner__icon"
            style={{ backgroundColor: numberAdmin.colorIcon }}
          >
            <div>
              <i class="fas fa-id-card-alt"></i>
            </div>
          </div>
          <div className="numberAdmin__inner__info">
            <div className="numberAdmin__inner__info__about">
              {numberAdmin.about}
            </div>
            {isFetching && isEmpty && <LoadingSmall />}
            {isEmpty && !isFetching && "trống"}
            {!isFetching && !isEmpty && (
              <div className="numberAdmin__inner__info__quantity">
                {numberAdmin.quantity}
              </div>)}
          </div>
        </div>
      </div>
    );
  }
}
