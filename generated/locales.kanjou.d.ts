/// <reference types="@kanjou/plugin/client" />

import type { DefaultMessageValue } from '@kanjou/react'

declare module '@kanjou/react' {
  export interface Register {
    locale: 'uk'
    messages: {
      'access.code.copied': {}
      'access.code.label': {}
      'access.code.reset': {}
      'access.code.reset-confirm-title': {}
      'access.sessions.confirm-title': {}
      'access.sessions.end': {}
      'access.sessions.result-title': {}
      'action.award': {}
      'action.cancel': {}
      'action.clear-search.title': {}
      'action.close': {}
      'action.confirm': {}
      'action.continue-locally': {}
      'action.create-another': {}
      'action.deduct': {}
      'action.delete': {}
      'action.delete.confirm-title': {}
      'action.enter.title': {}
      'action.finish.title': {}
      'action.login.description': {}
      'action.login.title': {}
      'action.next.title': {}
      'action.register': {}
      'action.rename': {}
      'action.save-avatar': {}
      'action.save-nickname': {}
      'action.show': {}
      'admin.operations.direction.punish': {}
      'admin.operations.direction.reward': {}
      'balance.acknowledge': {}
      'balance.cancel.action': {}
      'balance.change': {}
      'balance.deduct.confirm-title': {}
      'balance.direction': {}
      'categories.label': {}
      'categories.title': {}
      'coins.amount': { count: { __fn: 'coins' } }
      'coins.unit': { count: { __fn: 'coins' } }
      'course.category': { category: { __fn: 'string' } }
      'courses.error.load': {}
      'courses.label': {}
      'courses.name': {}
      'courses.title': {}
      'error.code': {}
      'error.description': {}
      'error.retry': {}
      'error.title': {}
      'field.action.label': {}
      'field.avatar.label': {}
      'field.current-name': {}
      'field.description.label': {}
      'field.full-name.placeholder': {}
      'field.group-search.placeholder': {}
      'field.name.placeholder': {}
      'field.nickname.label': {}
      'field.password.caption': {}
      'field.password.hide': {}
      'field.password.show': {}
      'field.proposed-name': {}
      'field.student-nickname.placeholder': {}
      'field.student-search.placeholder': {}
      'filters.all-catalog-categories': {}
      'filters.all-categories': {}
      'filters.all-courses': {}
      'filters.all-groups': {}
      'filters.all-teachers': {}
      'filters.all-types': {}
      'filters.category': {}
      'filters.clear': {}
      'filters.course': {}
      'filters.teacher': {}
      'filters.toggle': {}
      'group.error': {}
      'group.students-count': { count: { __fn: 'number' } }
      'groups.add.action': {}
      'groups.count': { count: { __fn: 'number' } }
      'groups.empty': {}
      'groups.empty-filtered': {}
      'groups.error.load': {}
      'groups.label': {}
      'groups.name': {}
      'groups.remove.action': {}
      'groups.search.label': {}
      'groups.select.placeholder': {}
      'groups.title': {}
      'groups.transfer.action': {}
      'groups.transfer.empty': {}
      'history.back': {}
      'history.cancelled': {}
      'history.date': { date: { __fn: 'datetime' } }
      'history.end': {}
      'history.error': {}
      'history.load-more': {}
      'history.loading': {}
      'history.no-reason': {}
      'history.title': {}
      'navbar.catalog': {}
      'navbar.home': {}
      'navbar.label': {}
      'navbar.learning': {}
      'navbar.settings': {}
      'navbar.shop': {}
      'navigation.catalog': {}
      'navigation.groups': {}
      'navigation.home': {}
      'navigation.login': {}
      'navigation.profile': {}
      'not-found.code': {}
      'not-found.description': {}
      'not-found.title': {}
      'people.title': {}
      'profile.groups.empty': {}
      'profile.history.empty': {}
      'profile.open': {}
      'profile.open-label': { name: DefaultMessageValue }
      'ranking.place': { rank: { __fn: 'number' } }
      'reason.activity': {}
      'reason.additional_task_completed': {}
      'reason.answer': {}
      'reason.balance-change': {}
      'reason.discipline': {}
      'reason.discipline_breakdown': {}
      'reason.homework': {}
      'reason.incomplete': {}
      'reason.initiative': {}
      'reason.late': {}
      'reason.middle_level_violation': {}
      'reason.mistake': {}
      'reason.other': {}
      'reason.practice_completed': {}
      'reason.serious_violation': {}
      'reason.teamwork': {}
      'reason.theory': {}
      'reasons.error.load': {}
      'role.student': {}
      'role.teacher': {}
      'settings.password': {}
      'settings.section.account': {}
      'step.avatar.title': {}
      'step.success.profile': {}
      'student.profile.edit': {}
      'teachers.empty': {}
      'teachers.name': {}
      'teachers.title': {}
      'validation.name-unchanged': {}
      'weekday.friday': {}
      'weekday.monday': {}
      'weekday.saturday': {}
      'weekday.sunday': {}
      'weekday.thursday': {}
      'weekday.tuesday': {}
      'weekday.wednesday': {}
      'caption.has-account': {}
      'caption.has-no-account': {}
      'caption.mistake': {}
      'error.incorrect-password': {}
      'error.profile-entry-failed': {}
      'error.registration-failed': {}
      'step.avatar.description': {}
      'step.avatar.suggest': {}
      'step.category.description': {}
      'step.category.title': {}
      'step.course.description': {}
      'step.course.title': {}
      'step.direction.progress': {
        current: { __fn: 'number' }
        total: { __fn: 'number' }
      }
      'step.group.description': {}
      'step.group.title': {}
      'step.name.description': {}
      'step.name.title': {}
      'step.selection.empty': {}
      'step.success.description': {}
      'step.success.subtitle': {}
      'step.success.title': {}
      'step.view.description': {}
      'step.view.title': {}
      'settings.animations.disable': {}
      'settings.animations.system': {}
      'settings.credentials.error': {}
      'settings.logout': {}
      'settings.logout.confirm.description': {}
      'settings.logout.confirm.title': {}
      'settings.logout.error': {}
      'settings.section.appearance': {}
      'settings.section.session': {}
      'daily-mission.title': {}
      'daily-mission.completed': {}
      'daily-mission.tomorrow': {}
      'daily-mission.loading': {}
      'daily-mission.error': {}
      'daily-mission.week.stars': { completed: DefaultMessageValue }
      'daily-mission.week.loading': {}
      'daily-mission.week.error': {}
      'daily-mission.task.error': {}
      'daily-mission.completed.mascot': {}
      'daily-mission.task.image-alt': {}
      'daily-mission.task.unsupported': {}
      'daily-mission.answer.label': {}
      'daily-mission.answer.incorrect': {}
      'daily-mission.answer.error': {}
      'daily-mission.answer.retry': {}
      'daily-mission.answer.submit': {}
      'daily-mission.answer.submitting': {}
      'daily-mission.reward.amount': { count: { __fn: 'coins' } }
      'daily-mission.streak': { count: { __fn: 'number' } }
      'daily-mission.today': {}
      'daily-mission.start': {}
      'daily-mission.start.label': {}
      'daily-mission.constellation.label': { name: DefaultMessageValue }
      'daily-mission.constellation.robot': {}
      'daily-mission.constellation.gamepad': {}
      'daily-mission.constellation.rocket': {}
      'daily-mission.constellation.code': {}
      'daily-mission.constellation.circuit': {}
      'daily-mission.constellation.idea': {}
      'daily-mission.constellation.orbit': {}
      'daily-mission.constellation.plane': {}
      'daily-mission.day.completed': {}
      'daily-mission.day.pending': {}
      'daily-mission.day.unlit': {}
      'daily-mission.day.today': {}
      'leaderboard.all': {}
      'leaderboard.description': {}
      'leaderboard.empty': {}
      'leaderboard.error': {}
      'leaderboard.gap': { count: { __fn: 'coins' } }
      'leaderboard.loading': {}
      'leaderboard.own.near': {}
      'leaderboard.own.place': {}
      'leaderboard.own.points': { count: { __fn: 'coins' } }
      'leaderboard.place': {}
      'leaderboard.podium': {}
      'leaderboard.points.label': { count: { __fn: 'coins' } }
      'leaderboard.rank.error': {}
      'leaderboard.title': {}
      'leaderboard.unranked': {}
      'leaderboard.you': {}
      'profile.balance.open-shop': {}
      'profile.cyberween.open': {}
      'profile.cyberween.period': {}
      'profile.cyberween.tagline': {}
      'profile.earn.activity': {}
      'profile.earn.additional': {}
      'profile.earn.answer': {}
      'profile.earn.homework': {}
      'profile.earn.initiative': {}
      'profile.earn.practice': {}
      'profile.earn.teamwork': {}
      'profile.earn.theory': {}
      'profile.earn.title': {}
      'profile.goal.change': {}
      'profile.goal.choose': {}
      'profile.goal.claim': {}
      'profile.goal.completed': {}
      'profile.goal.kicker': {}
      'profile.goal.loading': {}
      'profile.goal.none': {}
      'profile.goal.progress': {
        saved: { __fn: 'coins' }
        price: { __fn: 'coins' }
      }
      'profile.goal.remaining': { count: { __fn: 'coins' } }
      'profile.goal.shop': {}
      'profile.greeting.pair.1.caption': {}
      'profile.greeting.pair.1.greeting': {}
      'profile.greeting.pair.2.caption': {}
      'profile.greeting.pair.2.greeting': {}
      'profile.greeting.pair.3.caption': {}
      'profile.greeting.pair.3.greeting': {}
      'profile.greeting.pair.4.caption': {}
      'profile.greeting.pair.4.greeting': {}
      'profile.greeting.pair.5.caption': {}
      'profile.greeting.pair.5.greeting': {}
      'profile.history.all': {}
      'profile.history.day': { date: { __fn: 'date' } }
      'profile.history.empty.mascot': {}
      'profile.history.title': {}
      'profile.history.today': {}
      'profile.history.yesterday': {}
      'profile.rules': {}
      'profile.rules.close': {}
      'profile.rules.description': {}
      'profile.rules.error': {}
      'profile.rules.loading': {}
      'profile.rules.punish': {}
      'profile.rules.reward': {}
      'profile.rules.title': {}
      'shop.balance': { count: { __fn: 'coins' } }
      'shop.reward.back': {}
      'shop.reward.claim': {}
      'shop.reward.cost': {}
      'shop.reward.insufficient': {}
      'shop.reward.type.privilege': {}
      'shop.reward.type.reward': {}
      'shop.view.galaxy': {}
      'shop.view.label': {}
      'shop.view.list': {}
      'student.profile.title': {}
      'award.cancel.confirm.trigger': { amount: { __fn: 'coins' } }
      'award.cancel.error': {}
      'award.cancel.locked': {}
      'award.deduct.confirm.action': {}
      'award.deduct.confirm.description': {
        student: DefaultMessageValue
        reason: DefaultMessageValue
      }
      'award.error': {}
      'award.history.all': {}
      'award.history.empty': {}
      'award.history.title': {}
      'award.punish': {}
      'award.reason.label': {}
      'award.reward': {}
      'group.back': {}
      'group.current': {}
      'group.filter.all': { count: { __fn: 'number' } }
      'group.practice.award': {}
      'group.practice.confirm.description': { count: { __fn: 'number' } }
      'group.practice.confirm.title': {}
      'group.practice.error': {}
      'group.practice.success': { count: { __fn: 'number' } }
      'group.select.title': {}
      'sort.balance-asc': {}
      'sort.balance-desc': {}
      'sort.name-asc': {}
      'sort.name-desc': {}
      'sort.students': {}
      'sort.title': {}
      'student.edit.avatar.change': {}
      'student.edit.avatar.error': {}
      'student.edit.groups.add-action': {}
      'student.edit.groups.add-confirm-title': {}
      'student.edit.groups.add-picker-title': {}
      'student.edit.groups.confirm.add-description': {
        student: DefaultMessageValue
        group: DefaultMessageValue
      }
      'student.edit.groups.confirm.transfer-description': {
        student: DefaultMessageValue
        source: DefaultMessageValue
        target: DefaultMessageValue
      }
      'student.edit.groups.error': {}
      'student.edit.groups.partial-error': {}
      'student.edit.groups.remove-action': {}
      'student.edit.groups.remove-confirm-action': {}
      'student.edit.groups.remove-confirm-description': {
        student: DefaultMessageValue
        group: DefaultMessageValue
      }
      'student.edit.groups.remove-confirm-title': {}
      'student.edit.groups.remove.description': { group: DefaultMessageValue }
      'student.edit.groups.source-empty': {}
      'student.edit.groups.success': {}
      'student.edit.groups.target-empty': {}
      'student.edit.groups.transfer-action': {}
      'student.edit.groups.transfer-confirm-title': {}
      'student.edit.groups.transfer-picker-title': {}
      'student.edit.nickname.error': {}
      'student.empty': {}
      'student.group-empty': {}
      'student.password.regenerate': {}
      'student.password.regenerate.confirm.action': {}
      'student.password.regenerate.confirm.description': {
        student: DefaultMessageValue
      }
      'student.password.regenerate.confirm.title': {}
      'student.password.regenerate.error': {}
      'student.password.unavailable': {}
      'admin.groups.back-to-group': {}
      'admin.groups.change-course.action': {}
      'admin.groups.change-course.courses-empty-description': {}
      'admin.groups.change-course.courses-empty-title': {}
      'admin.groups.change-course.current': {}
      'admin.groups.change-course.description': { group: DefaultMessageValue }
      'admin.groups.change-course.description-empty': {}
      'admin.groups.change-course.note': {}
      'admin.groups.change-course.proposed': {}
      'admin.groups.change-course.result-description': {}
      'admin.groups.change-course.same': {}
      'admin.groups.change-course.title': {}
      'admin.groups.create-first': {}
      'admin.groups.create.course-error': {}
      'admin.groups.create.course-placeholder': {}
      'admin.groups.create.courses-empty-description': {}
      'admin.groups.create.courses-empty-title': {}
      'admin.groups.create.error': {}
      'admin.groups.create.error.validation': {}
      'admin.groups.create.name-error': {}
      'admin.groups.create.name-placeholder': {}
      'admin.groups.create.open': {}
      'admin.groups.create.submit': {}
      'admin.groups.create.success-description': {
        group: DefaultMessageValue
        course: DefaultMessageValue
      }
      'admin.groups.create.success-title': {}
      'admin.groups.create.title': {}
      'admin.groups.delete.action': {}
      'admin.groups.delete.confirm-error': {}
      'admin.groups.delete.confirm-label': {}
      'admin.groups.delete.description': { group: DefaultMessageValue }
      'admin.groups.delete.description-empty': {}
      'admin.groups.delete.dialog-description': { group: DefaultMessageValue }
      'admin.groups.delete.note': {}
      'admin.groups.delete.result-description': {}
      'admin.groups.delete.title': {}
      'admin.groups.delete.warning': {}
      'admin.groups.detail.change-course-description': {}
      'admin.groups.detail.course-fallback': { id: { __fn: 'number' } }
      'admin.groups.detail.delete-description': {}
      'admin.groups.detail.description-empty': {}
      'admin.groups.detail.error': {}
      'admin.groups.detail.manage': {}
      'admin.groups.detail.practice-description': {}
      'admin.groups.detail.rename': {}
      'admin.groups.detail.rename-description': {}
      'admin.groups.detail.students': {}
      'admin.groups.detail.students-empty': {}
      'admin.groups.detail.students-manage': {}
      'admin.groups.detail.students-unavailable': {}
      'admin.groups.detail.teachers-empty': {}
      'admin.groups.error.forbidden': {}
      'admin.groups.membership.add.description': {}
      'admin.groups.membership.add.empty': {}
      'admin.groups.membership.add.empty-filtered': {}
      'admin.groups.membership.add.list-unavailable': {}
      'admin.groups.membership.add.search-label': {}
      'admin.groups.membership.add.search-placeholder': {}
      'admin.groups.membership.add.submit': { count: { __fn: 'number' } }
      'admin.groups.membership.add.title': {}
      'admin.groups.membership.available': {}
      'admin.groups.membership.description': { group: DefaultMessageValue }
      'admin.groups.membership.description-empty': {}
      'admin.groups.membership.remove.dialog-description': {
        group: DefaultMessageValue
      }
      'admin.groups.membership.remove.dialog-title': {}
      'admin.groups.membership.remove.submit': { count: { __fn: 'number' } }
      'admin.groups.membership.students.description': {}
      'admin.groups.membership.students.title': {}
      'admin.groups.membership.title': {}
      'admin.groups.membership.transfer.description': {}
      'admin.groups.membership.transfer.dialog-description': {
        target: DefaultMessageValue
        source: DefaultMessageValue
      }
      'admin.groups.membership.transfer.dialog-note': {}
      'admin.groups.membership.transfer.dialog-title': {}
      'admin.groups.membership.transfer.groups-error': {}
      'admin.groups.membership.transfer.submit': { count: { __fn: 'number' } }
      'admin.groups.membership.transfer.target-label': {}
      'admin.groups.membership.transfer.title': {}
      'admin.groups.no-teacher': {}
      'admin.groups.not-found.description': {}
      'admin.groups.not-found.title': {}
      'admin.groups.open': { name: DefaultMessageValue }
      'admin.groups.rename.description': { group: DefaultMessageValue }
      'admin.groups.rename.description-empty': {}
      'admin.groups.rename.note': {}
      'admin.groups.rename.result-description': {}
      'admin.groups.rename.title': {}
      'admin.groups.search.placeholder': {}
      'admin.groups.teacher-unknown': { id: { __fn: 'number' } }
      'admin.groups.teachers.description': { group: DefaultMessageValue }
      'admin.groups.teachers.description-empty': {}
      'admin.groups.teachers.entry': {}
      'admin.groups.teachers.error': {}
      'admin.groups.teachers.error.rejected': {}
      'admin.groups.teachers.error.validation': {}
      'admin.groups.teachers.no-teachers': {}
      'admin.groups.teachers.note': {}
      'admin.groups.teachers.picker.error': {}
      'admin.groups.teachers.picker.limit': {}
      'admin.groups.teachers.picker.search-empty': {}
      'admin.groups.teachers.picker.search-label': {}
      'admin.groups.teachers.picker.selected': { count: { __fn: 'number' } }
      'admin.groups.teachers.picker.validation': {}
      'admin.groups.teachers.read': {}
      'admin.groups.teachers.result-new': {}
      'admin.groups.teachers.submit': {}
      'admin.groups.teachers.success-description': {
        group: DefaultMessageValue
      }
      'admin.groups.teachers.success-title': {}
      'admin.groups.teachers.title': {}
      'admin.courses.back': {}
      'admin.courses.back-to-course': {}
      'admin.courses.categories.back': {}
      'admin.courses.categories.change': { course: DefaultMessageValue }
      'admin.courses.categories.create.description': {}
      'admin.courses.categories.create.result-description': {}
      'admin.courses.categories.create.submit': {}
      'admin.courses.categories.create.title': {}
      'admin.courses.categories.empty': {}
      'admin.courses.categories.name-error': {}
      'admin.courses.categories.name-label': {}
      'admin.courses.categories.name-placeholder': {}
      'admin.courses.categories.rename-label': { category: DefaultMessageValue }
      'admin.courses.categories.rename.description': {
        category: DefaultMessageValue
      }
      'admin.courses.categories.rename.result-description': {}
      'admin.courses.categories.rename.title': {}
      'admin.courses.category.action': {}
      'admin.courses.category.current': {}
      'admin.courses.category.description-empty': {}
      'admin.courses.category.proposed': {}
      'admin.courses.category.result-description': {}
      'admin.courses.category.same': {}
      'admin.courses.category.title': {}
      'admin.courses.create.action': {}
      'admin.courses.create.error': {}
      'admin.courses.create.error.validation': {}
      'admin.courses.create.success-description': {
        course: DefaultMessageValue
      }
      'admin.courses.create.success-title': {}
      'admin.courses.create.title': {}
      'admin.courses.delete.action': {}
      'admin.courses.delete.confirm-error': {}
      'admin.courses.delete.confirm-label': {}
      'admin.courses.delete.description': { course: DefaultMessageValue }
      'admin.courses.delete.description-empty': {}
      'admin.courses.delete.dialog-description': { course: DefaultMessageValue }
      'admin.courses.delete.result-description': {}
      'admin.courses.delete.title': {}
      'admin.courses.detail.change-category-description': {}
      'admin.courses.detail.delete-description': {}
      'admin.courses.detail.groups-empty': {}
      'admin.courses.detail.manage': {}
      'admin.courses.detail.rename': {}
      'admin.courses.detail.rename-description': {}
      'admin.courses.error.groups': {}
      'admin.courses.filter.all': { count: { __fn: 'number' } }
      'admin.courses.form.name-error': {}
      'admin.courses.form.name-placeholder': {}
      'admin.courses.list.empty': {}
      'admin.courses.list.empty-all': {}
      'admin.courses.list.empty-all-description': {}
      'admin.courses.list.empty-description': {}
      'admin.courses.not-found.description': {}
      'admin.courses.not-found.title': {}
      'admin.courses.open': {}
      'admin.courses.rename.description': { course: DefaultMessageValue }
      'admin.courses.rename.description-empty': {}
      'admin.courses.rename.result-description': {}
      'admin.courses.rename.title': {}
      'admin.courses.search.label': {}
      'admin.courses.search.placeholder': {}
      'admin.students.groups.add.description': {}
      'admin.students.groups.add.empty': {}
      'admin.students.groups.description': { name: DefaultMessageValue }
      'admin.students.groups.description-empty': {}
      'admin.students.groups.error': {}
      'admin.students.groups.memberships.description': {}
      'admin.students.groups.memberships.remove': {}
      'admin.students.groups.memberships.remove-label': {
        group: DefaultMessageValue
      }
      'admin.students.groups.memberships.title': {}
      'admin.students.groups.remove.dialog-description': {
        student: DefaultMessageValue
        group: DefaultMessageValue
      }
      'admin.students.groups.remove.dialog-title': {}
      'admin.students.groups.title': {}
      'admin.students.groups.transfer.description': {}
      'admin.students.groups.transfer.dialog-description': {
        student: DefaultMessageValue
        target: DefaultMessageValue
        source: DefaultMessageValue
      }
      'admin.students.groups.transfer.dialog-note': {}
      'admin.students.groups.transfer.dialog-title': {}
      'admin.students.groups.transfer.source-label': {}
      'admin.students.groups.transfer.target-label': {}
      'admin.students.groups.transfer.title': {}
      'admin.teachers.access.actions': {}
      'admin.teachers.access.again': {}
      'admin.teachers.access.block': {}
      'admin.teachers.access.block-confirm-action': {}
      'admin.teachers.access.block-confirm-description': {
        name: DefaultMessageValue
      }
      'admin.teachers.access.block-confirm-title': {}
      'admin.teachers.access.block-description': {}
      'admin.teachers.access.block-result-action': {}
      'admin.teachers.access.block-result-description': {}
      'admin.teachers.access.block-result-title': {}
      'admin.teachers.access.description': { name: DefaultMessageValue }
      'admin.teachers.access.description-empty': {}
      'admin.teachers.access.note': {}
      'admin.teachers.access.reset-code': {}
      'admin.teachers.access.reset-code-confirm-action': {}
      'admin.teachers.access.reset-code-confirm-description': {
        name: DefaultMessageValue
      }
      'admin.teachers.access.reset-code-description': {}
      'admin.teachers.access.reset-code-result-action': {}
      'admin.teachers.access.reset-code-result-description': {}
      'admin.teachers.access.reset-code-result-title': {}
      'admin.teachers.access.revoke-sessions-confirm-action': {}
      'admin.teachers.access.revoke-sessions-confirm-description': {
        name: DefaultMessageValue
      }
      'admin.teachers.access.revoke-sessions-description': {}
      'admin.teachers.access.revoke-sessions-result-action': {}
      'admin.teachers.access.revoke-sessions-result-description': {}
      'admin.teachers.access.title': {}
      'admin.teachers.access.unblock': {}
      'admin.teachers.access.unblock-confirm-action': {}
      'admin.teachers.access.unblock-confirm-description': {
        name: DefaultMessageValue
      }
      'admin.teachers.access.unblock-confirm-title': {}
      'admin.teachers.access.unblock-description': {}
      'admin.teachers.access.unblock-result-action': {}
      'admin.teachers.access.unblock-result-description': {}
      'admin.teachers.access.unblock-result-title': {}
      'admin.teachers.delete.action': {}
      'admin.teachers.delete.confirm-error': {}
      'admin.teachers.delete.confirm-label': {}
      'admin.teachers.delete.description': { name: DefaultMessageValue }
      'admin.teachers.delete.description-empty': {}
      'admin.teachers.delete.dialog-description': { name: DefaultMessageValue }
      'admin.teachers.delete.groups': {}
      'admin.teachers.delete.groups-empty': {}
      'admin.teachers.delete.note': {}
      'admin.teachers.delete.reassign-note': {}
      'admin.teachers.delete.result-description': {}
      'admin.teachers.delete.title': {}
      'admin.teachers.error': {}
      'admin.teachers.error.forbidden': {}
      'admin.teachers.profile.access': {}
      'admin.teachers.profile.access-description': {}
      'admin.teachers.profile.back': {}
      'admin.teachers.profile.delete-description': {}
      'admin.teachers.profile.error': {}
      'admin.teachers.profile.groups.empty': {}
      'admin.teachers.profile.manage': {}
      'admin.teachers.profile.mismatch': {}
      'admin.teachers.profile.not-found': {}
      'admin.teachers.profile.not-teacher': {}
      'admin.teachers.profile.rename': {}
      'admin.teachers.profile.rename-description': {}
      'admin.teachers.register.error': {}
      'admin.teachers.register.name.error': {}
      'admin.teachers.register.title': {}
      'admin.teachers.rename.current': {}
      'admin.teachers.rename.description': { name: DefaultMessageValue }
      'admin.teachers.rename.description-empty': {}
      'admin.teachers.rename.name-error': {}
      'admin.teachers.rename.note': {}
      'admin.teachers.rename.proposed': {}
      'admin.teachers.rename.result-description': {}
      'admin.teachers.rename.same': {}
      'admin.teachers.rename.submit': {}
      'admin.teachers.rename.title': {}
      'admin.teachers.result.another': {}
      'admin.teachers.result.copy': {}
      'admin.teachers.result.copy-error': {}
      'admin.teachers.result.description': {}
      'admin.teachers.result.list': {}
      'admin.teachers.result.title': {}
      'admin.teachers.search.empty': {}
      'admin.teachers.search.placeholder': {}
      'students.access.code.error': {}
      'students.access.code.forbidden': {}
      'students.access.code.note': {}
      'students.access.code.reset-confirm-description': {
        name: DefaultMessageValue
      }
      'students.access.code.reset-error': {}
      'students.access.code.reset-forbidden': {}
      'students.access.description': { name: DefaultMessageValue }
      'students.access.description-empty': {}
      'students.access.sessions.again': {}
      'students.access.sessions.confirm-description': {
        name: DefaultMessageValue
      }
      'students.access.sessions.note': {}
      'students.access.sessions.result-description': {}
      'students.access.sessions.title': {}
      'students.access.title': {}
      'students.delete.again': {}
      'students.delete.confirmation-error': {}
      'students.delete.confirmation-label': {}
      'students.delete.description': { name: DefaultMessageValue }
      'students.delete.description-empty': {}
      'students.delete.dialog-description': { name: DefaultMessageValue }
      'students.delete.dialog-title': {}
      'students.delete.note': {}
      'students.delete.result-action-value': {}
      'students.delete.result-description': {}
      'students.delete.result-title': {}
      'students.delete.submit': {}
      'students.delete.title': {}
      'students.edit.avatar.description': {}
      'students.edit.avatar.save-error': {}
      'students.edit.avatar.saved': {}
      'students.edit.description': {}
      'students.edit.nickname.description': {}
      'students.edit.nickname.error': {}
      'students.edit.nickname.same': {}
      'students.edit.nickname.save-error': {}
      'students.edit.nickname.saved': {}
      'students.edit.title': {}
      'students.empty': {}
      'students.empty-filtered': {}
      'students.error.load': {}
      'students.filters.category': {}
      'students.groups.empty': {}
      'students.no-groups': {}
      'students.not-found': {}
      'students.profile.back': {}
      'students.profile.delete-description': {}
      'students.profile.error': {}
      'students.profile.manage': {}
      'students.profile.memberships': {}
      'students.profile.memberships.manage': {}
      'students.profile.title': {}
      'students.register.action': {}
      'students.register.avatar.option': { number: { __fn: 'number' } }
      'students.register.error': {}
      'students.register.groups.description': {}
      'students.register.groups.empty': {}
      'students.register.groups.validation': {}
      'students.register.name.error': {}
      'students.register.name.label': {}
      'students.register.name.placeholder': {}
      'students.register.success.copy': {}
      'students.register.success.copy-error': {}
      'students.register.success.description': { name: DefaultMessageValue }
      'students.register.success.list': {}
      'students.register.success.title': {}
      'students.register.title': {}
      'students.search.placeholder': {}
      'students.title': {}
      'admin.operations.back-to-list': {}
      'admin.operations.bulk.submit': {}
      'admin.operations.bulk.title': {}
      'admin.operations.confirm.action': {}
      'admin.operations.confirm.description': {
        count: { __fn: 'number' }
        direction: { __fn: 'string' }
        reasons: { __fn: 'string' }
      }
      'admin.operations.confirm.retry-action': {}
      'admin.operations.confirm.retry-description': {
        count: { __fn: 'number' }
        direction: { __fn: 'string' }
        reasons: { __fn: 'string' }
      }
      'admin.operations.confirm.title': {}
      'admin.operations.links.label': {}
      'admin.operations.links.practice-description': {}
      'admin.operations.links.settings': {}
      'admin.operations.links.settings-description': {}
      'admin.operations.practice.clear-selection': {}
      'admin.operations.practice.confirm.description': {
        group: { __fn: 'string' }
        count: { __fn: 'number' }
      }
      'admin.operations.practice.confirm.title': {}
      'admin.operations.practice.description': {}
      'admin.operations.practice.error': {}
      'admin.operations.practice.group-error': {}
      'admin.operations.practice.group-missing': {}
      'admin.operations.practice.note': {}
      'admin.operations.practice.result.affected': { count: { __fn: 'number' } }
      'admin.operations.practice.result.empty': {}
      'admin.operations.practice.result.new': {}
      'admin.operations.practice.result.partial': {
        affected: { __fn: 'number' }
        total: { __fn: 'number' }
      }
      'admin.operations.practice.result.returned': { count: { __fn: 'number' } }
      'admin.operations.practice.result.title': {}
      'admin.operations.practice.search-placeholder': {}
      'admin.operations.practice.select-description': {}
      'admin.operations.practice.submit': {}
      'admin.operations.practice.unknown-description': {}
      'admin.operations.practice.unknown-verify-error': {}
      'admin.operations.result.batch': {
        direction: DefaultMessageValue
        reasons: DefaultMessageValue
      }
      'admin.operations.result.check-again': {}
      'admin.operations.result.checking': {}
      'admin.operations.result.error': {}
      'admin.operations.result.error.conflict': {}
      'admin.operations.result.error.forbidden': {}
      'admin.operations.result.error.validation': {}
      'admin.operations.result.failure': {}
      'admin.operations.result.failure-count': { count: { __fn: 'number' } }
      'admin.operations.result.history-acknowledged': {}
      'admin.operations.result.history-checked': {}
      'admin.operations.result.new-balance': { count: { __fn: 'coins' } }
      'admin.operations.result.no-retry': {}
      'admin.operations.result.open-history': {}
      'admin.operations.result.pending': {}
      'admin.operations.result.processing': {}
      'admin.operations.result.refresh-error': {}
      'admin.operations.result.retry': { count: { __fn: 'number' } }
      'admin.operations.result.retryable': {}
      'admin.operations.result.running': { pending: { __fn: 'number' } }
      'admin.operations.result.success': {}
      'admin.operations.result.success-count': { count: { __fn: 'number' } }
      'admin.operations.result.title': {}
      'admin.operations.result.unknown': {}
      'admin.operations.result.unknown-blocked': {}
      'admin.operations.result.unknown-count': { count: { __fn: 'number' } }
      'admin.operations.result.unknown-description': {}
      'admin.operations.result.unknown-note': {}
      'admin.operations.settings.correction.amount': {}
      'admin.operations.settings.correction.amount-error': {}
      'admin.operations.settings.correction.amount-placeholder': {}
      'admin.operations.settings.correction.current-balance': {
        count: { __fn: 'coins' }
      }
      'admin.operations.settings.correction.description': {}
      'admin.operations.settings.correction.empty': {}
      'admin.operations.settings.correction.explanation': {}
      'admin.operations.settings.correction.explanation-error': {}
      'admin.operations.settings.correction.explanation-hint': {
        count: { __fn: 'number' }
      }
      'admin.operations.settings.correction.explanation-placeholder': {}
      'admin.operations.settings.correction.result.description': {}
      'admin.operations.settings.correction.result.title': {}
      'admin.operations.settings.correction.student-error': {}
      'admin.operations.settings.correction.student-placeholder': {}
      'admin.operations.settings.correction.submit': {}
      'admin.operations.settings.correction.title': {}
      'admin.operations.settings.description': {}
      'admin.operations.settings.reset': {}
      'admin.operations.settings.tariffs.configured': {
        count: { __fn: 'number' }
      }
      'admin.operations.settings.tariffs.description': {}
      'admin.operations.settings.tariffs.empty': {}
      'admin.operations.settings.tariffs.input-label': {
        reason: DefaultMessageValue
      }
      'admin.operations.settings.tariffs.note': {}
      'admin.operations.settings.tariffs.placeholder': {}
      'admin.operations.settings.tariffs.result.description': {
        count: { __fn: 'number' }
      }
      'admin.operations.settings.tariffs.result.title': {}
      'admin.operations.settings.tariffs.submit': {}
      'admin.operations.settings.tariffs.title': {}
      'admin.operations.settings.tariffs.validation': {}
      'admin.operations.settings.title': {}
      'admin.operations.student-fallback': { id: { __fn: 'number' } }
      'admin.operations.students.clear': {}
      'admin.operations.students.found': { count: { __fn: 'number' } }
      'admin.operations.students.search-label': {}
      'admin.operations.students.search-placeholder': {}
      'admin.operations.students.select-found': {}
      'admin.operations.students.selected': { count: { __fn: 'number' } }
      'admin.operations.title': {}
      'admin.catalog.add': {}
      'admin.catalog.availability.result-title': {}
      'admin.catalog.category.none': {}
      'admin.catalog.create.error': {}
      'admin.catalog.create.success.another': {}
      'admin.catalog.create.success.description': {}
      'admin.catalog.create.success.image': {}
      'admin.catalog.create.success.image.description': {}
      'admin.catalog.create.success.no-image': {}
      'admin.catalog.create.success.open': {}
      'admin.catalog.create.success.title': {}
      'admin.catalog.create.title': {}
      'admin.catalog.details.delete': {}
      'admin.catalog.details.delete.confirm.description': {
        name: DefaultMessageValue
      }
      'admin.catalog.details.delete.confirm.title': {}
      'admin.catalog.details.delete.result.description': {}
      'admin.catalog.details.delete.result.title': {}
      'admin.catalog.details.edit': {}
      'admin.catalog.details.hide': {}
      'admin.catalog.details.hide.confirm.action': {}
      'admin.catalog.details.hide.confirm.description': {
        name: DefaultMessageValue
      }
      'admin.catalog.details.hide.confirm.title': {}
      'admin.catalog.details.hide.result.description': {}
      'admin.catalog.details.manage': {}
      'admin.catalog.details.show': {}
      'admin.catalog.details.show.confirm.description': {
        name: DefaultMessageValue
      }
      'admin.catalog.details.show.confirm.title': {}
      'admin.catalog.details.show.result.description': {}
      'admin.catalog.details.title': {}
      'admin.catalog.edit.back': {}
      'admin.catalog.edit.description': {}
      'admin.catalog.edit.notice.description': {}
      'admin.catalog.edit.notice.title': {}
      'admin.catalog.edit.reset': {}
      'admin.catalog.edit.submit': {}
      'admin.catalog.edit.title': {}
      'admin.catalog.empty': {}
      'admin.catalog.empty.filtered': {}
      'admin.catalog.error.forbidden': {}
      'admin.catalog.error.load': {}
      'admin.catalog.error.not-found': {}
      'admin.catalog.error.request': {}
      'admin.catalog.error.validation': {}
      'admin.catalog.form.description.placeholder': {}
      'admin.catalog.form.name': {}
      'admin.catalog.form.name.placeholder': {}
      'admin.catalog.form.price': {}
      'admin.catalog.form.price.placeholder': {}
      'admin.catalog.form.submit': {}
      'admin.catalog.image.error.file-size': {}
      'admin.catalog.image.error.file-type': {}
      'admin.catalog.image.error.link': {}
      'admin.catalog.image.error.preview': {}
      'admin.catalog.image.file.hint': {}
      'admin.catalog.image.file.replace': {}
      'admin.catalog.image.link.placeholder': {}
      'admin.catalog.image.link.replace': {}
      'admin.catalog.image.mode.file': {}
      'admin.catalog.image.mode.link': {}
      'admin.catalog.image.selected': {}
      'admin.catalog.image.title': {}
      'admin.catalog.image.unsaved': {}
      'admin.catalog.search.placeholder': {}
      'admin.catalog.title': {}
      'admin.catalog.type.label': {}
      'admin.catalog.type.privilege': {}
      'admin.catalog.type.reward': {}
      'admin.catalog.validation.category': {}
      'admin.catalog.validation.name': {}
      'admin.catalog.validation.price': {}
      'admin.catalog.validation.type': {}
      'admin.balance.back': {}
      'admin.balance.cancel.already': {}
      'admin.balance.cancel.confirm.description': { amount: { __fn: 'coins' } }
      'admin.balance.cancel.confirm.title': {}
      'admin.balance.cancel.error': {}
      'admin.balance.cancel.success': {}
      'admin.balance.cancel.trigger': { amount: { __fn: 'coins' } }
      'admin.balance.history.description': {}
      'admin.balance.history.empty': {}
      'admin.balance.history.end': {}
      'admin.balance.history.error': {}
      'admin.balance.history.load-more': {}
      'admin.balance.history.title': {}
      'admin.balance.operation.confirm.description': {
        reasons: DefaultMessageValue
      }
      'admin.balance.operation.description': {}
      'admin.balance.operation.error': {}
      'admin.balance.operation.reasons': {}
      'admin.balance.operation.reasons-empty': {}
      'admin.balance.operation.success': {}
      'admin.balance.profile.description': {}
      'admin.balance.profile.link': {}
      'admin.balance.refresh.action': {}
      'admin.balance.refresh.error': {}
      'admin.balance.refresh.title': {}
      'admin.balance.summary.balance': {}
      'admin.balance.summary.description': {}
      'admin.balance.summary.error': {}
      'admin.balance.summary.rank': {}
      'admin.balance.summary.rank-none': {}
      'admin.balance.summary.reward': {}
      'admin.balance.summary.reward-none': {}
      'admin.balance.summary.reward-progress': {
        saved: { __fn: 'coins' }
        price: { __fn: 'coins' }
      }
      'admin.balance.summary.reward-ready': {}
      'admin.balance.summary.reward-remaining': { count: { __fn: 'coins' } }
      'admin.balance.summary.title': {}
      'admin.balance.title': {}
      'admin.balance.unknown.cancel': {}
      'admin.balance.unknown.change': {}
      'admin.balance.unknown.checked': {}
      'admin.balance.unknown.title': {}
      'admin.balance.unknown.verify': {}
      'admin.balance.unknown.verify-error': {}
      'admin.learning.create': {}
      'admin.membership.addition.added': {}
      'admin.membership.addition.failed': {}
      'admin.membership.addition.pending': {}
      'admin.membership.addition.skipped': {}
      'admin.membership.group-option': {
        course: DefaultMessageValue
        group: DefaultMessageValue
      }
      'admin.membership.removal.failed': {}
      'admin.membership.removal.pending': {}
      'admin.membership.removal.removed': {}
      'admin.membership.removal.waiting': {}
      'admin.membership.result.add.description': { target: DefaultMessageValue }
      'admin.membership.result.add.title': {}
      'admin.membership.result.failure': {}
      'admin.membership.result.forbidden': {}
      'admin.membership.result.partial': {}
      'admin.membership.result.remove.description': {
        source: DefaultMessageValue
      }
      'admin.membership.result.remove.title': {}
      'admin.membership.result.reset': {}
      'admin.membership.result.retry': {}
      'admin.membership.result.session': {}
      'admin.membership.result.transfer.description': {
        target: DefaultMessageValue
        source: DefaultMessageValue
      }
      'admin.membership.result.transfer.title': {}
      'admin.membership.result.unknown': {}
      'admin.membership.status.addition': {}
      'admin.membership.status.not-required': {}
      'admin.membership.status.removal': {}
      'admin.membership.status.unknown': {}
      'admin.shared.local-result': {}
      'admin.streak.actions.active-note': {}
      'admin.streak.actions.description': {}
      'admin.streak.actions.end': {}
      'admin.streak.actions.inactive-note': {}
      'admin.streak.actions.start': {}
      'admin.streak.actions.title': {}
      'admin.streak.back': {}
      'admin.streak.current.active': {}
      'admin.streak.current.ended': {}
      'admin.streak.current.none': {}
      'admin.streak.current.none-value': {}
      'admin.streak.current.title': {}
      'admin.streak.date': { date: { __fn: 'datetime' } }
      'admin.streak.days': { count: { __fn: 'number' } }
      'admin.streak.description': {}
      'admin.streak.end.confirm.description': {}
      'admin.streak.end.confirm.title': {}
      'admin.streak.error.action': {}
      'admin.streak.error.forbidden': {}
      'admin.streak.error.load': {}
      'admin.streak.error.not-found': {}
      'admin.streak.error.validation': {}
      'admin.streak.finished-label': {}
      'admin.streak.longest.hint': {}
      'admin.streak.longest.title': {}
      'admin.streak.result.ended': {}
      'admin.streak.result.started': {}
      'admin.streak.result.updated': {}
      'admin.streak.started-label': {}
      'admin.streak.title': {}
      'admin.streak.update.label': {}
      'admin.streak.update.submit': {}
      'admin.streak.update.unavailable': {}
      'admin.streak.validation.days': {}
      'error.forbidden': {}
      'error.session': {}
      'group.practice.title': {}
    }
  }
}
