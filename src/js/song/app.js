{
    let view = {
        el: '#app',
        init() {
            this.$el = $(this.el)
        },
        tempalte: `
        <audio src={{url}} controls></audio>
        <div>
        <button class="play">播放</button>
        <button class="pause">暂停</button>
        </div>
        `,
        render(data) {
            // this.$el.html(this.tempalte.replace('{{url}}',data.url))
            let {song, status} = data
            console.log(song.cover);
            $('.pageBefore').css('background-image', `url(${song.cover})`);
            this.$el.find('img.cover').attr('src', song.cover)
            if (this.$el.find('audio').attr('src') !== song.url) {
                this.$el.find('audio').attr('src', song.url)
                console.log('暂停1');
                let audio = this.$el.find('audio')[0]
                audio.onended = () => {
                    window.eventHub.emit('songEnd',)
                }
                audio.ontimeupdate = () => {
                    console.log('播放中');
                    // console.log(audio.currentTime);
                    this.showLyric(audio.currentTime)
                }
                console.log(233333)


            }

            if (status === 'playing') {
                this.$el.find('.disc-container').addClass('playing')
                this.$el.find('.icon-wrapper').addClass('appear')
            } else {
                this.$el.find('.disc-container').removeClass('playing')
                this.$el.find('.icon-wrapper').removeClass('appear')

            }
            this.$el.find('.song-description>h1').text(song.name)
            let array = song.lyrics.split('\n').map((string) => {
                let p = document.createElement('p')
                p.textContent = string
                this.$el.find('.lyric>.lines').append(p)
                let reg = /\[([\d:.]+)\](.+)/
                let match = string.match(reg)
                // console.log(match)
                if (match) {
                    p.textContent = match[2]
                    let time = match[1]
                    let parts = time.split(':')
                    let minutes = parts[0]
                    let seconds = parts[1]
                    let newTime = parseFloat(minutes, 10) * 60 + parseFloat(seconds, 10)
                    p.setAttribute('data-time', newTime)
                }
            })


            console.log(2)
        },
        play() {
            let audio = this.$el.find('audio')[0].play()
        },
        pause() {
            let audio = this.$el.find('audio')[0]
            audio.pause()
        },
        showLyric(time) {
            console.log(time)
            let allP = this.$el.find('.lyric>.lines>p')
            // this.$el.find('.lyric').css('border','1px solid red')
            let p
            for (let i = 0; i < allP.length; i++) {


                    let previousTime = allP.eq(i).attr('data-time')
                    let nextTime = allP.eq(i + 1).attr('data-time')
                    if (previousTime <time && time < nextTime) {
                        console.log(allP[i])
                         p=allP[i]
                        console.log(p);
                        console.log('时间');
                        let pHeight=p.getBoundingClientRect().top
                        let linesHeight=this.$el.find('.lyric>.lines')[0].getBoundingClientRect().top
                        let height=pHeight-linesHeight
                        console.log(height);
                        this.$el.find('.lyric>.lines').css({
                            transform:`translateY(${- (height-25)}px)`
                        })
                        $(p).addClass('active').siblings().removeClass('active')

                        break
                    }




            }


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
            this.view.init()
            this.model = model
            let id = this.getSongId()
            console.log('this.model.data.status')
            console.log(this.model.data.status)
            this.model.get(id).then((data) => {
                // console.log(data)
                // console.log(this.model.data)
                this.model.data.status = 'playing'
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
            window.eventHub.on('songEnd', () => {
                this.model.data.status = 'pause'
                console.log('暂停2');

                this.view.render(model.data)
                console.log('暂停3');

                this.view.pause()
                console.log('暂停4');
            })
        }

    }
    controller.init(view, model)
}


