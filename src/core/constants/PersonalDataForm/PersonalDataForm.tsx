import React, { useState } from "react"
import * as styles from "./PersonalDataForm.module.scss"
import { IUserDataProps } from "@/core/models"

interface PersonalDataFormProps extends IUserDataProps {
  initialData: {
    name: string
    surname: string
    login: string
    password: string
    photo_url: string
  }
}

const PersonalDataForm: React.FC<PersonalDataFormProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState<string>(initialData.name || "")
  const [surname, setSurname] = useState<string>(initialData.surname || "")
  const [login, setLogin] = useState<string>(initialData.login || "")
  const [password, setPassword] = useState<string>(initialData.password || "")
  const [photo_url, setPhotoUrl] = useState<string>(initialData.photo_url || "")

  const isFormValid = () => {
    return name.trim() && login.trim() && password.trim()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({
      name,
      surname,
      login,
      password,
      photo_url: "/images/default-user-logo.jpg",
    })
  }

  const getInputClassName = (field: string) => {
    if (field.trim()) {
      return styles.inputItem
    }
    return `${styles.inputError} ${styles.inputItem}`
  }

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Имя:</div>
          <input
            className={getInputClassName(name)}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="login"
          />
        </div>

        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Фамилия:</div>
          <input
            className={styles.inputItem}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            type="login"
          />
        </div>

        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Логин:</div>
          <input
            className={getInputClassName(login)}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            type="login"
          />
        </div>

        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Пароль:</div>
          <input
            className={getInputClassName(password)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="login"
          />
        </div>

        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Фото профиля:</div>
          <input
            className={styles.inputItem}
            value={photo_url}
            onChange={(e) => setPhotoUrl(e.target.value)}
            type="login"
          />
        </div>

        <button className={styles.buttonCancel} type="button" onClick={onClose}>
          Отмена
        </button>

        <button
          className={styles.buttonSave}
          type="submit"
          disabled={!isFormValid()}
        >
          Сохранить изменения
        </button>
      </form>
    </div>
  )
}

export default PersonalDataForm
