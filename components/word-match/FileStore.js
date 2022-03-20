import { flow, reaction, makeAutoObservable } from 'mobx'
import Excel from 'exceljs'

const parseJson = (sheet) => {
    const array = []
    sheet.eachRow(((row, rowNumber) => {
        if (row.hasValues) {
            const [, ...rest] = row.values
            const plain = rest.map((cell) => {
                if (typeof cell === 'string') return cell
                if (typeof cell === 'object') return cell.richText.flatMap((part) => part.text).join('')
                return ''
            })
            array.push(plain)
        }
    }))
    return array
}

class FileStore {
    files = []

    sheetsLocal

    sheetsRemote

    constructor() {
        makeAutoObservable(this, { readSheet: flow })
    }

    get file() {
        return this.files.length ? this.files[0] : undefined
    }

    get sheets() {
        return this.sheetsLocal || this.sheetsRemote || []
    }

    readExcel(file) {
        if (!file) {
            this.setSheets()
            return
        }
        const self = this
        const reader = new FileReader()
        reader.onload = async (e) => {
            const data = e.target.result
            const workbook = new Excel.Workbook()
            await workbook.xlsx.load(data)
            self.setSheets(workbook.worksheets)
        }
        reader.readAsBinaryString(file.blobFile)
    }

    *readSheet(sheetId) {
        const sheet = this.sheets.slice().find((sheet) => sheet.id === sheetId)
        if (this.sheetsLocal) return parseJson(sheet)
        const res = yield fetch(`/api/lexicon/${sheetId}`)
        const data = yield res.json()
        return data.filter((datum) => datum.length)
    }

    setFile(files) {
        this.files = files.slice(files.length - 1)
    }

    setSheets(sheets, local = true) {
        if (local) this.sheetsLocal = sheets
        else this.sheetsRemote = sheets
    }
}

const fileStore = new FileStore()
export default fileStore

reaction(() => fileStore.file, (file) => fileStore.readExcel(file))
