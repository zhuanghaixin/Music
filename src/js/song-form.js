{
    let view={
        el:'.page>main',
        template:`
        <h1>新建歌曲</h1>
        <form class="form">
            <div class="row">
                <label>
                    歌名
                </label>
                <input type="text" value="__key__">
            </div>
            <div class="row">
                <label>
                    歌手
                </label>
                <input type="text" value="__singer">
            </div>
            <div class="row">
                <label>
                    外链
                </label>
                <input type="text" value="__link__">
            </div>
            <div class="row actions">
                <button type="submit">保存</button>
            </div>
        </form>
        `,
        render(data={}) {
            let placeholders=['key','link']
            let html=this.template
            placeholders.map((string)=>{
                console.log(string)
               html=html.replace(`__${string}__`,data[string]||'')
            })
            $(this.el).html(html)
        }

    }
    let model={}
    let controller={
        init(view,model){
            console.log(this)
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            window.eventHub.on('upload',(data)=>{
                console.log('new form 得到了data')
                console.log(data)
                this.reset(data)
            })
        },
        reset(data){
            this.view.render(data)
        }
    }
    controller.init(view,model)
    // window.app.songForm=controller
}
