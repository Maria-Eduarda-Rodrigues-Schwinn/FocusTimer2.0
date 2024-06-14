import { controls, soundCards } from "./elements.js"
import * as actions from "./actions.js"
import * as el from "./elements.js"
import status from "./status.js"
import { updateDisplay } from "./timer.js"

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

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        card.click()
      }
    })
  })
}

export function setMinutes() {
  el.minutes.addEventListener("focus", () => {
    el.minutes.textContent = ""
  })

  el.minutes.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      el.minutes.blur()
    } else if (!/\d/.test(event.key)) {
      event.preventDefault()
    }
  })

  el.minutes.addEventListener("blur", () => {
    let time = parseInt(el.minutes.textContent)
    time = isNaN(time) ? 0 : Math.min(Math.max(time, 0), 60)

    status.minutes = time
    status.seconds = 0

    updateDisplay()
  })
}
