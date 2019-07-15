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
            this.active()
            this.view.render(this.model.data)
            window.eventHub.on('upload',(data)=>{
                console.log('new song 得到了data')
                this.active()
            })
            window.eventHub.on('select',(data)=>{
                console.log(data)
                this.deactive()
            })
        },
        active(){
            $(this.view.el).addClass('active')
        },
        deactive(){
            $(this.view.el).removeClass('active')
        }


    }
    controller.init(view,model)
    // window.app.newSong=controller
}
