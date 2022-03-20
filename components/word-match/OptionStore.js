import { makeAutoObservable } from 'mobx'

class OptionStore {
    count = 10

    fontSize = '26px'

    sheets = []

    constructor() {
        makeAutoObservable(this)
    }

    setCount = (count) => {
        this.count = count
    }

    setFontSize = (fontSize) => {
        this.fontSize = `${fontSize}px`
    }

    setSheets = (sheets) => {
        this.sheets = sheets
    }
}

const optionStore = new OptionStore()
export default optionStore
