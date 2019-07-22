
    let view={
        el:'section.songs',
        init(){
            this.$el=$(this.el )
        }
    }

    let model={
        data:{
            songs:[]
        },
        find(){
            var query = new AV.Query('Song');
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
    let controller={
        init(view,model){
            this.view=view
            this.view.init()
            this.model=model
            this.model.find().then(()=>{
                console.log(this.model.data)
            })
        }
    }


export {view,model,controller};
