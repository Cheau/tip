import getSheets from './api/lexicon/sheets'

import WordMatch from 'components/word-match'

export default WordMatch

export async function getStaticProps() {
    const sheets = getSheets()
    return { props: { sheets } }
}
