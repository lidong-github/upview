<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<c:set var="path" value="${pageContext.request.contextPath}"></c:set>
<!DOCtype html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-type" content="text/html; charset=UTF-8" />
<title>回放</title>
<script type="text/javascript">
var path = "${path}";
</script>
<%@ include file="/system/header.jsp"%>
<script type="text/javascript" src="${path }/js/common/jquery/jquery.js"></script>
<script type="text/javascript" src="${path }/js/common/pushlet/ajax-pushlet-client.js"></script>

<script type="text/javascript" src="${path }/js/module/iot/schedule/message.js"></script>
<script type="text/javascript" src="${path }/js/module/iot/schedule/index.js"></script>

<script type="text/javascript" src="${path }/js/module/iot/schedule/video/timeBar.js"></script>
<script type="text/javascript" src="${path }/js/module/iot/schedule/video/playback.js"></script>

<script type="text/javascript">
	var addr = '${play.addr}';
	var user = '${play.user}';
	var passw = '${play.passw}';
	var chanid = '${play.chanid}';
	var type = '${play.type}';
	var backTime='${play.backTime}';
	var autoTime;

	/**
	 *查询可以回放的播放时间记录.返回回放记录，
	 *plugin为obj对象，addr为视频播放地址，user为用户名，passw为用户密码，chanid为通道号，stime是 查询起始时间，etime为查询结束时间
	 *{"rcds":[{"e_time":"2015-04-29 11:43:08","s_time":"2015-04-29 00:00:00"}]}  返回多个时间段，e_time为时间段结束时间，s_time为起始时间
	 **/
	function pluginquery(plugin, type, addr, user, passw, chanid, sTime, eTime) {

		try {
			plugin.SetRcdOpt(type, addr, user, passw, chanid);
			var rcds = plugin.Query(sTime, eTime);

			return rcds;
		} catch (e) {
			alert("查询回访记录失败");
		}
	}

	/**
	 *回放播放
	 */
	function pluginplayback(pluginid,backTime) {

		try {
		
			var plugin = document.getElementById(pluginid);
			if (plugin.valid) {
				plugin.SetRcdOpt(type, addr, user, passw, chanid);
				//传入回放的开始播放时间
				var ret = plugin.StartPlay(backTime);
				
				autoTime=window.setInterval(autoSetTime,1000);
				return ret;
			} else {
				alert("请加载视频播放插件");
			}
		} catch (e) {
			
		}

	}

	/**
	 *获取回放播放时间
	 */
	function getplaybacktime(pluginid) {
		try {
			var plugin = document.getElementById(pluginid);
			return plugin.GetOsdTime();
		} catch (e) {
			alert("获取回访播放时间失败");
		}
	}
	/**
	 *回放设置播放时间
	 */
	function setplaybacktime(pluginid, backTime) {
		try {
			var plugin = document.getElementById(pluginid);
			var ret = plugin.SetPlayTime(backTime);
			if(ret==-1){
				alert("该时间点没有视频");
			}else{
				if(autoTime==null){
					autoTime=window.setInterval(autoSetTime,1000);
				}
			}
			return ret;
		} catch (e) {
			alert("设置回访播放时间失败");
		}
	}
	/**
	 *回放设置播放速度
	 */
	function setplaybackspeed(pluginid, speed) {
		try {
			var plugin = document.getElementById(pluginid);
			if (plugin.valid) {
				var ret = plugin.SetSpeed(speed);
				return ret;
			} else {
				alert("请加载视频播放插件");
			}
		} catch (e) {
			alert("设置回访播放速度失败");
		}
	}

	/**
	 *停止回放
	 */
	function stopplayback(pluginid) {

		try {
			var plugin = document.getElementById(pluginid);
			if (plugin.valid) {
				var ret = plugin.StopPlay();
				return ret;
			} else {
				alert("请加载失败播放插件");
			}
		} catch (e) {
			alert("停止回访播放失败");
		}

	}

	
	//视频当前播放速度
	var currentSpeed=1;
	//加速播放
	function upSpeed(){
		//视频变化的播放速度
		if(currentSpeed*2<=8){
			currentSpeed*=2;
		}
		setplaybackspeed('plugin',currentSpeed);
		$("#status").val("播放速度："+currentSpeed);
	}
	//减速播放
	function downSpeed(){
		//视频变化的播放速度
		if(currentSpeed/2>=0.25){
			currentSpeed/=2;
		}
		setplaybackspeed('plugin',currentSpeed);
		$("#status").val("播放速度："+currentSpeed);
	}
	//正常播放速度
	function  speed(){
		currentSpeed=1;
		setplaybackspeed('plugin',currentSpeed);
		$("#status").val("播放速度："+currentSpeed);
	}
	//暂停
	function timeOut(){
		currentSpeed=0;
		setplaybackspeed('plugin',currentSpeed);
		$("#status").val("播放速度："+currentSpeed);
	}
	//设置播放时间
	function setTime(){
		var time=jQuery("#setTime").val();
		if(time.length==0){
			return false;
		}
		$('#playbackbar').setTime(time);
		setplaybacktime("plugin", time);
	}
	//随着视频播放，自动改变时间控件的时间
	function autoSetTime(){
		var time=getplaybacktime('plugin');
		if(console)console.log(time);
		$('#playbackbar').setTime(time);
		
	}
	
	
	
	
	jQuery(function() {
		var plugin=document.getElementById("plugin");
		if (typeof(plugin.version) == "undefined") {
			if(confirm("未安装视频插件，请点击确定下载并安装视频插件")){
		        location.href="http://${play.addr}/UpViewWeb.exe";
		 	}
		}else if (plugin.version<'1.10.0.0'){
			if(confirm("视频插件版本较低，可能会导致视频功能异常，建议升级视频插件。升级步骤：1、点击确定下载新版视频插件。2、在电脑的控制面板-->程序-->卸载程序中，先卸载旧版视频插件：UpViewWeb。3、安装下载的新版视频插件：UpViewWeb.exe"))
		    {
		        location.href="http://${play.addr}/UpViewWeb.exe";
		     }
		}else{
			pluginplayback('plugin',backTime);
			$('#playbackbar').initViedoBack({
				timeBarId : 'timebar2',
				timeChange:function(c){
					window.clearInterval(autoTime);
					autoTime=null;
					currentSpeed=1;
					$("#status").val("播放速度："+currentSpeed);
					setplaybacktime("plugin", c);
				}
			});
		}

		
		
	
		
	
		
		jQuery("body").css("height",document.documentElement.clientHeight-20+"px");
	});
