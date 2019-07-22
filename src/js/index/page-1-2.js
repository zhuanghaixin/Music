{
    let view = {
        el: 'section.songs',
        init() {
            this.$el = $(this.el)
        },
        render(data) {
            console.log(3)
            let {songs}=data
            console.log(songs)
            songs.map((song)=>{
                let $li = $(`
            <li>
              <h3>${song.name}</h3>
              <p>
                <svg class="icon icon-sq">
                  <use xlink:href="#icon-sq"></use>
                </svg>
                ${song.singer}
              </p>
              <a class="playButton" href="#">
                <svg class="icon icon-play">
                  <use xlink:href="#icon-play"></use>
                </svg>
              </a>
            </li>
                
            `)
                this.$el.find('ol.list').append($li)
            })

            console.log(4)

        }
    }
    let model = {
        data: {
            songs: []
        },
        find() {
            var query = new AV.Query('Song');
            return query.find().then((songs) => {
                // 成功
                this.data.songs = songs.map((song) => {
                    return {id: song.id, ...song.attributes}
                })

                return songs
            }, (error) => {
                //失败
                console.log(error)
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.model.find().then(() => {
                console.log(1)
                this.view.render(this.model.data)
                console.log(2)
            })
        }
    }
    controller.init(view, model)
}
