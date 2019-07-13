{
    let view={
        el:'#songList-container',
        template:`
               <ul class="songList">
                <li>歌曲1</li>
                <li class="active">歌曲222222</li>
                <li>歌曲3333</li>
                <li>歌曲4</li>
                <li>歌曲555</li>
                <li>歌曲6</li>
                <li>歌曲7</li>
                <li>歌曲8</li>
                <li>歌曲9</li>
                <li>歌曲10</li>
            </ul>
        `,
        render(data) {
            $(this.el).html(this.template)
        }

    }
    let model={}
    let controller={
        init(view,model){
            console.log(this)
            this.view=view
            this.model=model
            this.view.render(this.model.data)
        }
    }
    controller.init(view,model)
    window.app.songList=controller
}
