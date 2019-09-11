import * as mongoose from 'mongoose';
import { BaseModel } from './base.model';

const Schema = mongoose.Schema;

type NewsSliderOption = {
    title: string
    description: string
    buttonTitle: string
    image: string
    newsId: string
}
type PromotionCourseSliderOption = {
    title: string
    description: string
    buttonTitle: string
    courseId: string
}

type EventSliderOption = {
    title: string
    description: string
    buttonTile: string
    eventId: string
}

type NormalSliderOption = {
    title: string
    description: string
    buttonTile: string
    link: string
}

export type SliderModel = BaseModel & {
    type: "news" | "promotion" | "event" | "normal"
    option: NewsSliderOption | PromotionCourseSliderOption | EventSliderOption | NormalSliderOption
}

const sliderSchema = new Schema({
    type: { type: String, enum: ["news", "promotion", "event", "normal"] },
    option: { type: Schema.Types.Mixed },
    status: { type: String, enum: ["active", "deactive"], default: "active" }
}, { timestamps: true })

export let Slider: mongoose.Model<SliderModel> = mongoose.model('Slider', sliderSchema);


