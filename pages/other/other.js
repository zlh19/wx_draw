var app = getApp()
Page({
    data: {
    	selectImageSrc:''
    },
    navWriteTap(){
    	wx.navigateTo({
            url: '../index/index'
        })
    },
    onReady(){
		
    },
    // 选择图片
    chooseImage(){
		wx.chooseImage({
			success:(res)=>{
				this.setData({
					selectImageSrc:res.tempFilePaths[0]
				})
			}
		})
    },
    switchData(data){
		var outputs=JSON.parse(data).outputs[0];
		var dataValue=JSON.parse(outputs.outputValue.dataValue)
		return dataValue
    },
    uploadImage(){
    	
		var that=this;
    	wx.uploadFile({
			url: 'https://www.tahappy.com/getfile',
			filePath: this.data.selectImageSrc,
			name: 'picName',
			formData:{
		        'user': 'test'
		    },
		    success:(res)=>{
		       	this.setData({
		       		outFileInfor:this.switchData(res.data)
		       	})
		    }
		})
    }
})
