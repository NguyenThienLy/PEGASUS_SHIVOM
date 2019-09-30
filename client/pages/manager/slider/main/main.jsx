import * as React from "react";
import {
    Tooltip,
} from 'react-tippy';
import Router from 'next/router'
export class MainSlider extends React.Component {
    constructor(props) {
        super(props);
    }
    open(sliderId) {
        Router.push(`/manager/slider/slider?sliderId=${sliderId}`, `/quan-ly/slider/chi-tiet/${sliderId}`)
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
                            <div className="table__title__content">Danh sách slide</div>
                        </div>
                        <div className="table__content">
                            <table className="member-table">
                                <tbody>
                                    <tr>
                                        <th>Thứ tự</th>
                                        <th>Tiêu đề</th>
                                        <th>Mô tả</th>
                                        <td>Tên nút</td>
                                        <th>Ảnh</th>

                                        <th>Thao tác</th>
                                    </tr>
                                    {this.props.sliders.items.map((item, index) => {

                                        return (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.option.title}</td>
                                                <td>{item.option.description}</td>
                                                <td>{item.option.buttonTitle}</td>
                                                <td><img className="table-image" src={item.option.image} /></td>
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
