export default {
  'admin.balance.back': 'Назад до профілю',
  'admin.balance.cancel.already': 'Транзакцію вже скасовано. Історію оновлено.',
  'admin.balance.cancel.confirm.description':
    'Операцію на суму {$amount :number} буде скасовано, а баланс перераховано.',
  'admin.balance.cancel.confirm.title': 'Скасувати транзакцію?',
  'admin.balance.cancel.error': 'Не вдалося скасувати транзакцію.',
  'admin.balance.cancel.success': 'Транзакцію скасовано.',
  'admin.balance.cancel.trigger': 'Скасувати транзакцію на суму {$amount :number}',
  'admin.balance.history.description': 'Останні нарахування та списання цього учня.',
  'admin.balance.history.empty': 'Транзакцій поки немає.',
  'admin.balance.history.end': 'Це вся історія.',
  'admin.balance.history.error': 'Не вдалося завантажити історію.',
  'admin.balance.history.load-more': 'Показати ще',
  'admin.balance.history.title': 'Історія транзакцій',
  'admin.balance.operation.confirm.description': 'Буде списано робокоїни за причини: {$reasons}.',
  'admin.balance.operation.description':
    'Оберіть причини. Суму нарахування або списання визначає сервер.',
  'admin.balance.operation.error': 'Не вдалося змінити баланс. Перевірте баланс та історію.',
  'admin.balance.operation.reasons': 'Причини',
  'admin.balance.operation.reasons-empty': 'Немає доступних причин для цього напрямку.',
  'admin.balance.operation.success': 'Баланс оновлено.',
  'admin.balance.profile.description': 'Рахунок, прогрес нагороди та історія операцій.',
  'admin.balance.profile.link': 'Баланс учня',
  'admin.balance.refresh.action': 'Оновити дані',
  'admin.balance.refresh.error':
    'Операцію підтверджено, але не вдалося оновити баланс та історію. Оновіть дані, щоб побачити результат.',
  'admin.balance.refresh.title': 'Дані не оновлено',
  'admin.balance.summary.balance': 'Баланс',
  'admin.balance.summary.description': 'Поточний баланс, нагорода та місце в рейтингу.',
  'admin.balance.summary.error': 'Не вдалося завантажити стан учня.',
  'admin.balance.summary.rank': 'Місце в рейтингу',
  'admin.balance.summary.rank-none': 'Ще немає місця',
  'admin.balance.summary.reward': 'Прогрес нагороди',
  'admin.balance.summary.reward-none': 'Нагороду не обрано',
  'admin.balance.summary.reward-progress': '{$saved :number} з {$price :number} робокоїнів',
  'admin.balance.summary.reward-ready': 'Достатньо робокоїнів для нагороди',
  'admin.balance.summary.reward-remaining': `
    .input {$count :number}
    .local $countText = {$count :string}
    .match $count
    one {{Залишився {$countText} робокоїн}}
    few {{Залишилося {$countText} робокоїни}}
    many {{Залишилося {$countText} робокоїнів}}
    * {{Залишилося {$countText} робокоїна}}`,
  'admin.balance.summary.title': 'Стан учня',
  'admin.balance.title': 'Баланс і історія',
  'admin.balance.unknown.cancel':
    'Зв’язок урвався до підтвердження. Перевірте історію, перш ніж повторювати скасування.',
  'admin.balance.unknown.change':
    'Зв’язок урвався до підтвердження. Не повторюйте зміну навмання — перевірте історію.',
  'admin.balance.unknown.checked':
    'Історію оновлено. Перегляньте операції нижче та підтвердьте, що результат зрозумілий.',
  'admin.balance.unknown.title': 'Результат невідомий',
  'admin.balance.unknown.verify': 'Перевірити історію',
  'admin.balance.unknown.verify-error':
    'Не вдалося оновити історію та баланс. Перевірте зв’язок і спробуйте ще раз.',
  'admin.learning.create': 'Створити',
  'admin.membership.addition.added': 'додано',
  'admin.membership.addition.failed': 'не додано',
  'admin.membership.addition.pending': 'додаємо…',
  'admin.membership.addition.skipped': 'уже в групі',
  'admin.membership.group-option': '{$course} · {$group}',
  'admin.membership.removal.failed': 'не прибрано',
  'admin.membership.removal.pending': 'прибираємо…',
  'admin.membership.removal.removed': 'прибрано',
  'admin.membership.removal.waiting': 'чекає на додавання',
  'admin.membership.result.add.description': 'Учнів оброблено окремо для групи «{$target}».',
  'admin.membership.result.add.title': 'Результат додавання',
  'admin.membership.result.failure':
    'Частину операцій не завершено. Повторіть лише етапи з помилкою.',
  'admin.membership.result.forbidden': 'Сервер відхилив частину операцій через недостатньо прав.',
  'admin.membership.result.partial':
    'Деяких учнів додано, але не прибрано з початкової групи. Вони залишилися в обох групах.',
  'admin.membership.result.remove.description':
    'Учнів прибрано з групи «{$source}». Акаунти не видалено.',
  'admin.membership.result.remove.title': 'Результат відрахування',
  'admin.membership.result.reset': 'Нова дія',
  'admin.membership.result.retry': 'Перевірити й повторити',
  'admin.membership.result.session':
    'Сесія завершилася під час операції. Увійдіть знову, щоб повторити.',
  'admin.membership.result.transfer.description':
    'Спочатку підтверджували додавання до «{$target}», потім прибирали з «{$source}».',
  'admin.membership.result.transfer.title': 'Результат переведення',
  'admin.membership.result.unknown':
    'Результат частини операцій невідомий. Перед повторенням перевірте актуальне членство. Учня не буде прибрано з групи без підтвердженого додавання.',
  'admin.membership.status.addition': 'Додавання',
  'admin.membership.status.not-required': 'не потрібно',
  'admin.membership.status.removal': 'Видалення з групи',
  'admin.membership.status.unknown': 'результат невідомий',
  'admin.shared.local-result': 'Локальний результат',
  'admin.streak.actions.active-note': 'Стрик уже активний.',
  'admin.streak.actions.description': 'Запуск, завершення та кількість днів.',
  'admin.streak.actions.end': 'Завершити стрик',
  'admin.streak.actions.inactive-note': 'Активного стрику немає.',
  'admin.streak.actions.start': 'Запустити стрик',
  'admin.streak.actions.title': 'Керування стриком',
  'admin.streak.back': 'Назад до профілю учня',
  'admin.streak.current.active': 'Активний',
  'admin.streak.current.ended': 'Завершено',
  'admin.streak.current.none': 'Немає активного стрику',
  'admin.streak.current.none-value': 'Немає',
  'admin.streak.current.title': 'Поточний стрик',
  'admin.streak.date': '{$date :datetime day=numeric month=long year=numeric}',
  'admin.streak.days': `
    .input {$count :number}
    .match $count
    one {{{$count} день}}
    few {{{$count} дні}}
    many {{{$count} днів}}
    * {{{$count} дня}}`,
  'admin.streak.description': 'Поточний і максимальний стрик, запуск і завершення.',
  'admin.streak.end.confirm.description':
    'Поточний стрик буде завершено. Кількість днів залишиться в показниках.',
  'admin.streak.end.confirm.title': 'Завершити стрик?',
  'admin.streak.error.action': 'Не вдалося виконати дію зі стриком.',
  'admin.streak.error.forbidden': 'Недостатньо прав для керування стриком.',
  'admin.streak.error.load': 'Не вдалося завантажити стрик.',
  'admin.streak.error.not-found': 'Учня або стрик не знайдено.',
  'admin.streak.error.validation': 'Перевірте кількість днів.',
  'admin.streak.finished-label': 'Завершення',
  'admin.streak.longest.hint': 'Найдовший результат учня.',
  'admin.streak.longest.title': 'Максимальний стрик',
  'admin.streak.result.ended': 'Стрик завершено.',
  'admin.streak.result.started': 'Стрик запущено.',
  'admin.streak.result.updated': 'Кількість днів оновлено.',
  'admin.streak.started-label': 'Початок',
  'admin.streak.title': 'Стрик учня',
  'admin.streak.update.label': 'Дні',
  'admin.streak.update.submit': 'Зберегти',
  'admin.streak.update.unavailable': 'Спочатку запустіть стрик, щоб змінити кількість днів.',
  'admin.streak.validation.days': 'Вкажіть ціле число від 0.',
  'error.forbidden': 'Недостатньо прав для цієї дії.',
  'error.session': 'Сесія завершилася. Увійдіть знову, щоб продовжити.',
  'group.practice.title': 'Практика групи',
}
