{
    let view = {
        el:'#app',
        tempalte:`
        <audio src={{url}} controls></audio>
        <div>
        <button class="play">播放</button>
        <button class="pause">暂停</button>
        </div>
        `,
        render(data){
            $(this.el).html(this.tempalte.replace('{{url}}',data.url))
        },
        play(){
            let audio=$(this.el).find('audio')[0]
            audio.play()
        },
        pause(){
            let audio=$(this.el).find('audio')[0]
            audio.pause()
        }
    }
    let model = {
        data: {
            id: '',
            name: '',
            singer: '',
            url: ''
        },
        get(id) {
            var query = new AV.Query('Song');
            return query.get(id).then((song)=>{
                Object.assign(this.data, {id:song.id,...song.attributes})
                return song
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            let id = this.getSongId()
            console.log(id)
            this.model.get(id).then((data) => {
                console.log(data)
                console.log(this.model.data)
                this.view.render(this.model.data)
            })
            this.bindEvents()

        },
        getSongId() {
            let search = window.location.search;
            if (search.indexOf('?') === 0) {
                search = search.substring(1)
            }
            console.log(search);
            let array = search.split('&').filter(v => v)
            console.log(array)
            let id = ''
            for (let i = 0; i < array.length; i++) {
                let kv = array[i].split('=')
                let key = kv[0]
                let value = kv[1]

                if (key === 'id') {
                    id = value
                }
                break
            }
            return id
        },
        bindEvents() {
            $(this.view.el).on('click','.play',()=>{
                console.log(1)
                this.view.play()
                console.log(2);

            })
            $(this.view.el).on('click','.pause',()=>{
                console.log(1)
                this.view.pause()
                console.log(2);

            })
        }
    }
    controller.init(view, model)
}


