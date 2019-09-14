import * as React from "react";
import "./loading.scss";

export class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loading">
        <div class="lds-dual-ring"></div>
      </div>
    );
  }
}
