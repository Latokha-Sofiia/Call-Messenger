import * as React from "react"
import * as styles from "./MessageBoard.module.scss"
import SearchBar from "../../ui/SearchBar/SearchBar"
import ListOfConferences from "../../ordinary/ListOfConferences/ListOfConferences"

interface MessageBoardProps {
  buttonText: string
}

export const MessageBoard: React.FC<MessageBoardProps> = ({
  buttonText,
}) => {
  const tabsItems = ["Активные", "Запланированные", "Прошедшие"]

  return (
    <div className={styles.rainbowFrame}>
      <div className={styles.wrapper}>
        <div className={styles.fixedPosition}>
          <SearchBar />
          <button className={styles.CreateConferenceButton}>
            <img className={styles.imgOnButton} src="/icons/phone-for-button-call.svg" />
            {buttonText}
          </button>

          <div className={styles.tabs}>
            {tabsItems.map((tab, index) => (
              <div key={index} className={styles.oneTab}>{tab}</div>
            ))}
          </div>
        </div>

        <div className={styles.listOfConferences}>
          <ListOfConferences />
        </div>
      </div>
    </div>
  )
}

export default MessageBoard
