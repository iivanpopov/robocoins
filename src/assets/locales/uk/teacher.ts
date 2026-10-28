export default {
  'award.cancel.confirm.trigger': `
    .input {$amount :coins}
    .match $amount
    one {{Скасувати транзакцію на {$amount} робокоїн}}
    few {{Скасувати транзакцію на {$amount} робокоїни}}
    many {{Скасувати транзакцію на {$amount} робокоїнів}}
    * {{Скасувати транзакцію на {$amount} робокоїна}}`,
  'award.cancel.error': 'Не вдалося скасувати транзакцію. Спробуйте ще раз.',
  'award.cancel.locked': 'Транзакцію більше не можна скасувати',
  'award.deduct.confirm.action': 'Списати робокоїни',
  'award.deduct.confirm.description': 'Баланс учня {$student} буде зменшено. Причина: {$reason}.',
  'award.error': 'Не вдалося підтвердити зміну балансу. Перевірте баланс перед наступною дією.',
  'award.history.all': 'Уся',
  'award.history.empty': 'Історія нагород порожня',
  'award.history.title': 'Історія нагород',
  'award.punish': 'Покарати',
  'award.reason.label': 'Оберіть причину',
  'award.reward': 'Нагородити',
  'group.back': 'Назад до вибору груп',
  'group.current': 'Поточна',
  'group.filter.all': 'Всі ({$count :number})',
  'group.practice.award': 'Нарахувати всім за практику',
  'group.practice.confirm.description':
    'Нагороду за практику отримають усі учні групи ({$count :number}), незалежно від пошуку.',
  'group.practice.confirm.title': 'Нарахувати всій групі?',
  'group.practice.error':
    'Не вдалося підтвердити нарахування. Перевір баланси групи перед повторною спробою.',
  'group.practice.success': 'Нагороду за практику нараховано. Учнів: {$count :number}.',
  'group.select.title': 'Обери групу',
  'sort.balance-asc': 'Баланс: за зростанням',
  'sort.balance-desc': 'Баланс: за спаданням',
  'sort.name-asc': "Ім'я: від А до Я",
  'sort.name-desc': "Ім'я: від Я до А",
  'sort.students': 'Сортування учнів',
  'sort.title': 'Сортування',
  'student.edit.avatar.change': 'Змінити аватар',
  'student.edit.avatar.error': 'Не вдалося зберегти аватар. Спробуйте ще раз.',
  'student.edit.groups.add-action': 'Додати в групу',
  'student.edit.groups.add-confirm-title': 'Додати учня в групу?',
  'student.edit.groups.add-picker-title': 'Додати в групу',
  'student.edit.groups.confirm.add-description': 'Учня {$student} буде додано в групу «{$group}».',
  'student.edit.groups.confirm.transfer-description':
    'Учня {$student} буде переведено з групи «{$source}» у групу «{$target}».',
  'student.edit.groups.error': 'Не вдалося оновити групу учня. Спробуйте ще раз.',
  'student.edit.groups.partial-error': 'Учня додано в нову групу, але він залишився в попередній.',
  'student.edit.groups.remove-action': 'Прибрати',
  'student.edit.groups.remove-confirm-action': 'Прибрати',
  'student.edit.groups.remove-confirm-description':
    'Учень {$student} перестане складатися в групі «{$group}».',
  'student.edit.groups.remove-confirm-title': 'Прибрати учня з групи?',
  'student.edit.groups.remove.description':
    'Після переведення учень перестане складатися в групі «{$group}».',
  'student.edit.groups.source-empty': 'Учень поки не складається в групах.',
  'student.edit.groups.success': 'Групи учня оновлено.',
  'student.edit.groups.target-empty': 'Немає доступних груп для додавання.',
  'student.edit.groups.transfer-action': 'Перевести',
  'student.edit.groups.transfer-confirm-title': 'Перевести учня в іншу групу?',
  'student.edit.groups.transfer-picker-title': 'Перевести в групу',
  'student.edit.nickname.error': 'Не вдалося зберегти нікнейм. Спробуйте ще раз.',
  'student.empty': 'Учнів за вашим запитом не знайдено',
  'student.group-empty': 'У цій групі ще немає учнів',
  'student.password.regenerate': 'Згенерувати новий пароль',
  'student.password.regenerate.confirm.action': 'Згенерувати',
  'student.password.regenerate.confirm.description':
    'Пароль учня {$student} буде замінено новим. Попередній пароль перестане діяти.',
  'student.password.regenerate.confirm.title': 'Згенерувати новий пароль?',
  'student.password.regenerate.error': 'Не вдалося згенерувати новий пароль. Спробуйте ще раз.',
  'student.password.unavailable': 'Не вдалося завантажити пароль.',
}
