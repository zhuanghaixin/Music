{
    let view = {
        el: '.page>main',
        init() {
            this.$el = $(this.el)
        }
        ,
        template: `
        <form class="form">
            <div class="row">
                <label>
                    歌名
                </label>
                <input type="text" name="name" value="__name__">
            </div>
            <div class="row">
                <label>
                    歌手
                </label>
                <input type="text" name="singer"   value="__singer__">
            </div>
            <div class="row">
                <label>
                    外链
                </label>
                <input type="text" name="url" value="__url__">
            </div>
            <div class="row actions">
                <button type="submit">保存</button>
            </div>
        </form>
        `,
        render(data = {}) {
            let placeholders = ['name', 'singer', 'url', 'id']
            let html = this.template
            placeholders.map((string) => {
                // console.log(string)
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
            if (data.id) {
                $(this.el).prepend('<h1>编辑歌曲</h1>')
            }
            else {$(this.el).prepend('<h1>新建歌曲</h1>')
                }

        },
        reset() {

            this.render({})
        }

    }
    let model = {
        data: {
            name: '',
            singer: '',
            url: '',
            id: ''
        },
        create(data) {
            // 声明类型
            var Song = AV.Object.extend('Song');
            // 新建对象
            var song = new Song();
            // 设置名称
            song.set('name', data.name);
            song.set('singer', data.singer);
            song.set('url', data.url);
            return song.save().then((newSong) => {
                let {id, attributes} = newSong
                Object.assign(this.data, {
                    id: id,
                    name: attributes.name,
                    singer: attributes.singer,
                    url: attributes.url

                })
            }, (error) => {
                console.error(error);
            });

        }
    }
    let controller = {
        init(view, model) {

            this.view = view
            this.view.init()
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()

            window.eventHub.on('select', (data) => {
                console.log('form得到了选中的列表数据')
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('new',(data)=>{
                console.log('new form 得到了data')
                console.log(this.model.data.id)
                if(this.model.data.id){
                    this.model.data={
                        name: '',
                        singer: '',
                        url: '',
                        id: ''
                    }
                }else{
                    Object.assign(this.model.data,data)
                }
                this.view.render(this.model.data)
            })
        },
        reset(data) {
            this.view.render(data)
        },
        bindEvents() {
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault()
                let needs = ['name', 'singer', 'url']
                let data = {}
                needs.map((string) => {
                    data[string] = this.view.$el.find(`[name=${string}]`).val()
                })

                this.model.create(data).then(() => {
                    this.view.reset()
                    let string = JSON.stringify(this.model.data)
                    let object = JSON.parse(string)
                    window.eventHub.emit('create', object)

                })
            })
        }
    }
    controller.init(view, model)
    // window.app.songForm=controller
}
