import * as React from "react"
import * as styles from "./MessageBoard.module.scss"
import SearchBar from "../../../components/shared/SearchBar/SearchBar"
import ListOfConferences from "../../../components/conferences/ListOfConferences/ListOfConferences"

interface MessageBoardProps {
  buttonText: string
  tabsItems: string[]
}

export const MessageBoard: React.FC<MessageBoardProps> = ({
  buttonText,
  tabsItems,
}) => {
  return (
    <div className={styles.rainbowFrame}>
      <div className={styles.wrapper}>
        <SearchBar />
        <button className={styles.CreateConferenceButton}>
          <img className={styles.imgOnButton} src="/phone-for-button-call.svg" />
          {buttonText}
        </button>
        <ListOfConferences tabsItems={tabsItems} />
      </div>
    </div>
  )
}

export default MessageBoard
