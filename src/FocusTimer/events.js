import { controls, soundCards } from "./elements.js"
import * as actions from "./actions.js"
import * as el from "./elements.js"
import status from "./status.js"
import * as timer from "./timer.js"

export function registerControls() {
  controls,
    addEventListener("click", (event) => {
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

      const sound = card.dataset.sound
      actions.selectSound(sound)
    })
  })
}

export function setMinutes() {
  el.minutes.setAttribute("contenteditable", true)
  el.minutes.focus()
  el.minutes.addEventListener("blur", () => {
    let time = parseInt(el.minutes.textContent, 10)
    time = isNaN(time) ? status.minutes : Math.min(Math.max(time, 0), 60)
    status.minutes = time
    status.seconds = 0
    timer.updateDisplay()
    el.minutes.removeAttribute("contenteditable")
  })
  el.minutes.addEventListener("keypress", (event) => {
    if (!/\d/.test(event.key)) {
      event.preventDefault()
    }
  })
}
