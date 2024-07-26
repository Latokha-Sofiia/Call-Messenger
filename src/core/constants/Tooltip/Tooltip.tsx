import React, { useState } from "react"
import { useFloating, FloatingPortal } from "@floating-ui/react"
import { offset, flip } from "@floating-ui/react-dom"
import * as styles from "./Tooltip.module.scss"

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const { x, y, strategy, refs } = useFloating({
    placement: "top",
    middleware: [offset(10), flip()],
  })

  return (
    <div
      ref={refs.setReference}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      className={styles.tooltipWrapper}
    >
      {children}
      {isTooltipVisible && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className={styles.tooltip}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </div>
  )
}

export default Tooltip
