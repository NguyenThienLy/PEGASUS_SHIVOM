import * as React from "react";
import { action } from '../../../../actions'
import { api } from '../../../../services'
import {
    ClassInfo
} from '../../../../components'
import Router from 'next/router';
import './detail.scss';

export class DetailClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            class: {
                isFetching: false,
                isEmpty: true,
                data: null
            },
            teacher: {
                isFetching: false,
                isEmpty: true,
                data: null
            },
            timeTableOfClass: {
                isFetching: false,
                isEmpty: true,
                data: null
            }
        }

        this.updateClass = this.updateClass.bind(this);
    }

    updateClass() {
        Router.push(
            `/manager/class/class?classId=${this.props.params.classId}`,
            `/quan-ly/lop-hoc/cap-nhat/${this.props.params.classId}`
        );
    }

    fetchData = async () => {
        const token =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M';

        const newClass = this.state.class;

        newClass.data = this.props.classes.items.find((classInfo) => { return classInfo._id === this.props.params.classId })
        if (!newClass.data) {
            const res = await api.class.getItem(this.props.params.classId)
            newClass.data = res.result.object
        }

        let course = this.props.courses.items.find((course) => { return course._id === newClass.data.course })

        if (!course) {
            const res = await api.course.getItem(newClass.data.course)
            course = res.result.object
        }

        newClass.data.nameCourse = course.name;
        newClass.isFetching = false;
        newClass.isEmpty = false;

        this.setState({ class: newClass })

        const newTeacher = this.state.teacher;

        newTeacher.data = this.props.teachers.items.find((teacher) => { return teacher._id === this.state.class.data.teacher })
        if (!newTeacher.data) {
            const res = await api.teacher.getItem(this.state.class.data.teacher)
            newTeacher.data = res.result.object
        }
        newTeacher.isFetching = false;
        newTeacher.isEmpty = false;

        this.setState({ teacher: newTeacher })

        api.class.getTimeTable(
            this.props.params.classId, {})
            .then(res => {
                const newTimeTableOfClass = this.state.timeTableOfClass;

                newTimeTableOfClass.data = res.result.object;

                newTimeTableOfClass.isFetching = false;
                newTimeTableOfClass.isEmpty = false;

                this.setState({ timeTableOfClass: newTimeTableOfClass })
            }).catch(err => {
                const newTimeTableOfClass = this.state.timeTableOfClass;

                newTimeTableOfClass.isFetching = false;
                newTimeTableOfClass.isEmpty = true;

                this.setState({ timeTableOfClass: newTimeTableOfClass })
            })
    }

    changeIsFetching(isFetching) {
        const newClass = this.state.class;
        const newTeacher = this.state.teacher
        const newTimeTableOfClass = this.state.timeTableOfClass

        newClass.isFetching = isFetching;
        newTeacher.isFetching = isFetching
        newTimeTableOfClass.isFetching = isFetching;

        this.setState({
            class: newClass,
            teacher: newTeacher,
            timeTableOfClass: newTimeTableOfClass
        });
    }

    handleScroll = () => { };

    componentWillUnmount() { }

    componentDidMount() {
        this.changeIsFetching(true);

        this.fetchData()
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        return (
            <div className="classDetails">
                <React.Fragment>
                    <div className="classDetails__body">

                        <div className="classDetails__body__card">
                            <div className="classDetails__body__card__title">
                                Thông tin lớp học
                            </div>

                            <div className="classDetails__body__card__content">
                                <div className="classDetails__body__card__content__member">
                                    <div className="classDetails__body__card__content__member__info">
                                        <ClassInfo
                                            classInfo={this.state.class.data}
                                            isFetchingClassInfo={this.state.class.isFetching}
                                            isEmptyClassInfo={this.state.class.isEmpty}
                                            updateClass={this.updateClass}

                                            teacherInfo={this.state.teacher.data}
                                            isFetchingTeacherInfo={this.state.teacher.isFetching}
                                            isEmptyTeacherInfo={this.state.teacher.isEmpty}

                                            timeTableOfClass={this.state.timeTableOfClass.data}
                                            isFetchingTimeTableOfClass={this.state.timeTableOfClass.isFetching}
                                            isEmptyTimeTableOfClass={this.state.timeTableOfClass.isEmpty}>
                                        </ClassInfo>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </div>
        );
    }
}
