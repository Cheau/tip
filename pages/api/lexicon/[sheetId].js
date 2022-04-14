import lexicon from 'lib/lexicon'

export default function getSheetData(req, res) {
    const { sheetId } = req.query
    const data = lexicon[Number(sheetId)]
    if (!res) return data
    res.json(data)
}
