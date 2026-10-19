export default {
  'action.next.title': 'Далі',
  'action.finish.title': 'Завершити',
  'action.login.title': 'Вхід в акаунт',
  'action.login.description': "Не пам'ятаєш пароль? Звернись до викладача.",
  'action.enter.title': 'Увійти',
  'error.incorrect-password': 'Неправильний пароль.',
  'error.registration-failed': 'Сталася неочікувана помилка',
  'field.name.placeholder': "Твоє ім'я",
  'field.password.show': 'Показати пароль',
  'field.password.hide': 'Приховати пароль',
  'caption.has-account': 'Маєш акаунт?{#br/}{#a to=$to}Увійти{/a}',
  'caption.has-no-account': 'Немає акаунту?{#br/}{#a to=$to}Зареєструватися{/a}',
  'caption.mistake': 'Помилився?{#br/}{#a search=$search}Повернутся назад{/a}',
  'step.name.title': 'Як тебе звати?',
  'step.name.description': 'Так твоє ім’я бачитимуть викладачі та інші студенти.',
  'step.category.title': 'Обери напрямки',
  'step.category.description': 'Можна обрати кілька.',
  'step.course.title': 'Обери свій курс',
  'step.group.title': 'Обери час заняття',
  'step.direction.progress': 'Напрямок {$current :number} із {$total :number}',
  'step.selection.empty': 'Наразі немає доступних варіантів.',
  'course.category': `
    .input {$category :string}
    .match $category
    |game dev| {{Розробка ігор}}
    embedded {{Робототехніка}}
    web {{Веброзробка}}
    primary {{Перші кроки в ІТ}}
    python {{Програмування на Python}}
    * {{Інші напрямки}}`,
  'step.avatar.title': 'Обери аватар',
  'step.view.title': 'Правильно?',
  'weekday.monday': 'Понеділок',
  'weekday.tuesday': 'Вівторок',
  'weekday.wednesday': 'Середа',
  'weekday.thursday': 'Четвер',
  'weekday.friday': 'П’ятниця',
  'weekday.saturday': 'Субота',
  'weekday.sunday': 'Неділя',
  'group.select.title': 'Обери групу',
  'group.filter.all': 'Всі ({$count :number})',
  'group.theme.game-dev': 'GameDev',
  'group.theme.web': 'Web',
  'group.theme.embedded': 'Embedded',
  'group.students-count': `
    .input {$count :number}
    .match $count
    one {{{$count} учень}}
    few {{{$count} учні}}
    many {{{$count} учнів}}
    * {{{$count} учня}}`,
  'group.back': 'Назад до вибору груп',
  'student.empty': 'Учнів за вашим запитом не знайдено',
  'field.student-search.placeholder': 'Пошук учня за іменем...',
  'action.clear-search.title': 'Очистити пошук',
  'sort.title': 'Сортування',
  'sort.students': 'Сортування учнів',
  'sort.name-asc': "Ім'я: А → Я",
  'sort.name-desc': "Ім'я: Я → А",
  'sort.balance-desc': 'Баланс: за спаданням',
  'sort.balance-asc': 'Баланс: за зростанням',
  'award.reason.label': 'Оберіть причину',
  'award.history.title': 'Історія нагород',
  'award.history.empty': 'Історія нагород порожня',
  'action.revert.title': 'Скасувати',
  'reason.activity': 'Активність на уроці',
  'reason.homework': 'Домашнє завдання',
  'reason.teamwork': 'Допомога команді',
  'reason.answer': 'Гарна відповідь',
  'reason.initiative': 'Ініціатива',
  'reason.discipline': 'Порушення дисципліни',
  'reason.mistake': 'Помилкове нарахування',
  'reason.late': 'Запізнення на урок',
  'reason.incomplete': 'Невиконання завдання',
  'reason.other': 'Інше',
  'profile.balance.amount': '{$count :number}',
  'profile.balance.caption': `
    .input {$count :number}
    .match $count
    one {{робокоїн}}
    few {{робокоїни}}
    many {{робокоїнів}}
    * {{робокоїна}}`,
  'not-found.code': '404',
  'not-found.title': 'Такої сторінки немає',
  'not-found.description': 'Перевірте адресу або поверніться туди, де все на місці.',
  'not-found.home': 'На головну',
}
