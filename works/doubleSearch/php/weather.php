<?php 
	header("Access-control-Allow-Origin:0.0.0.0/0");
	//设置字符编码，能识别中文
	header("Content-type:text/html;charset=utf-8");
	//获取通过get请求方式，的参数
	$city = $_GET["city"];
	$url = "http://api.map.baidu.com/telematics/v3/weather?location=".$city."&output=json&ak=uIy0VwzdcZV9iUuDrZKD5Nna";
	echo file_get_contents($url);
?>