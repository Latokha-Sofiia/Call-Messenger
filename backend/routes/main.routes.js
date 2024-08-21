const express = require("express")

const router = express.Router()

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect("/login")
  }
}

router.get("/home", isAuthenticated, (req, res) => {
  res.status(200).send(`Hello, Stranger! <a href="/logout">Logout</a>`)
})

router.get("/login", (req, res) => {
  res.send(
    '<form action="/login" method="post">' +
      'Username: <input name="user"><br>' +
      'Password: <input name="pass" type="password"><br>' +
      '<input type="submit" text="Login"></form>'
  )
})

module.exports = router
