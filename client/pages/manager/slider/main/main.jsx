import * as React from "react";
import {
    Tooltip,
} from 'react-tippy';
import Router from 'next/router'
import { Pagination, CustomSelect } from '../../../../components'
export class MainSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            isLoading: false,
            sliders: null,
            filterByStatus: {
                placeholder: 'Chọn trạng thái',
                options: ['Tất cả', 'Hoạt động', 'Không hoạt động'],
                values: ['all', 'active', 'deactive']
            },
        }
        this.filterByStatus = this.filterByStatus.bind(this);
        this.changePage = this.changePage.bind(this)
    }
    changePage(pageNum) {
        this.setState({
            currentPage: pageNum
        })
    }
    filterByStatus(value) {
        // const { name, value } = e.target;
        if (value !== 'all') {
            this.setState({
                isLoading: true
            });
            const sliders = this.props.sliders.items.filter(slider => {
                return slider.status === value;
            });
            this.setState({
                sliders,
                isLoading: false,
                currentPage: 1
            });
        } else {
            this.setState({
                sliders: undefined,
                currentPage: 1
            });
        }
    }
    open(sliderId) {
        Router.push(`/manager/slider/slider?sliderId=${sliderId}`, `/quan-ly/slider/chi-tiet/${sliderId}`)
    }

    render() {
        const sliders = this.state.sliders
            ? this.state.sliders.slice(
                this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10,
                10 * this.state.currentPage
            )
            : (this.props.sliders.items || []).slice(
                this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10,
                10 * this.state.currentPage
            );
        return (
            <React.Fragment>
                <div className="member-main">
                    <div className="member-main__title">Danh sách slide</div>
                    <div className="member-main__content">
                        <div className="member-main__content__filter">

                            <div>
                                <div>Lọc theo trạng thái</div>
                                <CustomSelect
                                    customSelect={this.state.filterByStatus}
                                    filterByStatus={this.filterByStatus}
                                ></CustomSelect>

                            </div>
                        </div>
                    </div>
                    <div className="base-table">
                        <div className="base-table__content">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Thứ tự</th>
                                        <th>Tiêu đề</th>
                                        <th>Mô tả</th>
                                        <td>Tên nút</td>
                                        <th>Ảnh</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                    {sliders.map((item, index) => {

                                        return (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.option.title}</td>
                                                <td>{item.option.description}</td>
                                                <td>{item.option.buttonTitle}</td>
                                                <td><img className="table-image" src={item.option.image} /></td>
                                                <td>{item.status === "active" ? "Hoạt động" : "Không hoạt động"}</td>
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
                        {this.state.sliders ?
                            <Pagination currentPage={this.state.currentPage} total={this.state.sliders.length} limit={10} changePage={this.changePage} />
                            : <Pagination currentPage={this.state.currentPage} total={this.props.sliders.items.length} limit={10} changePage={this.changePage} />}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
