import * as React from "react";
import "./searchBox.scss";

export class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                icon: <i className="fas fa-search"></i>,
                placeholder: 'Tìm kiếm...',
                type: 'text'
            },
            email: {
                icon: <i className="fas fa-arrow-right"></i>,
                placeholder: 'Nhập email...',
                type: 'email'
            }
        }
    }
    checkType() {
        if (this.props.type == 'search') {
            return this.state.search;
        }
        if (this.props.type == 'email') {
            return this.state.email;
        }
    }
    render() {
        const boxType = this.checkType();
        return (
            <div className="search-box">
                <form>
                    <input type={boxType.type} placeholder={boxType.placeholder} />
                    {boxType.icon}
                </form>
            </div>
        )
    }
}
