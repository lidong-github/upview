var App={
	INDEX_NUM: 5,
	ERROR_CODE:
	{
		OK:200,
		NOT_SUPPORTED:201,
		NO_NVW_CONNECT:202,
		PROTOCOL_MATCH:203,
		PARAM_NULL:204,
		USERNAME_OR_PASSWORD:205,
		ILLEGAL_ACCESS:206,
		INNER:207,
		OBJ_NOT_EXIST:208,
		PARAM:209,
		USERNAME_IS_LOCKED:210,
		UNKNOWN_OBJ:211,
		UNKNOWN:212,
		NOT_AUTH:213,
		DISK_NOT_FORMAT:214,
		NO_RIGHT:215
	},
	
	ERROR_MSG:
	{
		200:"正确",
		201:"未知错误"
	},
	
	Target:
	{
		userLogin: "user/login",
		userLogout: "user/logout"
	},
	
	Action:
	{
		SET:"set",
		GET:"get"
	},
	
	ajax:
	{
            sendReqGet:function(xmlHttp, url, cb) {
                xmlHttp.onreadystatechange = function(){
                           if (4==xmlHttp.readyState) {
                                if (200==xmlHttp.status) {
                                    var rep = xmlHttp.responseText;
                                    var r = $.parseJSON(rep);
                                    if ( -200===r.ret)
                                        location.assign("index.html");
                                    else
                                        cb&&cb(r);
                                }
                           }
                };
                xmlHttp.open("GET", url, true);
                xmlHttp.send(null);
            },

            createReqObj:function(){
               var xmlHttp;
               try {
                   xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
               } catch(e) {
                   try {
                       xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                   } catch(e) {
                       try {
                           xmlHttp = new XMLHttpRequest();
                       } catch(e) {
                           alert("您的浏览器不支持ajax！");
                       }                
                   }
               }
               return xmlHttp;
           },
           checkLoginOuttime:function(cb){
                var xmlHttp = App.ajax.createReqObj();
                App.ajax.sendReqGet(xmlHttp, "userMgr?action=checkTimeout", cb);
           },

		_post:function(url, gs, sd, cb)
		{
                    g={action:gs};
                    sd&&(g.data=sd);
                    $.post(url, g, function(rd, textStatus) {
                             cb&&cb(rd, textStatus);
                    });
		},
	
		postSet:function(url, data, cb)
		{
			this._post(url, App.Action.SET, data, cb);
		},
		
		postGet:function(url, data, cb)
		{
			this._post(url, App.Action.GET, data, cb);
		}
	}

};
