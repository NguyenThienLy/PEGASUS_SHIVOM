import * as React from "react";
import "./trainingClass.scss";
import Link from 'next/link'

export class TrainingClass extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { trainingClass } = this.props;
        return (
            <div className="training-class">
                <div className="training-class__image">
                    <div className="training-class__image__background" />
                    <Link href={`/course/course?slug=${trainingClass.slug}`} as={`/khoa-hoc/${trainingClass.slug}`}>
                        <a href={`/khoa-hoc/${trainingClass.slug}`}>
                            <img
                                src={trainingClass.thumb}
                                alt={trainingClass.name}
                            />
                        </a>
                    </Link>
                </div>
                <div className="training-class__info">
                    <div className="training-class__info__category">
                        <Link href={`/course/course?slug=${trainingClass.slug}`} as={`/khoa-hoc/${trainingClass.slug}`}>
                            <a href={`/khoa-hoc/${trainingClass.slug}`}>
                                Yoga
                            </a>
                        </Link>
                    </div>
                    <h4 className="training-class__info__name">
                        <Link href={`/course/course?slug=${trainingClass.slug}`} as={`/khoa-hoc/${trainingClass.slug}`}>
                            <a href={`/khoa-hoc/${trainingClass.slug}`}>{trainingClass.name}</a>
                        </Link>
                    </h4>
                    <p className="training-class__info__detail" dangerouslySetInnerHTML={{ __html: (trainingClass.description || "").slice(0, 100) + "..." }}>

                    </p>
                    <div className="training-class__info__other">
                        <div className="training-class__info__other__time">
                            <span>
                                <i className="fas fa-users"></i>
                            </span>
                            <span>{trainingClass.currentStudentAmount}/{trainingClass.quantity}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
