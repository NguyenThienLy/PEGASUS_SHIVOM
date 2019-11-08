import * as React from "react";
import "./classInfo.scss";
import { Loading } from '../../components';
import { Tooltip } from 'react-tippy';

export class ClassInfo extends React.Component {
    constructor(props) {
        super(props);

        this.updateClass = this.updateClass.bind(this);
    }

    updateClass() {
        this.props.updateClass();
    }

    render() {
        const { classInfo, isFetchingClassInfo, isEmptyClassInfo,
            teacherInfo, isFetchingTeacherInfo, isEmptyTeacherInfo,
            timeTableOfClass, isFetchingTimeTableOfClass,
            isEmptyTimeTableOfClass } = this.props;

        let sorter = {
            monday: {
                value: 1,
                text: "Thứ hai"
            },
            tuesday: {
                value: 2,
                text: "Thứ ba"
            },
            wednesday: {
                value: 3,
                text: "Thứ tư"
            },
            thursday: {
                value: 4,
                text: "Thứ năm"
            },
            friday: {
                value: 5,
                text: "Thứ sáu"
            },
            saturday: {
                value: 6,
                text: "Thứ bảy"
            },
            sunday: {
                value: 7,
                text: "Chủ nhật"
            }
        }

        return (
            <div className="classInfo">
                {isFetchingClassInfo && <Loading />}
                {!isFetchingClassInfo && isEmptyClassInfo && "Dữ liệu trống"}
                {!isFetchingClassInfo && !isEmptyClassInfo && (
                    <div>
                        {isFetchingTeacherInfo && <Loading />}
                        {!isFetchingTeacherInfo && isEmptyTeacherInfo && "Dữ liệu trống"}
                        {!isFetchingTeacherInfo && !isEmptyTeacherInfo && (
                            <div className="classInfo__left">
                                <div className="classInfo__left__avatar">
                                    <img
                                        src={teacherInfo.avatar}
                                        alt=""
                                    />
                                </div>

                                <div className="classInfo__left__name">
                                    <span>{teacherInfo.firstName}&nbsp;{teacherInfo.lastName}</span>
                                </div>
                            </div>
                        )}

                        < Tooltip
                            title="Chỉnh sửa"
                            position="top"
                            className="courseInfo__update-button"
                        >
                            <span
                                onClick={() => this.updateClass()}>
                                <i class="fas fa-edit"></i>
                            </span>
                        </Tooltip>

                        <div className="classInfo__right">
                            <div className="classInfo__right__title">
                                <div className="classInfo__right__title__inner">
                                    <div>Thông tin chi tiết</div>
                                    <div className="classInfo__right__title__inner--hover" />
                                </div>
                            </div>

                            <div className="classInfo__right__info">
                                <div className="classInfo__right__info__item">
                                    <div className="classInfo__right__info__item__title">
                                        Tên lớp học
                                    </div>
                                    <div className="classInfo__right__info__item__content">
                                        {classInfo.name}
                                    </div>
                                </div>
                                <div className="classInfo__right__info__item">
                                    <div className="classInfo__right__info__item__title">
                                        Mã lớp
                                    </div>
                                    <div className="classInfo__right__info__item__content"> {classInfo.code}</div>
                                </div>

                                <div className="classInfo__right__info__item">
                                    <div className="classInfo__right__info__item__title">
                                        Khóa học
                                    </div>
                                    <div className="classInfo__right__info__item__content">
                                        {classInfo.nameCourse}
                                    </div>
                                </div>

                                <div className="classInfo__right__info__item">
                                    <div className="classInfo__right__info__item__title">
                                        Giới thiệu ngắn
                                    </div>
                                    <div className="classInfo__right__info__item__content">
                                        {classInfo.shortDescription}
                                    </div>
                                </div>
                            </div>

                            <div className="classInfo__right__title">
                                <div className="classInfo__right__title__inner">
                                    <div>Lịch học</div>
                                    <div className="classInfo__right__title__inner--hover" />
                                </div>
                            </div>

                            {isFetchingTimeTableOfClass && <Loading />}
                            {isEmptyTimeTableOfClass && !isFetchingTimeTableOfClass && "Dữ liệu trống"}
                            {!isFetchingTimeTableOfClass && !isEmptyTimeTableOfClass && (

                                timeTableOfClass.items
                                    .sort(function (a, b) {
                                        return (
                                            sorter[a.dayOfWeek].value -
                                            sorter[b.dayOfWeek].value
                                        );
                                    })
                                    .map((timeTableItem, index) => {
                                        return (
                                            <div className="classInfo__right__timeTable" key={index}>
                                                <div className="classInfo__right__timeTable__event">
                                                    <div className="classInfo__right__timeTable__event__date">
                                                        {sorter[timeTableItem.dayOfWeek].text}
                                                    </div>
                                                    <div className="classInfo__right__timeTable__event__class-info">
                                                        <div className="time-table__list-events__event__class-info__class-name">
                                                            {timeTableItem.topic}
                                                        </div>
                                                        <div className="time-table__list-events__event__class-info__class-time">
                                                            {timeTableItem.startTime.hour}:{timeTableItem.startTime.minute === 0 ? '00' : timeTableItem.startTime.minute}
                                                            -
                                                            {timeTableItem.endTime.hour}:{timeTableItem.endTime.minute === 0 ? '00' : timeTableItem.endTime.minute}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
