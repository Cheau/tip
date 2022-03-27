import { makeAutoObservable } from 'mobx'

const padTime = (units, length = 2) => {
    while (units.length < length) units.unshift(0)
    return units.map((unit) => String(unit).padStart(2, '0')).join(':')
}

class TimerStore {
    pending = true

    text = '00:00'

    time = 0

    constructor() {
        makeAutoObservable(this)
    }

    setPending(pending) {
        this.pending = pending
    }

    setText(text) {
        this.text = text
    }

    setTime(time) {
        this.time = time
    }

    start() {
        this.setPending(false)
        this.setTime(new Date().getTime())
        this.tick()
    }

    stop() {
        this.setPending(true)
    }

    tick() {
        if (this.pending) return
        const current = new Date().getTime()
        const units = []
        let elapsedTime = (current - this.time) / 1000
        let divisor = 3600
        do {
            if (elapsedTime >= divisor) {
                units.push(Math.trunc(elapsedTime / divisor))
                elapsedTime = elapsedTime % divisor
            }
            divisor = divisor / 60
        } while (divisor >= 1)
        if (units.length < 2) units.unshift(0)
        this.setText(padTime(units))
        setTimeout(() => this.tick(), 1000)
    }
}

const timerStore = new TimerStore()
export default timerStore
