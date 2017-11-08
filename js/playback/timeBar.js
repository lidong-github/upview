var bindAsEventListener = function(c, a) {
	var b = Array.prototype.slice.call(arguments).slice(2);
	return function(d) {
		return a.apply(c, [ d || window.event ].concat(b));
	};
};
var bind = function(b, a) {
	return function() {
		return a.apply(b, arguments);
	};
};
var addEventHandler = function(b, c, a) {
	b["on" + c] = a;
};
var removeEventHandler = function(b, c, a) {
	b["on" + c] = null;
};
function getObjLeft(b) {
	var a = b.offsetLeft;
	while (b = b.offsetParent) {
		a += b.offsetLeft;
	}
	return a;
}
function getObjTop(a) {
	var b = a.offsetTop;
	while (a = a.offsetParent) {
		b += a.offsetTop;
	}
	return b;
}
function ScaleInfo(b, c, a) {
	this.m_ix = b;
	this.m_iy = c;
	this.m_ixMin;
	this.m_ixMax;
	this.m_iHour = parseInt(a / 3600, 10);
	this.m_iMinute = parseInt(a % 3600 / 60, 10);
	this.m_iSecond = parseInt(a % 3600 % 60, 10);
	this.m_szTime = "";
	if (this.m_iHour < 10 && this.m_iMinute < 10) {
		this.m_szTime = "0" + this.m_iHour + ":0" + this.m_iMinute;
	} else {
		if (this.m_iHour < 10 && this.m_iMinute >= 10) {
			this.m_szTime = "0" + this.m_iHour + ":" + this.m_iMinute;
		} else {
			if (this.m_iHour >= 10 && this.m_iMinute >= 10) {
				this.m_szTime = "" + this.m_iHour + ":" + this.m_iMinute;
			} else {
				this.m_szTime = "" + this.m_iHour + ":0" + this.m_iMinute;
			}
		}
	}
}
ScaleInfo.prototype.setPos = function(a, b) {
	if (a < this.m_ixMin) {
		a = this.m_ixMax - (this.m_ixMin - a);
	} else {
		if (a > this.m_ixMax) {
			a = this.m_ixMin + (a - this.m_ixMax);
		}
	}
	this.m_ix = a;
	this.m_iy = b;
};
ScaleInfo.prototype.setPosRange = function(b, a) {
	this.m_ixMin = b;
	this.m_ixMax = a;
};
ScaleInfo.prototype.isInRange = function(b, a) {
	if (this.m_ix >= b && this.m_ix <= a) {
		return true;
	} else {
		return false;
	}
};
ScaleInfo.prototype.update = function(a) {
	this.m_iHour = parseInt(a / 3600, 10);
	this.m_iMinute = parseInt(a % 3600 / 60, 10);
	this.m_iSecond = parseInt(a % 3600 % 60, 10);
	if (this.m_iHour < 10 && this.m_iMinute < 10) {
		this.m_szTime = "0" + this.m_iHour + ":0" + this.m_iMinute;
	} else {
		if (this.m_iHour < 10 && this.m_iMinute >= 10) {
			this.m_szTime = "0" + this.m_iHour + ":" + this.m_iMinute;
		} else {
			if (this.m_iHour >= 10 && this.m_iMinute >= 10) {
				this.m_szTime = "" + this.m_iHour + ":" + this.m_iMinute;
			} else {
				this.m_szTime = "" + this.m_iHour + ":0" + this.m_iMinute;
			}
		}
	}
};
function Time() {
	var a = new Date();
	this.m_iYear = a.getFullYear();
	this.m_iMonth = a.getMonth() + 1;
	this.m_iDay = a.getDate();
	this.m_iHour = a.getHours();
	this.m_iMinute = a.getMinutes();
	this.m_iSecond = a.getSeconds();
	this.m_iMilliseconds = a.getTime();
}
Time.prototype.setTimeByMis = function(b) {
	var a = new Date(b);
	this.m_iYear = a.getFullYear();
	this.m_iMonth = a.getMonth() + 1;
	this.m_iDay = a.getDate();
	this.m_iHour = a.getHours();
	this.m_iMinute = a.getMinutes();
	this.m_iSecond = a.getSeconds();
	this.m_iMilliseconds = b;
};
Time.prototype.getStringTime = function() {
	var f = "" + this.m_iYear;
	var b;
	if (this.m_iMonth < 10) {
		b = "0" + this.m_iMonth;
	} else {
		b = "" + this.m_iMonth;
	}
	var d;
	if (this.m_iDay < 10) {
		d = "0" + this.m_iDay;
	} else {
		d = "" + this.m_iDay;
	}
	var c;
	if (this.m_iHour < 10) {
		c = "0" + this.m_iHour;
	} else {
		c = "" + this.m_iHour;
	}
	var a;
	if (this.m_iMinute < 10) {
		a = "0" + this.m_iMinute;
	} else {
		a = "" + this.m_iMinute;
	}
	var e;
	if (this.m_iSecond < 10) {
		e = "0" + this.m_iSecond;
	} else {
		e = "" + this.m_iSecond;
	}
	var g = f + "-" + b + "-" + d + " " + c + ":" + a + ":" + e;
	return g;
};
Time.prototype.parseTime = function(c) {
	var d = c.split(" ")[0].split("-");
	var a = c.split(" ")[1].split(":");
	this.m_iYear = parseInt(d[0], 10);
	this.m_iMonth = parseInt(d[1], 10);
	this.m_iDay = parseInt(d[2], 10);
	this.m_iHour = parseInt(a[0], 10);
	this.m_iMinute = parseInt(a[1], 10);
	this.m_iSecond = parseInt(a[2], 10);
	var b = new Date();
	b.setFullYear(this.m_iYear);
	b.setMonth(this.m_iMonth - 1, this.m_iDay);
	b.setHours(this.m_iHour);
	b.setMinutes(this.m_iMinute);
	b.setSeconds(this.m_iSecond);
	this.m_iMilliseconds = b.getTime();
};
function FileInfo(b, h, e, f, d, g, a, c) {
	this.m_iX = b;
	this.m_ixMin = 0;
	this.m_ixMax = 0;
	this.m_iY = h;
	this.m_iWidth = e;
	this.m_iHeight = f;
	this.m_cColor = g;
	this.m_iType = d;
	this.m_tStartTime = a;
	this.m_tStopTime = c;
}
FileInfo.prototype.isInRange = function(b, a) {
	if ((this.m_iX + this.m_iWidth) <= b || this.m_iX >= a) {
		return false;
	} else {
		return true;
	}
};
FileInfo.prototype.setPos = function(a, d, b, c) {
	this.m_iX = a;
	this.m_iWidth = b;
	this.m_iY = d;
	this.m_iHeight = c;
};
FileInfo.prototype.setPosRange = function(b, a) {
	this.m_ixMin = b;
	this.m_ixMax = a;
};
FileInfo.prototype.draw = function(a) {
	if (this.isInRange(this.m_ixMin, this.m_ixMax)) {
		var b = a.fillStyle;
		a.fillStyle = this.m_cColor;
		if ((this.m_iX >= this.m_ixMin)
				&& (this.m_iX + this.m_iWidth) <= this.m_ixMax) {
			a.fillRect(this.m_iX, this.m_iY, this.m_iWidth, this.m_iHeight);
		} else {
			if ((this.m_iX < this.m_ixMax)
					&& ((this.m_iX + this.m_iWidth) > this.m_ixMax)) {
				a.fillRect(this.m_iX, this.m_iY, this.m_ixMax - this.m_iX,
						this.m_iHeight);
			} else {
				a.fillRect(this.m_ixMin, this.m_iY, (this.m_iX + this.m_iWidth)
						- this.m_ixMin, this.m_iHeight);
			}
		}
		a.fillStyle = b;
	}
};
function TimeBar(a) {
	if (arguments.length >= 3) {
		a.width = arguments[1];
		a.height = arguments[2];
	} else {
		a.width = 300;
		a.height = 300;
	}
	this.m_canvas = a;
	this.m_ctx = a.getContext("2d");
	this.m_iMinFileWidth = 1;
	this.backgroundColor = "rgb(0, 0, 0)";
	this.partLineColor = "rgb(48,48,48)";
	this.channelNameColor = "rgb(150, 150, 150)";
	this.timeScaleColor = "rgb(150, 150, 150)";
	this.middleLineColor = "rgb(255, 204, 0)";
	this.middleLineTimeColor = "rgb(255, 255, 255)";
	this.defaultFileColor = "rgb(0, 255, 0)";
	this.cmdFileColor = "rgb(21, 184, 155)";
	this.scheFileColor = "rgb(99, 125, 236)";
	this.alarmFileColor = "rgb(248, 71, 126)";
	this.manualFileColor = "rgb(247, 199, 5)";
	this.m_fMidTimeFont = "14px Verdana";
	this.m_fCurTimeFont = "12px Verdana";
	this.m_fScaleFont = "10px Verdana";
	this.m_fChannelNameFont = "14px Verdana";
	a.style.backgroundColor = this.backgroundColor;
	this.m_szCurChannelName = "";
	this.m_fCellTime = parseFloat(1);
	this.ScaleInfo = new Array();
	this.ScaleInfoNum = parseInt(24 / this.m_fCellTime, 10);
	this.ScaleInfoDisNum = 12;
	for (var c = 0; c < this.ScaleInfoNum; c++) {
		this.ScaleInfo.push(new ScaleInfo(0, 0, parseInt(c * 3600
				* this.m_fCellTime)));
	}
	this.m_iMaxWndNum = 16;
	this.m_iSelWnd = 0;
	this.FileInfoSet = new Array(this.m_iMaxWndNum);
	for (c = 0; c < this.m_iMaxWndNum; c++) {
		this.FileInfoSet[c] = new Array();
	}
	this.m_iHeight = parseInt(a.height, 10);
	this.m_iWidth = parseInt(a.width, 10);
	this.m_iFileListStartPos = 0;
	this.m_iBlankHeight = 4;
	this.m_iTimeRectHeight = 40;
	this.m_iFileRectHeight = this.m_iHeight - this.m_iTimeRectHeight
			- this.m_iBlankHeight * 2;
	this.m_iMiddleLinePos = parseInt(
			(this.m_iFileListStartPos + this.m_iWidth) / 2, 10);
	this.m_iCellWidth = Math.floor((this.m_iWidth - this.m_iFileListStartPos)
			/ this.ScaleInfoDisNum);
	this.m_iCellMilliseconds = parseInt((3600 * this.m_fCellTime * 1000)
			/ this.m_iCellWidth, 10);
	this.m_tCurrentMidTime = new Time();
	this.m_ctx.font = this.m_fMidTimeFont;
	this.m_iTextWidth = this.m_ctx.measureText(this.m_tCurrentMidTime
			.getStringTime()).width;
	this.m_tMouseCurTime = new Time();
	this.m_ctx.font = this.m_fCurTimeFont;
	this.m_iCurTextWidth = this.m_ctx.measureText(this.m_tMouseCurTime
			.getStringTime()).width;
	this.m_iCanvasLeft = getObjLeft(this.m_canvas);
	this.m_iCanvasTop = getObjTop(this.m_canvas);
	for (c = 0; c < this.ScaleInfoNum; c++) {
		var d = (this.ScaleInfo[c].m_iHour - this.m_tCurrentMidTime.m_iHour)
				* 3600
				+ (this.ScaleInfo[c].m_iMinute - this.m_tCurrentMidTime.m_iMinute)
				* 60
				+ (this.ScaleInfo[c].m_iSecond - this.m_tCurrentMidTime.m_iSecond);
		var b = this.m_iMiddleLinePos
				+ parseInt(parseFloat(d / (3600 * this.m_fCellTime))
						* this.m_iCellWidth);
		this.ScaleInfo[c].setPosRange(this.m_iFileListStartPos,
				this.m_iFileListStartPos
						+ parseInt(this.m_iCellWidth * this.ScaleInfoNum));
		this.ScaleInfo[c].setPos(b, this.m_iTimeRectHeight);
	}
	this.m_ieventX = 0;
	this.m_iMousePosX = 0;
	this.m_bMOuseDown = false;
	this.m_bMouseOver = false;
	this.m_iMove = 0;
	this.m_iMiddleLineTime = 0;
	this.Start = function(e) {
		this.m_ieventX = e.clientX;
		this.m_iMiddleLineTime = this.m_tCurrentMidTime.m_iMilliseconds;
		this.m_bMOuseDown = true;
		addEventHandler(document, "mousemove", bindAsEventListener(this,
				this.Move));
		addEventHandler(document, "mouseup", bind(this, this.Stop));
		addEventHandler(window, "blur", bindAsEventListener(this,
				bindAsEventListener(this, this.Stop)));
		e.preventDefault();
		removeEventHandler(a, "mousemove", bindAsEventListener(this,
				this.onMouseMove));
	};
	this.mouseUpCallbackFunc = function() {
	};
	this.Stop = function() {
		document.body.style.cursor = "default";
		this.m_canvas.style.cursor = "url(js/playback/playback/H_point1.cur),pointer";

		this.m_bMOuseDown = false;
		this.mouseUpCallbackFunc();
		removeEventHandler(document, "mousemove", bindAsEventListener(this,
				this.Move));
		removeEventHandler(document, "mouseup", bindAsEventListener(this,
				this.Stop));
		removeEventHandler(window, "blur", bindAsEventListener(this, this.Stop));
		addEventHandler(a, "mousemove", bindAsEventListener(this,
				this.onMouseMove));
	};
	this.onMouseMoveIn = true;
	this.Move = function(e) {
		document.body.style.cursor = "url(js/playback//playback/H_point1.cur),pointer";
		this.m_canvas.style.cursor = "url(js/playback//playback/H_point1.cur),pointer";
		this.m_iMove = e.clientX - this.m_ieventX;
		if (this.m_bMOuseDown) {
			window.getSelection ? window.getSelection().removeAllRanges()
					: document.selection.empty();
			this.m_tCurrentMidTime.setTimeByMis(this.m_iMiddleLineTime
					- this.m_iMove * this.m_iCellMilliseconds);
			this.repaint();
		}
	};
	this.m_canvas.style.cursor = "url(js/playback//playback/H_point1.cur),pointer";
	this.onMouseMove = function(e) {
		this.m_iMousePosX = e.clientX - this.m_iCanvasLeft;
		this.m_tMouseCurTime
				.setTimeByMis((this.m_iMousePosX - this.m_iMiddleLinePos)
						* this.m_iCellMilliseconds
						+ this.m_tCurrentMidTime.m_iMilliseconds);
		this.repaint();
		var f = this.m_tMouseCurTime.getStringTime();
		this.m_ctx.fillStyle = this.middleLineTimeColor;
		this.m_ctx.font = this.m_fCurTimeFont;
		this.m_ctx.fillText(f,
				(this.m_iMousePosX - parseInt(this.m_iCurTextWidth / 2)),
				parseInt(this.m_iTimeRectHeight / 4));
	};
	this.onMouseOut = function(e) {
		this.repaint();
	};
	addEventHandler(a, "mousedown", bindAsEventListener(this, this.Start));
	addEventHandler(a, "mousemove", bindAsEventListener(this, this.onMouseMove));
	addEventHandler(a, "mouseout", bindAsEventListener(this, this.onMouseOut));
	this.repaint();
}
TimeBar.prototype.repaint = function() {
	var a = this.m_tCurrentMidTime.getStringTime();
	this.updateScalePos();
	this.updateFileListPos();
	this.m_ctx.clearRect(0, 0, this.m_iWidth, this.m_iHeight);
	this.m_ctx.fillStyle = this.middleLineTimeColor;
	this.m_ctx.font = this.m_fMidTimeFont;
	this.m_iTextWidth = this.m_ctx.measureText(a).width;
	this.m_ctx.fillText(a,
			(this.m_iMiddleLinePos - parseInt(this.m_iTextWidth / 2)),
			parseInt(this.m_iTimeRectHeight / 2) + 5);
	this.m_ctx.strokeStyle = this.partLineColor;
	this.m_ctx.lineWidth = 1;
	this.m_ctx.beginPath();
	this.m_ctx.moveTo(this.m_iFileListStartPos, this.m_iTimeRectHeight);
	this.m_ctx.lineTo(this.m_iFileListStartPos, this.m_iHeight);
	this.m_ctx.stroke();
	this.m_ctx.lineWidth = this.m_iBlankHeight;
	this.m_ctx.beginPath();
	this.m_ctx.moveTo(0, this.m_iTimeRectHeight);
	this.m_ctx.lineTo(this.m_iWidth, this.m_iTimeRectHeight);
	this.m_ctx.stroke();
	this.m_ctx.beginPath();
	this.m_ctx.moveTo(0, this.m_iHeight - this.m_iBlankHeight / 2);
	this.m_ctx.lineTo(this.m_iWidth, this.m_iHeight - this.m_iBlankHeight / 2);
	this.m_ctx.stroke();
	this.m_ctx.fillStyle = this.channelNameColor;
	this.m_ctx.font = this.m_fChannelNameFont;
	this.m_ctx.fillText(this.m_szCurChannelName, 0, this.m_iTimeRectHeight
			+ this.m_iBlankHeight + parseInt(this.m_iFileRectHeight / 2) + 5,
			90);
	this.m_ctx.strokeStyle = this.timeScaleColor;
	this.m_ctx.font = this.m_fScaleFont;
	this.m_ctx.lineWidth = 1;
	for (i = 0; i < this.ScaleInfoNum; i++) {
		if (this.ScaleInfo[i]
				.isInRange(this.m_iFileListStartPos, this.m_iWidth)) {
			this.m_ctx.beginPath();
			this.m_ctx.moveTo(this.ScaleInfo[i].m_ix, this.m_iTimeRectHeight);
			this.m_ctx.lineTo(this.ScaleInfo[i].m_ix, this.m_iHeight);
			this.m_ctx.stroke();
			this.m_ctx.fillText(this.ScaleInfo[i].m_szTime,
					this.ScaleInfo[i].m_ix - 15, this.m_iTimeRectHeight - 5);
		}
	}
	for (i = 0; i < this.FileInfoSet[this.m_iSelWnd].length; i++) {
		this.FileInfoSet[this.m_iSelWnd][i].draw(this.m_ctx);
	}
	this.m_ctx.strokeStyle = this.middleLineColor;
	this.m_ctx.lineWidth = 2;
	this.m_ctx.beginPath();
	this.m_ctx.moveTo(this.m_iMiddleLinePos, 0);
	this.m_ctx.lineTo(this.m_iMiddleLinePos, this.m_iHeight);
	this.m_ctx.stroke();
};
TimeBar.prototype.updateScalePos = function() {
	if (this.ScaleInfo.length == 0) {
		return;
	}
	var e = (this.ScaleInfo[0].m_iHour - this.m_tCurrentMidTime.m_iHour) * 3600
			+ (this.ScaleInfo[0].m_iMinute - this.m_tCurrentMidTime.m_iMinute)
			* 60
			+ (this.ScaleInfo[0].m_iSecond - this.m_tCurrentMidTime.m_iSecond);
	var c = this.m_iMiddleLinePos
			+ parseInt(parseFloat(e / (3600 * this.m_fCellTime))
					* this.m_iCellWidth);
	if (c < this.ScaleInfo[0].m_ixMin) {
		c = this.ScaleInfo[0].m_ixMax - (this.ScaleInfo[0].m_ixMin - c);
	} else {
		if (c > this.ScaleInfo[0].m_ixMax) {
			c = this.ScaleInfo[0].m_ixMin + (c - this.ScaleInfo[0].m_ixMax);
		}
	}
	var d = c - this.ScaleInfo[0].m_ix;
	if (d == 0) {
		return;
	}
	for (var b = 0; b < this.ScaleInfoNum; b++) {
		var a = this.ScaleInfo[b].m_ix + d;
		this.ScaleInfo[b].setPosRange(this.m_iFileListStartPos,
				this.m_iFileListStartPos
						+ parseInt(this.m_iCellWidth * this.ScaleInfoNum));
		this.ScaleInfo[b].setPos(a, this.m_iTimeRectHeight);
	}
};
TimeBar.prototype.updateFileListPos = function() {
	var c = this.FileInfoSet[this.m_iSelWnd].length;
	if (c == 0) {
		return;
	}
	var j = this.FileInfoSet[this.m_iSelWnd][0].m_tStartTime;
	var h = parseInt((j.m_iMilliseconds - this.m_tCurrentMidTime.m_iMilliseconds) / 1000);
	var d = this.m_iMiddleLinePos
			+ parseInt(parseFloat(h / (3600 * this.m_fCellTime))
					* this.m_iCellWidth);
	var g = d - this.FileInfoSet[this.m_iSelWnd][0].m_iX;
	if (g == 0) {
		return;
	}
	for (i = 0; i < c; i++) {
		var f = this.FileInfoSet[this.m_iSelWnd][i].m_iX + g;
		var e = this.FileInfoSet[this.m_iSelWnd][i].m_iY;
		var b = this.FileInfoSet[this.m_iSelWnd][i].m_iWidth;
		var a = this.FileInfoSet[this.m_iSelWnd][i].m_iHeight;
		this.FileInfoSet[this.m_iSelWnd][i].setPos(f, e, b, a);
	}
};
TimeBar.prototype.resize = function(c, a) {
	this.m_canvas.height = a;
	this.m_canvas.width = c;
	this.m_iHeight = a;
	this.m_iWidth = c;
	this.m_iTimeRectHeight = parseInt(this.m_iHeight * 4 / 7);
	this.m_iFileRectHeight = this.m_iHeight - this.m_iTimeRectHeight
			- this.m_iBlankHeight * 2;
	this.m_iMiddleLinePos = parseInt((this.m_iFileListStartPos + this.m_iWidth) / 2);
	this.m_iCellWidth = Math.floor((this.m_iWidth - this.m_iFileListStartPos)
			/ this.ScaleInfoDisNum);
	this.m_iCellMilliseconds = parseInt((3600 * this.m_fCellTime * 1000)
			/ this.m_iCellWidth, 10);
	for (i = 0; i < this.ScaleInfoNum; i++) {
		var g = (this.ScaleInfo[i].m_iHour - this.m_tCurrentMidTime.m_iHour)
				* 3600
				+ (this.ScaleInfo[i].m_iMinute - this.m_tCurrentMidTime.m_iMinute)
				* 60
				+ (this.ScaleInfo[i].m_iSecond - this.m_tCurrentMidTime.m_iSecond);
		var b = this.m_iMiddleLinePos
				+ parseInt(parseFloat(g / (3600 * this.m_fCellTime))
						* this.m_iCellWidth);
		this.ScaleInfo[i].setPosRange(this.m_iFileListStartPos,
				this.m_iFileListStartPos
						+ parseInt(this.m_iCellWidth * this.ScaleInfoNum));
		this.ScaleInfo[i].setPos(b, this.m_iTimeRectHeight);
	}
	for (i = 0; i < this.FileInfoSet[this.m_iSelWnd].length; i++) {
		var d = this.FileInfoSet[this.m_iSelWnd][i];
		var j = parseInt((d.m_tStartTime.m_iMilliseconds - this.m_tCurrentMidTime.m_iMilliseconds) / 1000);
		var e = this.m_iMiddleLinePos
				+ parseInt(parseFloat(j / (3600 * this.m_fCellTime))
						* this.m_iCellWidth);
		var h = parseInt((d.m_tStopTime.m_iMilliseconds - this.m_tCurrentMidTime.m_iMilliseconds) / 1000);
		var f = this.m_iMiddleLinePos
				+ parseInt(parseFloat(h / (3600 * this.m_fCellTime))
						* this.m_iCellWidth);
		if ((f - e) < this.m_iMinFileWidth) {
			f = e + this.m_iMinFileWidth;
		}
		d.setPos(e, this.m_iTimeRectHeight + parseInt(this.m_iBlankHeight / 2),
				f - e, this.m_iFileRectHeight + 2);
	}
	this.repaint();
};
TimeBar.prototype.SetSpantype = function(e) {
	switch (e) {
	case 6:
		this.ScaleInfoDisNum = 12;
		this.m_fCellTime = parseFloat(2);
		break;
	case 7:
		this.ScaleInfoDisNum = 12;
		this.m_fCellTime = parseFloat(1);
		break;
	case 8:
		this.ScaleInfoDisNum = 12;
		this.m_fCellTime = parseFloat(0.5);
		break;
	case 9:
		this.ScaleInfoDisNum = 8;
		this.m_fCellTime = parseFloat(0.5);
		break;
	case 10:
		this.ScaleInfoDisNum = 12;
		this.m_fCellTime = parseFloat(1 / 6);
		break;
	case 11:
		this.ScaleInfoDisNum = 12;
		this.m_fCellTime = parseFloat(1 / 12);
		break;
	case 12:
		this.ScaleInfoDisNum = 6;
		this.m_fCellTime = parseFloat(1 / 12);
		break;
	default:
		this.ScaleInfoDisNum = 12;
		this.m_fCellTime = parseFloat(1);
		return;
	}
	this.ScaleInfoNum = parseInt(24 / this.m_fCellTime, 10);
	this.m_iCellWidth = Math.floor((this.m_iWidth - this.m_iFileListStartPos)
			/ this.ScaleInfoDisNum);
	this.m_iCellMilliseconds = parseInt((3600 * this.m_fCellTime * 1000)
			/ this.m_iCellWidth, 10);
	this.ScaleInfo.length = 0;
	for (var d = 0; d < this.ScaleInfoNum; d++) {
		this.ScaleInfo.push(new ScaleInfo(0, 0, parseInt(d * 3600
				* this.m_fCellTime)));
	}
	for (d = 0; d < this.ScaleInfoNum; d++) {
		var g = (this.ScaleInfo[d].m_iHour - this.m_tCurrentMidTime.m_iHour)
				* 3600
				+ (this.ScaleInfo[d].m_iMinute - this.m_tCurrentMidTime.m_iMinute)
				* 60
				+ (this.ScaleInfo[d].m_iSecond - this.m_tCurrentMidTime.m_iSecond);
		var a = this.m_iMiddleLinePos
				+ parseInt(parseFloat(g / (3600 * this.m_fCellTime))
						* this.m_iCellWidth);
		this.ScaleInfo[d].setPosRange(this.m_iFileListStartPos,
				this.m_iFileListStartPos
						+ parseInt(this.m_iCellWidth * this.ScaleInfoNum));
		this.ScaleInfo[d].setPos(a, this.m_iTimeRectHeight);
	}
	for (d = 0; d < this.FileInfoSet[this.m_iSelWnd].length; d++) {
		var b = this.FileInfoSet[this.m_iSelWnd][d];
		var j = parseInt((b.m_tStartTime.m_iMilliseconds - this.m_tCurrentMidTime.m_iMilliseconds) / 1000);
		var c = this.m_iMiddleLinePos
				+ parseInt(parseFloat(j / (3600 * this.m_fCellTime))
						* this.m_iCellWidth);
		var h = parseInt((b.m_tStopTime.m_iMilliseconds - this.m_tCurrentMidTime.m_iMilliseconds) / 1000);
		var f = this.m_iMiddleLinePos
				+ parseInt(parseFloat(h / (3600 * this.m_fCellTime))
						* this.m_iCellWidth);
		if ((f - c) < this.m_iMinFileWidth) {
			f = c + this.m_iMinFileWidth;
		}
		b.setPos(c, this.m_iTimeRectHeight + parseInt(this.m_iBlankHeight / 2),
				f - c, this.m_iFileRectHeight + 2);
	}
	this.repaint();
};
TimeBar.prototype.addFile = function(a, f, h) {
	var j = new Time();
	var b = new Time();
	j.parseTime(a);
	b.parseTime(f);
	var l;
	switch (h) {
	case 1:
		l = this.scheFileColor;
		break;
	case 2:
		l = this.alarmFileColor;
		break;
	case 3:
		l = this.cmdFileColor;
		break;
	case 4:
		l = this.manualFileColor;
		break;
	default:
		l = this.defaultFileColor;
		break;
	}
	var k = parseInt((j.m_iMilliseconds - this.m_tCurrentMidTime.m_iMilliseconds) / 1000);
	var c = this.m_iMiddleLinePos
			+ parseInt(parseFloat(k / (3600 * this.m_fCellTime))
					* this.m_iCellWidth);
	var g = parseInt((b.m_iMilliseconds - this.m_tCurrentMidTime.m_iMilliseconds) / 1000);
	var e = this.m_iMiddleLinePos
			+ parseInt(parseFloat(g / (3600 * this.m_fCellTime))
					* this.m_iCellWidth);
	var d = new FileInfo(c, this.m_iTimeRectHeight
			+ parseInt(this.m_iBlankHeight / 2), e - c,
			this.m_iFileRectHeight + 2, h, l, j, b);
	d.setPosRange(this.m_iFileListStartPos, this.m_iFileListStartPos
			+ parseInt(this.m_iCellWidth * this.ScaleInfoNum));
	if (arguments.length >= 4) {
		this.FileInfoSet[arguments[3]].push(d);
	} else {
		this.FileInfoSet[this.m_iSelWnd].push(d);
	}
};
TimeBar.prototype.clearWndFileList = function() {
	var a;
	if (arguments.length == 0) {
		a = this.m_iSelWnd;
	} else {
		a = arguments[0];
	}
	if (a < 0) {
		a = 0;
	}
	if (a >= 16) {
		a = 15;
	}
	this.FileInfoSet[a].length = 0;
};
TimeBar.prototype.setMidLineTime = function(b) {
	var a = new Time();
	a.parseTime(b);
	this.m_tCurrentMidTime.setTimeByMis(a.m_iMilliseconds);
	this.repaint();
};

TimeBar.prototype.getMidLineTime = function(b) {
	return this.m_tCurrentMidTime.getStringTime();
};

TimeBar.prototype.setMouseUpCallback = function(a) {
	this.mouseUpCallbackFunc = a;
};
