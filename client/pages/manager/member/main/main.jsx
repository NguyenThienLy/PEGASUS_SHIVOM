import * as React from "react";

import {
    Tooltip,
} from 'react-tippy';
import * as moment from 'moment'
import Router from 'next/router'

import { TableData } from '../../../../components'

import './main.scss'

export class MainMember extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate() {
        return true
    }
    open(studentId) {
        Router.push(`/manager/member/member?studentId=${studentId}`, `/quan-ly/hoc-vien/chi-tiet/${studentId}`)
    }
    render() {
        return (
            <React.Fragment>
                <div className="member-main">
                    {/* <TableData
                        tableName="Danh sách học viên"
                        data={this.props.students.items}
                        collums={[
                            {
                                header: "Ảnh",
                                customHtml: `<img src={{avatar}} class="img-response avatar-image"/>`
                            },
                            {
                                header: "Họ",
                                property: "firstName"
                            },
                            {
                                header: "Tên",
                                property: "lastName"
                            },
                            {
                                header: "Sinh nhật",
                                customHtml: `moment({{birthday}}).format("DD/MM/YYYY")`
                            },
                            {
                                header: "Thao tác",
                                custom: (<div>
                               
                                    </div>)
                            }
                        ]} /> */}
                    <div className="table">
                        <div className="table__title">
                            <div className="table__title__icon">
                                <i className="fas fa-clipboard-list" />
                            </div>
                            <div className="table__title__content">Danh sách học viên</div>
                        </div>
                        <div className="table__content">
                            <table >
                                <tbody>
                                    <tr>
                                        <th>Thứ tự</th>
                                        <th>Ảnh</th>
                                        <th>Họ và tên</th>
                                        <th>Mã số</th>
                                        <th>Số điện thoại</th>

                                        <th>Thao tác</th>
                                    </tr>
                                    {this.props.students.items && this.props.students.items.map((item, index) => {

                                        return (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td ><img src={item.avatar} className="img-response avatar-image"></img></td>
                                                <td>{item.firstName} {item.lastName}</td>
                                                <td>{item.cardId}</td>
                                                <td>{item.phone}</td>

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
                    </div>
                </div>
            </React.Fragment >
        );
    }
}


