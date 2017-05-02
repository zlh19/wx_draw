var app = getApp()
Page({
    data: {
    	selectImageSrc:''
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
				
				wx.request({
					url:'https://www.tahappy.com/getImgPath',
					data:{
						urlData:res.tempFilePaths[0]
					},
					method:'GET',
					success:function(res){
						console.log(res)
					}
				})
			}
		})
    },
    uploadImage(){
    // 	wx.request({
    //         url: 'https://www.tahappy.com/getfile',
    //         method: 'POST',
    //         success(res){
				// console.log(res)
    //         }
    // 	})

    var uploadImage = this.data.selectImageSrc
     console.log(uploadImage);
	var reader = new FileReader()
     console.log(reader);

	reader.onload = function (e) {
	      var arrayBuffer = reader.result;
	      var base64 = wx.arrayBufferToBase64(arrayBuffer)
	      console.log(base64);
	}
	// reader.readAsArrayBuffer(new Blob(this.data.imageList))
	
    	wx.uploadFile({
			url: 'https://www.tahappy.com/getfile',
			filePath: this.data.selectImageSrc,
			name: 'file',
			formData:{
		        'user': 'test'
		    },
		    success: function(res){
		        var data = res.data
		    }
		})
    }
})
