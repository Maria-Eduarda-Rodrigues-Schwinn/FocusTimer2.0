import status from "./status.js"
import * as timer from "./timer.js"
import * as sounds from "./sounds.js"
import * as el from "./elements.js"

export function toggleRunning() {
  status.isRunning = !status.isRunning
  document.documentElement.classList.toggle("running", status.isRunning)

  if (status.isRunning) {
    timer.countDown()
  } else {
    clearTimeout(status.countDownId)
  }

  sounds.buttonPressAudio.play()
}

export function reset() {
  status.isRunning = false
  document.documentElement.classList.remove("running")

  timer.updateDisplay()
  sounds.buttonPressAudio.play()
}

export function set() {
  el.minutes.setAttribute("contenteditable", true)
  el.minutes.focus()
}

export function increase() {
  status.minutes += 5
  timer.updateDisplay()
}

export function decrease() {
  status.minutes = Math.max(0, status.minutes - 5)
  timer.updateDisplay()
}

export function selectSound(sound) {
  if (status.currentSound) {
    status.currentSound.pause()
  }

  status.currentSound = sounds[sound]
  if (status.currentSound) {
    status.currentSound.play()
  }

  sounds.buttonPressAudio.play()
}

export function toggleMusic() {
  status.isMute = !status.isMute
  document.documentElement.classList.toggle("music-on", status.isMute)

  // if (status.isMute) {
  //   sounds.bgAudio.play()
  // } else {
  //   sounds.bgAudio.pause()
  // }
}
