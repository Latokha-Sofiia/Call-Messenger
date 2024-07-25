import { useEffect, useRef, useMemo } from "react"
import { debounce } from "lodash"

type ScrollCallback = (event: Event) => void

const useScrollBottomOffset = (
  callback: ScrollCallback,
  debounceDelay: number = 300
) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const myDebouncedCallback = useMemo(() => {
    return debounce((event: Event) => {
      const target = event.target as HTMLDivElement
      const { scrollTop, scrollHeight, clientHeight } = target
      if (scrollHeight - scrollTop - clientHeight <= 0) {
        callback(event)
      }
    }, debounceDelay)
  }, [callback, debounceDelay])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const handleScrollEvent = (event: Event) => myDebouncedCallback(event)
      container.addEventListener("scroll", handleScrollEvent as EventListener)

      return () => {
        container.removeEventListener(
          "scroll",
          handleScrollEvent as EventListener
        )
      }
    }
  }, [myDebouncedCallback])

  return containerRef
}

export default useScrollBottomOffset
