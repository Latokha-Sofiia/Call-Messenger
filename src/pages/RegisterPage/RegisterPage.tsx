import React, { useContext, useState } from "react"
import * as styles from "./RegisterPage.module.scss"
import { authController } from "@/core/controllers/AuthController/AuthController"
import { useNavigate } from "react-router-dom"

const AuthPage = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    photo_url: "/images/default-user-logo.jpg",
    login: "",
    password: "",
  })
  const navigate = useNavigate()
  const changeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    navigate("/")
  }

  const registerHandler = async () => {
    try {
      await authController.registerHandler(
        form.name,
        form.login,
        form.password,
        form.surname,
        form.photo_url
      )
    } catch (e) {}
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.rainbowFrame}>
        <div className={styles.infoWrapper}>
          <div className={styles.authTitle}>Регистрация</div>
          <div className={styles.entryFieldItem}>
            <div className={styles.title}>Имя:</div>
            <input
              className={styles.inputItem}
              placeholder={"Введите имя (обязательное поле)"}
              id="name"
              type="login"
              name="name"
              onChange={changeHandler}
            />
          </div>

          <div className={styles.entryFieldItem}>
            <div className={styles.title}>Фамилия:</div>
            <input
              className={styles.inputItem}
              placeholder={"Введите фамилию"}
              id="surname"
              type="surname"
              name="surname"
              onChange={changeHandler}
            />
          </div>

          <div className={styles.entryFieldItem}>
            <div className={styles.title}>Фото профиля:</div>
            <input
              className={styles.inputItem}
              placeholder={"Введите url"}
              id="photo_url"
              type="photo_url"
              name="photo_url"
              onChange={changeHandler}
            />
          </div>

          <div className={styles.entryFieldItem}>
            <div className={styles.title}>Логин:</div>
            <input
              className={styles.inputItem}
              placeholder={"Введите логин (обязательное поле)"}
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
              placeholder={"Введите пароль (обязательное поле)"}
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
