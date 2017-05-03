var app = getApp()
Page({
    data: {
        systemInfor: {},
        windowWidth: '',
        windowHeight: '',
        canvasInfor: {
            colorItem:[
                {name:'黑色',value:'rgba(0,0,0,1)',isChecked:true},
                {name:'蓝色',value:'rgba(0,0,255,1)'},
                {name:'菊花色',value:'rgba(255,255,0,1)'}
            ],
            lineItem:[
                {name:'细',value:'3'},
                {name:'中',value:'6',isChecked:true},
                {name:'粗',value:'9'}
            ],
            borderColor: 'rgba(230,11,9,1)',
            lastPos: {
                x: 0,
                y: 0
            },
            lineColor:'rgba(0,0,0,1)',
            lineWeight:6,
            isClear:false,
            canvasMoveArray:[],
            canvasHistory:[]
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
        
    },
    touchMoveFun(e) {
        // let obj={}
        
        let lineColor=this.data.canvasInfor.lineColor
        let lineWeight=this.data.canvasInfor.lineWeight
        
        let curPos=e.touches[0],
            lastPos=this.data.canvasInfor.lastPos;
        // 线条颜色
        this.context.setStrokeStyle(lineColor)
        // 线条宽度
        this.context.setLineWidth(lineWeight)
         // 让线条圆润 
        this.context.setLineCap('round')

        this.context.beginPath()

        // this.context.save()
        this.context.moveTo(lastPos.x,lastPos.y)
        this.context.lineTo(curPos.x, curPos.y)
        this.context.stroke()
        // this.context.restore()

        // obj.lastpos=lastPos
        // obj.curPos=curPos
        // obj.lineColor=lineColor
        // obj.lineWeight=lineWeight

        this.data.canvasInfor.lastPos=curPos
        this.context.draw(true)
       
        // this.data.canvasInfor.canvasMoveArray.push(obj)

    },
    touchEndFun(e) {
        // this.data.canvasInfor.canvasHistory.push(this.data.canvasInfor.canvasMoveArray);
    },
    // 颜色变化
    lineColorChangeFun(e){
        this.data.canvasInfor.lineColor=e.detail.value
    },
    // 笔画变化
    lineWeightChangeFun(e){
        this.data.canvasInfor.lineWeight=e.detail.value
    },
    // 清空
    clearTapFun(){
        if(this.context){
           let windowWidth=this.data.windowWidth,
            windowHeight=this.data.windowHeight;
           this.context.clearRect(0,0,windowWidth,windowHeight); 
           this.context.draw(true) 
        }
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
