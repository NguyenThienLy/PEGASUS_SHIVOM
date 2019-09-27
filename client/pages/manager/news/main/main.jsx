import * as React from "react";
import {
    Tooltip,
} from 'react-tippy';

import Router from 'next/router'

export class MainNews extends React.Component {
    constructor(props) {
        super(props);
    }
    open(newsId) {
        Router.push(`/manager/news/news?newsId=${newsId}`, `/quan-ly/tin-tuc/chi-tiet/${newsId}`)
    }

    render() {

        return (
            <React.Fragment>
                <div className="member-main">
                    <div className="table">
                        <div className="table__title">
                            <div className="table__title__icon">
                                <i className="fas fa-clipboard-list" />
                            </div>
                            <div className="table__title__content">Danh sách tin tức</div>
                        </div>
                        <div className="table__content">
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
                                                    {/* <Tooltip
                                                        title="Chỉnh sửa"
                                                        position="top"
                                                    >
                                                        <span className="post-edit-button" onClick={() => this.edit(item._id)}> <i class="fas fa-pen"></i> </span>
                                                    </Tooltip> */}
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
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
