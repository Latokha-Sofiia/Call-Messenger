import React from "react"
import * as styles from "./InfoBlock.module.scss"
import { Conference } from "@/core/store/ConferencesStore/ConferencesStore"
import Tooltip from "@/core/constants/Tooltip/Tooltip"

interface IConfContentPageProps {
  conference: Conference | null
}

const InfoBlock: React.FC<IConfContentPageProps> = ({ conference }) => {
  if (!conference) {
    return null
  }

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
            {item.name === "Участники" ? (
              <Tooltip
                content={
                  <div>
                    {conference.participants.map((participant, idx) => (
                      <div key={idx}>{participant}</div>
                    ))}
                  </div>
                }
              >
                <div className={styles.infoDataParticipants}>{item.value}</div>
              </Tooltip>
            ) : (
              <div className={styles.infoData}>{item.value}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoBlock
