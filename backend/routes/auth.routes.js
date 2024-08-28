const express = require("express")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const User = require("../models/user.model")

const JWT_SECRET = "jwt-secret"
const USER_COLLECTION_NAME = "users"

const router = express.Router()

function setCookie(res, token) {
  res.cookie("token", token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
    httpOnly: true,
  })
}

router.get("/personal-data", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const user = await User.findById(req.session.userId)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  return res.status(200).json({
    name: user.name,
    surname: user.surname,
    login: user.login,
    password: user.password,
    photo_url: user.photo_url,
  })
})

router.put("/update-personal-data", async (req, res) => {
  try {
    if (!req.session.userId) {
      console.log("req.session.userId false", req.session.userId)
      return res.status(401).json({ message: "Unauthorized" })
    }

    console.log("req.session.userId true", req.session.userId)
    const { name, surname, login, password, photo_url } = req.body

    console.log(name, surname, login, password, photo_url)

    const user = await User.findByIdAndUpdate(
      req.session.userId,
      {
        $set: {
          name: name || undefined,
          surname: surname || undefined,
          login: login || undefined,
          password: password || undefined,
          photo_url: photo_url || undefined,
        },
      },
      { new: true, runValidators: true }
    )

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    return res
      .status(200)
      .json({ message: "Personal data updated successfully", user })
  } catch (error) {
    console.error("Error updating personal data:", error)
    return res.status(500).json({ message: "Server error" })
  }
})

router.post(
  "/register",
  [
    check("name", "Minimum length 3 symbol").isLength({ min: 3 }),
    check("login", "Minimum length 3 symbol").isLength({ min: 3 }),
    check("password", "Minimum length password 3 symbol").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные",
        })
      }

      const { login, password, name, surname, photo_url } = req.body

      const candidate = await User.findOne({ login })

      if (candidate) {
        return res.status(400).json({ message: "Ты уже существуешь" })
      }

      const user = new User({
        login,
        name,
        surname,
        photo_url,
        password,
      })
      await user.save()

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "10h",
      })

      setCookie(res, token)
      res.status(201).json({ message: "Ты создан" })
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: "Registration error" })
    }
  }
)

router.get("/check-auth", (req, res) => {
  if (req.session.userId) {
    console.log("/check-auth true", req.session.userId)
    return res.status(200).json({ isValid: true })
  } else {
    console.log("/check-auth false", req.session.userId)
    return res.status(200).json({ isValid: false })
  }
})

router.post(
  "/login",
  express.urlencoded({ extended: false }),
  async (req, res, next) => {
    try {
      const { login, password } = req.body

      const user = await User.findOne({ login })

      if (!user || user.password !== password) {
        return res.status(400).json({ message: "Неправельные данные" })
      }

      req.session.userId = user._id
      user.sessions.push(req.session.id)
      await user.save()

      console.log("login")

      return res.status(200).json({ isSuccess: true })
    } catch (e) {
      return res.status(400).json({ isSuccess: false })
    }
  }
)

router.get("/logout", async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    // Удаление сессии из базы данных
    await User.updateOne(
      { _id: req.session.userId },
      { $pull: { sessions: req.session.id } }
    )

    console.log("logout")

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Error logging out" })
      }
      res.clearCookie("connect.sid")
      res.json({ message: "Logged out successfully!" })
    })
  } catch (error) {
    res.status(500).json({ error: "Error logging out user" })
  }
})

module.exports = router
