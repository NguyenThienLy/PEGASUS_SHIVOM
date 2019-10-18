import * as React from "react";
import "./loadingSmall.scss";

export class LoadingSmall extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loading-small">
                <div class="lds-dual-ring"></div>
            </div>
        );
    }
}