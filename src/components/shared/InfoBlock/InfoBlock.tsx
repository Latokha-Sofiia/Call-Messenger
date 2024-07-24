import React from "react"
import * as styles from "./InfoBlock.module.scss"
import { Conference } from "@/core/store/ConferencesStore/ConferencesStore"

interface IConfContentPageProps {
  conference: Conference | null
}

const InfoBlock: React.FC<IConfContentPageProps> = ({ conference }) => {
  const infoItems = [
    { name: "Организатор", value: conference.organizer },
    { name: "Ответственный", value: conference.responsible },
    {
      name: "Участники",
      value: `${conference.participants.length} участников`,
    },
    { name: "ID", value: conference.id },
    { name: "Место проведения", value: conference.location },
    { name: "Описание", value: conference.description },
  ]

  return (
    <div>
      <div className={styles.infoBlocks}>
        <div className={styles.titleInfo}>Информация о конференции</div>

        {infoItems.map((item, index) => (
          <div key={index} className={styles.oneInfoBlock}>
            <div className={styles.infoName}>{item.name}</div>
            <div className={styles.infoData}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoBlock
