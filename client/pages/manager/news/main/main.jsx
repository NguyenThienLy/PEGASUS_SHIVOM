import * as React from "react";
import {
    Tooltip,
} from 'react-tippy';

import Router from 'next/router'



import { Pagination, CustomSelect } from '../../../../components'

export class MainNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            isLoading: false,
            newsList: null,
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
            const newsList = this.props.news.items.filter(news => {
                return news.status === value;
            });
            this.setState({
                newsList,
                isLoading: false,
                currentPage: 1
            });
        } else {
            this.setState({
                newsList: undefined,
                currentPage: 1
            });
        }
    }
    open(newsId) {
        Router.push(`/manager/news/news?newsId=${newsId}`, `/quan-ly/tin-tuc/chi-tiet/${newsId}`)
    }

    render() {
        const newsList = this.state.newsList
            ? this.state.newsList.slice(
                this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10,
                10 * this.state.currentPage
            )
            : (this.props.news.items || []).slice(
                this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10,
                10 * this.state.currentPage
            );
        return (
            <React.Fragment>
                <div className="member-main">
                    <div className="member-main__title">Danh sách tin tức</div>
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
                                        <th>Ảnh bìa</th>
                                        <th>Tiêu đề</th>
                                        <th>Mô tả ngắn</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                    {(newsList || []).map((item, index) => {

                                        return (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td ><img src={item.thumb} className="img-response avatar-image"></img></td>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td>{item.status === "active" ? "Hoạt động" : "Không hoạt động"}</td>
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
                        <div className="table__pagination">
                            {this.state.newsList ?
                                <Pagination currentPage={this.state.currentPage} total={this.state.newsList.length} limit={10} changePage={this.changePage} />
                                : <Pagination currentPage={this.state.currentPage} total={this.props.news.items.length} limit={10} changePage={this.changePage} />}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
