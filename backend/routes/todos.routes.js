const { Router } = require("express")

let todos = [
  {
    id: 1,
    title: "Купить дом",
    completed: false,
  },
  {
    id: 2,
    title: "Покормить Харитона",
    completed: true,
  },
  {
    id: 3,
    title: "Купить сверчков",
    completed: true,
  },
  {
    id: 4,
    title: "Поступить в НГУ на бюджет",
    completed: true,
  },
  {
    id: 5,
    title: "Закончить ВУЗ с красным дипломом",
    completed: false,
  },
  {
    id: 6,
    title: "Пройти практику",
    completed: false,
  },
  {
    id: 7,
    title: "Купить машину",
    completed: false,
  },
  {
    id: 8,
    title: "Пройти Baldurs Gate III",
    completed: false,
  },
  {
    id: 9,
    title: "Разрисовать шкафы",
    completed: false,
  },
  {
    id: 10,
    title: "Купить гирляндочки",
    completed: false,
  },
  {
    id: 11,
    title: "Поиграть с ящерицами",
    completed: false,
  },
  {
    id: 12,
    title: "Покормить дурынд",
    completed: false,
  },
  {
    id: 13,
    title: 'Прочитать книку "Чистый код"',
    completed: false,
  },
  {
    id: 14,
    title: 'Прочитать книгу "Атомные привычки"',
    completed: false,
  },
  {
    id: 15,
    title: "Слетать на Мальдивы",
    completed: false,
  },
  {
    id: 16,
    title: "Побывать в Дубае",
    completed: false,
  },
  {
    id: 17,
    title: "Закончить наконец уже этот ВУЗ наконец",
    completed: false,
  },
  {
    id: 18,
    title: "Погладить кота",
    completed: false,
  },
  {
    id: 19,
    title: "Сыграть в УНО",
    completed: false,
  },
  {
    id: 20,
    title: "Нарисовать автопортрет",
    completed: false,
  },
  {
    id: 21,
    title: "Поиграть с Харитонятами",
    completed: false,
  },
  {
    id: 22,
    title: "Слетать в Алдан",
    completed: false,
  },
  {
    id: 23,
    title: "Родиться на Аляске",
    completed: false,
  },
  {
    id: 24,
    title: "Завести эублефара Black Night",
    completed: false,
  },
  {
    id: 25,
    title: "Прыгнуть с парашутом",
    completed: false,
  },
  {
    id: 26,
    title: "Покататься на мотоцикле",
    completed: false,
  },
  {
    id: 27,
    title: "Порисовать на природе",
    completed: false,
  },
  {
    id: 28,
    title: "Еще раз погладить кота",
    completed: false,
  },
  {
    id: 29,
    title: "Завести Хаски",
    completed: false,
  },
  {
    id: 30,
    title: "Иметь собственную библиотеку",
    completed: false,
  },
  {
    id: 31,
    title: "Еще раз покормить Харитонят",
    completed: false,
  },
  {
    id: 33,
    title:
      "Сесть зайцем в ракету, посадить розу на луне и объявить себя маленьким принцом",
    completed: false,
  },
  {
    id: 34,
    title: "Покрасить волосы в блонд",
    completed: false,
  },
  {
    id: 35,
    title: "Перекрасить волосы из блонда в розовый",
    completed: false,
  },
  {
    id: 39,
    title: "Тёмный мрачный коридор",
    completed: false,
  },
  {
    id: 40,
    title: "Я на ципочках как вор",
    completed: false,
  },
  {
    id: 41,
    title: "Пробираюсь чуть дыша",
    completed: false,
  },
  {
    id: 42,
    title: "Чтобы не спугнуть",
    completed: false,
  },
  {
    id: 43,
    title: "Тех, кто спит уже давно",
    completed: false,
  },
  {
    id: 44,
    title: "Тех, кому не всё равно",
    completed: false,
  },
  {
    id: 45,
    title: "В чью я комнату тайком",
    completed: false,
  },
  {
    id: 46,
    title: "Желаю заглянуть",
    completed: false,
  },
  {
    id: 47,
    title: "Чтобы увидеть...",
    completed: false,
  },
  {
    id: 48,
    title: "Как бессонница в час ночной",
    completed: false,
  },
  {
    id: 49,
    title: "Меняет, нелюдимая, облик твой",
    completed: false,
  },
  {
    id: 50,
    title: "Чьих невольница ты идей?",
    completed: false,
  },
  {
    id: 51,
    title: "Зачем тебе охотиться на людей?",
    completed: false,
  },
]

const router = Router()

router.get("/", async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 30
  const tag = req.query.tag

  let startIndex = 0
  if (tag) {
    startIndex = todos.findIndex((todo) => String(todo.id) === tag)
    startIndex = startIndex === -1 ? todos.length : startIndex
  }

  const paginatedTodos = todos.slice(startIndex, startIndex + pageSize)
  let nextTag = null
  if (todos.length > startIndex + pageSize) {
    nextTag = String(todos[startIndex + pageSize].id)
  }

  const response = {
    todos: paginatedTodos,
    tag: nextTag,
  }

  res.json(response)
})

// Создание нового todo
router.post("/create", (req, res) => {
  const newTodo = {
    id: String(Date.now()),
    title: req.body.title,
    completed: false,
  }
  todos.unshift(newTodo)

  res.json([newTodo])
})

// Удаление todo
router.delete("/", (req, res) => {
  const id = req.query.id
  todos = todos.filter((todo) => String(todo.id) !== id)
  res.json(todos)
})

// Завершение todo
router.patch("/", (req, res) => {
  const id = req.query.id
  let updatedTodo = null
  todos.forEach((todo) => {
    if (String(todo.id) === id) {
      todo.completed = !todo.completed
      updatedTodo = todo
    }
  })
  res.json(updatedTodo)
})

// Редактирование todo
router.patch("/edit", (req, res) => {
  const id = req.query.id
  const title = req.query.title
  const name = req.query.name

  let updatedTodo = null
  todos.forEach((todo) => {
    if (String(todo.id) === id) {
      todo.title = title
      updatedTodo = todo
    }
  })
  updatedTodo.name = name

  const io = req.app.get("io")
  io.emit("edit-todo", updatedTodo)

  res.json(updatedTodo)
})

module.exports = router
