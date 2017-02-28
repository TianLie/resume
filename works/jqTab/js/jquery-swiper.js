;$.fn.extend({
	swiper:function() {
		$(this).each(function(index, key) {
			console.log(index,key);
			// 定时器
			var timer = 0;
			// 时间
			var speed = 3000;
			// 小圆点的class
			var spanClass = "active";
			var index = 0;
			// 获取图片的width
			var perWidth = $(key).find(".swiper-inner img").eq(0).width();
			console.log(perWidth);
			// 获取图片张数
			var len = $(key).find(".swiper-inner a").size();
			console.log(len);
			// 设置图片容器swiper-inner的宽度
			$(key).find(".swiper-inner").width(perWidth*len);
			// 动态生成对应图片张数的小圆点
			for(var i = 0; i < len; i++){
				var $span = null;
				if(i == 0){
					// 给第一个圆点添加active，
					$span = $("<span></span>",{
						text: i + 1,
						class: spanClass
					});
				}else{
					// 设置圆点
					$span = $("<span></span>",{
						text: i + 1
					});
				}
				$span.appendTo($(key).find(".paganation"));
			}	
			// 给圆点添加事件
			$(key).find(".paganation").on("click","span",function() {
				index = $(this).index();
				tab();
			})
			// 上一张
			$(key).find(".left-arrow").on("click",function() {
				prev();
			})
			// 下一张
			$(key).find(".right-arrow").on("click",function() {
				next();
			})
			function prev() {
				index--;
				if(index < 0){
					index = len -1;
				}
				tab();
			}
			function next() {
				index++;
				if(index > len -1){
					index = 0;
				}
				tab();
			}
			function tab() {
				$(key).find(".paganation span").eq(index).addClass(spanClass).siblings().removeClass(spanClass);
				$(key).find(".swiper-inner").stop().animate({
					left:- index * perWidth
				})
			}
			// 自动轮播
			timer = setInterval(next,speed);
			// 鼠标动作
			$(key).hover(function() {
				clearInterval(timer);
			},function() {
				clearInterval(timer);
				timer = setInterval(next,speed);
			})
		})
		// 链式操作
		return $(this);
	}
})