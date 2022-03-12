import {
    applySnapshot,
    flow,
    getPath,
    getSnapshot,
    resolvePath,
    types,
} from 'mobx-state-tree'

import OptionStore from './OptionStore'
import FileStore from './FileStore'

const rdmSort = (ratio = 0.5) => () => Math.random() - ratio
const srcSort = rdmSort(0.4)
const tarSort = rdmSort(0.6)

const parseWord = (sheetId, array) => array.map(([text, meaning], i) => ({ id: `${sheetId}-${i}`, text, meaning }))

let backup
let reset

const Choice = types.model('Choice', {
    id: types.identifier,
    field: types.enumeration(['text', 'meaning']),
})

const Word = types.model('Word', {
    id: types.identifier,
    text: types.string,
    meaning: types.string,
})

const Page = types.model('Page', {
    id: types.identifierNumber,
    words: types.array(Word),
})

const WordStore = types.model('Word Store', {
    anchor: types.maybe(Choice),
    book: types.map(Page),
    candidates: types.array(types.string),
    errors: types.map(Choice),
    refreshed: types.optional(types.boolean, false),
    res: types.array(types.string),
    src: types.array(types.string),
    tar: types.array(types.string),
}).views((self) => ({
    get result() {
        return self.res.map((path) => resolvePath(self, path))
    },
    get source() {
        return self.src.map((path) => resolvePath(self, path))
    },
    get target() {
        return self.tar.map((path) => resolvePath(self, path))
    },
})).actions((self) => ({
    clearErrors() {
        self.errors.clear()
    },
    load(id, words) {
        self.book.put(Page.create({ id, words }))
    },
    match: (item) => {
        const { clearErrors, setAnchor } = self
        clearErrors()
        setAnchor()
        const pathOfItem = getPath(item)
        self.src = self.src.filter((path) => path !== pathOfItem)
        self.tar = self.tar.filter((path) => path !== pathOfItem)
        self.res.push(pathOfItem)
    },
    pick: (item, field) => {
        const {
            anchor, clearErrors, match, setAnchor, setError,
        } = self
        if (!anchor) setAnchor(item, field)
        else if (anchor.field === field) {
            clearErrors()
            if (anchor.id === item.id) setAnchor()
            else setAnchor(item, field)
        } else if (anchor.id !== item.id) {
            setError(item, field)
        } else {
            match(item)
        }
    },
    refresh: flow(function *() {
        const { book, load } = self
        const { sheets } = OptionStore
        for (const sheet of sheets) {
            if (book.has(sheet)) return
            const data = yield FileStore.readSheet(sheet)
            const words = parseWord(sheet, data)
            if (words) load(sheet, words)
        }
        self.candidates = sheets.map((sheet) => book.get(sheet).words).flat().map(getPath)
        self.refreshed = true
    }),
    reset: () => {
        applySnapshot(self, reset)
    },
    roll: flow(function *() {
        const { refresh, refreshed } = self
        if (!refreshed) yield refresh()
        const { count } = OptionStore
        const { candidates } = self
        if (candidates.length <= count) {
            self.src = candidates.sort(srcSort).toJSON()
            self.tar = candidates.sort(tarSort).toJSON()
        } else {
            const set = new Set()
            do {
                let index = Math.trunc(Math.random() * candidates.length)
                while (set.has(index)) {
                    index = index < candidates.length ? index + 1 : 0
                }
                set.add(index)
            } while (set.size < count)
            const array = Array.from(set.values()).map((i) => candidates[i])
            self.src = array.sort(srcSort)
            self.tar = array.sort(tarSort)
        }
        self.res = []
        backup = getSnapshot(self)
    }),
    rollback: () => {
        applySnapshot(self, backup)
    },
    setAnchor: (item, field) => {
        if (!item) self.anchor = undefined
        else self.anchor = Choice.create({ id: item.id, field })
    },
    setError: (item, field) => {
        self.errors.put(Choice.create({ id: item.id, field }))
    },
    setRefreshed: (refreshed) => {
        self.refreshed = refreshed
    },
    setResult: (item) => {
        self.res.push(item.id)
    }
}))

const wordStore = WordStore.create()
export default wordStore

reset = getSnapshot(wordStore)
