import { reaction } from 'mobx'

import FileStore from './FileStore'
import OptionStore from './OptionStore'
import WordStore from './WordStore'

reaction(() => FileStore.file, () => {
    WordStore.reset()
    OptionStore.setSheets([])
})
reaction(() => OptionStore.sheets, () => WordStore.setRefreshed(false))
