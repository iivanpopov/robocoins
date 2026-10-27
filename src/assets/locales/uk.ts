import { mergeMessages } from '../../lib/translations/merge-messages'
import admin from './uk/admin'
import auth from './uk/auth'
import common from './uk/common'
import settings from './uk/settings'
import student from './uk/student'
import teacher from './uk/teacher'

export default mergeMessages([common, auth, settings, student, teacher, admin])
