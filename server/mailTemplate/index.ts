import { ReplyFeedbackEmail } from './replyFeedback'
import { RemindExtendCourseEmail } from './remindExtendCourse'
import { NotifyRegisCourseSuccessEmail } from './notifyRegisCourseSuccess'
import { NotifyRececeiveGiftEmail } from './notifyReceiveGift'

const replyFeedbackEmail = new ReplyFeedbackEmail()
const remindExtendCourseEmail = new RemindExtendCourseEmail()
const notifyRegisCourseSuccessEmail = new NotifyRegisCourseSuccessEmail()
const notifyReceiveGiftEmail = new NotifyRececeiveGiftEmail()

export {
    replyFeedbackEmail,
    remindExtendCourseEmail,
    notifyRegisCourseSuccessEmail,
    notifyReceiveGiftEmail
}

