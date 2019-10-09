import * as React from "react";
import "./pagination.scss";

export class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { total, limit, currentPage } = this.props
        return (
            <div class="pagination">
                <ul class="pagination__list">
                    <li class="disabled">«</li>
                    {Array.apply(null, Array(Math.ceil(total / limit))).map((page, index) => {

                        return (
                            <li
                                className={currentPage == index + 1 ? "pagination__list__active" : ""}
                                onClick={() => { return this.props.changePage(index + 1) }}>
                                {index + 1}
                            </li>
                        )
                    })}
                    <li>»</li>
                </ul>
            </div>
        );
    }
}
