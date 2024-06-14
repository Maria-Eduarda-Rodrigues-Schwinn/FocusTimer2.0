import status from "./status.js"
import * as timer from "./timer.js"
import { sounds, buttonPressAudio } from "./sounds.js"
import * as el from "./elements.js"
import * as events from "./events.js"

export function toggleRunning() {
  status.isRunning = document.documentElement.classList.toggle("running")

  timer.countDown()
  buttonPressAudio.play()

  buttonPressAudio.play()
}

export function reset() {
  status.isRunning = false
  document.documentElement.classList.remove("running")

  timer.updateDisplay()
  buttonPressAudio.play()
}

export function set() {
  el.minutes.setAttribute("contenteditable", true)
  el.minutes.focus()
}

export function increase() {
  status.minutes += 5
  status.minutes = status.minutes > 60 ? 60 : status.minutes
  timer.updateDisplay()
}

export function decrease() {
  status.minutes = Math.max(0, status.minutes - 5)
  timer.updateDisplay()
}

export function selectSound(sound) {
  if (status.currentSound && status.currentSound === sounds[sound]) {
    status.currentSound.pause()
    status.currentSound = null
    document.getElementById(sound).classList.remove("selected")
  } else {
    if (status.currentSound) {
      status.currentSound.pause()
      document.querySelector(".selected").classList.remove("selected")
    }

    status.currentSound = sounds[sound]
    if (status.currentSound) {
      status.currentSound.play()
      document.getElementById(sound).classList.add("selected")
    }
  }

  buttonPressAudio.play()
}
