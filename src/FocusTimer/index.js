import status from "./status.js"
import * as timer from "./timer.js"
import * as events from "./events.js"

export function start(minutes, seconds) {
  status.minutes = minutes
  status.seconds = seconds

  timer.updateDisplay()

  events.registerControls()
}
