import { reaction, when } from 'mobx'
import { onAction } from 'mobx-state-tree'

import { init } from 'lib/sounds'
import FileStore from './FileStore'
import OptionStore from './OptionStore'
import WordStore from './WordStore'

when(() => OptionStore.sheets.length > 0, init)
reaction(() => FileStore.file, () => {
    WordStore.reset()
    OptionStore.setSheets([])
})
reaction(() => OptionStore.sheets, () => WordStore.setRefreshed(false))
onAction(WordStore, ({ name }) => {
    if (name === 'roll') OptionStore.setShowRange(false)
})
