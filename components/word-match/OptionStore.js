import { makeAutoObservable } from 'mobx'

class OptionStore {
    count = 5

    fontSize = '26px'

    open = true

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

    setOpen = (open) => {
        this.open = open
    }

    setSheets = (sheets) => {
        this.sheets = sheets
    }
}

const optionStore = new OptionStore()
export default optionStore
