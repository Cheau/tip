import db from './db.xlsx'

export const sheets = db.map(({ name }, id) => ({ id, name }))

const lexicon = sheets.reduce((accumulator, sheet) => {
    const { id } = sheet
    const { data } = db[id]
    accumulator[id] = data.filter((datum) => datum.length)
    return accumulator
}, {})

export default lexicon
