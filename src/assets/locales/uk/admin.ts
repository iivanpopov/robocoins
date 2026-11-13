import achievements from './admin/achievements'
import catalog from './admin/catalog'
import courses from './admin/courses'
import groups from './admin/groups'
import operations from './admin/operations'
import people from './admin/people'
import shared from './admin/shared'

export default {
  ...groups,
  ...courses,
  ...people,
  ...operations,
  ...catalog,
  ...achievements,
  ...shared,
}
