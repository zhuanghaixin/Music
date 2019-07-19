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
            let {songs,selectedSongId} = data

            let liList = songs.map((song) =>
            {
                let $li= $('<li></li>').text(song.name).attr('data-id',song.id)
                if(song.id===selectedSongId){
                   $li.addClass('active')
                }
                return $li
            }
            )

            $el.find('ul').empty()
            liList.map((domLi) => {
                $el.find('ul').append(domLi)
            })
            // $(this.el).html(this.template)
        },
        clearActive() {
            $(this.el).find('.active').removeClass('active')
        },
        activeItem(li){
            $li=$(li)
            $li.addClass('active').siblings().removeClass('active')
        }

    }
    let model = {
        data: {
            songs: [],
            selectedSongId:null
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
            this.bindEventHub()
            this.getAllSongs()
            this.bindEvents()
        },

        bindEventHub(){
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
            window.eventHub.on('new',()=>{
                this.view.clearActive()

                console.log(12333434)
            })
            window.eventHub.on('update',(song)=>{
                let songs=this.model.data.songs

                for(let i=0;i<songs.length;i++){
                    if(songs[i].id===song.id){
                        Object.assign(songs[i],song)
                    }
                }

                this.view.render(this.model.data)
            })
        },
        getAllSongs(){
             this.model.find().then(()=>{
                console.log(this.model.data)
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
            $(this.view.el).on('click','li',(e)=>{
                // this.view.activeItem(e.currentTarget)
                let songId=$(e.currentTarget).attr('data-id')
                this.model.data.selectedSongId=songId
                this.view.render(this.model.data)
                let data
                let songs=this.model.data.songs
                for(let i=0;i<songs.length;i++){
                    if(songId===songs[i].id){
                        data=songs[i]
                       break
                    }
                }

                window.eventHub.emit('select',JSON.parse(JSON.stringify(data)))
            })
        }





    }
    controller.init(view, model)
    // window.app.songList=controller
}
