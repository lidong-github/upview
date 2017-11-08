// 时间横向滑动对象缓存
var timeBarCache = {};
/**
 * 初始化 , { timeBarId,时间控件id timeChange:function(){//时间修改回调函数 } height:高度 }
 */
$.fn.initViedoBack = function(option) {
	var content = $(this);
	var playBack = new PlayBack();
	// 默认值
	var defaults = {
		timeBarId : 'timebar',
		height : 60
	};
	playBack.init(content, $.extend(defaults, option));
}
/**
 * 设置回调
 */
$.fn.setMouseUpCallback = function(time){
	var content = $(this);
	var curTimeBar = timeBarCache['timeBar_'+content.attr('id')];
	curTimeBar.curTime = time;
	if(curTimeBar.option.timeChange){
		curTimeBar.option.timeChange(time);
	}
}
/**
 * 设置时间
 */
$.fn.setTime = function(time){
	var curTimeBar = timeBarCache['timeBar_'+$(this).attr('id')];
		if(curTimeBar){
			curTimeBar.curTime = time;
			if ((navigator.userAgent.indexOf('MSIE') >= 0) 
				&& (navigator.userAgent.indexOf('Opera') < 0)){
				var ieversion=navigator.appVersion.match(/8./i)=="8." ? 'IE8' : 'other version';
				//ie8下这个方法会报错
				if(ieversion!='IE8'){
					curTimeBar.setMidLineTime(time);
				}
			}
		}
}
/**
 * 获取时间
 */
$.fn.getTime = function(time){
	var curTimeBar = timeBarCache['timeBar_'+$(this).attr('id')];
	if(curTimeBar){
		if(curTimeBar.getMidLineTime){
			return curTimeBar.getMidLineTime();
		}else if(curTimeBar.curTime){
			return curTimeBar.curTime;
		}else{
			return new Time().getStringTime();
		}
	}
}

function PlayBack() {
	this.init = function(content, option) {
		if (navigator.appName == "Microsoft Internet Explorer") {
			content.append("<object classid='clsid:FD5C6577-4AF5-4794-9B2F-850091CF5235' standby='Waiting...' id='"
							+ option.timeBarId
							+ "' ><param name='activextype' value='3'></object>");
		} else {
			content.append("<canvas id='" + option.timeBarId + "'></canvas>");
		}
		var tTimeBar;
		if (navigator.appName != "Microsoft Internet Explorer") {
			var a = document.getElementById(option.timeBarId);
			if (a.getContext) {
				tTimeBar = new TimeBar(a, content.width(), option.height);
				if (option.timeChange) {
					tTimeBar.setMouseUpCallback(function(c){
						if (c) {
							$("#" + content.attr('id')).setMouseUpCallback(c);
						} else {
							$("#" + content.attr('id')).setMouseUpCallback(this.getMidLineTime());
						}
					});
				}
			} else {
				$("#" + option.timeBarId).html("");
			}
		} else {
			$("#" + option.timeBarId).width(content.width());
			$("#" + option.timeBarId).height(option.height);
			tTimeBar = document.getElementById(option.timeBarId);
		}
		tTimeBar.option = option;
		timeBarCache['timeBar_'+content.attr('id')] = tTimeBar;
		
		content.bind("resize", function() {
			$("#" + option.timeBarId).width(content.width());
			if (navigator.appName != "Microsoft Internet Explorer") {
				if (tTimeBar != null) {
					tTimeBar.resize(content.width(), option.height);
				}
			}
		});
	}
}
