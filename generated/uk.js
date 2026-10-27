export default {
  "access.code.copied": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Код скопійовано"
    ]
  },
  "access.code.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Код доступу"
    ]
  },
  "access.code.reset": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скинути код"
    ]
  },
  "access.code.reset-confirm-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скинути код доступу?"
    ]
  },
  "access.sessions.confirm-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завершити сесії?"
    ]
  },
  "access.sessions.end": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завершити сесії"
    ]
  },
  "access.sessions.result-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сесії не завершено"
    ]
  },
  "action.award": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нарахувати"
    ]
  },
  "action.cancel": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скасувати"
    ]
  },
  "action.clear-search.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Очистити пошук"
    ]
  },
  "action.close": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Закрити"
    ]
  },
  "action.confirm": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити"
    ]
  },
  "action.continue-locally": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Продовжити локально"
    ]
  },
  "action.create-another": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Створити ще"
    ]
  },
  "action.deduct": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Списати"
    ]
  },
  "action.delete": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалити"
    ]
  },
  "action.delete.confirm-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити видалення?"
    ]
  },
  "action.enter.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Увійти"
    ]
  },
  "action.finish.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завершити"
    ]
  },
  "action.login.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не пам'ятаєш пароль? Звернись до викладача."
    ]
  },
  "action.login.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вхід в акаунт"
    ]
  },
  "action.next.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Далі"
    ]
  },
  "action.register": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зареєструвати"
    ]
  },
  "action.rename": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перейменувати"
    ]
  },
  "action.save-avatar": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зберегти аватар"
    ]
  },
  "action.save-nickname": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зберегти нікнейм"
    ]
  },
  "action.show": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Показати"
    ]
  },
  "admin.operations.direction.punish": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Списання"
    ]
  },
  "admin.operations.direction.reward": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нарахування"
    ]
  },
  "balance.acknowledge": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити перевірку"
    ]
  },
  "balance.cancel.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скасувати транзакцію"
    ]
  },
  "balance.change": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змінити баланс"
    ]
  },
  "balance.deduct.confirm-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити списання?"
    ]
  },
  "balance.direction": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Напрямок операції"
    ]
  },
  "categories.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Категорія"
    ]
  },
  "categories.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Категорії"
    ]
  },
  "coins.amount": {
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
  "coins.unit": {
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
  "courses.error.load": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити курси."
    ]
  },
  "courses.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Курс"
    ]
  },
  "courses.name": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назва курсу"
    ]
  },
  "courses.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Курси"
    ]
  },
  "error.code": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "500"
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
  "error.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Щось пішло не так"
    ]
  },
  "field.action.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Дія"
    ]
  },
  "field.avatar.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Аватар"
    ]
  },
  "field.current-name": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточна назва"
    ]
  },
  "field.description.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Опис"
    ]
  },
  "field.full-name.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ім’я та прізвище"
    ]
  },
  "field.group-search.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук групи або курсу…"
    ]
  },
  "field.name.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Твоє ім'я"
    ]
  },
  "field.nickname.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нікнейм"
    ]
  },
  "field.password.caption": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Твій пароль"
    ]
  },
  "field.password.hide": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Приховати пароль"
    ]
  },
  "field.password.show": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Показати пароль"
    ]
  },
  "field.proposed-name": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Запропонована назва"
    ]
  },
  "field.student-nickname.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нікнейм учня"
    ]
  },
  "field.student-search.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук учня за іменем..."
    ]
  },
  "filters.all-catalog-categories": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Усі категорії"
    ]
  },
  "filters.all-categories": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Усі напрямки"
    ]
  },
  "filters.all-courses": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Усі курси"
    ]
  },
  "filters.all-groups": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Усі групи"
    ]
  },
  "filters.all-teachers": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Усі викладачі"
    ]
  },
  "filters.all-types": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Усі типи"
    ]
  },
  "filters.category": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Фільтр за напрямком"
    ]
  },
  "filters.clear": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скинути фільтри"
    ]
  },
  "filters.course": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Фільтр за курсом"
    ]
  },
  "filters.teacher": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Фільтр за викладачем"
    ]
  },
  "filters.toggle": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Фільтри"
    ]
  },
  "group.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити дані."
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
  "groups.add.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додати до групи"
    ]
  },
  "groups.count": {
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
          " група"
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
          " групи"
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
          " груп"
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
          " групи"
        ]
      }
    ]
  },
  "groups.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Груп поки немає."
    ]
  },
  "groups.empty-filtered": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "За такими умовами груп не знайдено."
    ]
  },
  "groups.error.load": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити групи."
    ]
  },
  "groups.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Група"
    ]
  },
  "groups.name": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назва групи"
    ]
  },
  "groups.remove.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Прибрати з групи"
    ]
  },
  "groups.search.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук груп"
    ]
  },
  "groups.select.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть групу"
    ]
  },
  "groups.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групи"
    ]
  },
  "groups.transfer.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевести"
    ]
  },
  "groups.transfer.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає інших груп для переведення."
    ]
  },
  "history.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назад"
    ]
  },
  "history.cancelled": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скасовано"
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
  "history.end": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Це вся історія нагород"
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
  "history.loading": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завантаження історії…"
    ]
  },
  "history.no-reason": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Причину не вказано"
    ]
  },
  "history.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Уся історія нагород"
    ]
  },
  "navbar.catalog": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Каталог"
    ]
  },
  "navbar.home": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Головна"
    ]
  },
  "navbar.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Основна навігація"
    ]
  },
  "navbar.learning": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Навчання"
    ]
  },
  "navbar.settings": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Налаштування"
    ]
  },
  "navbar.shop": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Магазин"
    ]
  },
  "navigation.catalog": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До каталогу"
    ]
  },
  "navigation.groups": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До груп"
    ]
  },
  "navigation.home": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "На головну"
    ]
  },
  "navigation.login": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До входу"
    ]
  },
  "navigation.profile": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До профілю"
    ]
  },
  "not-found.code": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "404"
    ]
  },
  "not-found.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевірте адресу або поверніться туди, де все на місці."
    ]
  },
  "not-found.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Такої сторінки немає"
    ]
  },
  "people.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Люди"
    ]
  },
  "profile.groups.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поки не складається в жодній групі."
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
  "profile.history.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Операцій поки немає"
    ]
  },
  "profile.open": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відкрити профіль"
    ]
  },
  "profile.open-label": {
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
  "ranking.place": {
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
  "reason.activity": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Активність на уроці"
    ]
  },
  "reason.additional_task_completed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додаткове завдання"
    ]
  },
  "reason.answer": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Гарна відповідь"
    ]
  },
  "reason.balance-change": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зміна балансу"
    ]
  },
  "reason.discipline": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Порушення дисципліни"
    ]
  },
  "reason.discipline_breakdown": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Порушення дисципліни"
    ]
  },
  "reason.homework": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Домашнє завдання"
    ]
  },
  "reason.incomplete": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Невиконання завдання"
    ]
  },
  "reason.initiative": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ініціатива"
    ]
  },
  "reason.late": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Запізнення на урок"
    ]
  },
  "reason.middle_level_violation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Порушення середнього рівня"
    ]
  },
  "reason.mistake": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Помилкове нарахування"
    ]
  },
  "reason.other": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Інше"
    ]
  },
  "reason.practice_completed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Практика"
    ]
  },
  "reason.serious_violation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Серйозне порушення"
    ]
  },
  "reason.teamwork": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Допомога команді"
    ]
  },
  "reason.theory": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Теорія"
    ]
  },
  "reasons.error.load": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити причини."
    ]
  },
  "role.student": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учень"
    ]
  },
  "role.teacher": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладач"
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
  "step.avatar.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери аватар"
    ]
  },
  "step.success.profile": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перейти в профіль"
    ]
  },
  "student.profile.edit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Редагувати учня"
    ]
  },
  "teachers.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладачів поки немає."
    ]
  },
  "teachers.name": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ім’я викладача"
    ]
  },
  "teachers.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладачі"
    ]
  },
  "validation.name-unchanged": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Введіть нову назву, відмінну від поточної."
    ]
  },
  "weekday.friday": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "П’ятниця"
    ]
  },
  "weekday.monday": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Понеділок"
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
  "weekday.thursday": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Четвер"
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
  "error.incorrect-password": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Неправильний пароль."
    ]
  },
  "error.profile-entry-failed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося увійти. Спробуй ще раз."
    ]
  },
  "error.registration-failed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сталася неочікувана помилка"
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
  "step.category.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери напрямки, за якими ти навчаєшся. Можна обрати кілька."
    ]
  },
  "step.category.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери напрямки"
    ]
  },
  "step.course.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери групи, у яких ти навчаєшся. Натисни на свій курс, щоб обрати розклад."
    ]
  },
  "step.course.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери свій курс"
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
  "step.group.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери день і час, коли ти відвідуєш цей курс."
    ]
  },
  "step.group.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери час твого уроку"
    ]
  },
  "step.name.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вкажи ім’я та прізвище, щоб викладач міг тебе впізнати."
    ]
  },
  "step.name.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Як тебе звати?"
    ]
  },
  "step.selection.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Наразі немає доступних варіантів."
    ]
  },
  "step.success.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Натисни на око, щоб побачити пароль. Збережи його — він потрібен для входу в акаунт."
    ]
  },
  "step.success.subtitle": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Твій акаунт створено"
    ]
  },
  "step.success.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вітаю!"
    ]
  },
  "step.view.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевір ім’я, аватар і розклад. Якщо все правильно, натисни «Завершити»."
    ]
  },
  "step.view.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Правильно?"
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
  "settings.logout.confirm.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Щоб повернутися, потрібно буде знову ввести пароль."
    ]
  },
  "settings.logout.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вийти з акаунту?"
    ]
  },
  "settings.logout.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося вийти. Спробуйте ще раз."
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
  "leaderboard.all": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Увесь рейтинг"
    ]
  },
  "leaderboard.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Найбільше зароблених робокоїнів"
    ]
  },
  "leaderboard.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Цього тижня рейтинг ще порожній. Попереду нові досягнення!"
    ]
  },
  "leaderboard.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити рейтинг."
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
  "leaderboard.loading": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завантажуємо рейтинг"
    ]
  },
  "leaderboard.own.near": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Однаковий результат із наступним місцем"
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
  "leaderboard.rank.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити твоє місце."
    ]
  },
  "leaderboard.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Рейтинг тижня"
    ]
  },
  "leaderboard.unranked": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Отримай перші робокоїни цього тижня, щоб з’явитися в рейтингу."
    ]
  },
  "leaderboard.you": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ти"
    ]
  },
  "profile.balance.open-shop": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відкрити крамницю нагород"
    ]
  },
  "profile.cyberween.open": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відкрити допис Cyberween в Instagram"
    ]
  },
  "profile.cyberween.period": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Конкурс 31.10 – 09.11"
    ]
  },
  "profile.cyberween.tagline": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Твій герой виходить із гри"
    ]
  },
  "profile.earn.activity": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Будь активним на уроці"
    ]
  },
  "profile.earn.additional": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Необов’язкове завдання з нагородою"
    ]
  },
  "profile.earn.answer": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Дай гарну відповідь"
    ]
  },
  "profile.earn.homework": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Виконуй домашні завдання"
    ]
  },
  "profile.earn.initiative": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пропонуй власні ідеї"
    ]
  },
  "profile.earn.practice": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Виконане завдання від викладача"
    ]
  },
  "profile.earn.teamwork": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Допомагай команді"
    ]
  },
  "profile.earn.theory": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Розгорнута відповідь на одне або кілька запитань"
    ]
  },
  "profile.earn.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Як заробити робокоїни"
    ]
  },
  "profile.goal.change": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змінити ціль"
    ]
  },
  "profile.goal.choose": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обрати ціль"
    ]
  },
  "profile.goal.claim": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Забрати"
    ]
  },
  "profile.goal.completed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Достатньо робокоїнів!"
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
  "profile.goal.none": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ціль не обрана"
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
  "profile.goal.shop": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перейти до магазину, щоб обрати ціль"
    ]
  },
  "profile.greeting.pair.1.caption": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сьогодні на тебе чекає багато нового!"
    ]
  },
  "profile.greeting.pair.1.greeting": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Доброго дня!"
    ]
  },
  "profile.greeting.pair.2.caption": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Час нових пригод!"
    ]
  },
  "profile.greeting.pair.2.greeting": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Привіт!"
    ]
  },
  "profile.greeting.pair.3.caption": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Твоя ціль стає ближчою!"
    ]
  },
  "profile.greeting.pair.3.greeting": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "З поверненням!"
    ]
  },
  "profile.greeting.pair.4.caption": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Що цікавого сьогодні?"
    ]
  },
  "profile.greeting.pair.4.greeting": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "День відкриттів!"
    ]
  },
  "profile.greeting.pair.5.caption": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Попереду багато цікавого!"
    ]
  },
  "profile.greeting.pair.5.greeting": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пригоди чекають!"
    ]
  },
  "profile.history.all": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Уся історія"
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
  "profile.history.empty.mascot": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Тут з’являться твої перші нагороди!"
    ]
  },
  "profile.history.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Історія"
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
  "profile.rules": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Усі способи"
    ]
  },
  "profile.rules.close": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зрозуміло"
    ]
  },
  "profile.rules.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладач нараховує або списує робокоїни з таких причин."
    ]
  },
  "profile.rules.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити правила."
    ]
  },
  "profile.rules.loading": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завантаження правил…"
    ]
  },
  "profile.rules.punish": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "За що списують"
    ]
  },
  "profile.rules.reward": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "За що нараховують"
    ]
  },
  "profile.rules.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Як працюють робокоїни"
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
  "shop.reward.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назад до галактики"
    ]
  },
  "shop.reward.claim": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Отримати"
    ]
  },
  "shop.reward.cost": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вартість"
    ]
  },
  "shop.reward.insufficient": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Бракує монет"
    ]
  },
  "shop.reward.type.privilege": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Привілей"
    ]
  },
  "shop.reward.type.reward": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Приз"
    ]
  },
  "shop.view.galaxy": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Галактика"
    ]
  },
  "shop.view.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вигляд магазину"
    ]
  },
  "shop.view.list": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Список"
    ]
  },
  "student.profile.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Профіль"
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
  "award.cancel.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося скасувати транзакцію. Спробуйте ще раз."
    ]
  },
  "award.cancel.locked": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Транзакцію більше не можна скасувати"
    ]
  },
  "award.deduct.confirm.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Списати робокоїни"
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
  "award.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося підтвердити зміну балансу. Перевірте баланс перед наступною дією."
    ]
  },
  "award.history.all": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Уся"
    ]
  },
  "award.history.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Історія нагород порожня"
    ]
  },
  "award.history.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Історія нагород"
    ]
  },
  "award.punish": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Покарати"
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
  "group.practice.award": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нарахувати всім за практику"
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
  "group.practice.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нарахувати всій групі?"
    ]
  },
  "group.practice.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося підтвердити нарахування. Перевір баланси групи перед повторною спробою."
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
  "group.select.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обери групу"
    ]
  },
  "sort.balance-asc": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Баланс: за зростанням"
    ]
  },
  "sort.balance-desc": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Баланс: за спаданням"
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
  "sort.students": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сортування учнів"
    ]
  },
  "sort.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сортування"
    ]
  },
  "student.edit.avatar.change": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змінити аватар"
    ]
  },
  "student.edit.avatar.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося зберегти аватар. Спробуйте ще раз."
    ]
  },
  "student.edit.groups.add-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додати в групу"
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
  "student.edit.groups.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити зміну груп учня?"
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
  "student.edit.groups.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося оновити групу учня. Спробуйте ще раз."
    ]
  },
  "student.edit.groups.kick-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Виключити з групи"
    ]
  },
  "student.edit.groups.kick.confirm.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Виключити"
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
  "student.edit.groups.kick.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Виключити учня з групи?"
    ]
  },
  "student.edit.groups.membership-changed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Склад груп змінився. Оберіть групу ще раз."
    ]
  },
  "student.edit.groups.partial-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учня додано в нову групу, але він залишився в попередній."
    ]
  },
  "student.edit.groups.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обрати групу"
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
  "student.edit.groups.remove.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Прибрати учня з попередньої групи"
    ]
  },
  "student.edit.groups.source-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учень поки не складається в групах."
    ]
  },
  "student.edit.groups.source-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "З групи"
    ]
  },
  "student.edit.groups.success": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групи учня оновлено."
    ]
  },
  "student.edit.groups.target-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає доступних груп для додавання."
    ]
  },
  "student.edit.groups.target-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "У групу"
    ]
  },
  "student.edit.groups.transfer-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевести в групу"
    ]
  },
  "student.edit.nickname.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося зберегти нікнейм. Спробуйте ще раз."
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
  "student.password.regenerate": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Згенерувати новий пароль"
    ]
  },
  "student.password.regenerate.confirm.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Згенерувати"
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
  "student.password.regenerate.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Згенерувати новий пароль?"
    ]
  },
  "student.password.regenerate.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося згенерувати новий пароль. Спробуйте ще раз."
    ]
  },
  "admin.groups.back-to-group": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До групи"
    ]
  },
  "admin.groups.change-course.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змінити курс"
    ]
  },
  "admin.groups.change-course.courses-empty-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Створіть курс, щоб перенести до нього групу."
    ]
  },
  "admin.groups.change-course.courses-empty-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає доступних курсів"
    ]
  },
  "admin.groups.change-course.current": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточний курс"
    ]
  },
  "admin.groups.change-course.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Новий курс для групи «",
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
  "admin.groups.change-course.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Новий курс для вибраної групи."
    ]
  },
  "admin.groups.change-course.note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Серверна операція зміни курсу недоступна. Форма покаже локальний результат без зміни групи."
    ]
  },
  "admin.groups.change-course.proposed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Запропонований курс"
    ]
  },
  "admin.groups.change-course.result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Курс не змінено на сервері. Група залишиться в попередньому курсі."
    ]
  },
  "admin.groups.change-course.same": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть інший курс, щоб продовжити."
    ]
  },
  "admin.groups.change-course.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зміна курсу"
    ]
  },
  "admin.groups.create-first": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Створити першу групу"
    ]
  },
  "admin.groups.create.course-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть курс зі списку."
    ]
  },
  "admin.groups.create.course-placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть курс"
    ]
  },
  "admin.groups.create.courses-empty-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Спочатку створіть курс, а потім додайте до нього групу."
    ]
  },
  "admin.groups.create.courses-empty-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає курсів для групи"
    ]
  },
  "admin.groups.create.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося створити групу. Спробуйте ще раз."
    ]
  },
  "admin.groups.create.error.validation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер відхилив дані групи. Перевірте назву, курс, викладачів і вимоги сервера."
    ]
  },
  "admin.groups.create.name-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Введіть у форматі НД 16:00: день тижня та час."
    ]
  },
  "admin.groups.create.name-placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Формат: НД 16:00"
    ]
  },
  "admin.groups.create.open": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відкрити групу"
    ]
  },
  "admin.groups.create.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Створити групу"
    ]
  },
  "admin.groups.create.success-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Група «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "group"
        }
      },
      "» додана до курсу «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "course"
        }
      },
      "»."
    ]
  },
  "admin.groups.create.success-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групу створено"
    ]
  },
  "admin.groups.create.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нова група"
    ]
  },
  "admin.groups.delete.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалити групу"
    ]
  },
  "admin.groups.delete.confirm-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назва не збігається з назвою групи."
    ]
  },
  "admin.groups.delete.confirm-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Введіть назву групи для підтвердження"
    ]
  },
  "admin.groups.delete.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалення групи «",
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
  "admin.groups.delete.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалення вибраної групи."
    ]
  },
  "admin.groups.delete.dialog-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердьте намір видалити групу «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "group"
        }
      },
      "». Оскільки сервер не має видалення, група залишиться на сервері."
    ]
  },
  "admin.groups.delete.note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Серверна операція видалення недоступна. Форма перевірить підтвердження та покаже, що групу не видалено."
    ]
  },
  "admin.groups.delete.result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групу не видалено. Серверна операція недоступна, тому список груп не змінився."
    ]
  },
  "admin.groups.delete.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалення групи"
    ]
  },
  "admin.groups.delete.warning": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групу не буде видалено, бо сервер не має такої операції. Список груп залишиться без змін."
    ]
  },
  "admin.groups.detail.change-course-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перенести групу в інший курс."
    ]
  },
  "admin.groups.detail.course-fallback": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Курс #",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "id"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      }
    ]
  },
  "admin.groups.detail.delete-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Прибрати групу зі списку разом із складом."
    ]
  },
  "admin.groups.detail.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Група школи."
    ]
  },
  "admin.groups.detail.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити групу."
    ]
  },
  "admin.groups.detail.manage": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Керування групою"
    ]
  },
  "admin.groups.detail.practice-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нарахувати робокоїни всій групі за практику."
    ]
  },
  "admin.groups.detail.rename": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перейменувати групу"
    ]
  },
  "admin.groups.detail.rename-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змінити назву групи."
    ]
  },
  "admin.groups.detail.students": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учні групи"
    ]
  },
  "admin.groups.detail.students-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "У групі ще немає учнів."
    ]
  },
  "admin.groups.detail.students-manage": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Керувати складом"
    ]
  },
  "admin.groups.detail.students-unavailable": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер повідомляє про учнів, але список імен недоступний."
    ]
  },
  "admin.groups.detail.teachers-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладачів не призначено."
    ]
  },
  "admin.groups.error.forbidden": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Недостатньо прав для перегляду груп."
    ]
  },
  "admin.groups.membership.add.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учні можуть бути в кількох групах. Тут лише ті, хто ще не в цій групі."
    ]
  },
  "admin.groups.membership.add.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Усі доступні учні вже в цій групі."
    ]
  },
  "admin.groups.membership.add.empty-filtered": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "За таким ім’ям учнів не знайдено."
    ]
  },
  "admin.groups.membership.add.list-unavailable": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер не повернув список учнів групи. Додавання вимкнено, щоб не створити повторне членство."
    ]
  },
  "admin.groups.membership.add.search-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук учнів для додавання"
    ]
  },
  "admin.groups.membership.add.search-placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ім’я учня"
    ]
  },
  "admin.groups.membership.add.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додати вибраних (",
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
  "admin.groups.membership.add.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додати учнів"
    ]
  },
  "admin.groups.membership.available": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Доступні для додавання"
    ]
  },
  "admin.groups.membership.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Склад групи «",
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
  "admin.groups.membership.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додавання, відрахування та переведення учнів."
    ]
  },
  "admin.groups.membership.remove.dialog-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вибрані учні перестануть бути в групі «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "group"
        }
      },
      "». Акаунти учнів не видаляються."
    ]
  },
  "admin.groups.membership.remove.dialog-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Прибрати учнів із групи?"
    ]
  },
  "admin.groups.membership.remove.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Прибрати з групи (",
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
  "admin.groups.membership.students.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Позначте учнів, щоб прибрати їх із групи або перевести до іншої."
    ]
  },
  "admin.groups.membership.students.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточний склад"
    ]
  },
  "admin.groups.membership.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Склад групи"
    ]
  },
  "admin.groups.membership.transfer.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Спочатку додаємо до цільової групи. Лише після підтвердженого додавання прибираємо з поточної."
    ]
  },
  "admin.groups.membership.transfer.dialog-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вибрані учні будуть додані до «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "target"
        }
      },
      "». Після підтвердження вони перестануть бути в групі «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "source"
        }
      },
      "»."
    ]
  },
  "admin.groups.membership.transfer.dialog-note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Операції виконуються окремо для кожного учня. Якщо додавання не підтверджено, з поточної групи нікого не прибираємо."
    ]
  },
  "admin.groups.membership.transfer.dialog-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевести учнів?"
    ]
  },
  "admin.groups.membership.transfer.groups-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити список груп."
    ]
  },
  "admin.groups.membership.transfer.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевести вибраних (",
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
  "admin.groups.membership.transfer.target-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Цільова група"
    ]
  },
  "admin.groups.membership.transfer.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевести до іншої групи"
    ]
  },
  "admin.groups.no-teacher": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Без викладача"
    ]
  },
  "admin.groups.not-found.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Можливо, групу видалено або адресу змінено."
    ]
  },
  "admin.groups.not-found.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групу не знайдено"
    ]
  },
  "admin.groups.open": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відкрити групу ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      }
    ]
  },
  "admin.groups.rename.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нова назва для групи «",
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
  "admin.groups.rename.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нова назва для вибраної групи."
    ]
  },
  "admin.groups.rename.note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Серверна операція перейменування недоступна. Форма покаже локальний результат без зміни групи."
    ]
  },
  "admin.groups.rename.result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назву не збережено на сервері. Група залишиться з попередньою назвою."
    ]
  },
  "admin.groups.rename.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перейменування групи"
    ]
  },
  "admin.groups.search.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назва групи, курсу або викладача"
    ]
  },
  "admin.groups.teacher-unknown": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладач #",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "id"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      }
    ]
  },
  "admin.groups.teachers.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Склад для групи «",
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
  "admin.groups.teachers.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Склад викладачів групи."
    ]
  },
  "admin.groups.teachers.entry": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Керувати викладачами"
    ]
  },
  "admin.groups.teachers.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося змінити викладачів групи. Спробуйте ще раз."
    ]
  },
  "admin.groups.teachers.error.rejected": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер відхилив зміну складу. Перевірте вимоги до викладачів групи."
    ]
  },
  "admin.groups.teachers.error.validation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер відхилив склад. Перевірте кількість викладачів і чи можна залишити групу без них."
    ]
  },
  "admin.groups.teachers.no-teachers": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Без викладачів"
    ]
  },
  "admin.groups.teachers.note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть до двох викладачів або залиште список порожнім. Кожне збереження замінює склад групи; якщо сервер забороняє порожній список, покажемо помилку."
    ]
  },
  "admin.groups.teachers.picker.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити список викладачів."
    ]
  },
  "admin.groups.teachers.picker.limit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Можна обрати не більше двох викладачів."
    ]
  },
  "admin.groups.teachers.picker.search-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладачів за запитом не знайдено."
    ]
  },
  "admin.groups.teachers.picker.search-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук викладача"
    ]
  },
  "admin.groups.teachers.picker.selected": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обрано ",
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
      " з 2"
    ]
  },
  "admin.groups.teachers.picker.validation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть не більше двох різних викладачів."
    ]
  },
  "admin.groups.teachers.read": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити викладачів групи."
    ]
  },
  "admin.groups.teachers.result-new": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Новий склад"
    ]
  },
  "admin.groups.teachers.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зберегти склад"
    ]
  },
  "admin.groups.teachers.success-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Склад групи «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "group"
        }
      },
      "» збережено на сервері."
    ]
  },
  "admin.groups.teachers.success-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладачів оновлено"
    ]
  },
  "admin.groups.teachers.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладачі групи"
    ]
  },
  "admin.courses.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До курсів"
    ]
  },
  "admin.courses.back-to-course": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До курсу"
    ]
  },
  "admin.courses.categories.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До категорій"
    ]
  },
  "admin.courses.categories.change": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змінити категорію курсу «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "course"
        }
      },
      "»"
    ]
  },
  "admin.courses.categories.create.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Локальна назва нової категорії."
    ]
  },
  "admin.courses.categories.create.result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Категорію не створено. Серверний довідник категорій не змінився."
    ]
  },
  "admin.courses.categories.create.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Створити категорію"
    ]
  },
  "admin.courses.categories.create.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нова категорія"
    ]
  },
  "admin.courses.categories.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Курсів у цій категорії немає."
    ]
  },
  "admin.courses.categories.name-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Введіть назву категорії до 100 символів."
    ]
  },
  "admin.courses.categories.name-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назва категорії"
    ]
  },
  "admin.courses.categories.name-placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Наприклад, дизайн"
    ]
  },
  "admin.courses.categories.rename-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перейменувати категорію «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "category"
        }
      },
      "»"
    ]
  },
  "admin.courses.categories.rename.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нова назва для категорії «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "category"
        }
      },
      "»."
    ]
  },
  "admin.courses.categories.rename.result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Категорію не перейменовано. Серверний довідник і фіксовані значення не змінилися."
    ]
  },
  "admin.courses.categories.rename.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перейменування категорії"
    ]
  },
  "admin.courses.category.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змінити категорію"
    ]
  },
  "admin.courses.category.current": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточна категорія"
    ]
  },
  "admin.courses.category.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нова категорія для вибраного курсу."
    ]
  },
  "admin.courses.category.proposed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Запропонована категорія"
    ]
  },
  "admin.courses.category.result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Категорію не збережено на сервері. Курс залишиться в попередній категорії."
    ]
  },
  "admin.courses.category.same": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть іншу категорію, щоб продовжити."
    ]
  },
  "admin.courses.category.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зміна категорії"
    ]
  },
  "admin.courses.create.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Створити курс"
    ]
  },
  "admin.courses.create.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося створити курс. Спробуйте ще раз."
    ]
  },
  "admin.courses.create.error.validation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер відхилив дані курсу. Перевірте назву та категорію."
    ]
  },
  "admin.courses.create.success-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Курс «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "course"
        }
      },
      "» з’явився у списку."
    ]
  },
  "admin.courses.create.success-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Курс створено"
    ]
  },
  "admin.courses.create.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Новий курс"
    ]
  },
  "admin.courses.delete.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалити курс"
    ]
  },
  "admin.courses.delete.confirm-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назва не збігається з назвою курсу."
    ]
  },
  "admin.courses.delete.confirm-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Введіть назву курсу для підтвердження"
    ]
  },
  "admin.courses.delete.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалення курсу «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "course"
        }
      },
      "»."
    ]
  },
  "admin.courses.delete.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалення вибраного курсу."
    ]
  },
  "admin.courses.delete.dialog-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердьте намір видалити курс «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "course"
        }
      },
      "». Оскільки сервер не має видалення, курс залишиться на сервері."
    ]
  },
  "admin.courses.delete.result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Курс не видалено. Серверна операція недоступна, тому список курсів не змінився."
    ]
  },
  "admin.courses.delete.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалення курсу"
    ]
  },
  "admin.courses.detail.change-category-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перенести курс в інший напрямок."
    ]
  },
  "admin.courses.detail.delete-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Прибрати курс зі списку разом із групами."
    ]
  },
  "admin.courses.detail.groups-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "У курсі ще немає груп."
    ]
  },
  "admin.courses.detail.manage": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Керування курсом"
    ]
  },
  "admin.courses.detail.rename": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перейменувати курс"
    ]
  },
  "admin.courses.detail.rename-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змінити назву курсу."
    ]
  },
  "admin.courses.error.groups": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити групи курсу."
    ]
  },
  "admin.courses.filter.all": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Усі (",
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
  "admin.courses.form.name-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Введіть назву курсу до 200 символів."
    ]
  },
  "admin.courses.form.name-placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Наприклад, Python для початківців"
    ]
  },
  "admin.courses.list.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Курсів за вашим запитом не знайдено."
    ]
  },
  "admin.courses.list.empty-all": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Курсів поки немає."
    ]
  },
  "admin.courses.list.empty-all-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Створіть перший курс, щоб додати до нього групи."
    ]
  },
  "admin.courses.list.empty-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змініть запит або оберіть іншу категорію."
    ]
  },
  "admin.courses.not-found.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Можливо, курс видалено або адресу змінено."
    ]
  },
  "admin.courses.not-found.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Курс не знайдено"
    ]
  },
  "admin.courses.open": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відкрити курс"
    ]
  },
  "admin.courses.rename.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нова назва для курсу «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "course"
        }
      },
      "»."
    ]
  },
  "admin.courses.rename.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нова назва для вибраного курсу."
    ]
  },
  "admin.courses.rename.result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назву не збережено на сервері. Курс залишиться з попередньою назвою."
    ]
  },
  "admin.courses.rename.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перейменування курсу"
    ]
  },
  "admin.courses.search.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук курсів"
    ]
  },
  "admin.courses.search.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назва курсу або групи"
    ]
  },
  "admin.students.groups.add.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Це додаткове членство: учень залишиться в поточних групах."
    ]
  },
  "admin.students.groups.add.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає груп, до яких можна додати учня."
    ]
  },
  "admin.students.groups.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Членство ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      " у групах школи."
    ]
  },
  "admin.students.groups.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додавання, переведення та відрахування з груп."
    ]
  },
  "admin.students.groups.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити групи учня."
    ]
  },
  "admin.students.groups.memberships.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Кожен запис — окреме членство. Відрахування не видаляє акаунт учня."
    ]
  },
  "admin.students.groups.memberships.remove": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Прибрати"
    ]
  },
  "admin.students.groups.memberships.remove-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Прибрати з групи «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "group"
        }
      },
      "»"
    ]
  },
  "admin.students.groups.memberships.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточні групи"
    ]
  },
  "admin.students.groups.remove.dialog-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "student"
        }
      },
      " перестане бути в групі «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "group"
        }
      },
      "». Акаунт учня не видаляється."
    ]
  },
  "admin.students.groups.remove.dialog-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Прибрати з групи?"
    ]
  },
  "admin.students.groups.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групи учня"
    ]
  },
  "admin.students.groups.transfer.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Спочатку додаємо до нової групи. Лише після підтвердження прибираємо з поточної."
    ]
  },
  "admin.students.groups.transfer.dialog-description": {
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
      " буде додано до «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "target"
        }
      },
      "», а потім прибрано з «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "source"
        }
      },
      "»."
    ]
  },
  "admin.students.groups.transfer.dialog-note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Якщо додавання не підтверджено, учень залишиться в поточній групі."
    ]
  },
  "admin.students.groups.transfer.dialog-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевести учня?"
    ]
  },
  "admin.students.groups.transfer.source-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточна група"
    ]
  },
  "admin.students.groups.transfer.target-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нова група"
    ]
  },
  "admin.students.groups.transfer.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевести з групи"
    ]
  },
  "admin.teachers.access.actions": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Дії з доступом"
    ]
  },
  "admin.teachers.access.again": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Інші дії"
    ]
  },
  "admin.teachers.access.block": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Заблокувати доступ"
    ]
  },
  "admin.teachers.access.block-confirm-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити блокування"
    ]
  },
  "admin.teachers.access.block-confirm-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердьте блокування доступу для ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      ". Серверна операція недоступна, тому доступ не зміниться."
    ]
  },
  "admin.teachers.access.block-confirm-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Заблокувати доступ?"
    ]
  },
  "admin.teachers.access.block-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Тимчасово закрити вхід до акаунта."
    ]
  },
  "admin.teachers.access.block-result-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Блокування доступу"
    ]
  },
  "admin.teachers.access.block-result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Серверна операція блокування недоступна. Поточний доступ викладача не змінився."
    ]
  },
  "admin.teachers.access.block-result-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Доступ не заблоковано"
    ]
  },
  "admin.teachers.access.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Локальні дії для ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      "."
    ]
  },
  "admin.teachers.access.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Локальні дії для вибраного викладача."
    ]
  },
  "admin.teachers.access.note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ці дії не мають серверних операцій. Підтвердження покаже локальний результат без зміни доступу, коду чи сесій."
    ]
  },
  "admin.teachers.access.reset-code": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скинути код доступу"
    ]
  },
  "admin.teachers.access.reset-code-confirm-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити скидання"
    ]
  },
  "admin.teachers.access.reset-code-confirm-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердьте скидання коду для ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      ". Новий код не буде створено, а поточний не зміниться."
    ]
  },
  "admin.teachers.access.reset-code-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підготувати новий код доступу замість поточного."
    ]
  },
  "admin.teachers.access.reset-code-result-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скидання коду"
    ]
  },
  "admin.teachers.access.reset-code-result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Серверна операція скидання коду недоступна. Код доступу не змінено, новий код не створено."
    ]
  },
  "admin.teachers.access.reset-code-result-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Код не скинуто"
    ]
  },
  "admin.teachers.access.revoke-sessions-confirm-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити завершення"
    ]
  },
  "admin.teachers.access.revoke-sessions-confirm-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердьте завершення сесій для ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      ". Активні сесії залишаться без змін."
    ]
  },
  "admin.teachers.access.revoke-sessions-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завершити активні сесії на всіх пристроях."
    ]
  },
  "admin.teachers.access.revoke-sessions-result-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завершення сесій"
    ]
  },
  "admin.teachers.access.revoke-sessions-result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Серверна операція відкликання сесій недоступна. Активні сесії залишилися без змін."
    ]
  },
  "admin.teachers.access.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Доступ викладача"
    ]
  },
  "admin.teachers.access.unblock": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Розблокувати доступ"
    ]
  },
  "admin.teachers.access.unblock-confirm-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити розблокування"
    ]
  },
  "admin.teachers.access.unblock-confirm-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердьте розблокування доступу для ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      ". Серверна операція недоступна, тому доступ не зміниться."
    ]
  },
  "admin.teachers.access.unblock-confirm-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Розблокувати доступ?"
    ]
  },
  "admin.teachers.access.unblock-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відновити вхід після блокування."
    ]
  },
  "admin.teachers.access.unblock-result-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Розблокування доступу"
    ]
  },
  "admin.teachers.access.unblock-result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Серверна операція розблокування недоступна. Поточний доступ викладача не змінився."
    ]
  },
  "admin.teachers.access.unblock-result-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Доступ не розблоковано"
    ]
  },
  "admin.teachers.delete.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалити викладача"
    ]
  },
  "admin.teachers.delete.confirm-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ім’я не збігається з ім’ям викладача."
    ]
  },
  "admin.teachers.delete.confirm-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Введіть ім’я викладача для підтвердження"
    ]
  },
  "admin.teachers.delete.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалення профілю ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      "."
    ]
  },
  "admin.teachers.delete.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалення вибраного викладача."
    ]
  },
  "admin.teachers.delete.dialog-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердьте намір видалити профіль ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      ". Пов’язані групи залишаться без змін, бо серверна операція недоступна."
    ]
  },
  "admin.teachers.delete.groups": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пов’язані групи"
    ]
  },
  "admin.teachers.delete.groups-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пов’язаних груп немає."
    ]
  },
  "admin.teachers.delete.note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Серверна операція видалення недоступна. Форма перевірить підтвердження та покаже, що профіль не видалено."
    ]
  },
  "admin.teachers.delete.reassign-note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групи не видаляються разом із профілем. Щоб зберегти заняття, переназначте їх на іншого викладача окремою дією в розділі груп."
    ]
  },
  "admin.teachers.delete.result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Профіль не видалено. Серверна операція недоступна, тому викладач і групи залишилися без змін."
    ]
  },
  "admin.teachers.delete.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалення викладача"
    ]
  },
  "admin.teachers.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити викладачів."
    ]
  },
  "admin.teachers.error.forbidden": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Недостатньо прав для перегляду викладачів."
    ]
  },
  "admin.teachers.profile.access": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Керувати доступом"
    ]
  },
  "admin.teachers.profile.access-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Блокування, код доступу та сесії."
    ]
  },
  "admin.teachers.profile.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назад до викладачів"
    ]
  },
  "admin.teachers.profile.delete-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевірити пов’язані групи перед видаленням."
    ]
  },
  "admin.teachers.profile.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити профіль викладача."
    ]
  },
  "admin.teachers.profile.groups.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладач ще не має груп."
    ]
  },
  "admin.teachers.profile.manage": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Керування викладачем"
    ]
  },
  "admin.teachers.profile.mismatch": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося зіставити акаунт і профіль викладача."
    ]
  },
  "admin.teachers.profile.not-found": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладача не знайдено."
    ]
  },
  "admin.teachers.profile.not-teacher": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Цей акаунт не є викладачем."
    ]
  },
  "admin.teachers.profile.rename": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Редагувати ім’я"
    ]
  },
  "admin.teachers.profile.rename-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змінити ім’я в акаунті викладача."
    ]
  },
  "admin.teachers.register.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося зареєструвати викладача. Спробуйте ще раз."
    ]
  },
  "admin.teachers.register.name.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вкажіть ім’я до 200 символів."
    ]
  },
  "admin.teachers.register.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Новий викладач"
    ]
  },
  "admin.teachers.rename.current": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточне ім’я"
    ]
  },
  "admin.teachers.rename.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нове ім’я для ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      "."
    ]
  },
  "admin.teachers.rename.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нове ім’я для вибраного викладача."
    ]
  },
  "admin.teachers.rename.name-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Введіть ім’я до 200 символів."
    ]
  },
  "admin.teachers.rename.note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Серверна операція зміни імені недоступна. Форма покаже локальний результат без зміни акаунта."
    ]
  },
  "admin.teachers.rename.proposed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Запропоноване ім’я"
    ]
  },
  "admin.teachers.rename.result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ім’я не збережено на сервері. Акаунт залишиться з попереднім ім’ям."
    ]
  },
  "admin.teachers.rename.same": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Введіть ім’я, відмінне від поточного."
    ]
  },
  "admin.teachers.rename.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зберегти ім’я"
    ]
  },
  "admin.teachers.rename.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Редагування імені"
    ]
  },
  "admin.teachers.result.another": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зареєструвати ще одного"
    ]
  },
  "admin.teachers.result.copy": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скопіювати код"
    ]
  },
  "admin.teachers.result.copy-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося скопіювати код."
    ]
  },
  "admin.teachers.result.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Передайте код доступу викладачу. Після виходу зі сторінки код більше не відображатиметься."
    ]
  },
  "admin.teachers.result.list": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До списку викладачів"
    ]
  },
  "admin.teachers.result.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладача створено"
    ]
  },
  "admin.teachers.search.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Викладачів за вашим запитом не знайдено."
    ]
  },
  "admin.teachers.search.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук викладача за іменем…"
    ]
  },
  "students.access.code.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити код доступу."
    ]
  },
  "students.access.code.forbidden": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Недостатньо прав, щоб переглянути код доступу."
    ]
  },
  "students.access.code.note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Код показується лише на цій сторінці й не зберігається в посиланні."
    ]
  },
  "students.access.code.reset-confirm-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Старий код для ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      " перестане працювати. Новий код з’явиться на цій сторінці."
    ]
  },
  "students.access.code.reset-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося скинути код доступу."
    ]
  },
  "students.access.code.reset-forbidden": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Недостатньо прав, щоб скинути код доступу."
    ]
  },
  "students.access.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Код доступу та локальні дії для ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      "."
    ]
  },
  "students.access.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Код доступу та локальні дії."
    ]
  },
  "students.access.sessions.again": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Повернутися до дії"
    ]
  },
  "students.access.sessions.confirm-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Дію для ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      " не буде виконано: API не має відповідної операції."
    ]
  },
  "students.access.sessions.note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "У поточному API немає операції завершення сесій. Нижче — локальна перевірка без зміни даних."
    ]
  },
  "students.access.sessions.result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "API не має операції завершення сесій. Дані учня не змінено."
    ]
  },
  "students.access.sessions.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сесії"
    ]
  },
  "students.access.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Доступ учня"
    ]
  },
  "students.delete.again": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Повернутися до форми"
    ]
  },
  "students.delete.confirmation-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нікнейм не збігається з нікнеймом учня."
    ]
  },
  "students.delete.confirmation-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Введіть нікнейм учня для підтвердження"
    ]
  },
  "students.delete.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Локальна перевірка для ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      "."
    ]
  },
  "students.delete.description-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Локальна перевірка для вибраного учня."
    ]
  },
  "students.delete.dialog-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Акаунт ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      " не буде видалено: API не має операції видалення. Продовжити можна лише для локального результату."
    ]
  },
  "students.delete.dialog-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити локальну дію?"
    ]
  },
  "students.delete.note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "У поточному API немає операції видалення акаунта. Дані учня не буде змінено."
    ]
  },
  "students.delete.result-action-value": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Локальна перевірка"
    ]
  },
  "students.delete.result-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "API не має операції видалення. Це локальний результат без зміни даних."
    ]
  },
  "students.delete.result-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Акаунт не видалено"
    ]
  },
  "students.delete.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Продовжити"
    ]
  },
  "students.delete.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалення акаунта"
    ]
  },
  "students.edit.avatar.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть один із доступних варіантів."
    ]
  },
  "students.edit.avatar.save-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося зберегти аватар."
    ]
  },
  "students.edit.avatar.saved": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Аватар збережено."
    ]
  },
  "students.edit.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нікнейм і аватар учня."
    ]
  },
  "students.edit.nickname.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відображається в профілі та списках учнів."
    ]
  },
  "students.edit.nickname.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Введіть нікнейм до 200 символів."
    ]
  },
  "students.edit.nickname.same": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Введіть нікнейм, відмінний від поточного."
    ]
  },
  "students.edit.nickname.save-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося зберегти нікнейм."
    ]
  },
  "students.edit.nickname.saved": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нікнейм збережено."
    ]
  },
  "students.edit.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Редагування учня"
    ]
  },
  "students.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учнів поки немає."
    ]
  },
  "students.empty-filtered": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "За таким запитом учнів не знайдено."
    ]
  },
  "students.error.load": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити учнів."
    ]
  },
  "students.filters.category": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Напрямок"
    ]
  },
  "students.groups.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учень поки не входить до жодної групи."
    ]
  },
  "students.no-groups": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Без груп"
    ]
  },
  "students.not-found": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учня не знайдено."
    ]
  },
  "students.profile.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назад до учнів"
    ]
  },
  "students.profile.delete-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Локальна перевірка без зміни даних."
    ]
  },
  "students.profile.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити профіль учня."
    ]
  },
  "students.profile.manage": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Керування учнем"
    ]
  },
  "students.profile.memberships": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Членство"
    ]
  },
  "students.profile.memberships.manage": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Керувати групами"
    ]
  },
  "students.profile.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Профіль учня"
    ]
  },
  "students.register.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зареєструвати учня"
    ]
  },
  "students.register.avatar.option": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Варіант аватара ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "number"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      }
    ]
  },
  "students.register.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося зареєструвати учня. Спробуйте ще раз."
    ]
  },
  "students.register.groups.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Можна обрати одну або кілька груп."
    ]
  },
  "students.register.groups.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає доступних груп. Спочатку створіть групу."
    ]
  },
  "students.register.groups.validation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть хоча б одну групу."
    ]
  },
  "students.register.name.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вкажіть ім’я учня."
    ]
  },
  "students.register.name.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ім’я"
    ]
  },
  "students.register.name.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ім’я та прізвище учня"
    ]
  },
  "students.register.success.copy": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Копіювати код"
    ]
  },
  "students.register.success.copy-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося скопіювати код. Виділіть його вручну."
    ]
  },
  "students.register.success.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Код доступу для ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      ". Покажіть його зараз — після оновлення сторінки він зникне."
    ]
  },
  "students.register.success.list": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До списку учнів"
    ]
  },
  "students.register.success.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учня створено"
    ]
  },
  "students.register.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Новий учень"
    ]
  },
  "students.search.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук за іменем"
    ]
  },
  "students.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учні"
    ]
  },
  "admin.operations.back-to-list": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До операцій"
    ]
  },
  "admin.operations.bulk.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Застосувати до вибраних"
    ]
  },
  "admin.operations.bulk.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Масові операції"
    ]
  },
  "admin.operations.confirm.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Застосувати"
    ]
  },
  "admin.operations.confirm.description": {
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
        "type": "input",
        "name": "direction",
        "value": {
          "type": "expression",
          "arg": {
            "type": "variable",
            "name": "direction"
          },
          "functionRef": {
            "type": "function",
            "name": "string"
          }
        }
      },
      {
        "type": "input",
        "name": "reasons",
        "value": {
          "type": "expression",
          "arg": {
            "type": "variable",
            "name": "reasons"
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
          "Напрямок: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "direction"
            }
          },
          ". Буде застосовано до ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учня. Причини: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "reasons"
            }
          },
          ". Кожен учень обробляється окремо."
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
          "Напрямок: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "direction"
            }
          },
          ". Буде застосовано до ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учнів. Причини: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "reasons"
            }
          },
          ". Кожен учень обробляється окремо."
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
          "Напрямок: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "direction"
            }
          },
          ". Буде застосовано до ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учнів. Причини: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "reasons"
            }
          },
          ". Кожен учень обробляється окремо."
        ]
      },
      {
        "keys": [
          {
            "type": "*"
          }
        ],
        "value": [
          "Напрямок: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "direction"
            }
          },
          ". Буде застосовано до ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учня. Причини: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "reasons"
            }
          },
          ". Кожен учень обробляється окремо."
        ]
      }
    ]
  },
  "admin.operations.confirm.retry-action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Повторити"
    ]
  },
  "admin.operations.confirm.retry-description": {
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
        "type": "input",
        "name": "direction",
        "value": {
          "type": "expression",
          "arg": {
            "type": "variable",
            "name": "direction"
          },
          "functionRef": {
            "type": "function",
            "name": "string"
          }
        }
      },
      {
        "type": "input",
        "name": "reasons",
        "value": {
          "type": "expression",
          "arg": {
            "type": "variable",
            "name": "reasons"
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
          "Повторити операцію для ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учня з початковими параметрами? Напрямок: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "direction"
            }
          },
          ". Причини: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "reasons"
            }
          },
          ". Повторюються лише однозначні відмови."
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
          "Повторити операції для ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учнів з початковими параметрами? Напрямок: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "direction"
            }
          },
          ". Причини: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "reasons"
            }
          },
          ". Повторюються лише однозначні відмови."
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
          "Повторити операції для ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учнів з початковими параметрами? Напрямок: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "direction"
            }
          },
          ". Причини: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "reasons"
            }
          },
          ". Повторюються лише однозначні відмови."
        ]
      },
      {
        "keys": [
          {
            "type": "*"
          }
        ],
        "value": [
          "Повторити операцію для ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учня з початковими параметрами? Напрямок: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "direction"
            }
          },
          ". Причини: ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "reasons"
            }
          },
          ". Повторюються лише однозначні відмови."
        ]
      }
    ]
  },
  "admin.operations.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Підтвердити масову операцію?"
    ]
  },
  "admin.operations.links.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Інші операції"
    ]
  },
  "admin.operations.links.practice-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нарахування за практику всій групі."
    ]
  },
  "admin.operations.links.settings": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Локальні інструменти"
    ]
  },
  "admin.operations.links.settings-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Довільна сума, причини та тарифи без зміни сервера."
    ]
  },
  "admin.operations.practice.clear-selection": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скинути вибір"
    ]
  },
  "admin.operations.practice.confirm.description": {
    "type": "select",
    "declarations": [
      {
        "type": "input",
        "name": "group",
        "value": {
          "type": "expression",
          "arg": {
            "type": "variable",
            "name": "group"
          },
          "functionRef": {
            "type": "function",
            "name": "string"
          }
        }
      },
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
          "Групі ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "group"
            }
          },
          " буде нараховано практику для ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учня."
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
          "Групі ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "group"
            }
          },
          " буде нараховано практику для ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учнів."
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
          "Групі ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "group"
            }
          },
          " буде нараховано практику для ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учнів."
        ]
      },
      {
        "keys": [
          {
            "type": "*"
          }
        ],
        "value": [
          "Групі ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "group"
            }
          },
          " буде нараховано практику для ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "count"
            }
          },
          " учня."
        ]
      }
    ]
  },
  "admin.operations.practice.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нарахувати практику групі?"
    ]
  },
  "admin.operations.practice.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нарахування за практику всій групі через серверну операцію. Не пов’язане з розкладом або відвідуваністю."
    ]
  },
  "admin.operations.practice.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося нарахувати практику."
    ]
  },
  "admin.operations.practice.group-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити склад групи."
    ]
  },
  "admin.operations.practice.group-missing": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Групу з посилання не знайдено. Оберіть іншу групу."
    ]
  },
  "admin.operations.practice.note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер нарахує робокоїни кожному учню групи. Операція не пов’язана з розкладом або відвідуваністю."
    ]
  },
  "admin.operations.practice.result.affected": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нараховано учням: ",
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
  "admin.operations.practice.result.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер не повернув результатів для жодного учня."
    ]
  },
  "admin.operations.practice.result.new": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нове нарахування"
    ]
  },
  "admin.operations.practice.result.partial": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нараховано ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "affected"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      },
      " з ",
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
      },
      " учнів групи."
    ]
  },
  "admin.operations.practice.result.returned": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "У відповіді сервера ",
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
      " результатів."
    ]
  },
  "admin.operations.practice.result.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Практику нараховано"
    ]
  },
  "admin.operations.practice.search-placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назва групи або курсу"
    ]
  },
  "admin.operations.practice.select-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук за назвою групи або курсом."
    ]
  },
  "admin.operations.practice.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нарахувати за практику"
    ]
  },
  "admin.operations.practice.unknown-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зв’язок урвався до підтвердження. Перевірте історію учнів групи, не повторюйте нарахування навмання. Стан перевірки діє лише на цій сторінці й не зберігається після переходу."
    ]
  },
  "admin.operations.practice.unknown-verify-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося перевірити історію учнів групи. Спробуйте ще раз."
    ]
  },
  "admin.operations.result.batch": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Операція: ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "direction"
        }
      },
      ". Причини: ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "reasons"
        }
      },
      "."
    ]
  },
  "admin.operations.result.check-again": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевірити ще раз"
    ]
  },
  "admin.operations.result.checking": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевіряємо історію…"
    ]
  },
  "admin.operations.result.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося застосувати операцію."
    ]
  },
  "admin.operations.result.error.conflict": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Стан учня змінився. Оновіть дані."
    ]
  },
  "admin.operations.result.error.forbidden": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Недостатньо прав для операції."
    ]
  },
  "admin.operations.result.error.validation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер відхилив причини або дані операції."
    ]
  },
  "admin.operations.result.failure": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відмова"
    ]
  },
  "admin.operations.result.failure-count": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відмови: ",
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
  "admin.operations.result.history-acknowledged": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевірку підтверджено. Повтор автоматично не виконується."
    ]
  },
  "admin.operations.result.history-checked": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Історію перевірено. Підтвердьте перевірку, щоб розблокувати нові операції."
    ]
  },
  "admin.operations.result.new-balance": {
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
      }
    ]
  },
  "admin.operations.result.no-retry": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Повтор недоступний для цих помилок. Перевірте права доступу або дані учня."
    ]
  },
  "admin.operations.result.open-history": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відкрити історію"
    ]
  },
  "admin.operations.result.pending": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Обробка"
    ]
  },
  "admin.operations.result.processing": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Виконується…"
    ]
  },
  "admin.operations.result.refresh-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Операцію підтверджено, але не вдалося оновити баланс, історію та групи. Оновіть дані."
    ]
  },
  "admin.operations.result.retry": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Повторити невдалі (",
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
  "admin.operations.result.retryable": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Можна повторити"
    ]
  },
  "admin.operations.result.running": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "У черзі ще ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "pending"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      },
      " операцій."
    ]
  },
  "admin.operations.result.success": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Успішно"
    ]
  },
  "admin.operations.result.success-count": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Успішно: ",
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
  "admin.operations.result.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Результати"
    ]
  },
  "admin.operations.result.unknown": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Невідомо"
    ]
  },
  "admin.operations.result.unknown-blocked": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевірте історію учнів із невідомим результатом і підтвердьте перевірку. Нові операції заблоковані, доки ви не підтвердите результат."
    ]
  },
  "admin.operations.result.unknown-count": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Невідомо: ",
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
  "admin.operations.result.unknown-description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Результат невідомий. Перевірте історію учня, не повторюйте операцію навмання."
    ]
  },
  "admin.operations.result.unknown-note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Невідомий результат не повторюється автоматично. Перевірте історію в профілі учня. Стан перевірки діє лише на цій сторінці й не зберігається після переходу."
    ]
  },
  "admin.operations.settings.correction.amount": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сума"
    ]
  },
  "admin.operations.settings.correction.amount-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вкажіть додатну суму з точністю до сотих."
    ]
  },
  "admin.operations.settings.correction.amount-placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Наприклад, 25"
    ]
  },
  "admin.operations.settings.correction.current-balance": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточний баланс: ",
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
  "admin.operations.settings.correction.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Повна форма довільної суми з поясненням. Сервер не підтримує таку операцію, тому результат залишається чернеткою й не змінює баланс."
    ]
  },
  "admin.operations.settings.correction.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає учнів для чернетки."
    ]
  },
  "admin.operations.settings.correction.explanation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пояснення"
    ]
  },
  "admin.operations.settings.correction.explanation-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додайте пояснення від 3 до 500 символів."
    ]
  },
  "admin.operations.settings.correction.explanation-hint": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До ",
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
      " символів."
    ]
  },
  "admin.operations.settings.correction.explanation-placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Для чого потрібна ця сума"
    ]
  },
  "admin.operations.settings.correction.result.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Баланс не змінено. Сервер не має операції довільної суми, тому ці дані не збережено."
    ]
  },
  "admin.operations.settings.correction.result.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Чернетку перевірено"
    ]
  },
  "admin.operations.settings.correction.student-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть учня."
    ]
  },
  "admin.operations.settings.correction.student-placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть учня"
    ]
  },
  "admin.operations.settings.correction.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевірити чернетку"
    ]
  },
  "admin.operations.settings.correction.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Довільна сума"
    ]
  },
  "admin.operations.settings.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Форми перевіряють дані локально й не змінюють баланс або серверні налаштування."
    ]
  },
  "admin.operations.settings.reset": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Очистити"
    ]
  },
  "admin.operations.settings.tariffs.configured": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Заповнено тарифів: ",
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
  "admin.operations.settings.tariffs.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Причини читаються із сервера. Тарифи можна заповнити лише як локальну чернетку: серверні тарифи не змінюються."
    ]
  },
  "admin.operations.settings.tariffs.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер не повернув причин."
    ]
  },
  "admin.operations.settings.tariffs.input-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Тариф для причини ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "reason"
        }
      }
    ]
  },
  "admin.operations.settings.tariffs.note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Реальні масові операції використовують лише причини із сервера. Локальні тарифи не впливають на сервер і не підміняють причини."
    ]
  },
  "admin.operations.settings.tariffs.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Тариф"
    ]
  },
  "admin.operations.settings.tariffs.result.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Заповнено ",
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
      " тарифів. Серверні тарифи не змінено."
    ]
  },
  "admin.operations.settings.tariffs.result.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Чернетку тарифів збережено локально"
    ]
  },
  "admin.operations.settings.tariffs.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зберегти чернетку"
    ]
  },
  "admin.operations.settings.tariffs.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Причини та тарифи"
    ]
  },
  "admin.operations.settings.tariffs.validation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вкажіть число з точністю до сотих або залиште поле порожнім."
    ]
  },
  "admin.operations.settings.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Локальні налаштування балансу"
    ]
  },
  "admin.operations.student-fallback": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учень #",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "id"
        },
        "functionRef": {
          "type": "function",
          "name": "number"
        }
      }
    ]
  },
  "admin.operations.students.clear": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Очистити вибір"
    ]
  },
  "admin.operations.students.found": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Знайдено: ",
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
  "admin.operations.students.search-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук учнів"
    ]
  },
  "admin.operations.students.search-placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук учня за іменем"
    ]
  },
  "admin.operations.students.select-found": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вибрати знайдених"
    ]
  },
  "admin.operations.students.selected": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вибрано: ",
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
  "admin.operations.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Операції з балансом"
    ]
  },
  "admin.catalog.add": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додати нагороду"
    ]
  },
  "admin.catalog.availability.result-title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Доступність не змінено"
    ]
  },
  "admin.catalog.category.none": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Без категорії"
    ]
  },
  "admin.catalog.create.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося створити нагороду. Спробуйте ще раз."
    ]
  },
  "admin.catalog.create.success.another": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додати ще"
    ]
  },
  "admin.catalog.create.success.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагорода збережена в каталозі."
    ]
  },
  "admin.catalog.create.success.image": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зображення не збережено"
    ]
  },
  "admin.catalog.create.success.image.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер не має поля зображення та завантаження файлів. Локальний вибір не пов’язаний зі збереженою нагородою."
    ]
  },
  "admin.catalog.create.success.no-image": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагороду створено без зображення."
    ]
  },
  "admin.catalog.create.success.open": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Відкрити нагороду"
    ]
  },
  "admin.catalog.create.success.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагороду створено"
    ]
  },
  "admin.catalog.create.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нова нагорода"
    ]
  },
  "admin.catalog.details.delete": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалити нагороду"
    ]
  },
  "admin.catalog.details.delete.confirm.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагорода «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      "» має зникнути з каталогу. Сервер поки не має операції видалення, тому нагороду не буде видалено."
    ]
  },
  "admin.catalog.details.delete.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалити нагороду?"
    ]
  },
  "admin.catalog.details.delete.result.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер не має операції видалення нагород. Нагорода залишилася в каталозі."
    ]
  },
  "admin.catalog.details.delete.result.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагороду не видалено"
    ]
  },
  "admin.catalog.details.edit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Редагувати"
    ]
  },
  "admin.catalog.details.hide": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Приховати з каталогу"
    ]
  },
  "admin.catalog.details.hide.confirm.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Приховати"
    ]
  },
  "admin.catalog.details.hide.confirm.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагорода «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      "» має стати недоступною в каталозі. Сервер не має операції доступності, тому зміну не буде збережено."
    ]
  },
  "admin.catalog.details.hide.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Приховати нагороду?"
    ]
  },
  "admin.catalog.details.hide.result.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер не має операції для приховування чи показу нагород. Нагорода залишилася без змін."
    ]
  },
  "admin.catalog.details.manage": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Керування нагородою"
    ]
  },
  "admin.catalog.details.show": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Показати в каталозі"
    ]
  },
  "admin.catalog.details.show.confirm.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагорода «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "name"
        }
      },
      "» має стати доступною в каталозі. Сервер не має операції доступності, тому зміну не буде збережено."
    ]
  },
  "admin.catalog.details.show.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Показати нагороду в каталозі?"
    ]
  },
  "admin.catalog.details.show.result.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер не має операції для показу чи приховування нагород. Нагорода залишилася без змін."
    ]
  },
  "admin.catalog.details.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагорода"
    ]
  },
  "admin.catalog.edit.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "До нагороди"
    ]
  },
  "admin.catalog.edit.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Змініть базові поля. Сервер поки не зберігає ці зміни."
    ]
  },
  "admin.catalog.edit.notice.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер не має операції редагування нагород. Поточна нагорода залишилася без змін."
    ]
  },
  "admin.catalog.edit.notice.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зміни не збережено"
    ]
  },
  "admin.catalog.edit.reset": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скинути зміни"
    ]
  },
  "admin.catalog.edit.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зберегти зміни"
    ]
  },
  "admin.catalog.edit.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Редагування нагороди"
    ]
  },
  "admin.catalog.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагород поки немає."
    ]
  },
  "admin.catalog.empty.filtered": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "За цими фільтрами нагород не знайдено."
    ]
  },
  "admin.catalog.error.forbidden": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає доступу до каталогу нагород."
    ]
  },
  "admin.catalog.error.load": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити нагороди."
    ]
  },
  "admin.catalog.error.not-found": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагороду не знайдено."
    ]
  },
  "admin.catalog.error.request": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося виконати запит. Спробуйте ще раз."
    ]
  },
  "admin.catalog.error.validation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер не прийняв дані. Перевірте поля."
    ]
  },
  "admin.catalog.form.description.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Що отримає учень"
    ]
  },
  "admin.catalog.form.name": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назва"
    ]
  },
  "admin.catalog.form.name.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Наприклад, робоксі"
    ]
  },
  "admin.catalog.form.price": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ціна в робокоїнах"
    ]
  },
  "admin.catalog.form.price.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "100"
    ]
  },
  "admin.catalog.form.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Створити нагороду"
    ]
  },
  "admin.catalog.image.error.file-size": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Файл завеликий. Оберіть зображення до 5 мегабайт."
    ]
  },
  "admin.catalog.image.error.file-type": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть файл зображення."
    ]
  },
  "admin.catalog.image.error.link": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вкажіть коректне посилання на зображення."
    ]
  },
  "admin.catalog.image.error.preview": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити зображення за цим посиланням."
    ]
  },
  "admin.catalog.image.file.hint": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Формати: jpeg, png, webp або gif до 5 мегабайт."
    ]
  },
  "admin.catalog.image.file.replace": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Замінити файл"
    ]
  },
  "admin.catalog.image.link.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "https://…"
    ]
  },
  "admin.catalog.image.link.replace": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Замінити посилання"
    ]
  },
  "admin.catalog.image.mode.file": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вибрати файл"
    ]
  },
  "admin.catalog.image.mode.link": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Посилання"
    ]
  },
  "admin.catalog.image.selected": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Локальний перегляд"
    ]
  },
  "admin.catalog.image.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зображення"
    ]
  },
  "admin.catalog.image.unsaved": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не збережено"
    ]
  },
  "admin.catalog.search.placeholder": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Пошук нагороди"
    ]
  },
  "admin.catalog.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Каталог нагород"
    ]
  },
  "admin.catalog.type.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Тип"
    ]
  },
  "admin.catalog.type.privilege": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Привілей"
    ]
  },
  "admin.catalog.type.reward": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагорода"
    ]
  },
  "admin.catalog.validation.category": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть категорію або «Без категорії»."
    ]
  },
  "admin.catalog.validation.name": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вкажіть назву нагороди."
    ]
  },
  "admin.catalog.validation.price": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вкажіть ціну цілим числом від 0."
    ]
  },
  "admin.catalog.validation.type": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть тип нагороди."
    ]
  },
  "admin.balance.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назад до профілю"
    ]
  },
  "admin.balance.cancel.already": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Транзакцію вже скасовано. Історію оновлено."
    ]
  },
  "admin.balance.cancel.confirm.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Операцію на суму ",
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
      " буде скасовано, а баланс перераховано."
    ]
  },
  "admin.balance.cancel.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скасувати транзакцію?"
    ]
  },
  "admin.balance.cancel.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося скасувати транзакцію."
    ]
  },
  "admin.balance.cancel.success": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Транзакцію скасовано."
    ]
  },
  "admin.balance.cancel.trigger": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Скасувати транзакцію на суму ",
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
      }
    ]
  },
  "admin.balance.history.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Останні нарахування та списання цього учня."
    ]
  },
  "admin.balance.history.empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Транзакцій поки немає."
    ]
  },
  "admin.balance.history.end": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Це вся історія."
    ]
  },
  "admin.balance.history.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити історію."
    ]
  },
  "admin.balance.history.load-more": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Показати ще"
    ]
  },
  "admin.balance.history.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Історія транзакцій"
    ]
  },
  "admin.balance.operation.confirm.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Буде списано робокоїни за причини: ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "reasons"
        }
      },
      "."
    ]
  },
  "admin.balance.operation.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оберіть причини. Суму нарахування або списання визначає сервер."
    ]
  },
  "admin.balance.operation.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося змінити баланс. Перевірте баланс та історію."
    ]
  },
  "admin.balance.operation.reasons": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Причини"
    ]
  },
  "admin.balance.operation.reasons-empty": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає доступних причин для цього напрямку."
    ]
  },
  "admin.balance.operation.success": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Баланс оновлено."
    ]
  },
  "admin.balance.profile.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Рахунок, прогрес нагороди та історія операцій."
    ]
  },
  "admin.balance.profile.link": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Баланс учня"
    ]
  },
  "admin.balance.refresh.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Оновити дані"
    ]
  },
  "admin.balance.refresh.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Операцію підтверджено, але не вдалося оновити баланс та історію. Оновіть дані, щоб побачити результат."
    ]
  },
  "admin.balance.refresh.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Дані не оновлено"
    ]
  },
  "admin.balance.summary.balance": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Баланс"
    ]
  },
  "admin.balance.summary.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточний баланс, нагорода та місце в рейтингу."
    ]
  },
  "admin.balance.summary.error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити стан учня."
    ]
  },
  "admin.balance.summary.rank": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Місце в рейтингу"
    ]
  },
  "admin.balance.summary.rank-none": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Ще немає місця"
    ]
  },
  "admin.balance.summary.reward": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Прогрес нагороди"
    ]
  },
  "admin.balance.summary.reward-none": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нагороду не обрано"
    ]
  },
  "admin.balance.summary.reward-progress": {
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
      " з ",
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
      },
      " робокоїнів"
    ]
  },
  "admin.balance.summary.reward-ready": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Достатньо робокоїнів для нагороди"
    ]
  },
  "admin.balance.summary.reward-remaining": {
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
          "Залишився ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "countText"
            }
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
          "Залишилося ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "countText"
            }
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
          "Залишилося ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "countText"
            }
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
          "Залишилося ",
          {
            "type": "expression",
            "arg": {
              "type": "variable",
              "name": "countText"
            }
          },
          " робокоїна"
        ]
      }
    ]
  },
  "admin.balance.summary.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Стан учня"
    ]
  },
  "admin.balance.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Баланс і історія"
    ]
  },
  "admin.balance.unknown.cancel": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зв’язок урвався до підтвердження. Перевірте історію, перш ніж повторювати скасування."
    ]
  },
  "admin.balance.unknown.change": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зв’язок урвався до підтвердження. Не повторюйте зміну навмання — перевірте історію."
    ]
  },
  "admin.balance.unknown.checked": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Історію оновлено. Перегляньте операції нижче та підтвердьте, що результат зрозумілий."
    ]
  },
  "admin.balance.unknown.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Результат невідомий"
    ]
  },
  "admin.balance.unknown.verify": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевірити історію"
    ]
  },
  "admin.balance.unknown.verify-error": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося оновити історію та баланс. Перевірте зв’язок і спробуйте ще раз."
    ]
  },
  "admin.learning.create": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Створити"
    ]
  },
  "admin.membership.addition.added": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "додано"
    ]
  },
  "admin.membership.addition.failed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "не додано"
    ]
  },
  "admin.membership.addition.pending": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "додаємо…"
    ]
  },
  "admin.membership.addition.skipped": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "уже в групі"
    ]
  },
  "admin.membership.group-option": {
    "type": "message",
    "declarations": [],
    "pattern": [
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "course"
        }
      },
      " · ",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "group"
        }
      }
    ]
  },
  "admin.membership.removal.failed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "не прибрано"
    ]
  },
  "admin.membership.removal.pending": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "прибираємо…"
    ]
  },
  "admin.membership.removal.removed": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "прибрано"
    ]
  },
  "admin.membership.removal.waiting": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "чекає на додавання"
    ]
  },
  "admin.membership.result.add.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учнів оброблено окремо для групи «",
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
  "admin.membership.result.add.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Результат додавання"
    ]
  },
  "admin.membership.result.failure": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Частину операцій не завершено. Повторіть лише етапи з помилкою."
    ]
  },
  "admin.membership.result.forbidden": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сервер відхилив частину операцій через недостатньо прав."
    ]
  },
  "admin.membership.result.partial": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Деяких учнів додано, але не прибрано з початкової групи. Вони залишилися в обох групах."
    ]
  },
  "admin.membership.result.remove.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учнів прибрано з групи «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "source"
        }
      },
      "». Акаунти не видалено."
    ]
  },
  "admin.membership.result.remove.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Результат відрахування"
    ]
  },
  "admin.membership.result.reset": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Нова дія"
    ]
  },
  "admin.membership.result.retry": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевірити й повторити"
    ]
  },
  "admin.membership.result.session": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сесія завершилася під час операції. Увійдіть знову, щоб повторити."
    ]
  },
  "admin.membership.result.transfer.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Спочатку підтверджували додавання до «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "target"
        }
      },
      "», потім прибирали з «",
      {
        "type": "expression",
        "arg": {
          "type": "variable",
          "name": "source"
        }
      },
      "»."
    ]
  },
  "admin.membership.result.transfer.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Результат переведення"
    ]
  },
  "admin.membership.result.unknown": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Результат частини операцій невідомий. Перед повторенням перевірте актуальне членство. Учня не буде прибрано з групи без підтвердженого додавання."
    ]
  },
  "admin.membership.status.addition": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Додавання"
    ]
  },
  "admin.membership.status.not-required": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "не потрібно"
    ]
  },
  "admin.membership.status.removal": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Видалення з групи"
    ]
  },
  "admin.membership.status.unknown": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "результат невідомий"
    ]
  },
  "admin.shared.local-result": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Локальний результат"
    ]
  },
  "admin.streak.actions.active-note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Стрик уже активний."
    ]
  },
  "admin.streak.actions.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Запуск, завершення та кількість днів."
    ]
  },
  "admin.streak.actions.end": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завершити стрик"
    ]
  },
  "admin.streak.actions.inactive-note": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Активного стрику немає."
    ]
  },
  "admin.streak.actions.start": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Запустити стрик"
    ]
  },
  "admin.streak.actions.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Керування стриком"
    ]
  },
  "admin.streak.back": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Назад до профілю учня"
    ]
  },
  "admin.streak.current.active": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Активний"
    ]
  },
  "admin.streak.current.ended": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завершено"
    ]
  },
  "admin.streak.current.none": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає активного стрику"
    ]
  },
  "admin.streak.current.none-value": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Немає"
    ]
  },
  "admin.streak.current.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточний стрик"
    ]
  },
  "admin.streak.date": {
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
            "day": {
              "type": "literal",
              "value": "numeric"
            },
            "month": {
              "type": "literal",
              "value": "long"
            },
            "year": {
              "type": "literal",
              "value": "numeric"
            }
          }
        }
      }
    ]
  },
  "admin.streak.days": {
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
          " день"
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
          " дні"
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
          " днів"
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
          " дня"
        ]
      }
    ]
  },
  "admin.streak.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточний і максимальний стрик, запуск і завершення."
    ]
  },
  "admin.streak.end.confirm.description": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Поточний стрик буде завершено. Кількість днів залишиться в показниках."
    ]
  },
  "admin.streak.end.confirm.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завершити стрик?"
    ]
  },
  "admin.streak.error.action": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося виконати дію зі стриком."
    ]
  },
  "admin.streak.error.forbidden": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Недостатньо прав для керування стриком."
    ]
  },
  "admin.streak.error.load": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Не вдалося завантажити стрик."
    ]
  },
  "admin.streak.error.not-found": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Учня або стрик не знайдено."
    ]
  },
  "admin.streak.error.validation": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Перевірте кількість днів."
    ]
  },
  "admin.streak.finished-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Завершення"
    ]
  },
  "admin.streak.longest.hint": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Найдовший результат учня."
    ]
  },
  "admin.streak.longest.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Максимальний стрик"
    ]
  },
  "admin.streak.result.ended": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Стрик завершено."
    ]
  },
  "admin.streak.result.started": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Стрик запущено."
    ]
  },
  "admin.streak.result.updated": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Кількість днів оновлено."
    ]
  },
  "admin.streak.started-label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Початок"
    ]
  },
  "admin.streak.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Стрик учня"
    ]
  },
  "admin.streak.update.label": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Дні"
    ]
  },
  "admin.streak.update.submit": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Зберегти"
    ]
  },
  "admin.streak.update.unavailable": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Спочатку запустіть стрик, щоб змінити кількість днів."
    ]
  },
  "admin.streak.validation.days": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Вкажіть ціле число від 0."
    ]
  },
  "error.forbidden": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Недостатньо прав для цієї дії."
    ]
  },
  "error.session": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Сесія завершилася. Увійдіть знову, щоб продовжити."
    ]
  },
  "group.practice.title": {
    "type": "message",
    "declarations": [],
    "pattern": [
      "Практика групи"
    ]
  }
}