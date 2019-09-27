import * as React from "react";
import "./tableData.scss";
import * as _ from 'lodash'
import * as moment from 'moment'

export class TableData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }


    parseStringWithInfo(message, info) {
        const regex = /({|})/g
        const regex2 = /({{\w+}})|({{\w+(?:\.\w+)+)}}/g
        if (regex.test(message)) {
            const replaceText = message.match(regex2)
            for (var item of replaceText) {
                item = item.replace(regex, '');
                message = message.replace(item, _.get(info, item));
            }
            message = message.replace(regex, '')
        }
        return message
    }
    render() {
        const { tableName, data, collums = [] } = this.props;
        console.log("table name: ", data)

        return (
            <div className="table">

                <div className="table__title">
                    <div className="table__title__icon">
                        <i className="fas fa-clipboard-list" />
                    </div>
                    <div className="table__title__content">{tableName}</div>
                </div>
                <div className="table__content">
                    <table>
                        {/* <colgroup>
                            <col className="table__content__firstCol" />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup> */}
                        <thead>
                            <tr>
                                {collums.map((collum, index) => {
                                    return < th key={index}>{collum.header}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {collums.map((col, colIndex) => {
                                            if (col.property) {
                                                return (<td data-title={col.header}>{item[col.property]}</td>)
                                            }
                                            if (col.customHtml) {
                                                let parseHtml = this.parseStringWithInfo(col.customHtml, item)
                                                return <td><div dangerouslySetInnerHTML={{ __html: parseHtml }}></div></td>
                                            }
                                            return (<td>{col.custom}</td>)
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}
