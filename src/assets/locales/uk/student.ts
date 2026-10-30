import { mergeMessages } from '../../../lib/translations/merge-messages'
import mission from './student/mission'

const student = {
  'leaderboard.all': 'Увесь рейтинг',
  'leaderboard.description': 'Найбільше зароблених робокоїнів',
  'leaderboard.empty': 'Цього тижня рейтинг ще порожній. Попереду нові досягнення!',
  'leaderboard.error': 'Не вдалося завантажити рейтинг.',
  'leaderboard.gap': 'Ще {$count :coins} до наступної позиції',
  'leaderboard.loading': 'Завантажуємо рейтинг',
  'leaderboard.own.near': 'Однаковий результат із наступним місцем',
  'leaderboard.own.place': 'у рейтингу',
  'leaderboard.own.points': `
    .input {$count :coins}
    .match $count
    one {{У тебе {$count} {#coin/} робокоїн}}
    few {{У тебе {$count} {#coin/} робокоїни}}
    many {{У тебе {$count} {#coin/} робокоїнів}}
    * {{У тебе {$count} {#coin/} робокоїна}}`,
  'leaderboard.place': 'Твоє місце',
  'leaderboard.podium': 'Трійка лідерів',
  'leaderboard.points.label': `
    .input {$count :coins}
    .match $count
    one {{Зароблено за тиждень: {$count} робокоїн}}
    few {{Зароблено за тиждень: {$count} робокоїни}}
    many {{Зароблено за тиждень: {$count} робокоїнів}}
    * {{Зароблено за тиждень: {$count} робокоїна}}`,
  'leaderboard.rank.error': 'Не вдалося завантажити твоє місце.',
  'leaderboard.title': 'Рейтинг тижня',
  'leaderboard.unranked': 'Отримай перші робокоїни цього тижня, щоб з’явитися в рейтингу.',
  'leaderboard.you': 'Ти',
  'profile.balance.open-shop': 'Відкрити крамницю нагород',
  'profile.cyberween.open': 'Відкрити допис Cyberween в Instagram',
  'profile.cyberween.period': 'Конкурс 31.10 – 09.11',
  'profile.cyberween.tagline': 'Твій герой виходить із гри',
  'profile.earn.activity': 'Будь активним на уроці',
  'profile.earn.additional': 'Необов’язкове завдання з нагородою',
  'profile.earn.answer': 'Дай гарну відповідь',
  'profile.earn.homework': 'Виконуй домашні завдання',
  'profile.earn.initiative': 'Пропонуй власні ідеї',
  'profile.earn.practice': 'Виконане завдання від викладача',
  'profile.earn.teamwork': 'Допомагай команді',
  'profile.earn.theory': 'Розгорнута відповідь на одне або кілька запитань',
  'profile.earn.title': 'Як заробити робокоїни',
  'profile.goal.change': 'Змінити ціль',
  'profile.goal.choose': 'Обрати ціль',
  'profile.goal.claim': 'Забрати',
  'profile.goal.completed': 'Достатньо робокоїнів!',
  'profile.goal.kicker': 'Моя ціль',
  'profile.goal.loading': 'Завантажуємо ціль',
  'profile.goal.none': 'Ціль не обрана',
  'profile.goal.progress': '{$saved :coins} / {$price :coins}',
  'profile.goal.remaining': `
    .input {$count :coins}
    .match $count
    one {{Залишився {$count} робокоїн!}}
    few {{Залишилося {$count} робокоїни!}}
    many {{Залишилося {$count} робокоїнів!}}
    * {{Залишилося {$count} робокоїна!}}`,
  'profile.goal.shop': 'Перейти до магазину, щоб обрати ціль',
  'profile.greeting.pair.1.caption': 'Сьогодні на тебе чекає багато нового!',
  'profile.greeting.pair.1.greeting': 'Доброго дня!',
  'profile.greeting.pair.2.caption': 'Час нових пригод!',
  'profile.greeting.pair.2.greeting': 'Привіт!',
  'profile.greeting.pair.3.caption': 'Твоя ціль стає ближчою!',
  'profile.greeting.pair.3.greeting': 'З поверненням!',
  'profile.greeting.pair.4.caption': 'Що цікавого сьогодні?',
  'profile.greeting.pair.4.greeting': 'День відкриттів!',
  'profile.greeting.pair.5.caption': 'Попереду багато цікавого!',
  'profile.greeting.pair.5.greeting': 'Пригоди чекають!',
  'profile.history.all': 'Уся історія',
  'profile.history.day': '{$date :date fields=month-day length=long timeZone=UTC}',
  'profile.history.empty.mascot': 'Тут з’являться твої перші нагороди!',
  'profile.history.title': 'Історія',
  'profile.history.today': 'Сьогодні',
  'profile.history.yesterday': 'Учора',
  'profile.rules': 'Усі способи',
  'profile.rules.close': 'Зрозуміло',
  'profile.rules.description': 'Викладач нараховує або списує робокоїни з таких причин.',
  'profile.rules.error': 'Не вдалося завантажити правила.',
  'profile.rules.loading': 'Завантаження правил…',
  'profile.rules.punish': 'За що списують',
  'profile.rules.reward': 'За що нараховують',
  'profile.rules.title': 'Як працюють робокоїни',
  'shop.balance': `
    .input {$count :coins}
    .match $count
    one {{Баланс: {$count} робокоїн}}
    few {{Баланс: {$count} робокоїни}}
    many {{Баланс: {$count} робокоїнів}}
    * {{Баланс: {$count} робокоїна}}`,
  'shop.reward.back': 'Назад до галактики',
  'shop.reward.claim': 'Отримати',
  'shop.reward.cost': 'Вартість',
  'shop.reward.insufficient': 'Бракує монет',
  'shop.reward.type.privilege': 'Привілей',
  'shop.reward.type.reward': 'Приз',
  'shop.view.galaxy': 'Галактика',
  'shop.view.label': 'Вигляд магазину',
  'shop.view.list': 'Список',
  'student.profile.title': 'Профіль',
}

export default mergeMessages([mission, student])
