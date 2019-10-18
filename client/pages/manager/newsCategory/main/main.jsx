import * as React from "react";
import {
    Tooltip,
} from 'react-tippy';
import Router from 'next/router'


import { Pagination, CustomSelect } from '../../../../components'
export class MainNewsCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            isLoading: false,
            newsCategories: null,
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
            const newsCategories = this.props.newCategories.items.filter(newsCategory => {
                return newsCategory.status === value;
            });
            this.setState({
                newsCategories,
                isLoading: false,
                currentPage: 1
            });
        } else {
            this.setState({
                newsCategories: undefined,
                currentPage: 1
            });
        }
    }
    open(newsCategoryId) {
        Router.push(`/manager/newsCategory/newsCategory?newsCategoryId=${newsCategoryId}`, `/quan-ly/muc-tin-tuc/chi-tiet/${newsCategoryId}`)
    }

    render() {
        const newsCategories = this.state.newsCategories
            ? this.state.newsCategories.slice(
                this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10,
                10 * this.state.currentPage
            )
            : (this.props.newCategories.items || []).slice(
                this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10,
                10 * this.state.currentPage
            );
        return (
            <React.Fragment>
                <div className="member-main">
                    <div className="member-main__title">Danh sách mục tin tức</div>
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
                                        <th>Đường dẫn</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                    {(newsCategories || []).map((item, index) => {

                                        return (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>

                                                <td>{item.name}</td>
                                                <td>{item.slug}</td>
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
                        <div className="table__pagination">
                            {this.state.newsCategories ?
                                <Pagination currentPage={this.state.currentPage} total={this.state.newsCategories.length} limit={10} changePage={this.changePage} />
                                : <Pagination currentPage={this.state.currentPage} total={this.props.newCategories.items.length} limit={10} changePage={this.changePage} />}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
