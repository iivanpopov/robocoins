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
      'admin.groups.error.unauthorized': {}
      'admin.groups.error.forbidden': {}
      'admin.groups.error.login': {}
      'admin.groups.create': {}
      'admin.groups.create-first': {}
      'admin.groups.search.label': {}
      'admin.groups.search.placeholder': {}
      'admin.groups.filters.course': {}
      'admin.groups.filters.course-all': {}
      'admin.groups.filters.category': {}
      'admin.groups.filters.category-all': {}
      'admin.groups.filters.teacher': {}
      'admin.groups.filters.teacher-all': {}
      'admin.groups.filters.clear': {}
      'admin.groups.found': { count: { __fn: 'number' } }
      'admin.groups.empty-filtered': {}
      'admin.groups.no-teacher': {}
      'admin.groups.teacher-unknown': { id: { __fn: 'number' } }
      'admin.groups.open': { name: DefaultMessageValue }
      'admin.groups.back': {}
      'admin.groups.back-to-group': {}
      'admin.groups.teachers-count': { count: { __fn: 'number' } }
      'admin.groups.not-found.title': {}
      'admin.groups.not-found.description': {}
      'admin.groups.detail.title': {}
      'admin.groups.detail.description': {
        course: DefaultMessageValue
        category: DefaultMessageValue
      }
      'admin.groups.detail.description-empty': {}
      'admin.groups.detail.course-fallback': { id: { __fn: 'number' } }
      'admin.groups.detail.course': {}
      'admin.groups.detail.category': {}
      'admin.groups.detail.category-unknown': {}
      'admin.groups.detail.students-count': {}
      'admin.groups.detail.teachers-count': {}
      'admin.groups.detail.teachers': {}
      'admin.groups.detail.teachers-empty': {}
      'admin.groups.detail.teachers-note': {}
      'admin.groups.detail.students': {}
      'admin.groups.detail.students-empty': {}
      'admin.groups.detail.students-unavailable': {}
      'admin.groups.detail.students-note': {}
      'admin.groups.detail.manage': {}
      'admin.groups.detail.local-note': {}
      'admin.groups.detail.rename': {}
      'admin.groups.detail.rename-description': {}
      'admin.groups.detail.change-course': {}
      'admin.groups.detail.change-course-description': {}
      'admin.groups.detail.practice': {}
      'admin.groups.detail.practice-description': {}
      'admin.groups.detail.delete': {}
      'admin.groups.detail.delete-description': {}
      'admin.groups.detail.error': {}
      'admin.groups.teachers.title': {}
      'admin.groups.teachers.description': { group: DefaultMessageValue }
      'admin.groups.teachers.description-empty': {}
      'admin.groups.teachers.note': {}
      'admin.groups.teachers.submit': {}
      'admin.groups.teachers.entry': {}
      'admin.groups.teachers.entry-description': {}
      'admin.groups.teachers.success-title': {}
      'admin.groups.teachers.success-description': {
        group: DefaultMessageValue
      }
      'admin.groups.teachers.result-group': {}
      'admin.groups.teachers.result-new': {}
      'admin.groups.teachers.no-teachers': {}
      'admin.groups.teachers.read': {}
      'admin.groups.teachers.error': {}
      'admin.groups.teachers.error.validation': {}
      'admin.groups.teachers.error.rejected': {}
      'admin.groups.teachers.picker.label': {}
      'admin.groups.teachers.picker.search-label': {}
      'admin.groups.teachers.picker.search-placeholder': {}
      'admin.groups.teachers.picker.selected': { count: { __fn: 'number' } }
      'admin.groups.teachers.picker.limit': {}
      'admin.groups.teachers.picker.empty': {}
      'admin.groups.teachers.picker.search-empty': {}
      'admin.groups.teachers.picker.error': {}
      'admin.groups.teachers.picker.validation': {}
      'admin.groups.bulk.title': {}
      'admin.groups.bulk.description': {}
      'admin.groups.bulk.note': {}
      'admin.groups.bulk.entry': {}
      'admin.groups.bulk.submit': {}
      'admin.groups.bulk.submit-empty': {}
      'admin.groups.bulk.groups.label': {}
      'admin.groups.bulk.groups.search-label': {}
      'admin.groups.bulk.groups.search-placeholder': {}
      'admin.groups.bulk.groups.selected': { count: { __fn: 'number' } }
      'admin.groups.bulk.groups.hint': {}
      'admin.groups.bulk.groups.search-empty': {}
      'admin.groups.bulk.groups.no-teachers': {}
      'admin.groups.bulk.groups.empty-title': {}
      'admin.groups.bulk.groups.empty-description': {}
      'admin.groups.bulk.read-error': {}
      'admin.groups.bulk.results.title': {}
      'admin.groups.bulk.results.pending': {}
      'admin.groups.bulk.results.success': {}
      'admin.groups.bulk.results.error': {}
      'admin.groups.bulk.results.error-status': { status: { __fn: 'number' } }
      'admin.groups.bulk.results.unknown-description': {}
      'admin.groups.bulk.results.retry': {}
      'admin.groups.bulk.results.retry-note': {}
      'admin.groups.bulk.results.open': { group: DefaultMessageValue }
      'admin.groups.create.title': {}
      'admin.groups.create.description': {}
      'admin.groups.create.name-label': {}
      'admin.groups.create.name-placeholder': {}
      'admin.groups.create.name-error': {}
      'admin.groups.create.course-label': {}
      'admin.groups.create.course-placeholder': {}
      'admin.groups.create.course-error': {}
      'admin.groups.create.teacher-note': {}
      'admin.groups.create.courses-empty-title': {}
      'admin.groups.create.courses-empty-description': {}
      'admin.groups.create.submit': {}
      'admin.groups.create.error': {}
      'admin.groups.create.error.validation': {}
      'admin.groups.create.success-title': {}
      'admin.groups.create.success-description': {
        group: DefaultMessageValue
        course: DefaultMessageValue
      }
      'admin.groups.create.open': {}
      'admin.groups.create.another': {}
      'admin.groups.rename.title': {}
      'admin.groups.rename.description': { group: DefaultMessageValue }
      'admin.groups.rename.description-empty': {}
      'admin.groups.rename.note': {}
      'admin.groups.rename.same': {}
      'admin.groups.rename.submit': {}
      'admin.groups.rename.result-title': {}
      'admin.groups.rename.result-description': {}
      'admin.groups.rename.current': {}
      'admin.groups.rename.proposed': {}
      'admin.groups.change-course.title': {}
      'admin.groups.change-course.description': { group: DefaultMessageValue }
      'admin.groups.change-course.description-empty': {}
      'admin.groups.change-course.note': {}
      'admin.groups.change-course.same': {}
      'admin.groups.change-course.submit': {}
      'admin.groups.change-course.courses-empty-title': {}
      'admin.groups.change-course.courses-empty-description': {}
      'admin.groups.change-course.result-title': {}
      'admin.groups.change-course.result-description': {}
      'admin.groups.change-course.current': {}
      'admin.groups.change-course.proposed': {}
      'admin.groups.delete.title': {}
      'admin.groups.delete.description': { group: DefaultMessageValue }
      'admin.groups.delete.description-empty': {}
      'admin.groups.delete.note': {}
      'admin.groups.delete.warning': {}
      'admin.groups.delete.confirm-label': {}
      'admin.groups.delete.confirm-placeholder': {}
      'admin.groups.delete.confirm-error': {}
      'admin.groups.delete.submit': {}
      'admin.groups.delete.dialog-title': {}
      'admin.groups.delete.dialog-description': { group: DefaultMessageValue }
      'admin.groups.delete.dialog-action': {}
      'admin.groups.delete.result-title': {}
      'admin.groups.delete.result-description': {}
      'admin.groups.delete.result-group': {}
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
      'admin.balance.title': {}
      'admin.balance.back': {}
      'admin.balance.profile.link': {}
      'admin.balance.profile.description': {}
      'admin.balance.coins': { count: { __fn: 'number' } }
      'admin.balance.summary.title': {}
      'admin.balance.summary.description': {}
      'admin.balance.summary.balance': {}
      'admin.balance.summary.reward': {}
      'admin.balance.summary.reward-progress': {
        saved: { __fn: 'number' }
        price: { __fn: 'number' }
      }
      'admin.balance.summary.reward-remaining': {
        count: { __fn: 'number' }
        countText: DefaultMessageValue
      }
      'admin.balance.summary.reward-ready': {}
      'admin.balance.summary.reward-none': {}
      'admin.balance.summary.rank': {}
      'admin.balance.summary.rank-value': { rank: { __fn: 'number' } }
      'admin.balance.summary.rank-none': {}
      'admin.balance.summary.error': {}
      'admin.balance.operation.title': {}
      'admin.balance.operation.description': {}
      'admin.balance.operation.direction': {}
      'admin.balance.operation.reward': {}
      'admin.balance.operation.punish': {}
      'admin.balance.operation.reasons': {}
      'admin.balance.operation.reasons-empty': {}
      'admin.balance.operation.reasons-error': {}
      'admin.balance.operation.submit': {}
      'admin.balance.operation.success': {}
      'admin.balance.operation.error': {}
      'admin.balance.operation.confirm.title': {}
      'admin.balance.operation.confirm.description': {
        reasons: DefaultMessageValue
      }
      'admin.balance.operation.confirm.action': {}
      'admin.balance.history.title': {}
      'admin.balance.history.description': {}
      'admin.balance.history.loading': {}
      'admin.balance.history.empty': {}
      'admin.balance.history.error': {}
      'admin.balance.history.load-more': {}
      'admin.balance.history.end': {}
      'admin.balance.cancel.action': {}
      'admin.balance.cancel.trigger': { amount: { __fn: 'number' } }
      'admin.balance.cancel.confirm.title': {}
      'admin.balance.cancel.confirm.description': { amount: { __fn: 'number' } }
      'admin.balance.cancel.confirm.action': {}
      'admin.balance.cancel.success': {}
      'admin.balance.cancel.error': {}
      'admin.balance.cancel.already': {}
      'admin.balance.unknown.title': {}
      'admin.balance.unknown.change': {}
      'admin.balance.unknown.cancel': {}
      'admin.balance.unknown.verify': {}
      'admin.balance.unknown.checked': {}
      'admin.balance.unknown.acknowledge': {}
      'admin.balance.unknown.verify-error': {}
      'admin.balance.refresh.title': {}
      'admin.balance.refresh.error': {}
      'admin.balance.refresh.action': {}
      'students.manage.back-to-profile': {}
      'students.manage.not-found': {}
      'students.edit.title': {}
      'students.edit.description': {}
      'students.edit.nickname.title': {}
      'students.edit.nickname.description': {}
      'students.edit.nickname.label': {}
      'students.edit.nickname.placeholder': {}
      'students.edit.nickname.error': {}
      'students.edit.nickname.same': {}
      'students.edit.nickname.submit': {}
      'students.edit.nickname.saved': {}
      'students.edit.nickname.save-error': {}
      'students.edit.avatar.title': {}
      'students.edit.avatar.description': {}
      'students.edit.avatar.submit': {}
      'students.edit.avatar.saved': {}
      'students.edit.avatar.save-error': {}
      'students.access.title': {}
      'students.access.description': { name: DefaultMessageValue }
      'students.access.description-empty': {}
      'students.access.code.title': {}
      'students.access.code.note': {}
      'students.access.code.error': {}
      'students.access.code.forbidden': {}
      'students.access.code.reset': {}
      'students.access.code.reset-confirm-title': {}
      'students.access.code.reset-confirm-description': {
        name: DefaultMessageValue
      }
      'students.access.code.reset-confirm-action': {}
      'students.access.code.reset-error': {}
      'students.access.code.reset-forbidden': {}
      'students.access.sessions.title': {}
      'students.access.sessions.action': {}
      'students.access.sessions.note': {}
      'students.access.sessions.confirm-title': {}
      'students.access.sessions.confirm-description': {
        name: DefaultMessageValue
      }
      'students.access.sessions.confirm-action': {}
      'students.access.sessions.result-title': {}
      'students.access.sessions.result-description': {}
      'students.access.sessions.again': {}
      'students.delete.title': {}
      'students.delete.description': { name: DefaultMessageValue }
      'students.delete.description-empty': {}
      'students.delete.note': {}
      'students.delete.confirmation-label': {}
      'students.delete.confirmation-placeholder': {}
      'students.delete.confirmation-error': {}
      'students.delete.submit': {}
      'students.delete.dialog-title': {}
      'students.delete.dialog-description': { name: DefaultMessageValue }
      'students.delete.dialog-action': {}
      'students.delete.result-title': {}
      'students.delete.result-description': {}
      'students.delete.result-detail': {}
      'students.delete.result-action': {}
      'students.delete.result-action-value': {}
      'students.delete.again': {}
      'admin.streak.title': {}
      'admin.streak.description': {}
      'admin.streak.back': {}
      'admin.streak.days': { count: { __fn: 'number' } }
      'admin.streak.date': { date: { __fn: 'datetime' } }
      'admin.streak.started-label': {}
      'admin.streak.finished-label': {}
      'admin.streak.current.title': {}
      'admin.streak.current.active': {}
      'admin.streak.current.ended': {}
      'admin.streak.current.none': {}
      'admin.streak.current.none-value': {}
      'admin.streak.longest.title': {}
      'admin.streak.longest.hint': {}
      'admin.streak.actions.title': {}
      'admin.streak.actions.description': {}
      'admin.streak.actions.start': {}
      'admin.streak.actions.end': {}
      'admin.streak.actions.active-note': {}
      'admin.streak.actions.inactive-note': {}
      'admin.streak.end.confirm.title': {}
      'admin.streak.end.confirm.description': {}
      'admin.streak.end.confirm.action': {}
      'admin.streak.update.title': {}
      'admin.streak.update.label': {}
      'admin.streak.update.description': {}
      'admin.streak.update.unavailable': {}
      'admin.streak.update.submit': {}
      'admin.streak.validation.days': {}
      'admin.streak.result.started': {}
      'admin.streak.result.ended': {}
      'admin.streak.result.updated': {}
      'admin.streak.error.load': {}
      'admin.streak.error.action': {}
      'admin.streak.error.unauthorized': {}
      'admin.streak.error.forbidden': {}
      'admin.streak.error.not-found': {}
      'admin.streak.error.validation': {}
      'admin.api-error.session': {}
      'admin.api-error.forbidden': {}
      'admin.api-error.login': {}
      'admin.operations.title': {}
      'admin.operations.description': {}
      'admin.operations.back': {}
      'admin.operations.links.label': {}
      'admin.operations.links.practice': {}
      'admin.operations.links.practice-description': {}
      'admin.operations.links.settings': {}
      'admin.operations.links.settings-description': {}
      'admin.operations.bulk.title': {}
      'admin.operations.bulk.description': {}
      'admin.operations.bulk.submit': {}
      'admin.operations.students.error': {}
      'admin.operations.students.empty': {}
      'admin.operations.students.empty-filtered': {}
      'admin.operations.students.search-placeholder': {}
      'admin.operations.students.search-label': {}
      'admin.operations.students.found': { count: { __fn: 'number' } }
      'admin.operations.students.selected': { count: { __fn: 'number' } }
      'admin.operations.students.select-found': {}
      'admin.operations.students.clear': {}
      'admin.operations.student-fallback': { id: { __fn: 'number' } }
      'admin.operations.reasons.error': {}
      'admin.operations.direction.label': {}
      'admin.operations.direction.reward': {}
      'admin.operations.direction.punish': {}
      'admin.operations.result.title': {}
      'admin.operations.result.description': {}
      'admin.operations.result.success': {}
      'admin.operations.result.failure': {}
      'admin.operations.result.unknown': {}
      'admin.operations.result.pending': {}
      'admin.operations.result.processing': {}
      'admin.operations.result.new-balance': { count: { __fn: 'number' } }
      'admin.operations.result.open-history': {}
      'admin.operations.result.retryable': {}
      'admin.operations.result.unknown-description': {}
      'admin.operations.result.checking': {}
      'admin.operations.result.check-again': {}
      'admin.operations.result.history-checked': {}
      'admin.operations.result.history-acknowledged': {}
      'admin.operations.result.acknowledge': {}
      'admin.operations.result.batch': {
        direction: DefaultMessageValue
        reasons: DefaultMessageValue
      }
      'admin.operations.result.success-count': { count: { __fn: 'number' } }
      'admin.operations.result.failure-count': { count: { __fn: 'number' } }
      'admin.operations.result.unknown-count': { count: { __fn: 'number' } }
      'admin.operations.result.running': { pending: { __fn: 'number' } }
      'admin.operations.result.unknown-blocked': {}
      'admin.operations.result.unknown-note': {}
      'admin.operations.result.refresh-error': {}
      'admin.operations.result.retry': { count: { __fn: 'number' } }
      'admin.operations.result.no-retry': {}
      'admin.operations.result.error': {}
      'admin.operations.result.error.session': {}
      'admin.operations.result.error.forbidden': {}
      'admin.operations.result.error.not-found': {}
      'admin.operations.result.error.conflict': {}
      'admin.operations.result.error.validation': {}
      'admin.operations.confirm.title': {}
      'admin.operations.confirm.description': {
        count: { __fn: 'number' }
        direction: { __fn: 'string' }
        reasons: { __fn: 'string' }
      }
      'admin.operations.confirm.retry-description': {
        count: { __fn: 'number' }
        direction: { __fn: 'string' }
        reasons: { __fn: 'string' }
      }
      'admin.operations.confirm.action': {}
      'admin.operations.confirm.retry-action': {}
      'admin.operations.practice.back': {}
      'admin.operations.practice.title': {}
      'admin.operations.practice.description': {}
      'admin.operations.practice.select-title': {}
      'admin.operations.practice.select-description': {}
      'admin.operations.practice.course-all': {}
      'admin.operations.practice.course-filter': {}
      'admin.operations.practice.search-placeholder': {}
      'admin.operations.practice.search-label': {}
      'admin.operations.practice.courses-error': {}
      'admin.operations.practice.groups-error': {}
      'admin.operations.practice.groups-empty': {}
      'admin.operations.practice.go-to-groups': {}
      'admin.operations.practice.groups-empty-filtered': {}
      'admin.operations.practice.group-missing': {}
      'admin.operations.practice.clear-selection': {}
      'admin.operations.practice.group-error': {}
      'admin.operations.practice.submit': {}
      'admin.operations.practice.note': {}
      'admin.operations.practice.error': {}
      'admin.operations.practice.unknown-description': {}
      'admin.operations.practice.unknown-verify-error': {}
      'admin.operations.practice.confirm.title': {}
      'admin.operations.practice.confirm.description': {
        group: { __fn: 'string' }
        count: { __fn: 'number' }
      }
      'admin.operations.practice.confirm.action': {}
      'admin.operations.practice.result.title': {}
      'admin.operations.practice.result.affected': { count: { __fn: 'number' } }
      'admin.operations.practice.result.returned': { count: { __fn: 'number' } }
      'admin.operations.practice.result.partial': {
        affected: { __fn: 'number' }
        total: { __fn: 'number' }
      }
      'admin.operations.practice.result.empty': {}
      'admin.operations.practice.result.new': {}
      'admin.operations.settings.back': {}
      'admin.operations.settings.title': {}
      'admin.operations.settings.description': {}
      'admin.operations.settings.reset': {}
      'admin.operations.settings.correction.title': {}
      'admin.operations.settings.correction.description': {}
      'admin.operations.settings.correction.empty': {}
      'admin.operations.settings.correction.student': {}
      'admin.operations.settings.correction.student-placeholder': {}
      'admin.operations.settings.correction.student-error': {}
      'admin.operations.settings.correction.current-balance': {
        count: { __fn: 'number' }
      }
      'admin.operations.settings.correction.amount': {}
      'admin.operations.settings.correction.amount-placeholder': {}
      'admin.operations.settings.correction.amount-error': {}
      'admin.operations.settings.correction.explanation': {}
      'admin.operations.settings.correction.explanation-placeholder': {}
      'admin.operations.settings.correction.explanation-hint': {
        count: { __fn: 'number' }
      }
      'admin.operations.settings.correction.explanation-error': {}
      'admin.operations.settings.correction.submit': {}
      'admin.operations.settings.correction.result.title': {}
      'admin.operations.settings.correction.result.description': {}
      'admin.operations.settings.tariffs.title': {}
      'admin.operations.settings.tariffs.description': {}
      'admin.operations.settings.tariffs.empty': {}
      'admin.operations.settings.tariffs.placeholder': {}
      'admin.operations.settings.tariffs.input-label': {
        reason: DefaultMessageValue
      }
      'admin.operations.settings.tariffs.validation': {}
      'admin.operations.settings.tariffs.configured': {
        count: { __fn: 'number' }
      }
      'admin.operations.settings.tariffs.submit': {}
      'admin.operations.settings.tariffs.note': {}
      'admin.operations.settings.tariffs.result.title': {}
      'admin.operations.settings.tariffs.result.description': {
        count: { __fn: 'number' }
      }
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
      'admin.teachers.profile.manage': {}
      'admin.teachers.profile.manage-note': {}
      'admin.teachers.profile.assign': {}
      'admin.teachers.profile.assign-description': {}
      'admin.teachers.profile.rename': {}
      'admin.teachers.profile.rename-description': {}
      'admin.teachers.profile.access': {}
      'admin.teachers.profile.access-description': {}
      'admin.teachers.profile.delete': {}
      'admin.teachers.profile.delete-description': {}
      'admin.teachers.profile.groups-count': { count: { __fn: 'number' } }
      'admin.teachers.error.login': {}
      'admin.teachers.back-to-profile': {}
      'admin.teachers.teacher': {}
      'admin.teachers.action': {}
      'admin.teachers.rename.title': {}
      'admin.teachers.rename.description': { name: DefaultMessageValue }
      'admin.teachers.rename.description-empty': {}
      'admin.teachers.rename.name-label': {}
      'admin.teachers.rename.name-placeholder': {}
      'admin.teachers.rename.name-error': {}
      'admin.teachers.rename.note': {}
      'admin.teachers.rename.same': {}
      'admin.teachers.rename.submit': {}
      'admin.teachers.rename.result-title': {}
      'admin.teachers.rename.result-description': {}
      'admin.teachers.rename.current': {}
      'admin.teachers.rename.proposed': {}
      'admin.teachers.delete.title': {}
      'admin.teachers.delete.description': { name: DefaultMessageValue }
      'admin.teachers.delete.description-empty': {}
      'admin.teachers.delete.groups-title': {}
      'admin.teachers.delete.groups-empty': {}
      'admin.teachers.delete.reassign-note': {}
      'admin.teachers.delete.note': {}
      'admin.teachers.delete.confirm-label': {}
      'admin.teachers.delete.confirm-placeholder': {}
      'admin.teachers.delete.confirm-error': {}
      'admin.teachers.delete.submit': {}
      'admin.teachers.delete.dialog-title': {}
      'admin.teachers.delete.dialog-description': { name: DefaultMessageValue }
      'admin.teachers.delete.dialog-action': {}
      'admin.teachers.delete.result-title': {}
      'admin.teachers.delete.result-description': {}
      'admin.teachers.delete.result-groups': {}
      'admin.teachers.access.title': {}
      'admin.teachers.access.description': { name: DefaultMessageValue }
      'admin.teachers.access.description-empty': {}
      'admin.teachers.access.note': {}
      'admin.teachers.access.actions': {}
      'admin.teachers.access.again': {}
      'admin.teachers.access.block': {}
      'admin.teachers.access.block-description': {}
      'admin.teachers.access.block-confirm-title': {}
      'admin.teachers.access.block-confirm-description': {
        name: DefaultMessageValue
      }
      'admin.teachers.access.block-confirm-action': {}
      'admin.teachers.access.block-result-title': {}
      'admin.teachers.access.block-result-description': {}
      'admin.teachers.access.block-result-action': {}
      'admin.teachers.access.unblock': {}
      'admin.teachers.access.unblock-description': {}
      'admin.teachers.access.unblock-confirm-title': {}
      'admin.teachers.access.unblock-confirm-description': {
        name: DefaultMessageValue
      }
      'admin.teachers.access.unblock-confirm-action': {}
      'admin.teachers.access.unblock-result-title': {}
      'admin.teachers.access.unblock-result-description': {}
      'admin.teachers.access.unblock-result-action': {}
      'admin.teachers.access.reset-code': {}
      'admin.teachers.access.reset-code-description': {}
      'admin.teachers.access.reset-code-confirm-title': {}
      'admin.teachers.access.reset-code-confirm-description': {
        name: DefaultMessageValue
      }
      'admin.teachers.access.reset-code-confirm-action': {}
      'admin.teachers.access.reset-code-result-title': {}
      'admin.teachers.access.reset-code-result-description': {}
      'admin.teachers.access.reset-code-result-action': {}
      'admin.teachers.access.revoke-sessions': {}
      'admin.teachers.access.revoke-sessions-description': {}
      'admin.teachers.access.revoke-sessions-confirm-title': {}
      'admin.teachers.access.revoke-sessions-confirm-description': {
        name: DefaultMessageValue
      }
      'admin.teachers.access.revoke-sessions-confirm-action': {}
      'admin.teachers.access.revoke-sessions-result-title': {}
      'admin.teachers.access.revoke-sessions-result-description': {}
      'admin.teachers.access.revoke-sessions-result-action': {}
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
      'settings.section.admin': {}
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
      'admin.membership.group-option': {
        course: DefaultMessageValue
        group: DefaultMessageValue
      }
      'admin.membership.status.addition': {}
      'admin.membership.status.removal': {}
      'admin.membership.status.not-required': {}
      'admin.membership.addition.pending': {}
      'admin.membership.addition.added': {}
      'admin.membership.addition.skipped': {}
      'admin.membership.addition.failed': {}
      'admin.membership.removal.pending': {}
      'admin.membership.removal.waiting': {}
      'admin.membership.removal.removed': {}
      'admin.membership.removal.failed': {}
      'admin.membership.result.add.title': {}
      'admin.membership.result.add.description': { target: DefaultMessageValue }
      'admin.membership.result.transfer.title': {}
      'admin.membership.result.transfer.description': {
        target: DefaultMessageValue
        source: DefaultMessageValue
      }
      'admin.membership.result.remove.title': {}
      'admin.membership.result.remove.description': {
        source: DefaultMessageValue
      }
      'admin.membership.result.partial': {}
      'admin.membership.result.failure': {}
      'admin.membership.result.session': {}
      'admin.membership.result.forbidden': {}
      'admin.membership.result.retry': {}
      'admin.membership.result.reset': {}
      'admin.groups.membership.title': {}
      'admin.groups.membership.description': { group: DefaultMessageValue }
      'admin.groups.membership.description-empty': {}
      'admin.groups.membership.available': {}
      'admin.groups.membership.add.title': {}
      'admin.groups.membership.add.description': {}
      'admin.groups.membership.add.search-label': {}
      'admin.groups.membership.add.search-placeholder': {}
      'admin.groups.membership.add.empty': {}
      'admin.groups.membership.add.empty-filtered': {}
      'admin.groups.membership.add.list-unavailable': {}
      'admin.groups.membership.add.submit': { count: { __fn: 'number' } }
      'admin.groups.membership.students.title': {}
      'admin.groups.membership.students.description': {}
      'admin.groups.membership.remove.submit': { count: { __fn: 'number' } }
      'admin.groups.membership.remove.dialog-title': {}
      'admin.groups.membership.remove.dialog-description': {
        group: DefaultMessageValue
      }
      'admin.groups.membership.remove.dialog-action': {}
      'admin.groups.membership.transfer.title': {}
      'admin.groups.membership.transfer.description': {}
      'admin.groups.membership.transfer.target-label': {}
      'admin.groups.membership.transfer.placeholder': {}
      'admin.groups.membership.transfer.groups-error': {}
      'admin.groups.membership.transfer.targets-empty': {}
      'admin.groups.membership.transfer.submit': { count: { __fn: 'number' } }
      'admin.groups.membership.transfer.dialog-title': {}
      'admin.groups.membership.transfer.dialog-description': {
        target: DefaultMessageValue
        source: DefaultMessageValue
      }
      'admin.groups.membership.transfer.dialog-note': {}
      'admin.groups.membership.transfer.dialog-action': {}
      'admin.students.groups.title': {}
      'admin.students.groups.description': { name: DefaultMessageValue }
      'admin.students.groups.description-empty': {}
      'admin.students.groups.error': {}
      'admin.students.groups.add.title': {}
      'admin.students.groups.add.description': {}
      'admin.students.groups.add.target-label': {}
      'admin.students.groups.add.placeholder': {}
      'admin.students.groups.add.submit': {}
      'admin.students.groups.add.empty': {}
      'admin.students.groups.transfer.title': {}
      'admin.students.groups.transfer.description': {}
      'admin.students.groups.transfer.source-label': {}
      'admin.students.groups.transfer.target-label': {}
      'admin.students.groups.transfer.placeholder': {}
      'admin.students.groups.transfer.submit': {}
      'admin.students.groups.transfer.source-empty': {}
      'admin.students.groups.transfer.target-empty': {}
      'admin.students.groups.transfer.dialog-title': {}
      'admin.students.groups.transfer.dialog-description': {
        student: DefaultMessageValue
        target: DefaultMessageValue
        source: DefaultMessageValue
      }
      'admin.students.groups.transfer.dialog-note': {}
      'admin.students.groups.transfer.dialog-action': {}
      'admin.students.groups.memberships.title': {}
      'admin.students.groups.memberships.description': {}
      'admin.students.groups.memberships.remove': {}
      'admin.students.groups.memberships.remove-label': {
        group: DefaultMessageValue
      }
      'admin.students.groups.remove.dialog-title': {}
      'admin.students.groups.remove.dialog-description': {
        student: DefaultMessageValue
        group: DefaultMessageValue
      }
      'admin.students.groups.remove.dialog-action': {}
    }
  }
}
