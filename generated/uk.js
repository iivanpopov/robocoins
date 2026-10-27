export default {
  "leaderboard.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Рейтинг тижня"
    ]
  },
  "leaderboard.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Найбільше зароблених робокоїнів"
    ]
  },
  "leaderboard.rules": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Отримуй робокоїни за навчання та підіймайся в рейтингу. Покупки не зменшують твій результат. Щотижня — новий старт!"
    ]
  },
  "leaderboard.all": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Увесь рейтинг"
    ]
  },
  "leaderboard.you": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ти"
    ]
  },
  "leaderboard.place": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Твоє місце"
    ]
  },
  "leaderboard.podium": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Трійка лідерів"
    ]
  },
  "leaderboard.profile.open": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відкрити профіль ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      }
    ]
  },
  "leaderboard.own.place": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "у рейтингу"
    ]
  },
  "leaderboard.own.points": {
    "type": "select",
    "declarations": [
      {
        "type": "input",
        "name": "count",
        "value": {
          "type": "expression",
          "arg": {
            "type": "variable",
            "name": "count"
          },
          "functionRef": {
            "type": "function",
            "name": "number"
          }
        }
      },
      {
        "type": "local",
        "name": "countText",
        "value": {
          "type": "expression",
          "arg": {
            "type": "variable",
            "name": "count"
          },
          "functionRef": {
            "type": "function",
            "name": "string"
          }
        }
      }
    ],
    "selectors": [
      {
        "type": "variable",
        "name": "count"
      }
    ],
    "variants": [
      {
        "keys": [
          {
            "type": "literal",
            "value": "one"
          }
        ],
        "value": [
          "У тебе ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "countText"
            }
          },
          " ",
          {
            "type": "markup",
            "kind": "standalone",
            "name": "coin"
          },
          " робокоїн"
        ]
      },
      {
        "keys": [
          {
            "type": "literal",
            "value": "few"
          }
        ],
        "value": [
          "У тебе ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "countText"
            }
          },
          " ",
          {
            "type": "markup",
            "kind": "standalone",
            "name": "coin"
          },
          " робокоїни"
        ]
      },
      {
        "keys": [
          {
            "type": "literal",
            "value": "many"
          }
        ],
        "value": [
          "У тебе ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "countText"
            }
          },
          " ",
          {
            "type": "markup",
            "kind": "standalone",
            "name": "coin"
          },
          " робокоїнів"
        ]
      },
      {
        "keys": [
          {
            "type": "*"
          }
        ],
        "value": [
          "У тебе ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "countText"
            }
          },
          " ",
          {
            "type": "markup",
            "kind": "standalone",
            "name": "coin"
          },
          " робокоїна"
        ]
      }
    ]
  },
  "leaderboard.gap": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ще ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "count"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      },
      " до наступної позиції"
    ]
  },
  "leaderboard.own.near": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Однаковий результат із наступним місцем"
    ]
  },
  "leaderboard.rank": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Місце ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "rank"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      }
    ]
  },
  "leaderboard.points": {
    "type": "message",
    "declarations": [],
    "pattern": [
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "count"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      }
    ]
  },
  "leaderboard.points.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зароблено за тиждень: ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "count"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      },
      " робокоїнів"
    ]
  },
  "leaderboard.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Цього тижня рейтинг ще порожній. Попереду нові досягнення!"
    ]
  },
  "leaderboard.unranked": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Отримай перші робокоїни цього тижня, щоб з’явитися в рейтингу."
    ]
  },
  "leaderboard.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити рейтинг."
    ]
  },
  "leaderboard.rank.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити твоє місце."
    ]
  },
  "leaderboard.loading": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завантажуємо рейтинг"
    ]
  },
  "leaderboard.more": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Показати ще"
    ]
  },
  "leaderboard.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "На головну"
    ]
  },
  "profile.cyberween.open": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відкрити допис Cyberween в Instagram"
    ]
  },
  "profile.cyberween.tagline": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Твій герой виходить із гри"
    ]
  },
  "profile.cyberween.period": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Конкурс 31.10 – 09.11"
    ]
  },
  "navbar.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Основна навігація"
    ]
  },
  "navbar.settings": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Налаштування"
    ]
  },
  "navbar.profile": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Профіль"
    ]
  },
  "navbar.home": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Головна"
    ]
  },
  "navbar.shop": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Магазин"
    ]
  },
  "navbar.groups": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групи"
    ]
  },
  "shop.balance": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Баланс: ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "count"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      },
      " робокоїнів"
    ]
  },
  "shop.balance.amount": {
    "type": "message",
    "declarations": [],
    "pattern": [
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "count"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      }
    ]
  },
  "shop.reward.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назад до галактики"
    ]
  },
  "shop.reward.price": {
    "type": "message",
    "declarations": [],
    "pattern": [
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "count"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      }
    ]
  },
  "shop.reward.claim": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Отримати"
    ]
  },
  "shop.reward.insufficient": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Бракує монет"
    ]
  },
  "shop.reward.cost": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вартість"
    ]
  },
  "shop.reward.type.reward": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Приз"
    ]
  },
  "shop.reward.type.privilege": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Привілей"
    ]
  },
  "shop.view.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вигляд магазину"
    ]
  },
  "shop.view.galaxy": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Галактика"
    ]
  },
  "shop.view.list": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Список"
    ]
  },
  "settings.password": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пароль"
    ]
  },
  "settings.section.account": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обліковий запис"
    ]
  },
  "settings.section.appearance": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вигляд"
    ]
  },
  "settings.section.session": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сесія"
    ]
  },
  "settings.password.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пароль для входу в Robocoins. Натисни на око, щоб показати або сховати його."
    ]
  },
  "settings.animations.disable": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вимкнути анімації"
    ]
  },
  "settings.animations.system": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Анімації вже зменшено налаштуваннями системи. Цей перемикач не може їх увімкнути."
    ]
  },
  "student.password.unavailable": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перегляд пароля учня поки недоступний."
    ]
  },
  "student.password.regenerate": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Згенерувати новий пароль"
    ]
  },
  "student.password.regenerate.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Згенерувати новий пароль?"
    ]
  },
  "student.password.regenerate.confirm.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пароль учня ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "student"
        }
      },
      " буде замінено новим. Попередній пароль перестане діяти."
    ]
  },
  "student.password.regenerate.confirm.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Згенерувати"
    ]
  },
  "student.password.regenerate.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося згенерувати новий пароль. Спробуйте ще раз."
    ]
  },
  "settings.credentials.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити пароль."
    ]
  },
  "settings.logout": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вийти"
    ]
  },
  "settings.logout.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вийти з акаунту?"
    ]
  },
  "settings.logout.confirm.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Щоб повернутися, потрібно буде знову ввести пароль."
    ]
  },
  "action.cancel": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скасувати"
    ]
  },
  "group.practice.award": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нарахувати всім за практику"
    ]
  },
  "group.practice.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нарахувати всій групі?"
    ]
  },
  "group.practice.confirm.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагороду за практику отримають усі учні групи (",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "count"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      },
      "), незалежно від пошуку."
    ]
  },
  "group.practice.confirm.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нарахувати"
    ]
  },
  "group.practice.success": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагороду за практику нараховано. Учнів: ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "count"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      },
      "."
    ]
  },
  "group.practice.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося підтвердити нарахування. Перевір баланси групи перед повторною спробою."
    ]
  },
  "settings.logout.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося вийти. Спробуйте ще раз."
    ]
  },
  "action.next.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Далі"
    ]
  },
  "action.finish.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завершити"
    ]
  },
  "action.login.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вхід в акаунт"
    ]
  },
  "action.login.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не пам'ятаєш пароль? Звернись до викладача."
    ]
  },
  "action.enter.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Увійти"
    ]
  },
  "error.incorrect-password": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Неправильний пароль."
    ]
  },
  "error.registration-failed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сталася неочікувана помилка"
    ]
  },
  "field.name.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Твоє ім'я"
    ]
  },
  "field.password.show": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Показати пароль"
    ]
  },
  "field.password.hide": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Приховати пароль"
    ]
  },
  "field.password.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Твій пароль"
    ]
  },
  "caption.has-account": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Маєш акаунт?",
      {
        "type": "markup",
        "kind": "standalone",
        "name": "br"
      },
      {
        "type": "markup",
        "kind": "open",
        "name": "a",
        "options": {
          "to": {
            "type": "variable",
            "name": "to"
          }
        }
      },
      "Увійти",
      {
        "type": "markup",
        "kind": "close",
        "name": "a"
      }
    ]
  },
  "caption.has-no-account": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає акаунту?",
      {
        "type": "markup",
        "kind": "standalone",
        "name": "br"
      },
      {
        "type": "markup",
        "kind": "open",
        "name": "a",
        "options": {
          "to": {
            "type": "variable",
            "name": "to"
          }
        }
      },
      "Зареєструватися",
      {
        "type": "markup",
        "kind": "close",
        "name": "a"
      }
    ]
  },
  "caption.mistake": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Помилився?",
      {
        "type": "markup",
        "kind": "standalone",
        "name": "br"
      },
      {
        "type": "markup",
        "kind": "open",
        "name": "a",
        "options": {
          "search": {
            "type": "variable",
            "name": "search"
          },
          "viewTransition": {
            "type": "variable",
            "name": "viewTransition"
          }
        }
      },
      "Повернутся назад",
      {
        "type": "markup",
        "kind": "close",
        "name": "a"
      }
    ]
  },
  "step.name.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Як тебе звати?"
    ]
  },
  "step.name.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вкажи ім’я та прізвище, щоб викладач міг тебе впізнати."
    ]
  },
  "step.category.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери напрямки"
    ]
  },
  "step.category.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери напрямки, за якими ти навчаєшся. Можна обрати кілька."
    ]
  },
  "step.course.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери свій курс"
    ]
  },
  "step.course.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери групи, у яких ти навчаєшся. Натисни на свій курс, щоб обрати розклад."
    ]
  },
  "step.group.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери час твого уроку"
    ]
  },
  "step.group.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери день і час, коли ти відвідуєш цей курс."
    ]
  },
  "step.direction.progress": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Напрямок ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "current"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      },
      " із ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "total"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      }
    ]
  },
  "step.selection.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Наразі немає доступних варіантів."
    ]
  },
  "course.category": {
    "type": "select",
    "declarations": [
      {
        "type": "input",
        "name": "category",
        "value": {
          "type": "expression",
          "arg": {
            "type": "variable",
            "name": "category"
          },
          "functionRef": {
            "type": "function",
            "name": "string"
          }
        }
      }
    ],
    "selectors": [
      {
        "type": "variable",
        "name": "category"
      }
    ],
    "variants": [
      {
        "keys": [
          {
            "type": "literal",
            "value": "game dev"
          }
        ],
        "value": [
          "Розробка ігор"
        ]
      },
      {
        "keys": [
          {
            "type": "literal",
            "value": "embedded"
          }
        ],
        "value": [
          "Робототехніка"
        ]
      },
      {
        "keys": [
          {
            "type": "literal",
            "value": "web"
          }
        ],
        "value": [
          "Веброзробка"
        ]
      },
      {
        "keys": [
          {
            "type": "literal",
            "value": "primary"
          }
        ],
        "value": [
          "Перші кроки в ІТ"
        ]
      },
      {
        "keys": [
          {
            "type": "literal",
            "value": "python"
          }
        ],
        "value": [
          "Програмування на Python"
        ]
      },
      {
        "keys": [
          {
            "type": "*"
          }
        ],
        "value": [
          "Інші напрямки"
        ]
      }
    ]
  },
  "step.avatar.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери аватар"
    ]
  },
  "step.avatar.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Гортай аватари вліво або вправо. Обраним буде той, що посередині."
    ]
  },
  "step.avatar.suggest": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Запропонувати аватар, якщо бажаного нема."
    ]
  },
  "step.view.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Правильно?"
    ]
  },
  "step.view.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевір ім’я, аватар і розклад. Якщо все правильно, натисни «Завершити»."
    ]
  },
  "step.success.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вітаю!"
    ]
  },
  "step.success.subtitle": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Твій акаунт створено"
    ]
  },
  "step.success.password": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Твій пароль"
    ]
  },
  "step.success.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Натисни на око, щоб побачити пароль. Збережи його — він потрібен для входу в акаунт."
    ]
  },
  "step.success.profile": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перейти в профіль"
    ]
  },
  "error.profile-entry-failed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося увійти. Спробуй ще раз."
    ]
  },
  "weekday.monday": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Понеділок"
    ]
  },
  "weekday.tuesday": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вівторок"
    ]
  },
  "weekday.wednesday": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Середа"
    ]
  },
  "weekday.thursday": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Четвер"
    ]
  },
  "weekday.friday": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "П’ятниця"
    ]
  },
  "weekday.saturday": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Субота"
    ]
  },
  "weekday.sunday": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Неділя"
    ]
  },
  "group.select.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери групу"
    ]
  },
  "group.filter.all": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Всі (",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "count"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      },
      ")"
    ]
  },
  "group.students-count": {
    "type": "select",
    "declarations": [
      {
        "type": "input",
        "name": "count",
        "value": {
          "type": "expression",
          "arg": {
            "type": "variable",
            "name": "count"
          },
          "functionRef": {
            "type": "function",
            "name": "number"
          }
        }
      }
    ],
    "selectors": [
      {
        "type": "variable",
        "name": "count"
      }
    ],
    "variants": [
      {
        "keys": [
          {
            "type": "literal",
            "value": "one"
          }
        ],
        "value": [
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учень"
        ]
      },
      {
        "keys": [
          {
            "type": "literal",
            "value": "few"
          }
        ],
        "value": [
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учні"
        ]
      },
      {
        "keys": [
          {
            "type": "literal",
            "value": "many"
          }
        ],
        "value": [
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учнів"
        ]
      },
      {
        "keys": [
          {
            "type": "*"
          }
        ],
        "value": [
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учня"
        ]
      }
    ]
  },
  "group.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назад до вибору груп"
    ]
  },
  "group.current": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточна"
    ]
  },
  "student.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учнів за вашим запитом не знайдено"
    ]
  },
  "student.group-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "У цій групі ще немає учнів"
    ]
  },
  "field.student-search.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук учня за іменем..."
    ]
  },
  "action.clear-search.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Очистити пошук"
    ]
  },
  "sort.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сортування"
    ]
  },
  "sort.students": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сортування учнів"
    ]
  },
  "sort.name-asc": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ім'я: від А до Я"
    ]
  },
  "sort.name-desc": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ім'я: від Я до А"
    ]
  },
  "group.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити дані."
    ]
  },
  "award.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося підтвердити зміну балансу. Перевірте баланс перед наступною дією."
    ]
  },
  "reason.theory": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Теорія"
    ]
  },
  "reason.practice_completed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Практика"
    ]
  },
  "reason.additional_task_completed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додаткове завдання"
    ]
  },
  "reason.discipline_breakdown": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Порушення дисципліни"
    ]
  },
  "reason.middle_level_violation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Порушення середнього рівня"
    ]
  },
  "reason.serious_violation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Серйозне порушення"
    ]
  },
  "sort.balance-desc": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Баланс: за спаданням"
    ]
  },
  "sort.balance-asc": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Баланс: за зростанням"
    ]
  },
  "award.reason.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть причину"
    ]
  },
  "award.reward": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагородити"
    ]
  },
  "award.punish": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Покарати"
    ]
  },
  "award.history.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Історія нагород"
    ]
  },
  "award.history.all": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Уся"
    ]
  },
  "award.history.view-all": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Уся історія нагород"
    ]
  },
  "award.history.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Історія нагород порожня"
    ]
  },
  "award.cancel.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося скасувати транзакцію. Спробуйте ще раз."
    ]
  },
  "award.cancel.confirm.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скасувати транзакцію"
    ]
  },
  "award.cancel.confirm.trigger": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скасувати транзакцію на ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "amount"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      },
      " робокоїнів"
    ]
  },
  "award.cancel.locked": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Транзакцію більше не можна скасувати"
    ]
  },
  "award.deduct.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити списання?"
    ]
  },
  "award.deduct.confirm.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Баланс учня ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "student"
        }
      },
      " буде зменшено. Причина: ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "reason"
        }
      },
      "."
    ]
  },
  "award.deduct.confirm.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Списати робокоїни"
    ]
  },
  "reason.activity": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Активність на уроці"
    ]
  },
  "reason.homework": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Домашнє завдання"
    ]
  },
  "reason.teamwork": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Допомога команді"
    ]
  },
  "reason.answer": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Гарна відповідь"
    ]
  },
  "reason.initiative": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ініціатива"
    ]
  },
  "reason.discipline": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Порушення дисципліни"
    ]
  },
  "reason.mistake": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Помилкове нарахування"
    ]
  },
  "reason.late": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Запізнення на урок"
    ]
  },
  "reason.incomplete": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Невиконання завдання"
    ]
  },
  "reason.other": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Інше"
    ]
  },
  "profile.balance.amount": {
    "type": "message",
    "declarations": [],
    "pattern": [
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "count"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      }
    ]
  },
  "profile.balance.open-shop": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відкрити крамницю нагород"
    ]
  },
  "profile.greeting.pair.1.greeting": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Доброго дня!"
    ]
  },
  "profile.greeting.pair.1.caption": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сьогодні на тебе чекає багато нового!"
    ]
  },
  "profile.greeting.pair.2.greeting": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Привіт!"
    ]
  },
  "profile.greeting.pair.2.caption": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Час нових пригод!"
    ]
  },
  "profile.greeting.pair.3.greeting": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "З поверненням!"
    ]
  },
  "profile.greeting.pair.3.caption": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Твоя ціль стає ближчою!"
    ]
  },
  "profile.greeting.pair.4.greeting": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "День відкриттів!"
    ]
  },
  "profile.greeting.pair.4.caption": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Що цікавого сьогодні?"
    ]
  },
  "profile.greeting.pair.5.greeting": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пригоди чекають!"
    ]
  },
  "profile.greeting.pair.5.caption": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Попереду багато цікавого!"
    ]
  },
  "profile.goal.kicker": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Моя ціль"
    ]
  },
  "profile.goal.loading": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завантажуємо ціль"
    ]
  },
  "profile.goal.progress": {
    "type": "message",
    "declarations": [],
    "pattern": [
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "saved"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      },
      " / ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "price"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      }
    ]
  },
  "profile.goal.change": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змінити ціль"
    ]
  },
  "profile.goal.claim": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Забрати"
    ]
  },
  "profile.goal.choose": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обрати ціль"
    ]
  },
  "profile.earn.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Як заробити робокоїни"
    ]
  },
  "profile.earn.theory": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Розгорнута відповідь на одне або кілька запитань"
    ]
  },
  "profile.earn.practice": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Виконане завдання від викладача"
    ]
  },
  "profile.earn.additional": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Необов’язкове завдання з нагородою"
    ]
  },
  "profile.earn.activity": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Будь активним на уроці"
    ]
  },
  "profile.earn.homework": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Виконуй домашні завдання"
    ]
  },
  "profile.earn.teamwork": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Допомагай команді"
    ]
  },
  "profile.earn.answer": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Дай гарну відповідь"
    ]
  },
  "profile.earn.initiative": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пропонуй власні ідеї"
    ]
  },
  "profile.goal.none": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ціль не обрана"
    ]
  },
  "profile.goal.shop": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перейти до магазину, щоб обрати ціль"
    ]
  },
  "profile.goal.completed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Достатньо робокоїнів!"
    ]
  },
  "profile.goal.target": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "із ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "count"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      }
    ]
  },
  "profile.goal.remaining": {
    "type": "select",
    "declarations": [
      {
        "type": "input",
        "name": "count",
        "value": {
          "type": "expression",
          "arg": {
            "type": "variable",
            "name": "count"
          },
          "functionRef": {
            "type": "function",
            "name": "number"
          }
        }
      }
    ],
    "selectors": [
      {
        "type": "variable",
        "name": "count"
      }
    ],
    "variants": [
      {
        "keys": [
          {
            "type": "literal",
            "value": "one"
          }
        ],
        "value": [
          "Залишився ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " робокоїн!"
        ]
      },
      {
        "keys": [
          {
            "type": "literal",
            "value": "few"
          }
        ],
        "value": [
          "Залишилося ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " робокоїни!"
        ]
      },
      {
        "keys": [
          {
            "type": "literal",
            "value": "many"
          }
        ],
        "value": [
          "Залишилося ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " робокоїнів!"
        ]
      },
      {
        "keys": [
          {
            "type": "*"
          }
        ],
        "value": [
          "Залишилося ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " робокоїна!"
        ]
      }
    ]
  },
  "profile.history.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Історія"
    ]
  },
  "history.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Уся історія нагород"
    ]
  },
  "history.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назад"
    ]
  },
  "history.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити історію нагород"
    ]
  },
  "history.load-more": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завантажити ще"
    ]
  },
  "history.end": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Це вся історія нагород"
    ]
  },
  "history.cancelled": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скасовано"
    ]
  },
  "history.no-reason": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Причину не вказано"
    ]
  },
  "history.date": {
    "type": "message",
    "declarations": [],
    "pattern": [
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "date"
        },
        "functionRef": {
          "type": "function",
          "name": "datetime",
          "options": {
            "year": {
              "type": "literal",
              "value": "numeric"
            },
            "month": {
              "type": "literal",
              "value": "2-digit"
            },
            "day": {
              "type": "literal",
              "value": "2-digit"
            },
            "hour": {
              "type": "literal",
              "value": "2-digit"
            },
            "minute": {
              "type": "literal",
              "value": "2-digit"
            }
          }
        }
      }
    ]
  },
  "profile.history.all": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Уся історія"
    ]
  },
  "profile.history.loading": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завантаження історії…"
    ]
  },
  "profile.history.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Операцій поки немає"
    ]
  },
  "profile.history.empty.mascot": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Тут з’являться твої перші нагороди!"
    ]
  },
  "profile.history.today": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сьогодні"
    ]
  },
  "profile.history.yesterday": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учора"
    ]
  },
  "profile.history.day": {
    "type": "message",
    "declarations": [],
    "pattern": [
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "date"
        },
        "functionRef": {
          "type": "function",
          "name": "date",
          "options": {
            "fields": {
              "type": "literal",
              "value": "month-day"
            },
            "length": {
              "type": "literal",
              "value": "long"
            },
            "timeZone": {
              "type": "literal",
              "value": "UTC"
            }
          }
        }
      }
    ]
  },
  "profile.history.amount": {
    "type": "message",
    "declarations": [],
    "pattern": [
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "count"
        },
        "functionRef": {
          "type": "function",
          "name": "number",
          "options": {
            "signDisplay": {
              "type": "literal",
              "value": "always"
            }
          }
        }
      }
    ]
  },
  "profile.rules": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Усі способи"
    ]
  },
  "profile.rules.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Як працюють робокоїни"
    ]
  },
  "profile.rules.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладач нараховує або списує робокоїни з таких причин."
    ]
  },
  "profile.rules.reward": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "За що нараховують"
    ]
  },
  "profile.rules.punish": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "За що списують"
    ]
  },
  "profile.rules.loading": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завантаження правил…"
    ]
  },
  "profile.rules.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити правила."
    ]
  },
  "profile.rules.close": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зрозуміло"
    ]
  },
  "reason.balance-change": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зміна балансу"
    ]
  },
  "profile.balance.caption": {
    "type": "select",
    "declarations": [
      {
        "type": "input",
        "name": "count",
        "value": {
          "type": "expression",
          "arg": {
            "type": "variable",
            "name": "count"
          },
          "functionRef": {
            "type": "function",
            "name": "number"
          }
        }
      }
    ],
    "selectors": [
      {
        "type": "variable",
        "name": "count"
      }
    ],
    "variants": [
      {
        "keys": [
          {
            "type": "literal",
            "value": "one"
          }
        ],
        "value": [
          "робокоїн"
        ]
      },
      {
        "keys": [
          {
            "type": "literal",
            "value": "few"
          }
        ],
        "value": [
          "робокоїни"
        ]
      },
      {
        "keys": [
          {
            "type": "literal",
            "value": "many"
          }
        ],
        "value": [
          "робокоїнів"
        ]
      },
      {
        "keys": [
          {
            "type": "*"
          }
        ],
        "value": [
          "робокоїна"
        ]
      }
    ]
  },
  "error.code": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "500"
    ]
  },
  "error.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Щось пішло не так"
    ]
  },
  "error.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити сторінку. Спробуйте ще раз."
    ]
  },
  "error.retry": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Спробувати ще раз"
    ]
  },
  "not-found.code": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "404"
    ]
  },
  "not-found.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Такої сторінки немає"
    ]
  },
  "not-found.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевірте адресу або поверніться туди, де все на місці."
    ]
  },
  "not-found.home": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "На головну"
    ]
  },
  "student.profile.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Профіль"
    ]
  },
  "student.profile.edit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Редагувати учня"
    ]
  },
  "profile.groups": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групи"
    ]
  },
  "profile.courses": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Курси"
    ]
  },
  "profile.groups.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поки не складається в жодній групі."
    ]
  },
  "student.edit.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Налаштування учня"
    ]
  },
  "student.edit.section.profile": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Профіль"
    ]
  },
  "student.edit.section.groups": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групи"
    ]
  },
  "student.edit.nickname.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нікнейм"
    ]
  },
  "student.edit.nickname.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нікнейм учня"
    ]
  },
  "student.edit.nickname.save": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зберегти нікнейм"
    ]
  },
  "student.edit.nickname.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося зберегти нікнейм. Спробуйте ще раз."
    ]
  },
  "student.edit.avatar.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Аватар"
    ]
  },
  "student.edit.avatar.change": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змінити аватар"
    ]
  },
  "student.edit.avatar.save": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зберегти аватар"
    ]
  },
  "student.edit.avatar.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося зберегти аватар. Спробуйте ще раз."
    ]
  },
  "student.edit.groups.source-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "З групи"
    ]
  },
  "student.edit.groups.target-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "У групу"
    ]
  },
  "student.edit.groups.source-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учень поки не складається в групах."
    ]
  },
  "student.edit.groups.target-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає доступних груп для додавання."
    ]
  },
  "student.edit.groups.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обрати групу"
    ]
  },
  "field.group-search.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук групи або курсу…"
    ]
  },
  "student.edit.groups.remove.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Прибрати учня з попередньої групи"
    ]
  },
  "student.edit.groups.remove.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Після переведення учень перестане складатися в групі «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "group"
        }
      },
      "»."
    ]
  },
  "student.edit.groups.add-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додати в групу"
    ]
  },
  "student.edit.groups.transfer-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевести в групу"
    ]
  },
  "student.edit.groups.kick-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Виключити з групи"
    ]
  },
  "student.edit.groups.kick.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Виключити учня з групи?"
    ]
  },
  "student.edit.groups.kick.confirm.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учень ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "student"
        }
      },
      " перестане складатися в групі «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "group"
        }
      },
      "»."
    ]
  },
  "student.edit.groups.kick.confirm.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Виключити"
    ]
  },
  "student.edit.groups.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити зміну груп учня?"
    ]
  },
  "student.edit.groups.confirm.add-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учня ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "student"
        }
      },
      " буде додано в групу «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "group"
        }
      },
      "»."
    ]
  },
  "student.edit.groups.confirm.transfer-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учня ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "student"
        }
      },
      " буде переведено з групи «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "source"
        }
      },
      "» у групу «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "target"
        }
      },
      "»."
    ]
  },
  "student.edit.groups.confirm.keep-source": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учень залишиться в групі «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "group"
        }
      },
      "»."
    ]
  },
  "student.edit.groups.confirm.remove-source": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учень перестане складатися в групі «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "group"
        }
      },
      "»."
    ]
  },
  "student.edit.groups.confirm.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити"
    ]
  },
  "student.edit.groups.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося оновити групу учня. Спробуйте ще раз."
    ]
  },
  "student.edit.groups.partial-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учня додано в нову групу, але він залишився в попередній."
    ]
  },
  "student.edit.groups.partial-retry": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Повторити видалення"
    ]
  },
  "student.edit.groups.success": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групи учня оновлено."
    ]
  },
  "student.edit.groups.membership-changed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Склад груп змінився. Оберіть групу ще раз."
    ]
  }
}