/// <reference types="@kanjou/plugin/client" />

import type { DefaultMessageValue } from '@kanjou/react'

declare module '@kanjou/react' {
  export interface Register {
    locale: 'uk'
    messages: {
      'leaderboard.title': {}
      'leaderboard.description': {}
      'leaderboard.rules': {}
      'leaderboard.all': {}
      'leaderboard.you': {}
      'leaderboard.place': {}
      'leaderboard.podium': {}
      'leaderboard.profile.open': { name: DefaultMessageValue }
      'leaderboard.own.place': {}
      'leaderboard.own.points': {
        count: { __fn: 'number' }
        countText: DefaultMessageValue
      }
      'leaderboard.gap': { count: { __fn: 'number' } }
      'leaderboard.own.near': {}
      'leaderboard.rank': { rank: { __fn: 'number' } }
      'leaderboard.points': { count: { __fn: 'number' } }
      'leaderboard.points.label': { count: { __fn: 'number' } }
      'leaderboard.empty': {}
      'leaderboard.unranked': {}
      'leaderboard.error': {}
      'leaderboard.rank.error': {}
      'leaderboard.loading': {}
      'leaderboard.more': {}
      'leaderboard.back': {}
      'profile.cyberween.open': {}
      'profile.cyberween.tagline': {}
      'profile.cyberween.period': {}
      'navbar.label': {}
      'navbar.settings': {}
      'navbar.profile': {}
      'navbar.home': {}
      'navbar.shop': {}
      'navbar.groups': {}
      'navbar.learning': {}
      'navbar.people': {}
      'navbar.catalog': {}
      'admin.groups.title': {}
      'admin.groups.description': {}
      'admin.groups.empty': {}
      'admin.groups.error': {}
      'admin.people.title': {}
      'admin.people.description': {}
      'admin.people.students.description': {}
      'admin.people.teachers.title': {}
      'admin.people.teachers.description': {}
      'students.title': {}
      'students.description': {}
      'students.register.action': {}
      'students.search.placeholder': {}
      'students.search.clear': {}
      'students.filters.courses': {}
      'students.filters.groups': {}
      'students.filters.all-courses': {}
      'students.filters.all-groups': {}
      'students.found': { count: { __fn: 'number' } }
      'students.empty': {}
      'students.empty-filtered': {}
      'students.no-groups': {}
      'students.group-count': { count: { __fn: 'number' } }
      'students.error.load': {}
      'students.error.session': {}
      'students.error.forbidden': {}
      'students.action.login': {}
      'students.profile.title': {}
      'students.profile.back': {}
      'students.profile.error': {}
      'students.profile.metrics.groups': {}
      'students.profile.metrics.courses': {}
      'students.profile.memberships': {}
      'students.profile.memberships.empty': {}
      'students.register.title': {}
      'students.register.description': {}
      'students.register.name.label': {}
      'students.register.name.placeholder': {}
      'students.register.name.error': {}
      'students.register.avatar.label': {}
      'students.register.avatar.option': { number: { __fn: 'number' } }
      'students.register.groups.label': {}
      'students.register.groups.description': {}
      'students.register.groups.empty': {}
      'students.register.groups.error': {}
      'students.register.groups.validation': {}
      'students.register.submit': {}
      'students.register.error': {}
      'students.register.success.title': {}
      'students.register.success.description': { name: DefaultMessageValue }
      'students.register.success.code': {}
      'students.register.success.copy': {}
      'students.register.success.copied': {}
      'students.register.success.copy-error': {}
      'students.register.success.profile': {}
      'students.register.success.list': {}
      'admin.teachers.title': {}
      'admin.teachers.description': {}
      'admin.teachers.search.placeholder': {}
      'admin.teachers.search.empty': {}
      'admin.teachers.empty': {}
      'admin.teachers.register': {}
      'admin.teachers.back': {}
      'admin.teachers.open': { name: DefaultMessageValue }
      'admin.teachers.error': {}
      'admin.teachers.error.unauthorized': {}
      'admin.teachers.error.forbidden': {}
      'admin.teachers.profile.back': {}
      'admin.teachers.profile.groups': {}
      'admin.teachers.profile.groups.empty': {}
      'admin.teachers.profile.error': {}
      'admin.teachers.profile.not-found': {}
      'admin.teachers.profile.mismatch': {}
      'admin.teachers.profile.not-teacher': {}
      'admin.teachers.register.title': {}
      'admin.teachers.register.description': {}
      'admin.teachers.register.name.label': {}
      'admin.teachers.register.name.placeholder': {}
      'admin.teachers.register.name.error': {}
      'admin.teachers.register.submit': {}
      'admin.teachers.register.error': {}
      'admin.teachers.result.title': {}
      'admin.teachers.result.description': {}
      'admin.teachers.result.code': {}
      'admin.teachers.result.copy': {}
      'admin.teachers.result.copied': {}
      'admin.teachers.result.copy-error': {}
      'admin.teachers.result.profile': {}
      'admin.teachers.result.list': {}
      'admin.teachers.result.another': {}
      'admin.courses.title': {}
      'admin.courses.description': {}
      'admin.courses.link': {}
      'admin.courses.create': {}
      'admin.courses.categories': {}
      'admin.courses.open': {}
      'admin.courses.back': {}
      'admin.courses.back-to-course': {}
      'admin.courses.search.label': {}
      'admin.courses.search.placeholder': {}
      'admin.courses.filter.all': { count: { __fn: 'number' } }
      'admin.courses.list.empty': {}
      'admin.courses.list.empty-description': {}
      'admin.courses.list.empty-all': {}
      'admin.courses.list.empty-all-description': {}
      'admin.courses.groups-count': { count: { __fn: 'number' } }
      'admin.courses.courses-count': { count: { __fn: 'number' } }
      'admin.courses.teachers-count': { count: { __fn: 'number' } }
      'admin.courses.error': {}
      'admin.courses.error.groups': {}
      'admin.courses.error.unauthorized': {}
      'admin.courses.error.forbidden': {}
      'admin.courses.error.login': {}
      'admin.courses.not-found.title': {}
      'admin.courses.not-found.description': {}
      'admin.courses.detail.title': {}
      'admin.courses.detail.category': {}
      'admin.courses.detail.groups': {}
      'admin.courses.detail.groups-empty': {}
      'admin.courses.detail.manage': {}
      'admin.courses.detail.rename': {}
      'admin.courses.detail.rename-description': {}
      'admin.courses.detail.change-category': {}
      'admin.courses.detail.change-category-description': {}
      'admin.courses.detail.delete': {}
      'admin.courses.detail.delete-description': {}
      'admin.courses.detail.local-note': {}
      'admin.courses.form.name-label': {}
      'admin.courses.form.name-placeholder': {}
      'admin.courses.form.name-error': {}
      'admin.courses.form.category-label': {}
      'admin.courses.create.title': {}
      'admin.courses.create.description': {}
      'admin.courses.create.submit': {}
      'admin.courses.create.error': {}
      'admin.courses.create.error.validation': {}
      'admin.courses.create.success-title': {}
      'admin.courses.create.success-description': {
        course: DefaultMessageValue
      }
      'admin.courses.create.another': {}
      'admin.courses.rename.title': {}
      'admin.courses.rename.description': { course: DefaultMessageValue }
      'admin.courses.rename.description-empty': {}
      'admin.courses.rename.note': {}
      'admin.courses.rename.same': {}
      'admin.courses.rename.submit': {}
      'admin.courses.rename.result-title': {}
      'admin.courses.rename.result-description': {}
      'admin.courses.rename.current': {}
      'admin.courses.rename.proposed': {}
      'admin.courses.category.title': {}
      'admin.courses.category.description': { course: DefaultMessageValue }
      'admin.courses.category.description-empty': {}
      'admin.courses.category.note': {}
      'admin.courses.category.same': {}
      'admin.courses.category.submit': {}
      'admin.courses.category.result-title': {}
      'admin.courses.category.result-description': {}
      'admin.courses.category.current': {}
      'admin.courses.category.proposed': {}
      'admin.courses.delete.title': {}
      'admin.courses.delete.description': { course: DefaultMessageValue }
      'admin.courses.delete.description-empty': {}
      'admin.courses.delete.note': {}
      'admin.courses.delete.confirm-label': {}
      'admin.courses.delete.confirm-placeholder': {}
      'admin.courses.delete.confirm-error': {}
      'admin.courses.delete.submit': {}
      'admin.courses.delete.dialog-title': {}
      'admin.courses.delete.dialog-description': { course: DefaultMessageValue }
      'admin.courses.delete.dialog-action': {}
      'admin.courses.delete.result-title': {}
      'admin.courses.delete.result-description': {}
      'admin.courses.delete.result-course': {}
      'admin.courses.categories.title': {}
      'admin.courses.categories.description': {}
      'admin.courses.categories.fixed': {}
      'admin.courses.categories.empty': {}
      'admin.courses.categories.change': { course: DefaultMessageValue }
      'admin.courses.categories.back': {}
      'admin.courses.categories.create': {}
      'admin.courses.categories.rename-action': {}
      'admin.courses.categories.delete-action': {}
      'admin.courses.categories.rename-label': { category: DefaultMessageValue }
      'admin.courses.categories.delete-label': { category: DefaultMessageValue }
      'admin.courses.categories.name-label': {}
      'admin.courses.categories.name-placeholder': {}
      'admin.courses.categories.name-error': {}
      'admin.courses.categories.create.title': {}
      'admin.courses.categories.create.description': {}
      'admin.courses.categories.create.note': {}
      'admin.courses.categories.create.submit': {}
      'admin.courses.categories.create.another': {}
      'admin.courses.categories.create.result-title': {}
      'admin.courses.categories.create.result-description': {}
      'admin.courses.categories.create.result-name': {}
      'admin.courses.categories.rename.title': {}
      'admin.courses.categories.rename.description': {
        category: DefaultMessageValue
      }
      'admin.courses.categories.rename.note': {}
      'admin.courses.categories.rename.submit': {}
      'admin.courses.categories.rename.result-title': {}
      'admin.courses.categories.rename.result-description': {}
      'admin.courses.categories.rename.current': {}
      'admin.courses.categories.rename.proposed': {}
      'admin.courses.categories.delete.title': {}
      'admin.courses.categories.delete.description': {
        category: DefaultMessageValue
      }
      'admin.courses.categories.delete.note': {}
      'admin.courses.categories.delete.warning': {}
      'admin.courses.categories.delete.submit': {}
      'admin.courses.categories.delete.dialog-title': {}
      'admin.courses.categories.delete.dialog-description': {
        category: DefaultMessageValue
      }
      'admin.courses.categories.delete.dialog-action': {}
      'admin.courses.categories.delete.result-title': {}
      'admin.courses.categories.delete.result-description': {}
      'admin.courses.categories.delete.result-category': {}
      'admin.catalog.title': {}
      'admin.catalog.description': {}
      'admin.catalog.add': {}
      'admin.catalog.back': {}
      'admin.catalog.search.placeholder': {}
      'admin.catalog.filters.all': {}
      'admin.catalog.filters.type': {}
      'admin.catalog.filters.category': {}
      'admin.catalog.type.reward': {}
      'admin.catalog.type.privilege': {}
      'admin.catalog.category.none': {}
      'admin.catalog.empty': {}
      'admin.catalog.empty.filtered': {}
      'admin.catalog.empty.reset': {}
      'admin.catalog.error.load': {}
      'admin.catalog.error.request': {}
      'admin.catalog.error.unauthorized': {}
      'admin.catalog.error.forbidden': {}
      'admin.catalog.error.not-found': {}
      'admin.catalog.error.validation': {}
      'admin.catalog.details.type': {}
      'admin.catalog.details.category': {}
      'admin.catalog.details.description': {}
      'admin.catalog.details.no-description': {}
      'admin.catalog.details.image': {}
      'admin.catalog.details.image.none': {}
      'admin.catalog.details.manage': {}
      'admin.catalog.details.manage.description': {}
      'admin.catalog.details.edit': {}
      'admin.catalog.details.hide': {}
      'admin.catalog.details.show': {}
      'admin.catalog.details.delete': {}
      'admin.catalog.details.hide.confirm.title': {}
      'admin.catalog.details.hide.confirm.description': {
        name: DefaultMessageValue
      }
      'admin.catalog.details.hide.confirm.action': {}
      'admin.catalog.details.hide.result.title': {}
      'admin.catalog.details.hide.result.description': {}
      'admin.catalog.details.show.confirm.title': {}
      'admin.catalog.details.show.confirm.description': {
        name: DefaultMessageValue
      }
      'admin.catalog.details.show.confirm.action': {}
      'admin.catalog.details.show.result.title': {}
      'admin.catalog.details.show.result.description': {}
      'admin.catalog.details.delete.confirm.title': {}
      'admin.catalog.details.delete.confirm.description': {
        name: DefaultMessageValue
      }
      'admin.catalog.details.delete.confirm.action': {}
      'admin.catalog.details.delete.result.title': {}
      'admin.catalog.details.delete.result.description': {}
      'admin.catalog.form.name': {}
      'admin.catalog.form.name.placeholder': {}
      'admin.catalog.form.price': {}
      'admin.catalog.form.price.placeholder': {}
      'admin.catalog.form.price.description': {}
      'admin.catalog.form.description': {}
      'admin.catalog.form.description.placeholder': {}
      'admin.catalog.form.type': {}
      'admin.catalog.form.category': {}
      'admin.catalog.form.submit': {}
      'admin.catalog.validation.name': {}
      'admin.catalog.validation.price': {}
      'admin.catalog.validation.type': {}
      'admin.catalog.validation.category': {}
      'admin.catalog.create.title': {}
      'admin.catalog.create.description': {}
      'admin.catalog.create.error': {}
      'admin.catalog.create.success.title': {}
      'admin.catalog.create.success.description': {}
      'admin.catalog.create.success.open': {}
      'admin.catalog.create.success.another': {}
      'admin.catalog.create.success.catalog': {}
      'admin.catalog.create.success.image': {}
      'admin.catalog.create.success.image.description': {}
      'admin.catalog.create.success.no-image': {}
      'admin.catalog.image.title': {}
      'admin.catalog.image.description': {}
      'admin.catalog.image.unsupported': {}
      'admin.catalog.image.mode.link': {}
      'admin.catalog.image.mode.file': {}
      'admin.catalog.image.link.placeholder': {}
      'admin.catalog.image.link.preview': {}
      'admin.catalog.image.link.replace': {}
      'admin.catalog.image.file.choose': {}
      'admin.catalog.image.file.replace': {}
      'admin.catalog.image.file.hint': {}
      'admin.catalog.image.remove': {}
      'admin.catalog.image.selected': {}
      'admin.catalog.image.unsaved': {}
      'admin.catalog.image.error.link': {}
      'admin.catalog.image.error.preview': {}
      'admin.catalog.image.error.file-type': {}
      'admin.catalog.image.error.file-size': {}
      'admin.catalog.edit.back': {}
      'admin.catalog.edit.title': {}
      'admin.catalog.edit.description': {}
      'admin.catalog.edit.submit': {}
      'admin.catalog.edit.reset': {}
      'admin.catalog.edit.notice.title': {}
      'admin.catalog.edit.notice.description': {}
      'shop.balance': { count: { __fn: 'number' } }
      'shop.balance.amount': { count: { __fn: 'number' } }
      'shop.reward.back': {}
      'shop.reward.price': { count: { __fn: 'number' } }
      'shop.reward.claim': {}
      'shop.reward.insufficient': {}
      'shop.reward.cost': {}
      'shop.reward.type.reward': {}
      'shop.reward.type.privilege': {}
      'shop.view.label': {}
      'shop.view.galaxy': {}
      'shop.view.list': {}
      'settings.password': {}
      'settings.section.account': {}
      'settings.account.name': {}
      'settings.account.role': {}
      'role.student': {}
      'role.teacher': {}
      'role.admin': {}
      'settings.section.appearance': {}
      'settings.section.session': {}
      'settings.password.description': {}
      'settings.animations.disable': {}
      'settings.animations.system': {}
      'student.password.unavailable': {}
      'student.password.regenerate': {}
      'student.password.regenerate.confirm.title': {}
      'student.password.regenerate.confirm.description': {
        student: DefaultMessageValue
      }
      'student.password.regenerate.confirm.action': {}
      'student.password.regenerate.error': {}
      'settings.credentials.error': {}
      'settings.logout': {}
      'settings.logout.confirm.title': {}
      'settings.logout.confirm.description': {}
      'action.cancel': {}
      'action.close': {}
      'group.practice.award': {}
      'group.practice.confirm.title': {}
      'group.practice.confirm.description': { count: { __fn: 'number' } }
      'group.practice.confirm.action': {}
      'group.practice.success': { count: { __fn: 'number' } }
      'group.practice.error': {}
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
      'step.group.description': {}
      'step.direction.progress': {
        current: { __fn: 'number' }
        total: { __fn: 'number' }
      }
      'step.selection.empty': {}
      'course.category': { category: { __fn: 'string' } }
      'step.avatar.title': {}
      'step.avatar.description': {}
      'step.avatar.suggest': {}
      'step.view.title': {}
      'step.view.description': {}
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
      'group.current': {}
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
      'award.cancel.confirm.action': {}
      'award.cancel.confirm.trigger': { amount: { __fn: 'number' } }
      'award.cancel.locked': {}
      'award.deduct.confirm.title': {}
      'award.deduct.confirm.description': {
        student: DefaultMessageValue
        reason: DefaultMessageValue
      }
      'award.deduct.confirm.action': {}
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
      'profile.balance.open-shop': {}
      'profile.greeting.pair.1.greeting': {}
      'profile.greeting.pair.1.caption': {}
      'profile.greeting.pair.2.greeting': {}
      'profile.greeting.pair.2.caption': {}
      'profile.greeting.pair.3.greeting': {}
      'profile.greeting.pair.3.caption': {}
      'profile.greeting.pair.4.greeting': {}
      'profile.greeting.pair.4.caption': {}
      'profile.greeting.pair.5.greeting': {}
      'profile.greeting.pair.5.caption': {}
      'profile.goal.kicker': {}
      'profile.goal.loading': {}
      'profile.goal.progress': {
        saved: { __fn: 'number' }
        price: { __fn: 'number' }
      }
      'profile.goal.change': {}
      'profile.goal.claim': {}
      'profile.goal.choose': {}
      'profile.earn.title': {}
      'profile.earn.theory': {}
      'profile.earn.practice': {}
      'profile.earn.additional': {}
      'profile.earn.activity': {}
      'profile.earn.homework': {}
      'profile.earn.teamwork': {}
      'profile.earn.answer': {}
      'profile.earn.initiative': {}
      'profile.goal.none': {}
      'profile.goal.shop': {}
      'profile.goal.completed': {}
      'profile.goal.target': { count: { __fn: 'number' } }
      'profile.goal.remaining': { count: { __fn: 'number' } }
      'profile.history.title': {}
      'history.title': {}
      'history.back': {}
      'history.error': {}
      'history.load-more': {}
      'history.end': {}
      'history.cancelled': {}
      'history.no-reason': {}
      'history.date': { date: { __fn: 'datetime' } }
      'profile.history.all': {}
      'profile.history.loading': {}
      'profile.history.empty': {}
      'profile.history.empty.mascot': {}
      'profile.history.today': {}
      'profile.history.yesterday': {}
      'profile.history.day': { date: { __fn: 'date' } }
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
      'student.profile.title': {}
      'student.profile.edit': {}
      'profile.groups': {}
      'profile.courses': {}
      'profile.groups.empty': {}
      'student.edit.title': {}
      'student.edit.section.profile': {}
      'student.edit.section.groups': {}
      'student.edit.nickname.label': {}
      'student.edit.nickname.placeholder': {}
      'student.edit.nickname.save': {}
      'student.edit.nickname.error': {}
      'student.edit.avatar.label': {}
      'student.edit.avatar.change': {}
      'student.edit.avatar.save': {}
      'student.edit.avatar.error': {}
      'student.edit.groups.source-label': {}
      'student.edit.groups.target-label': {}
      'student.edit.groups.source-empty': {}
      'student.edit.groups.target-empty': {}
      'student.edit.groups.placeholder': {}
      'field.group-search.placeholder': {}
      'student.edit.groups.remove.label': {}
      'student.edit.groups.remove.description': { group: DefaultMessageValue }
      'student.edit.groups.add-action': {}
      'student.edit.groups.transfer-action': {}
      'student.edit.groups.kick-action': {}
      'student.edit.groups.kick.confirm.title': {}
      'student.edit.groups.kick.confirm.description': {
        student: DefaultMessageValue
        group: DefaultMessageValue
      }
      'student.edit.groups.kick.confirm.action': {}
      'student.edit.groups.confirm.title': {}
      'student.edit.groups.confirm.add-description': {
        student: DefaultMessageValue
        group: DefaultMessageValue
      }
      'student.edit.groups.confirm.transfer-description': {
        student: DefaultMessageValue
        source: DefaultMessageValue
        target: DefaultMessageValue
      }
      'student.edit.groups.confirm.keep-source': { group: DefaultMessageValue }
      'student.edit.groups.confirm.remove-source': {
        group: DefaultMessageValue
      }
      'student.edit.groups.confirm.submit': {}
      'student.edit.groups.error': {}
      'student.edit.groups.partial-error': {}
      'student.edit.groups.partial-retry': {}
      'student.edit.groups.success': {}
      'student.edit.groups.membership-changed': {}
    }
  }
}
