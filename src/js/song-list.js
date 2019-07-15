{
    let view = {
        el: '#songList-container',
        template: `
               <ul class="songList">
                
            </ul>
        `,
        render(data) {
            let $el = $(this.el)
            $el.html(this.template)
            let {songs} = data
            // console.log(songs)
            let liList = songs.map((song) => $('<li></li>').text(song.name))
            console.log('liList');
            // console.log(liList);

            // console.log('el');
            console.log($el.find('ul'))
            $el.find('ul').empty()
            liList.map((domLi) => {
                $el.find('ul').append(domLi)
            })
            // $(this.el).html(this.template)
        },
        clearActive() {
            $(this.el).find('.active').removeClass('active')
        }

    }
    let model = {
        data: {
            songs: []
        },
        find(){
            var query = new AV.Query('Song');

            console.log(query)
            return query.find().then((songs) => {
                // 成功
                this.data.songs=songs.map((song)=>{
                    return {id:song.id,...song.attributes}
                })

                return songs
            },(error)=>{
                //失败
                console.log(error)
            })
        }
    }
    let controller = {
        init(view, model) {
            // console.log(this)
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            window.eventHub.on('upload', (data) => {
                console.log('song List 得到了data')
                this.view.clearActive()
            })
            window.eventHub.on('create', (songData) => {
                // console.log(1)
                console.log(songData)
                // console.log(2)
                this.model.data.songs.push(songData)
                // console.log(3);
                this.view.render(this.model.data)
                console.log(4);
                //列表查询

                console.log(5)

            })
            console.log(this)
            this.model.find().then(()=>{
                console.log('----')
                console.log(this.model.data)
                this.view.render(this.model.data)
            })


        }
    }
    controller.init(view, model)
    // window.app.songList=controller
}
