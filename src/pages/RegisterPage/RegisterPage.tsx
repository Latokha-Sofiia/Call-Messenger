import React, { useContext, useState } from "react"
import * as styles from "./RegisterPage.module.scss"
import { authController } from "@/core/controllers/AuthController/AuthController"
import { useNavigate } from "react-router-dom"

const AuthPage = () => {
  const [form, setForm] = useState({ name: "", login: "", password: "" })
  const navigate = useNavigate()
  const changeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    navigate("/")
  }

  const registerHandler = async () => {
    try {
      console.log(
        "login:",
        form.login,
        "password:",
        form.password,
        "name:",
        form.name
      )
      await authController.registerHandler(form.login, form.password, form.name)
    } catch (e) {}
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.rainbowFrame}>
        <div className={styles.infoWrapper}>
          <div className={styles.authTitle}>Регистрация</div>
          <div className={styles.entryFieldItem}>
            <div className={styles.title}>Логин:</div>
            <input
              className={styles.inputItem}
              placeholder={"Введите имя"}
              id="name"
              type="login"
              name="name"
              onChange={changeHandler}
            />
          </div>

          <div className={styles.entryFieldItem}>
            <div className={styles.title}>Логин:</div>
            <input
              className={styles.inputItem}
              placeholder={"Введите логин"}
              id="login"
              type="login"
              name="login"
              onChange={changeHandler}
            />
          </div>

          <div className={styles.entryFieldItem}>
            <div className={styles.title}>Пароль:</div>
            <input
              className={styles.inputItem}
              placeholder={"Введите пароль"}
              id="password"
              type="login"
              name="password"
              onChange={changeHandler}
            />
          </div>

          <div className={styles.buttons}>
            <button className={styles.buttonLogin} onClick={loginHandler}>
              Вернуться к авторизации
            </button>
            <button
              className={styles.buttonRegistration}
              onClick={registerHandler}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
