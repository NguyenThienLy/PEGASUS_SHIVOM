import * as React from 'react'
import './trainerInfo.scss'

export class TrainerInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { trainerInfo } = this.props;
        return (
            <div className="class-trainer">
                <div className="class-trainer__img">
                    <img src={trainerInfo.avatar}
                        alt="class trainer avatar"
                    ></img>
                </div>
                <div className="class-trainer__info">
                    <div className="class-trainer__info__name">
                        {trainerInfo.firstName} {trainerInfo.lastName}
                    </div>
                    <div className="class-trainer__info__description">
                        {trainerInfo.shortDescription}
                    </div>
                    {/* <div className="class-trainer__info__detail">
                        <ul className="list-items">
                            <li className="list-items__item">
                                <div className="list-items__item__name">Tuổi</div>
                                <div className="list-items__item__content">{trainerInfo.age}</div>
                            </li>
                            <li className="list-items__item">
                                <div className="list-items__item__name">Cân nặng</div>
                                <div className="list-items__item__content">{trainerInfo.weight}</div>
                            </li>
                            <li className="list-items__item">
                                <div className="list-items__item__name">Chiều cao</div>
                                <div className="list-items__item__content">{trainerInfo.height}</div>
                            </li>
                            <li className="list-items__item">
                                <div className="list-items__item__name">Chức vụ</div>
                                <div className="list-items__item__content">{trainerInfo.position}</div>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        );
    }
}