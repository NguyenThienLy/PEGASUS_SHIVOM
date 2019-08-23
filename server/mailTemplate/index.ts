import { ReplyFeedbackEmail } from './replyFeedback'
import { RemindExtendCourseEmail } from './remindExtendCourse'
import { NotifyRegisCourseSuccessEmail } from './notifyRegisCourseSuccess'

const replyFeedbackEmail = new ReplyFeedbackEmail()
const remindExtendCourseEmail = new RemindExtendCourseEmail()
const notifyRegisCourseSuccessEmail = new NotifyRegisCourseSuccessEmail()

export {
    replyFeedbackEmail,
    remindExtendCourseEmail,
    notifyRegisCourseSuccessEmail
}

