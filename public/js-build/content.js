$(function(){
	var contentObj = {
		init: function() {
            layui.use('form', function() {
	            var form = layui.form;
	            form.render('select');
	            //监听提交
	            form.on('submit(common_form)', function(data) {
	                
	            });
	        });
		},
		goBack: function() {
			$('#page-goback').on('click',function(){
				window.history.go(-1);
			})
		},
		refresh: function() {
			$('#page-refresh').on('click',function(){
				window.location.reload();
			})
		},
		transformImg: function() {
			if($('.uploadImg').length) {
				var uploadImg = $('.uploadImg'),
				    fileSelect = uploadImg.find('.fileSelect'),
	                fileElem = uploadImg.find('.upload_file'),
	                exhibition = uploadImg.find('.exhibition'),
	                img_value = uploadImg.find('.img_value');
	            fileSelect[0].addEventListener('click', function(e) {
	                if (fileElem) {
	                    fileElem.click();
	                }
	                if (e && e.preventDefault) { 
	                    e.preventDefault();
	                } else {
	                    window.event.returnValue = false;
	                }
	            }, false);
	            //将上传的图片转化为base64格式
	            fileElem.on('change', function(e) {
	                var file = e.target.files[0];
	                var reader = new FileReader();
	                reader.readAsDataURL(file);
	                reader.onloadend = function() {
	                    var dataUrl = reader.result;
	                    exhibition.attr('src',dataUrl);
	                    img_value.val(dataUrl);
	                }
	            })
			}
		}
	}
	for (key in contentObj) {
		contentObj[key]();
	}
})