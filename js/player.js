function startPlay(plugin, chanid,stype) {
	try {
		//var plugin = document.getElementById(pluginid)
//		_objplay(plugin, type, addr, user, passw, "7f986429-648b-4a45-abe3-d0cd79409669", true);
		if(stype == "main"){
			_objplay(plugin, type, addr, user, passw, chanid, true);	
		}else{
			_objplay(plugin, type, addr, user, passw, chanid, false);	
		}
	} catch (e) {
		//alert(e.message);
	}
}
function startPlay2(plugin, chanid,stype) {
	//plugin.contentWindow.startPlay(plugin, chanid, url, user, passw, "main");	
	try {
		//var plugin = document.getElementById(pluginid)
//		_objplay(plugin, type, addr, user, passw, "7f986429-648b-4a45-abe3-d0cd79409669", true);
		//_objplay(plugin, type, addr, user, passw, chanid, true);
		var opt= {};
		opt.id = chanid; 
		opt.url = url;  
		opt.canvas = plugin; 
		opt.user = user;
		opt.passw = passw; 
		opt.stype = stype;
		plugin.wsavc1 = new UpViewPlayer(opt);
	} catch (e) {
		//alert(e.message);
	}
}
/**
 *视频播放。plugin为html标签对象，type为摄像头类型，addr为摄像头地址，user为用户，passw为用户密码，chainid为通道编号，ismain是否是高清，true为高清
 */
function _objplay(plugin, type, addr, user, passw, chanid, ismain){
	try {
		if (plugin.valid) {
			if(ismain) {
				//高清
				ret = plugin.RealPlay(type, addr, user, passw, chanid);
			} else {
				//子码流（非高清）
				ret = plugin.RealPlaySub(type, addr, user, passw, chanid);
			}
			if (0 != ret) {
				var str = "Real Play Failed ret = ";
				str += ret;
				//alert(str);
			}
		} else {
			//alert("Plugin is not working :(");
		}
	} catch (e) {
		//alert(e.message);
	}
}
/**
 *停止直播
 */
function pluginStopPlay2(plugin) {
	try {
		//var plugin = document.getElementById(pluginid)
		//wsavc1.disconnect();
		plugin.wsavc1.disconnect();
	} catch (e) {
		//alert(e.message);
	}
}
function pluginStopPlay(plugin) {
	try {
		//var plugin = document.getElementById(pluginid)
		if (plugin.valid) {
			plugin.StopRealPlay();
		} else {
			//alert("Plugin is not working :(");
		}
	} catch (e) {
		//alert(e.message);
	}
}
function  pluginStopAndStartPlay(object, chanid) {
	try{
		pluginStopPlay(object);
	} catch(e){}
	try {
		startPlay(object, chanid);
	} catch (e){}
}