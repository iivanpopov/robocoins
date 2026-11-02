import admin from './uk/admin'
import auth from './uk/auth'
import common from './uk/common'
import feedback from './uk/feedback'
import settings from './uk/settings'
import student from './uk/student'
import teacher from './uk/teacher'

export default {
  ...common,
  ...auth,
  ...settings,
  ...student,
  ...teacher,
  ...admin,
  ...feedback,
}
