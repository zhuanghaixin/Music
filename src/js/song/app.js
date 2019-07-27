{
    let view = {
        el: '#app',
        tempalte: `
        <audio src={{url}} controls></audio>
        <div>
        <button class="play">播放</button>
        <button class="pause">暂停</button>
        </div>
        `,
        render(data) {
            // $(this.el).html(this.tempalte.replace('{{url}}',data.url))
            let {song, status} = data
            console.log(song.cover);
            $('.pageBefore').css('background-image', `url(${song.cover})`);
            $(this.el).find('img.cover').attr('src', song.cover)
            if($(this.el).find('audio').attr('src')!==song.url){
                $(this.el).find('audio').attr('src', song.url)
            }

            if(status==='playing'){
                $(this.el).find('.disc-container').addClass('playing')
                $(this.el).find('.icon-wrapper').addClass('appear')
            }else{
                $(this.el).find('.disc-container').removeClass('playing')
                $(this.el).find('.icon-wrapper').removeClass('appear')

            }

            console.log(2)
        },
        play() {
            let audio = $(this.el).find('audio')[0].play()
        },
        pause() {
            let audio = $(this.el).find('audio')[0]
            audio.pause()
        }
    }
    let model = {
        data: {
            song: {
                id: '',
                name: '',
                singer: '',
                url: ''
            },
            status: 'pause'

        },
        get(id) {
            var query = new AV.Query('Song');
            return query.get(id).then((song) => {
                Object.assign(this.data.song, {id: song.id, ...song.attributes})
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

            $(this.view.el).on('click', () => {
                if (this.model.data.status === 'pause') {
                    this.model.data.status = 'playing'
                    this.view.render(this.model.data)
                    this.view.play()
                } else {
                    this.model.data.status = 'pause'
                    this.view.render(this.model.data)
                    this.view.pause()
                    console.log(4);
                }

            })
        }

    }
controller.init(view, model)
}


