import { mergeMessages } from '../../../lib/translations/merge-messages'
import catalog from './admin/catalog'
import courses from './admin/courses'
import groups from './admin/groups'
import operations from './admin/operations'
import people from './admin/people'
import shared from './admin/shared'

export default mergeMessages([groups, courses, people, operations, catalog, shared])
