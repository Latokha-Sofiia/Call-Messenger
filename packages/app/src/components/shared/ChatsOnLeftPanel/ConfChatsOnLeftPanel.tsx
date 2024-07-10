import React from "react"
import * as styles from "./ConfChatsOnLeftPanel.module.scss"

export const ConfChatsOnLeftPanel = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.conferenceLogo}>
        <img
          src="https://s3-alpha-sig.figma.com/img/2909/7f28/684c3eb2ac3f5c67e9fd57fe1517a2b5?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d5JWTrnrGWgkSNE81RSeDADQhurinQDJm5JxAw5wb9i2topMF3QTLQKmY1A6ltjlcJidhk0U6KWjsVQ9LRBZE2LiQDaQencYwr~6eAL0ERaVVcv9hLo5CG4-EwAWm3okOkV1RtZCg60HaAP1sHggI8~InSIEgRfTFO6m3VC3vOI-JJw7YutYWdOAqss2b1fE3Ll4Fx65rRLGQ1bYxohplUY8MCLKIWgKGtSw0DPps3uBoP92rQAhxl1lISQAKHmq0jXRU5EhK3DTj3lxuWkqb1BiF8nrwMtbAk7lze3agcM3EuSQuedFeCDMRtqJs14kILsIR81xCR3boKbcxWuufQ__"
          className={styles.photoConferenceGroup}
        />
        <img src="/active-call.svg" className={styles.phoneLogo} />
      </div>
      <div className={styles.dataTextOfChat}>
        <div className={styles.titleOfChat}>Запрос документов</div>
        <div className={styles.dataOfChat}>Сегодня, 13 марта 11:30 - 12:30</div>
      </div>
    </div>
  )
}

export default ConfChatsOnLeftPanel
