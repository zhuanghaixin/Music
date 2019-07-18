{
    let view={
        el:'#siteLoading',
        show(){
           $(this.el).addClass('active')
        },
        hide(){
            $(this.el).removeClass('active')
        }
    }
    let controller={
        init(view){
            console.log('xxxxxxxxxxxxxxx')
            this.view=view
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on('beforeUpload',()=>{
                console.log('............上传钱。。。。。')
                this.view.show()
            })
            window.eventHub.on('afterUpload',()=>{
                this.view.hide()
            })
        }
    }
    controller.init(view)
}
