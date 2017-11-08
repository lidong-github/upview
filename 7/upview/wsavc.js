function UpViewPlayer(opt) {
	this.canvas = opt.canvas;
	this.stype  = opt.stype;
	var myDate = new Date();
	this.lasttime = myDate.getTime();
	var prefix;
	if('https:' == document.location.protocol)
	{
	    prefix = "wss://";
	}
    else
	{
	    prefix= "ws://";
	}
	this.url    = prefix + opt.url + "/upview";
	this.id     = opt.id;
	this.user   = opt.user || "admin";
	this.passw  = opt.passw || "e10adc3949ba59abbe56e057f20f883e";
	this.decoder = new Module.H264Decoder();
	this.decoder.initVideo(704, 576);
	this.timeout = function()
	{
		  var myDate = new Date();
		  if(myDate.getTime() -  this.lasttime > 5000)
	      {
		     this.connect();
		  }
	}.bind(this)
	this.timer = setInterval(this.timeout,5000);
	this.connect = function() 
	{		
		// Websocket initialization
		if (this.ws != undefined) 
		{
			this.ws.close();
			delete this.ws;
		}
		this.ws = new WebSocket(this.url);
		this.ws.binaryType = "arraybuffer";
		this.ws.onopen = function() 
		{
			this.playStream();
			console.log("WSAvcPlayer: Connected to " + this.url);
		}.bind(this);

		this.ws.onmessage = function(evt)
		 {		
             var myDate = new Date();
	         this.lasttime = myDate.getTime();		 
			 var BSON = bson().BSON;
            // De serialize it again
             var doc = BSON.deserialize(new Uint8Array(evt.data));

			 var data = doc.d.buffer;//new Uint8Array(evt.data);
			 var out = this.decoder.input(0, 0, 0, 0, 0, 0, data);
			 if(!out.y.width)
			 {
		  		 return;
			 }
		     var width = out.y.width;
             var height = out.y.height;      
             if (this.canvas.width !== width || this.canvas.height !== height || !this.webGLCanvas)
			 {
				 this.canvas.width = width;
                 this.canvas.height = height;
				 var opt = {};
				 opt.canvas = this.canvas;
				 opt.width = this.canvas.width;
				 opt.height = this.canvas.height;
                 this.webGLCanvas = new YUVCanvas(opt);
             };
             var draw_data = 
			 {
               yData: out.y.data,
               uData: out.cb.data,
               vData: out.cr.data
             };   
             this.webGLCanvas.drawNextOutputPicture(draw_data);
//			console.log("decoder width :" + out.y.width + "stride : " + out.y.stride + "height : " + out.y.height);
		}.bind(this);
		this.ws.onclose = function()	
		{ 
			console.log("UpviewPlayer: Connection closed")
		}.bind(this);
		this.ws.onerror = function(event)
		{
			console.log("UpviewPlayer: Connection error")
			console.log("Error: " + event.data);
		}.bind(this);
	};
	
	this.disconnect = function()
	 {
		clearInterval(this.timer);
		if (this.ws != undefined)
		 {
			this.ws.close();           
			delete this.ws;
			this.ws = null;
		}
	};
	this.PtzCtrl = function(cmd,speed)
	{
		var BSON = bson().BSON;      
        var doc = {'cmd':'ptz_ctrl','ptz_cmd':cmd,'ptz_param':speed};
        var data = BSON.serialize(doc, false, true, false);
		this.ws.send(data);
	}

	this.PtzRight = function(speed)
	{
		this.PtzCtrl(0,speed);
	}
	this.PtzUp = function(speed)
	{
		this.PtzCtrl(2,speed);
	}
	this.PtzLeft = function(speed)
	{
		this.PtzCtrl(4,speed);
	}
	this.PtzDown = function(speed)
	{
		this.PtzCtrl(6,speed);
	}
	
	this.playStream = function()
	 {	
		var BSON = bson().BSON;      
        var doc = {'id':this.id,'stype':this.stype,'cmd':'play_live','user':this.user,'passw':this.passw};
        var data = BSON.serialize(doc, false, true, false);
		this.ws.send(data);
	};
	this.Stop = function()
	{
		this.disconnect();
	}
	this.connect();
}