$(function(){
	var contentObj = {
		goBack: function() {
			$('#page-goback').on('click',function(){
				window.history.go(-1);
			})
		},
		refresh: function() {
			$('#page-refresh').on('click',function(){
				window.location.reload();
			})
		}
	}
	for (key in contentObj) {
		contentObj[key]();
	}
})