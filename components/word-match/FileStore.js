import { reaction, makeAutoObservable } from 'mobx'
import Excel from 'exceljs'

class FileStore {
    files = []

    sheets = []

    constructor() {
        makeAutoObservable(this)
    }

    get file() {
        return this.files.length ? this.files[0] : undefined
    }

    readExcel(file) {
        if (!file) {
            this.setSheets([])
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

    setFile(files) {
        this.files = files.slice(files.length - 1)
    }

    setSheets(sheets) {
        this.sheets = sheets
    }
}

const fileStore = new FileStore()
export default fileStore

reaction(() => fileStore.file, (file) => fileStore.readExcel(file))
