import { makeAutoObservable } from 'mobx'

class Store {

    open = false

    constructor() {
        makeAutoObservable(this)
    }

    setOpen = (open) => {
        this.open = open
    }
}

const store = new Store()
export default store
