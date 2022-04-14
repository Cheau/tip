import { sheets } from 'lib/lexicon'

export default function getSheets(req, res) {
    if (!res) return sheets
    res.end(sheets)
}
