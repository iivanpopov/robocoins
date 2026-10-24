/// <reference types="@kanjou/plugin/client" />

import type { DefaultMessageValue } from '@kanjou/react'

declare module '@kanjou/react' {
  export interface Register {
    locale: 'uk'
    messages: {
      'navbar.label': {}
      'navbar.settings': {}
      'navbar.profile': {}
      'navbar.home': {}
      'navbar.shop': {}
      'navbar.groups': {}
      'shop.reward.close': {}
      'shop.title': {}
      'shop.balance': { count: { __fn: 'number' } }
      'shop.balance.amount': { count: { __fn: 'number' } }
      'shop.reward.back': {}
      'shop.reward.price': { count: { __fn: 'number' } }
      'shop.reward.claim': {}
      'shop.reward.insufficient': {}
      'shop.reward.cost': {}
      'shop.reward.type.reward': {}
      'shop.reward.type.privilege': {}
      'shop.legend.rewards': {}
      'shop.legend.privileges': {}
      'settings.name': {}
      'settings.password': {}
      'student.password.unavailable': {}
      'student.password.regenerate': {}
      'settings.credentials.error': {}
      'settings.logout': {}
      'settings.logout.error': {}
      'action.next.title': {}
      'action.finish.title': {}
      'action.login.title': {}
      'action.login.description': {}
      'action.enter.title': {}
      'error.incorrect-password': {}
      'error.registration-failed': {}
      'field.name.placeholder': {}
      'field.password.show': {}
      'field.password.hide': {}
      'field.password.placeholder': {}
      'caption.has-account': {}
      'caption.has-no-account': {}
      'caption.mistake': {}
      'step.name.title': {}
      'step.name.description': {}
      'step.category.title': {}
      'step.category.description': {}
      'step.course.title': {}
      'step.course.description': {}
      'step.group.title': {}
      'step.direction.progress': {
        current: { __fn: 'number' }
        total: { __fn: 'number' }
      }
      'step.selection.empty': {}
      'course.category': { category: { __fn: 'string' } }
      'step.avatar.title': {}
      'step.avatar.suggest': {}
      'step.view.title': {}
      'step.success.title': {}
      'step.success.subtitle': {}
      'step.success.password': {}
      'step.success.description': {}
      'step.success.profile': {}
      'error.profile-entry-failed': {}
      'weekday.monday': {}
      'weekday.tuesday': {}
      'weekday.wednesday': {}
      'weekday.thursday': {}
      'weekday.friday': {}
      'weekday.saturday': {}
      'weekday.sunday': {}
      'group.select.title': {}
      'group.filter.all': { count: { __fn: 'number' } }
      'group.students-count': { count: { __fn: 'number' } }
      'group.back': {}
      'student.empty': {}
      'student.group-empty': {}
      'field.student-search.placeholder': {}
      'action.clear-search.title': {}
      'sort.title': {}
      'sort.students': {}
      'sort.name-asc': {}
      'sort.name-desc': {}
      'group.error': {}
      'award.error': {}
      'reason.theory': {}
      'reason.practice_completed': {}
      'reason.additional_task_completed': {}
      'reason.discipline_breakdown': {}
      'reason.middle_level_violation': {}
      'reason.serious_violation': {}
      'sort.balance-desc': {}
      'sort.balance-asc': {}
      'award.reason.label': {}
      'award.reward': {}
      'award.punish': {}
      'award.history.title': {}
      'award.history.all': {}
      'award.history.view-all': {}
      'award.history.empty': {}
      'award.cancel.error': {}
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
      'profile.goal.product': {}
      'profile.goal.none': {}
      'profile.goal.shop': {}
      'profile.goal.completed': {}
      'profile.goal.target': { count: { __fn: 'number' } }
      'profile.goal.remaining': { count: { __fn: 'number' } }
      'profile.history.title': {}
      'profile.history.all': {}
      'profile.history.loading': {}
      'profile.history.retry': {}
      'profile.history.empty': {}
      'profile.history.today': {}
      'profile.history.yesterday': {}
      'profile.history.date': { date: { __fn: 'datetime' } }
      'profile.history.amount': { count: { __fn: 'number' } }
      'profile.rules': {}
      'profile.rules.title': {}
      'profile.rules.description': {}
      'profile.rules.reward': {}
      'profile.rules.punish': {}
      'profile.rules.loading': {}
      'profile.rules.error': {}
      'profile.rules.close': {}
      'reason.balance-change': {}
      'profile.balance.caption': { count: { __fn: 'number' } }
      'error.code': {}
      'error.title': {}
      'error.description': {}
      'error.retry': {}
      'not-found.code': {}
      'not-found.title': {}
      'not-found.description': {}
      'not-found.home': {}
    }
  }
}
