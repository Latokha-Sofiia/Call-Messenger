import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as styles from "./PersonalDataPage.module.scss"
import { authController } from "@/core/controllers/AuthController/AuthController"
import { AuthContext } from "@/core/context/AuthContext"
import UserProfile from "../../components/personalDataPage/UserProfile/UserProfile"
import UserActions from "../../components/personalDataPage/UserActions/UserActions"
import PersonalDataFormWrapper from "@/core/constants/PersonalDataForm/PersonalDataFormWrapper"
import { notificationController } from "@/core/controllers/NotificationController/NotificationController"
import { INotificationType } from "@/core/constants/Notifications/NotificationsTypes"
import NotificationList from "@/core/constants/TodoNotification/NotificationList"
import PersonalDataForm from "@/core/constants/PersonalDataForm/PersonalDataForm"

const PersonalDataPage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [personalData, setPersonalData] = useState({
    name: "",
    login: "",
    password: "",
    surname: "",
    photo_url: "",
  })

  useEffect(() => {
    const fetchPersonalData = async () => {
      const data = await authController.getPersonalData()
      setPersonalData(data)
    }
    fetchPersonalData()
  }, [])

  const logoutHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    await authController.logout()
    navigate("/")
    auth.setIsAuthenticated(false)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    notificationController.showNotification(
      `Ну и не надо, бука ${personalData.name}...`,
      INotificationType.NotCompleted,
      "",
      () => {}
    )
  }

  const handleEditDataClick = () => {
    setIsFormOpen(true)
  }

  const handleFormSubmit = async (data: {
    name: string
    surname: string
    login: string
    password: string
    photo_url: string
  }) => {
    await editDataHandler(data)
    setIsFormOpen(false)
    notificationController.showNotification(
      `Данные обновлены, ${data.name}`,
      INotificationType.Completed,
      "",
      () => {}
    )
  }

  const editDataHandler = async (data: {
    name: string
    surname: string
    login: string
    password: string
    photo_url: string
  }) => {
    await authController.updatePersonalData(data)
    setPersonalData(data)
    setIsFormOpen(false)
  }

  return (
    <div className={styles.wrapper}>
      <UserProfile
        photo_url={personalData.photo_url}
        name={personalData.name}
        surname={personalData.surname}
        login={personalData.login}
        password={personalData.password}
      />
      <UserActions onLogout={logoutHandler} onEdit={handleEditDataClick} />
      <PersonalDataFormWrapper
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={personalData}
      />
      <NotificationList />
    </div>
  )
}

export default PersonalDataPage