</script>
<script type='text/javascript' for=timebar2 event='GetMovePlaybackTime(szGetTime)'>
	$('#playbackbar').setMouseUpCallback(szGetTime);
</script>
<style type="text/css">
	input[type="button"]{ border:0; color:#858585; cursor:pointer;}
	.dateIcon{ float:left; background-color:#363636; border:1px solid #636363; margin-left:5px; color:#858585; width:200px; height:20px; line-height:20px; float:left; margin-top:4px;margin-left:5px;}
	.show-left{ float:left; width:58px; height:32px; cursor:pointer; background:url(${path }/image/index/manfang.png) no-repeat;margin-left:5px;}
	.show-right{ float:left; width:58px; height:32px; cursor:pointer; background:url(${path }/image/index/kuaifang.png) no-repeat;margin-left:5px;}
	.show-num{ float:left; width:120px; text-align:center; color:#ccc !important; height:32px; cursor:pointer; background:url(${path }/image/index/show-bg.png) no-repeat;margin-left:5px;}
	.show-stop{ float:left; width:58px; height:32px; cursor:pointer; background:url(${path }/image/index/stop.png) no-repeat;margin-left:5px;}
	.show-zhengchang{ float:left; width:58px; height:32px; cursor:pointer; background:url(${path }/image/index/bofang.png) no-repeat; margin-left:5px;}
	.show-search{ float:left; width:60px; height:32px; cursor:pointer; background:url(${path }/image/index/show-search.png) no-repeat; margin-left:5px;}
	input[type="button"]:hover{ opacity:0.8; -webkit-opacity:0.8; -moz-opacity:0.8; filter:alpha(opacity=80);}
</style>
</head>
<body style="height:100%;width:100%; overflow:hidden; padding:0;">
<div style="position:absolute; left:0; top:0; right:0; bottom:0; overflow:hidden;">
	<div class="video-show" style="position:absolute; left:0; top:3px; right:0; bottom:110px;">
		<object id="plugin" type="application/x-upview-rcd" width="100%" height="100%">
	    </object>
	</div>
	 <div id="playbackbar" style="position:absolute; left:0; right:0; bottom:50px; height:60px;">
	
	</div>
	<div style=" position:absolute; left:0px; right:0; background:#000; border-top:2px solid #333; height:50px; bottom:0; z-index:99;">
		<div style="float:left; margin-top:10px;">
			<input type="text" value="${play.backTime}"" id="setTime" class="dateIcon"   onFocus="WdatePicker({readOnly:true,dateFmt:'yyyy-MM-dd HH:mm:ss'});" />
			<input type="button" class="show-search" value="" onClick="javascript:setTime();" >
		</div>
		<div style="float:right; margin-right:10px; margin-top:10px;">
			<input type="button" class="show-left" value="" onClick="javascript:downSpeed();" >
			<input type="button" class="show-zhengchang" value="" onClick="javascript:speed();" >
			<input type="button" class="show-right" value="" onClick="javascript:upSpeed();" >
			<!-- <input type="button" value="停止" onClick="javascript:stopplayback('plugin');" > -->
			<input type="button" class="show-stop" value="" onClick="javascript:timeOut();" >
			<input type="button" class="show-num" id="status" value="播放速度：1"/>
			<%-- <input type="button" value="播放" onClick="javascript:pluginplayback('plugin','<fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${play.backTime}" />')" > --%>
		</div>
	</div>
</div>
</body>
</html>