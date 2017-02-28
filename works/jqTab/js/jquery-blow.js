;$.fn.extend({
	blow:function(){
		console.log($(this));
		$(this).each(function(index,key){
			console.log(index,key);
			// 返回小图框left、top、right和bottom
			var minBoxPos = $(key).find("#minBox").get(0).getBoundingClientRect();
			// console.log(minBoxPos);
			// 给小框添加鼠标移动事件
			$(key).find("#minBox").on("mousemove",function(e) {
				var e = e || window.event;
				// console.log(e);
				// 鼠标移到小框后，放大镜出现
				$(key).find("#slider").css({
					"display": "block"
				})
				// 鼠标移到小框后，大图出现
				$(key).find("#maxBox").css({
					"display": "block"
				})
				// 放大镜的left改变值 = 当前鼠标位置的X值 - 小框的left值 - 放大镜的width/2(鼠标在放大镜中间)
				var sdLeft = e.clientX - minBoxPos.left - $(key).find("#slider").innerWidth()/2;
				// 放大镜的top值 = 当前鼠标位置的Y值 - 小框的top值 - 放大镜的height/2（鼠标在放大镜中间）
				var sdTop = e.clientY - minBoxPos.top - $(key).find("#slider").innerHeight()/2;
				// 判断放大镜在小框内的边界
				if(sdLeft < 0){
					sdLeft = 0
				}else if(sdLeft > ($(key).find("#minBox").innerWidth() - $(key).find("#slider").innerWidth())){
					sdLeft = $(key).find("#minBox").innerWidth() - $(key).find("#slider").innerWidth();
				}
				if(sdTop < 0){
					sdTop = 0;
				}else if(sdTop > ($(key).find("#minBox").innerHeight() - $(key).find("#slider").innerHeight())){
					sdTop = $(key).find("#minBox").innerHeight() - $(key).find("#slider").innerHeight();
				}
				// console.log(sdLeft,sdTop);
				// 放大镜的位置
				$(key).find("#slider").css({
					"left": sdLeft,
					"top": sdTop
				})
				// 放大镜移动倍数
				var scaleX = sdLeft / ($(key).find("#minBox").innerWidth() - $(key).find("#slider").innerWidth());
				var scaleY = sdTop / ($(key).find("#minBox").innerHeight() - $(key).find("#slider").innerHeight());
				console.log(scaleX,scaleY);
				// 大图移动位置
				$(key).find("#maxBox img").css({
					"left": - scaleX * ($(key).find("#maxBox img").innerWidth() - $(key).find("#maxBox").innerWidth()),
					"top": - scaleY * ($(key).find("#maxBox img").innerHeight() - $(key).find("#maxBox").innerHeight())
				})
			})
			// 给小框添加鼠标离开事件
			$(key).find("#minBox").on("mouseleave",function() {
				// 鼠标离开小框后，放大镜消失
				$(key).find("#slider").css({
					"display": "none"
				})
				// 鼠标离开小框后，大图消失
				$(key).find("#maxBox").css({
					"display": "none"
				})
			})
		})
	}
})