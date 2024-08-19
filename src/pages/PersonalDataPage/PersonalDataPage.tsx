import React, { useContext, useEffect, useState } from "react"
import * as styles from "./PersonalDataPage.module.scss"
import { authController } from "@/core/controllers/AuthController/AuthController"
import { AuthContext } from "@/core/context/AuthContext"
import { useNavigate } from "react-router-dom"
const PersonalDataPage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [personalData, setPersonalData] = useState({
    name: "",
    login: "",
    password: "",
  })

  useEffect(() => {
    const fetchPersonalData = async () => {
      const data = await authController.getPersonalData()
      setPersonalData(data)
    }
    fetchPersonalData()
  }, [])

  const logoutHandler = async (event: any) => {
    event.preventDefault()
    await authController.logout()
    navigate("/")
    auth.setIsAuthenticated(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.rainbowFrame}>
        <div className={styles.infoWrapper}>
          <div className={styles.authTitle}>Персональные данные</div>
          <div className={styles.entryFieldItem}>
            <div className={styles.title}>Имя:</div>
            <div className={styles.dataItem}>{personalData.name}</div>
          </div>

          <div className={styles.entryFieldItem}>
            <div className={styles.title}>Логин:</div>
            <div className={styles.dataItem}>{personalData.login}</div>
          </div>

          <div className={styles.entryFieldItem}>
            <div className={styles.title}>Пароль:</div>
            <div className={styles.dataItem}>{personalData.password}</div>
          </div>

          <button className={styles.buttonLogout} onClick={logoutHandler}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalDataPage
