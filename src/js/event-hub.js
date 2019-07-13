window.eventHub = {
    events: {
        // '羊城晚报': [],
        // '中国日报': []  //缓存列表，缓存订阅者的回调函数
    },
    emit(eventName, data) {   //发布
        console.log('发布')
        for (let key in this.events) {
            if (key === eventName) {
                let fnList = this.events[key]
                fnList.map((fn) => {
                    fn.call(undefined, data)
                })
            }
        }
    },
    on(eventName, fn) {    //订阅
        console.log('订阅')
        if (this.events[eventName] === undefined) {
            this.events[eventName] = []
        }
        this.events[eventName].push(fn)
    }
}
