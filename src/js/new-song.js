{
    let view={
        el:'.newSong',
        template:` 新建歌曲`,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model={}
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
        },
        active(){
            $(this.view.el).addClass('active')
        }

    }
    controller.init(view,model)
    window.app.newSong=controller
}
