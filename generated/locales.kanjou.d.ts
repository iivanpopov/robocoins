/// <reference types="@kanjou/plugin/client" />

import type { DefaultMessageValue } from '@kanjou/react'

declare module '@kanjou/react' {
  export interface Register {
    locale: 'uk'
    messages: {
      'action.registration.title': {}
      'action.registration.description': {}
      'action.start.title': {}
      'action.next.title': {}
      'action.finish.title': {}
      'action.login.title': {}
      'action.enter.title': {}
      'error.incorrect-password': {}
      'error.registration-failed': {}
      'field.name.placeholder': {}
      'field.course.placeholder': {}
      'field.group.placeholder': {}
      'field.group.label': {}
      'field.password.show': {}
      'field.password.hide': {}
      'caption.has-account': {}
      'caption.has-no-account': {}
      'caption.mistake': {}
      'step.course-select.title': {}
      'step.avatar.title': {}
      'step.view.title': {}
      'text.group': {}
      'group.select.title': {}
      'group.filter.all': { count: { __fn: 'number' } }
      'group.theme.game-dev': {}
      'group.theme.web': {}
      'group.theme.embedded': {}
      'group.students-count': { count: { __fn: 'number' } }
      'group.back': {}
      'student.empty': {}
      'field.student-search.placeholder': {}
      'action.clear-search.title': {}
      'sort.title': {}
      'sort.students': {}
      'sort.name-asc': {}
      'sort.name-desc': {}
      'sort.balance-desc': {}
      'sort.balance-asc': {}
      'award.reason.label': {}
      'award.history.title': {}
      'award.history.empty': {}
      'action.revert.title': {}
      'reason.activity': {}
      'reason.homework': {}
      'reason.teamwork': {}
      'reason.answer': {}
      'reason.initiative': {}
      'reason.discipline': {}
      'reason.mistake': {}
      'reason.late': {}
      'reason.incomplete': {}
      'reason.other': {}
      'profile.balance.amount': { count: { __fn: 'number' } }
      'profile.balance.caption': { count: { __fn: 'number' } }
      'not-found.code': {}
      'not-found.title': {}
      'not-found.description': {}
      'not-found.home': {}
    }
  }
}
