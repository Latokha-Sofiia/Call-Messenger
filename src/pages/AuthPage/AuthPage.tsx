import React, { useContext, useState } from "react"
import * as styles from "./Auth.module.scss"
import { authController } from "@/core/controllers/AuthController/AuthController"
import { AuthContext } from "@/core/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { UserContext } from "@/core/context/UserContext"

const AuthPage = () => {
  const [form, setForm] = useState({ login: "", password: "" })
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const changeName = useContext(UserContext)

  const changeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      const response = await authController.loginHandler(
        form.login,
        form.password
      )

      if (response === false) {
        auth.setIsAuthenticated(false)
      } else {
        const data = await authController.getPersonalData()
        changeName.setUserName(data.name)
        console.log("name.userName", changeName.userName)
        auth.setIsAuthenticated(true)
      }
    } catch (e) {
      auth.setIsAuthenticated(false)
    }
  }

  const registerHandler = () => {
    navigate("/register")
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.rainbowFrame}>
        <div className={styles.infoWrapper}>
          <div className={styles.authTitle}>Авторизация</div>
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
              Войти
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
