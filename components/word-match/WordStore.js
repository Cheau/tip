import {
    applySnapshot,
    flow,
    getPath,
    getSnapshot,
    resolvePath,
    types,
} from 'mobx-state-tree'
import { Howl } from 'howler'

import LayoutStore from 'features/layout/Store'
import OptionStore from './OptionStore'
import FileStore from './FileStore'
import TimerStore from './TimerStore'

const sounds = {
    complete: new Howl({ src: ['/audio/complete.wav'] }),
    right: new Howl({ src: ['/audio/right.wav'] }),
    sweep: new Howl({ src: ['/audio/sweep.wav'] }),
    tap: new Howl({ src: ['/audio/tap.wav'] }),
    wrong: new Howl({ src: ['/audio/wrong.wav'] }),
}

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

const Subject = types.model('Subject', {
    anchor: types.maybe(Choice),
    errors: types.map(Choice),
    result: types.array(types.string),
    show: types.optional(types.boolean, false),
    source: types.array(types.string),
    target: types.array(types.string),
    trialsFailed: types.optional(types.number, 0),
    trialsPassed: types.optional(types.number, 0),
}).views((self) => ({
    get accuracy() {
        const { trialsFailed, trialsPassed } = self
        return Math.trunc(trialsPassed / (trialsFailed + trialsPassed) * 100)
    },
})).actions((self) => ({
    clearErrors() {
        self.errors.clear()
    },
    match(item) {
        const { clearErrors, setAnchor } = self
        clearErrors()
        setAnchor()
        const pathOfItem = getPath(item)
        self.source = self.source.filter((path) => path !== pathOfItem)
        self.target = self.target.filter((path) => path !== pathOfItem)
        self.result.push(pathOfItem)
        self.trialsPassed += 1
    },
    setAnchor(item, field) {
        if (!item) self.anchor = undefined
        else self.anchor = Choice.create({ id: item.id, field })
    },
    setError(item, field) {
        self.errors.put(Choice.create({ id: item.id, field }))
        self.trialsFailed += 1
    },
    setResult(item) {
        self.result.push(item.id)
    },
    setShow(show) {
        self.show = show
    },
    setSource(source) {
        self.source = source
    },
    setTarget(target) {
        self.target = target
    },
}))

const WordStore = types.model('Word Store', {
    book: types.map(Page),
    candidates: types.array(types.string),
    refreshed: types.optional(types.boolean, false),
    subject: Subject,
}).views((self) => ({
    get result() {
        const result = self.subject.result || []
        return result.map((path) => resolvePath(self, path))
    },
    get source() {
        const source = self.subject.source || []
        return source.map((path) => resolvePath(self, path))
    },
    get target() {
        const target = self.subject.target || []
        return target.map((path) => resolvePath(self, path))
    },
})).actions((self) => ({
    load(id, words) {
        self.book.put(Page.create({ id, words }))
    },
    pick: (item, field) => {
        const { subject } = self
        const {
            anchor, clearErrors, match, setAnchor, setError, setShow, source,
        } = subject
        if (!anchor) {
            setAnchor(item, field)
            sounds.tap.play()
        } else if (anchor.field === field) {
            clearErrors()
            if (anchor.id === item.id) {
                setAnchor()
                sounds.sweep.play()
            } else {
                setAnchor(item, field)
                sounds.tap.play()
            }
        } else if (anchor.id !== item.id) {
            setError(item, field)
            sounds.wrong.play()
        } else {
            match(item)
            if (source.length) sounds.right.play()
            else {
                TimerStore.stop()
                setShow(true)
                sounds.complete.play()
            }
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
        const subject = Subject.create()
        const { count } = OptionStore
        const { candidates } = self
        if (candidates.length <= count) {
            subject.setSource(candidates.sort(srcSort).toJSON())
            subject.setTarget(candidates.sort(tarSort).toJSON())
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
            subject.setSource(array.sort(srcSort))
            subject.setTarget(array.sort(tarSort))
        }
        self.subject = subject
        backup = getSnapshot(self)
        LayoutStore.setOpen(false)
        TimerStore.start()
    }),
    rollback: () => {
        applySnapshot(self, backup)
        LayoutStore.setOpen(false)
        TimerStore.start()
    },
    setRefreshed: (refreshed) => {
        self.refreshed = refreshed
    },
}))

const wordStore = WordStore.create({ subject: {} })
export default wordStore

reset = getSnapshot(wordStore)
