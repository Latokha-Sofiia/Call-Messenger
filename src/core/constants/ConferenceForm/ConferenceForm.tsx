import React, { useState } from "react"
import * as styles from "./ConferenceForm.module.scss"
import { IConferenceFormProps } from "@/core/models"

const ConferenceForm: React.FC<IConferenceFormProps> = ({
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [organizer, setOrganizer] = useState<string>("")
  const [responsible, setResponsible] = useState<string>("")
  const [participants, setParticipants] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [photo_url, setPhotoUrl] = useState<string>("")

  const isFormValid = () => {
    return title.trim() && date.trim() && organizer.trim()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({
      title,
      date,
      organizer,
      responsible,
      participants: participants.split(","),
      location,
      description,
      photo_url: photo_url || "/images/cat-default.png",
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
          <div className={styles.title}>Тема конференции:</div>
          <input
            className={getInputClassName(title)}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="login"
          />
        </div>

        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Дата проведения:</div>
          <input
            className={getInputClassName(date)}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="login"
          />
        </div>

        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Организатор:</div>
          <input
            className={getInputClassName(organizer)}
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            type="login"
          />
        </div>

        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Ответственный:</div>
          <input
            className={styles.inputItem}
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            type="login"
          />
        </div>

        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Участники:</div>
          <input
            className={styles.inputItem}
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            type="login"
          />
        </div>

        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Место проведения:</div>
          <input
            className={styles.inputItem}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="login"
          />
        </div>

        <div className={styles.entryFieldItem}>
          <div className={styles.title}>Описание:</div>
          <input
            className={styles.inputItem}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          Передумать создавать конференцию
        </button>

        <button
          className={styles.buttonCreateConference}
          type="submit"
          disabled={!isFormValid()}
        >
          Создать конференцию
        </button>
      </form>
    </div>
  )
}

export default ConferenceForm
