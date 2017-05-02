var app = getApp()
Page({
    data: {
        systemInfor: {},
        windowWidth: '',
        windowHeight: '',
        canvasInfor: {
            borderColor: 'rgba(230,11,9,1)',
            lastPos: {
                x: 0,
                y: 0
            },
            isClear:false
        }
    },
    //事件处理函数
    navWriteTap(){

    },
    navDrawTap(){

    },
    navOtherTap() {
        wx.navigateTo({
            url: '../other/other'
        })
    },
    onLoad: function() {
        // 获取系统信息
        this.getSystemInforFun()
    },
    onReady() {
        // 画出底色
        this.renderOuterBorderFun()
    },
    // 获取系统信息
    getSystemInforFun() {
        wx.getSystemInfo({
            success: (res) => {
                // 保存系统信息
                this.data.systemInfor = res

                this.data.windowWidth = res.windowWidth

                this.data.windowHeight = res.windowHeight

            }
        })
    },
    touchStartFun(e) {
        this.data.canvasInfor.isMouseDown = true

        this.data.canvasInfor.lastPos = e.changedTouches[0];

        this.context = wx.createCanvasContext('canvas');

        let isClear=this.data.canvasInfor.isClear;
        
        this.context.setStrokeStyle('rgba(255,255,255,0)')
    
        this.context.setStrokeStyle('rgba(0,0,0,1)')
        
        
        this.context.setLineWidth(6)
         // 让线条圆润 
        this.context.setLineCap('round')

        this.context.beginPath()
    },
    touchMoveFun(e) {
        let curPos=e.touches[0],
            lastPos=this.data.canvasInfor.lastPos;
        // this.context.save()
        this.context.moveTo(lastPos.x,lastPos.y)
        this.context.lineTo(curPos.x, curPos.y)
        this.context.stroke()
        // this.context.restore()

        this.data.canvasInfor.lastPos=curPos
        this.context.draw(true)
    },
    touchEndFun(e) {

    },
    clearTapFun(){
        let windowWidth=this.data.windowWidth,
            windowHeight=this.data.windowHeight;
        console.log(this.context.getActions())
        this.context.clearRect(0,0,windowWidth,windowHeight); 
        this.context.draw(true)
    },
    // 画最外层边框+米字格
    renderOuterBorderFun() {
        const context = wx.createCanvasContext('canvasBg');
        const canvasWidth = this.data.windowWidth,
              canvasHeight = canvasWidth;
        const marginSize = 10;

        context.setStrokeStyle(this.data.canvasInfor.borderColor)

        context.beginPath()
        context.moveTo(marginSize, marginSize)
        context.lineTo(canvasWidth - marginSize, marginSize)
        context.lineTo(canvasWidth - marginSize, canvasHeight - marginSize)
        context.lineTo(marginSize, canvasHeight - marginSize)
        context.closePath()
        context.setLineWidth(6)
        context.stroke()

        context.beginPath()
        context.moveTo(marginSize, marginSize)
        context.lineTo(canvasWidth - marginSize, canvasHeight - marginSize)

        context.moveTo(canvasWidth - marginSize, marginSize)
        context.lineTo(marginSize, canvasHeight - marginSize)

        context.moveTo(canvasWidth / 2, marginSize)
        context.lineTo(canvasWidth / 2, canvasHeight - marginSize)

        context.moveTo(marginSize, canvasHeight / 2)
        context.lineTo(canvasWidth - marginSize, canvasHeight / 2)

        context.setLineWidth(1)
        context.stroke()

        context.draw()
    }
})
