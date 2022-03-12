import lexicon from './lexicon.xlsx'

const sheets = lexicon.map(({ name }, id) => ({ id, name }))

export default function getSheets(req, res) {
    if (!res) return sheets
    res.end(sheets)
}
