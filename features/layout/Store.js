import { makeAutoObservable } from 'mobx'

class Store {

    open = true

    constructor() {
        makeAutoObservable(this)
    }

    setOpen = (open) => {
        this.open = open
    }
}

const store = new Store()
export default store
