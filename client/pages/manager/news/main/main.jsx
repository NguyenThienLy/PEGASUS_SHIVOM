import * as React from "react";
import {
    Tooltip,
} from 'react-tippy';

export class MainNews extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <React.Fragment>
                <div className="member-main">
                    <table className="member-table">
                        <tbody>
                            <tr>
                                <th>Thứ tự</th>
                                <th>Ảnh bìa</th>
                                <th>Tiêu đề</th>
                                <th>Mô tả ngắn</th>
                                <th>Thao tác</th>
                            </tr>
                            {this.props.news.items.map((item, index) => {

                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td ><img src={item.thumb} className="img-response avatar-image"></img></td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        {/* <td>{moment(item.start_time).format('DD/MM/YYYY')}</td> */}
                                        {/* <td>Xoá </td> */}
                                        <td className="action-td">
                                            <Tooltip
                                                title="Chi tiết"
                                                position="top"
                                            >
                                                <span className="post-open-button" onClick={() => this.open(item._id)}><i class="fas fa-share-square"></i></span>
                                            </Tooltip>
                                            <Tooltip
                                                title="Chỉnh sửa"
                                                position="top"
                                            >
                                                <span className="post-edit-button" onClick={() => this.edit(item._id)}> <i class="fas fa-pen"></i> </span>
                                            </Tooltip>
                                            <Tooltip
                                                title="Xoá"
                                                position="top"
                                            >
                                                <span className="post-remove-button" onClick={() => this.delete(item._id)}><i class="fas fa-times"></i></span>
                                            </Tooltip>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}
