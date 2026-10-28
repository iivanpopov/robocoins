export default {
  'admin.operations.back-to-list': 'До операцій',
  'admin.operations.bulk.submit': 'Застосувати до вибраних',
  'admin.operations.bulk.title': 'Масові операції',
  'admin.operations.confirm.action': 'Застосувати',
  'admin.operations.confirm.description': `
    .input {$count :number}
    .input {$direction :string}
    .input {$reasons :string}
    .match $count
    one {{Напрямок: {$direction}. Буде застосовано до {$count} учня. Причини: {$reasons}. Кожен учень обробляється окремо.}}
    few {{Напрямок: {$direction}. Буде застосовано до {$count} учнів. Причини: {$reasons}. Кожен учень обробляється окремо.}}
    many {{Напрямок: {$direction}. Буде застосовано до {$count} учнів. Причини: {$reasons}. Кожен учень обробляється окремо.}}
    * {{Напрямок: {$direction}. Буде застосовано до {$count} учня. Причини: {$reasons}. Кожен учень обробляється окремо.}}`,
  'admin.operations.confirm.retry-action': 'Повторити',
  'admin.operations.confirm.retry-description': `
    .input {$count :number}
    .input {$direction :string}
    .input {$reasons :string}
    .match $count
    one {{Повторити операцію для {$count} учня з початковими параметрами? Напрямок: {$direction}. Причини: {$reasons}. Повторюються лише однозначні відмови.}}
    few {{Повторити операції для {$count} учнів з початковими параметрами? Напрямок: {$direction}. Причини: {$reasons}. Повторюються лише однозначні відмови.}}
    many {{Повторити операції для {$count} учнів з початковими параметрами? Напрямок: {$direction}. Причини: {$reasons}. Повторюються лише однозначні відмови.}}
    * {{Повторити операцію для {$count} учня з початковими параметрами? Напрямок: {$direction}. Причини: {$reasons}. Повторюються лише однозначні відмови.}}`,
  'admin.operations.confirm.title': 'Підтвердити масову операцію?',
  'admin.operations.links.label': 'Інші операції',
  'admin.operations.links.practice-description': 'Нарахування за практику всій групі.',
  'admin.operations.links.settings': 'Локальні інструменти',
  'admin.operations.links.settings-description':
    'Довільна сума, причини та тарифи без зміни сервера.',
  'admin.operations.practice.clear-selection': 'Скинути вибір',
  'admin.operations.practice.confirm.description': `
    .input {$group :string}
    .input {$count :number}
    .match $count
    one {{Групі {$group} буде нараховано практику для {$count} учня.}}
    few {{Групі {$group} буде нараховано практику для {$count} учнів.}}
    many {{Групі {$group} буде нараховано практику для {$count} учнів.}}
    * {{Групі {$group} буде нараховано практику для {$count} учня.}}`,
  'admin.operations.practice.confirm.title': 'Нарахувати практику групі?',
  'admin.operations.practice.description':
    'Нарахування за практику всій групі через серверну операцію. Не пов’язане з розкладом або відвідуваністю.',
  'admin.operations.practice.error': 'Не вдалося нарахувати практику.',
  'admin.operations.practice.group-error': 'Не вдалося завантажити склад групи.',
  'admin.operations.practice.group-missing': 'Групу з посилання не знайдено. Оберіть іншу групу.',
  'admin.operations.practice.note':
    'Сервер нарахує робокоїни кожному учню групи. Операція не пов’язана з розкладом або відвідуваністю.',
  'admin.operations.practice.result.affected': 'Нараховано учням: {$count :number}',
  'admin.operations.practice.result.empty': 'Сервер не повернув результатів для жодного учня.',
  'admin.operations.practice.result.new': 'Нове нарахування',
  'admin.operations.practice.result.partial':
    'Нараховано {$affected :number} з {$total :number} учнів групи.',
  'admin.operations.practice.result.returned': 'У відповіді сервера {$count :number} результатів.',
  'admin.operations.practice.result.title': 'Практику нараховано',
  'admin.operations.practice.search-placeholder': 'Назва групи або курсу',
  'admin.operations.practice.select-description': 'Пошук за назвою групи або курсом.',
  'admin.operations.practice.submit': 'Нарахувати за практику',
  'admin.operations.practice.unknown-description':
    'Зв’язок урвався до підтвердження. Перевірте історію учнів групи, не повторюйте нарахування навмання. Стан перевірки діє лише на цій сторінці й не зберігається після переходу.',
  'admin.operations.practice.unknown-verify-error':
    'Не вдалося перевірити історію учнів групи. Спробуйте ще раз.',
  'admin.operations.result.batch': 'Операція: {$direction}. Причини: {$reasons}.',
  'admin.operations.result.check-again': 'Перевірити ще раз',
  'admin.operations.result.checking': 'Перевіряємо історію…',
  'admin.operations.result.error': 'Не вдалося застосувати операцію.',
  'admin.operations.result.error.conflict': 'Стан учня змінився. Оновіть дані.',
  'admin.operations.result.error.forbidden': 'Недостатньо прав для операції.',
  'admin.operations.result.error.validation': 'Сервер відхилив причини або дані операції.',
  'admin.operations.result.failure': 'Відмова',
  'admin.operations.result.failure-count': 'Відмови: {$count :number}',
  'admin.operations.result.history-acknowledged':
    'Перевірку підтверджено. Повтор автоматично не виконується.',
  'admin.operations.result.history-checked':
    'Історію перевірено. Підтвердьте перевірку, щоб розблокувати нові операції.',
  'admin.operations.result.new-balance': 'Баланс: {$count :coins}',
  'admin.operations.result.no-retry':
    'Повтор недоступний для цих помилок. Перевірте права доступу або дані учня.',
  'admin.operations.result.open-history': 'Відкрити історію',
  'admin.operations.result.pending': 'Обробка',
  'admin.operations.result.processing': 'Виконується…',
  'admin.operations.result.refresh-error':
    'Операцію підтверджено, але не вдалося оновити баланс, історію та групи. Оновіть дані.',
  'admin.operations.result.retry': 'Повторити невдалі ({$count :number})',
  'admin.operations.result.retryable': 'Можна повторити',
  'admin.operations.result.running': 'У черзі ще {$pending :number} операцій.',
  'admin.operations.result.success': 'Успішно',
  'admin.operations.result.success-count': 'Успішно: {$count :number}',
  'admin.operations.result.title': 'Результати',
  'admin.operations.result.unknown': 'Невідомо',
  'admin.operations.result.unknown-blocked':
    'Перевірте історію учнів із невідомим результатом і підтвердьте перевірку. Нові операції заблоковані, доки ви не підтвердите результат.',
  'admin.operations.result.unknown-count': 'Невідомо: {$count :number}',
  'admin.operations.result.unknown-description':
    'Результат невідомий. Перевірте історію учня, не повторюйте операцію навмання.',
  'admin.operations.result.unknown-note':
    'Невідомий результат не повторюється автоматично. Перевірте історію в профілі учня. Стан перевірки діє лише на цій сторінці й не зберігається після переходу.',
  'admin.operations.settings.correction.amount': 'Сума',
  'admin.operations.settings.correction.amount-error': 'Вкажіть додатну суму з точністю до сотих.',
  'admin.operations.settings.correction.amount-placeholder': 'Наприклад, 25',
  'admin.operations.settings.correction.current-balance': 'Поточний баланс: {$count :coins}',
  'admin.operations.settings.correction.description':
    'Повна форма довільної суми з поясненням. Сервер не підтримує таку операцію, тому результат залишається чернеткою й не змінює баланс.',
  'admin.operations.settings.correction.empty': 'Немає учнів для чернетки.',
  'admin.operations.settings.correction.explanation': 'Пояснення',
  'admin.operations.settings.correction.explanation-error':
    'Додайте пояснення від 3 до 500 символів.',
  'admin.operations.settings.correction.explanation-hint': 'До {$count :number} символів.',
  'admin.operations.settings.correction.explanation-placeholder': 'Для чого потрібна ця сума',
  'admin.operations.settings.correction.result.description':
    'Баланс не змінено. Сервер не має операції довільної суми, тому ці дані не збережено.',
  'admin.operations.settings.correction.result.title': 'Чернетку перевірено',
  'admin.operations.settings.correction.student-error': 'Оберіть учня.',
  'admin.operations.settings.correction.student-placeholder': 'Оберіть учня',
  'admin.operations.settings.correction.submit': 'Перевірити чернетку',
  'admin.operations.settings.correction.title': 'Довільна сума',
  'admin.operations.settings.description':
    'Форми перевіряють дані локально й не змінюють баланс або серверні налаштування.',
  'admin.operations.settings.reset': 'Очистити',
  'admin.operations.settings.tariffs.configured': 'Заповнено тарифів: {$count :number}',
  'admin.operations.settings.tariffs.description':
    'Причини читаються із сервера. Тарифи можна заповнити лише як локальну чернетку: серверні тарифи не змінюються.',
  'admin.operations.settings.tariffs.empty': 'Сервер не повернув причин.',
  'admin.operations.settings.tariffs.input-label': 'Тариф для причини {$reason}',
  'admin.operations.settings.tariffs.note':
    'Реальні масові операції використовують лише причини із сервера. Локальні тарифи не впливають на сервер і не підміняють причини.',
  'admin.operations.settings.tariffs.placeholder': 'Тариф',
  'admin.operations.settings.tariffs.result.description':
    'Заповнено {$count :number} тарифів. Серверні тарифи не змінено.',
  'admin.operations.settings.tariffs.result.title': 'Чернетку тарифів збережено локально',
  'admin.operations.settings.tariffs.submit': 'Зберегти чернетку',
  'admin.operations.settings.tariffs.title': 'Причини та тарифи',
  'admin.operations.settings.tariffs.validation':
    'Вкажіть число з точністю до сотих або залиште поле порожнім.',
  'admin.operations.settings.title': 'Локальні налаштування балансу',
  'admin.operations.student-fallback': 'Учень #{$id :number}',
  'admin.operations.students.clear': 'Очистити вибір',
  'admin.operations.students.found': 'Знайдено: {$count :number}',
  'admin.operations.students.search-label': 'Пошук учнів',
  'admin.operations.students.search-placeholder': 'Пошук учня за іменем',
  'admin.operations.students.select-found': 'Вибрати знайдених',
  'admin.operations.students.selected': 'Вибрано: {$count :number}',
  'admin.operations.title': 'Операції з балансом',
}
