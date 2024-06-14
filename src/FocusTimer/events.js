import { controls, soundCards } from "./elements.js"
import * as actions from "./actions.js"
import * as el from "./elements.js"
import status from "./status.js"
import * as timer from "./timer.js"

export function registerControls() {
  controls.addEventListener("click", (event) => {
    const action = event.target.closest("button")?.dataset.action

    if (typeof actions[action] !== "function") {
      return
    }

    actions[action]()
  })

  soundCards.forEach((card) => {
    card.addEventListener("click", () => {
      soundCards.forEach((c) => c.classList.remove("selected"))
      card.classList.add("selected")

      const sound = card.id
      actions.selectSound(sound)
    })
  })
}

export function setMinutes() {
  el.minutes.addEventListener("focus", () => {
    el.minutes.textContent = ""
  })

  el.minutes.onkeypress = (event) => /\d/.test(event.key)

  el.minutes.addEventListener("blur", event => {
    let time = event.currentTarget.textContent
    time = time > 60 ? 60 : time

    status.minutes
    status.seconds = 0

    timer.updateDisplay()
    el.minutes.removeAttribute("contenteditable")
  })
}
