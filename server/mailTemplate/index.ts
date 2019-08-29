import { ReplyFeedbackEmail } from './replyFeedback'
import { RemindExtendCourseEmail } from './remindExtendCourse'
import { NotifyRegisCourseSuccessEmail } from './notifyRegisCourseSuccess'
import { NotifyRececeiveGiftEmail } from './notifyReceiveGift'
import { CongatulationBirthdayEmail } from './congratulationBirthday'

const replyFeedbackEmail = new ReplyFeedbackEmail()
const remindExtendCourseEmail = new RemindExtendCourseEmail()
const notifyRegisCourseSuccessEmail = new NotifyRegisCourseSuccessEmail()
const notifyReceiveGiftEmail = new NotifyRececeiveGiftEmail()
const congratulationBirthdayEmail = new CongatulationBirthdayEmail()

export {
    replyFeedbackEmail,
    remindExtendCourseEmail,
    notifyRegisCourseSuccessEmail,
    notifyReceiveGiftEmail,
    congratulationBirthdayEmail
}

