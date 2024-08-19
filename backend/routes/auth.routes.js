const { Router } = require("express")
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")

const JWT_SECRET = "jwt-secret"

const router = Router()

const users = [
  {
    login: "lolo",
    name: "Sofiia",
    password: "123",
    id: 1,
  },
]

function setCookie(res, token) {
  res.cookie("token", token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
    httpOnly: true,
  })
}

router.post(
  "/register",
  [
    check("login", "Minimum length 3 symbol").isLength({ min: 3 }),
    check("password", "Minimum length password 3 symbol").isLength({ min: 3 }),
    check("name", "Minimum length 3 symbol").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Мне не нравятся твои данные, введи другие",
        })
      }

      const { login, password, name } = req.body
      const candidate = users.find((user) => user.login === login)
      if (candidate) {
        return res.status(400).json({ message: "Ты уже существуешь" })
      }

      const user = {
        login,
        password,
        name,
        id: users[users.length - 1].id + 1,
      }

      users.push(user)

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "10h",
      })

      setCookie(res, token)

      res.status(201).json({ message: "Ты создан" })
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Something wrong on registration" })
    }
  }
)

router.post(
  "/login",
  [
    check("login", "Enter correct login").exists(),
    check("password", "Enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data",
        })
      }

      const { name, login, password } = req.body
      const user = users.find((user) => user.login === login)

      if (!user) {
        return res
          .status(400)
          .json({ message: "Ты не существуешь, иди регистрируйся" })
      }

      const isPasswordCorrect = user.password === password

      if (!isPasswordCorrect) {
        // return res.status(400).json({ message: `${user.name}, проверь пароль` })
        return res.status(400).json({ message: "Проверь пароль" })
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "10h",
      })

      setCookie(res, token)

      res.status(200).json({ token, userId: user.id })
    } catch (e) {
      return res.status(500).json({ message: "Something wrong on login" })
    }
  }
)

router.get("/check-auth", async (req, res) => {
  try {
    const token = req.cookies["token"]

    if (!token) {
      res.status(200).json({ isValid: false })
      return
    }

    const isTokenVerified = jwt.verify(token, JWT_SECRET)

    const isTokenExpired = Date.now() > jwt.decode(token)["exp"] * 1000

    if (!isTokenVerified || isTokenExpired) {
      res.status(200).json({ isValid: false })
      return
    }

    res.status(200).json({ isValid: true })
  } catch (e) {
    res.status(200).json({ isValid: false })
  }
})

router.get("/personal-data", async (req, res) => {
  const token = req.cookies["token"]
  const decryptedToken = jwt.decode(token, JWT_SECRET)

  if (!decryptedToken) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const user = users.find((user) => user.id === decryptedToken.userId)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  return res.status(200).json({
    name: user.name,
    login: user.login,
    password: user.password,
  })
})

router.patch("/logout", async (req, res) => {
  setCookie(res, "")
  res.status(200).json({})
})

module.exports = router
