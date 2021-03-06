import { makeAutoObservable } from 'mobx'

class OptionStore {
    count = 10

    size = 20

    sheets = []

    showRange = true

    constructor() {
        makeAutoObservable(this)
    }

    setCount = (count) => {
        this.count = count
    }

    setSize = (size) => {
        this.size = size
    }

    setSheets = (sheets) => {
        this.sheets = sheets
    }

    setShowRange = (showRange) => {
        this.showRange = showRange
    }
}

const optionStore = new OptionStore()
export default optionStore

if (typeof window !== 'undefined') optionStore.setSize(window.screen.width > 768 ? 20 : 14)
