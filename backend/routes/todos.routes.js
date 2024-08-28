const { Router } = require("express")
const User = require("../models/user.model")
const { check, validationResult } = require("express-validator")
const express = require("express")
const router = Router()
const Todo = require("../models/todo.model")

router.get("/", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const pageSize = parseInt(req.query.pageSize) || 30
    const tag = req.query.tag

    const todos = await Todo.find({ userId: req.session.userId })

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
  } catch (error) {
    return res.status(500).json({ message: "Server error" })
  }
})

// Создание нового todo
router.post("/create", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const newTodo = new Todo({
    title: req.body.title,
    userId: req.session.userId,
  })

  await newTodo.save()

  const io = req.app.get("io")

  io.to(req.session.userId).emit("todo-updated", newTodo)

  res.json([newTodo])
})

// Удаление todo
router.delete("/", async (req, res) => {
  const { id } = req.query
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const deletedTodo = await Todo.findOneAndDelete({
    _id: id,
    userId: req.session.userId,
  })

  const io = req.app.get("io")

  io.to(req.session.userId).emit("todo-deleted", deletedTodo)

  res.json(deletedTodo)
})

// Завершение todo
router.patch("/", async (req, res) => {
  const { id } = req.query

  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const todo = await Todo.findOne({ _id: id, userId: req.session.userId })
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" })
  }

  todo.completed = !todo.completed
  await todo.save()

  const io = req.app.get("io")
  io.to(req.session.userId).emit("todo-updated", todo)
  res.json(todo)
})

// Редактирование todo
router.patch("/edit", async (req, res) => {
  const { id } = req.query
  const { title } = req.body

  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: id, userId: req.session.userId },
    { title },
    { new: true }
  )

  if (!updatedTodo) {
    return res.status(404).json({ message: "Todo not found" })
  }

  const io = req.app.get("io")
  io.to(req.session.userId).emit("edit-todo", updatedTodo)

  res.json(updatedTodo)
})

module.exports = router
