import * as React from "react";
import "./ringingPhone.scss";

export class RingingPhone extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="ringing-phone">
        <a className="ringing-phone__link" href="#">
          <i className="bell fas fa-phone" />
        </a>
      </div>
    );
  }
}
