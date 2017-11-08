// JavaScript Document

/*导航菜单选中方法*/
function index_menu(){
	 jQuery(".index-menu ul li").live("click",function(){
		 jQuery(this).addClass("selected").siblings().removeClass("selected"); 
	});
	jQuery(".index-menu ul li:last-child").addClass("last");
}
/*左边二级导航*/
function menu_left(){
	jQuery(".menu-max li ul").addClass("hide");
	jQuery(".menu-max li:first ul").removeClass("hide");
	var fla = true;
	function li_son(fla){
		if(fla){
			jQuery(".menu-max li").click(function(){
				jQuery(".menu-max li ul").addClass("hide");
				jQuery(this).find("ul").removeClass("hide");
				jQuery(this).addClass("selected").siblings().removeClass("selected");
			});	
		}
	}
	li_son();
	/*三级导航*/
	jQuery(".menu-max li ul li ul").addClass("hide");
	jQuery(".menu-max li ul li").click(function(){
		jQuery(".menu-max li ul li ul").addClass("hide");
		jQuery(this).find("ul").removeClass("hide");
		jQuery(this).addClass("selected").siblings().removeClass("selected");
		fla = false;
	});
}

/*主体框架计算*/
function index_frame(){
	/*获取屏幕可用高度*/
	var height0 = document.documentElement.clientHeight;
	/*循环计算所有兄弟节点高度*/
	var height1 = 0;
	jQuery(".index-content").siblings().each(function(i,v){
		if(jQuery(this).css("display") !== "none"){
			height1 += jQuery(this).outerHeight(); 
		}	
	});
	var height2 = height0 - height1;
	jQuery(".index-content").height(height2);
}

/*主体click点击事件*/
function index_click(){
	var cick = jQuery(".index-click .click-img");
	var cick_css =  jQuery(".index-click").css("left");
	var left = jQuery(".menu-left");	
	var left_css = left.css("left");
	var right = jQuery(".index-container");
	var right_css = right.css("left");
	cick.click(function(){
		if(left.hasClass("hide")){
			left.removeClass("hide");
			cick.removeClass("click-img2");
			jQuery(".index-click").css("left",cick_css);
			right.css("left",right_css);
		}else{
			left.addClass("hide");
			cick.addClass("click-img2");
			jQuery(".index-click").css("left",0);
			right.css("left",(cick.width())+'px');
		}	
	});
}

// 默认菜单收起来
function index_click2(){
	var cick = jQuery(".index-click .click-img");
	var cick_css =  jQuery(".index-click").css("left");
	var left = jQuery(".menu-left");	
	var left_css = left.css("left");
	var right = jQuery(".index-container");
	var right_css = right.css("left");
	left.addClass("hide");
	cick.addClass("click-img2");
	jQuery(".index-click").css("left",0);
	right.css("left",(cick.width())+'px');	
}
// 默认菜单展开
function index_click3(){
	var cick = jQuery(".index-click .click-img");
	var cick_css =  jQuery(".index-click").css("left");
	var left = jQuery(".menu-left");	
	var left_css = left.css("left");
	var right = jQuery(".index-container");
	var right_css = right.css("left");
	left.removeClass("hide");
	cick.removeClass("click-img2");
	jQuery(".index-click").css("left",210);
	right.css("left",220);
}

/*tabs 选中效果*/
function index_top_ul_click(){
	jQuery(".tabs-ul ul li").click(function(){
		jQuery(this).addClass("selected").siblings().removeClass("selected");	
	});	
}

/*search 查询更多点击事件*/
function search_top_more(){
	jQuery(".list-search-content").each(function(i,v){
		var cick = jQuery(v).find(".search-more");	
		cick.click(function(){
			if(jQuery(v).find(".body-more").hasClass("hide")){
				jQuery(v).find(".body-more").removeClass("hide");	
				cick.text("隐藏 >>");
				list_height();
				lock_tab();  /*重新锁定表头*/
			}else{
				jQuery(v).find(".body-more").addClass("hide");	
				cick.text("更多 >>");
				list_height();
				lock_tab();  /*重新锁定表头*/
			}	
		});
	});
}

/*列表查询高度计算*/
function list_height(){
	/*获取屏幕可用高度*/
	var height0 =jQuery(".list-max-div").height();
	/*循环计算所有兄弟节点高度*/
	var height1 = 0;
	jQuery(".list-list").siblings().each(function(i,v){
		if(jQuery(this).css("display") !== "none"){
			height1 += jQuery(this).outerHeight(); 
		}	
	});
	var height2 = height0 - height1 - 15;
	jQuery(".list-list").height(height2);
}
/*锁定表头     公用列表页面*/
function lock_tab(){
	jQuery(".grid-tbody .grid-list tr:odd").addClass("td-color");
	jQuery(".grid").each(function(i,v){
		var height = jQuery(v).find(".grid-tbody").height();
		var height2 =jQuery(v).find(".grid-tbody .grid-list").height();
		if(height2 > height){
			jQuery(v).find(".grid-tab-thead-father").css("right","17px");
		}else{
			jQuery(v).find(".grid-tab-thead-father").css("right",0);
		}
	});
}
/*check选中*/
function check(){
	jQuery(".grid").each(function(i,v){
		jQuery(v).find(".grid-tbody .grid-list tr").live("click", function(){
			 if(jQuery(this).hasClass("selected")) {
				 jQuery(this).removeClass("selected").find(":checkbox").prop("checked",false);
			 }else {
					jQuery(this).addClass("selected").find(":checkbox").prop("checked", true);
				}
				aaa(v);
			});
			jQuery(v).find(".grid-header .grid-list").find(":checkbox").click(function(){				
					if(jQuery(this).attr("checked")){
						jQuery(".grid-list :checkbox",v).prop("checked",true);	
						jQuery(".grid-list tr",v).addClass("selected");
						jQuery(".grid-header .grid-list tr",v).removeClass("selected");	
					}else{
						jQuery(".grid-list :checkbox",v).prop("checked",false);
						jQuery(".grid-list tr",v).removeClass("selected");	
					}
				});
			
			});
			/*计算数量=all  全选框要选中*/
			function aaa(v){
				var int = jQuery(v).find(".grid-tbody .grid-tab-tbody-father .grid-list tr").length;
				var int2 = jQuery(v).find( ".grid-tbody .grid-tab-tbody-father .grid-list :checkbox:checked").length;
				if(int == int2){
					jQuery(v).find(".grid-header .grid-list :checkbox").prop("checked", true);	
				}else{
					jQuery(v).find(".grid-header .grid-list :checkbox").prop("checked",false);
				}	
			}
}

/*点击变色 颜色切换*/
function click_selected(tab){
	var tab = jQuery("." + tab + " > ul > li");
	tab.click(function(){
		jQuery(this).addClass("selected").siblings().removeClass("selected");	
	});
}

/********************弹出框控件******************/
//diog弹出框
	function dialog(dia_log){
		var width = dia_log.width; //得到弹出框的宽度
		var height = dia_log.height; //得到弹出框的高度
		var titile = dia_log.title; //得到弹出框的title标题
		var url = dia_log.url; //地址
		var save_btn = dia_log.btn_save;  //确定按钮
		var clos = dia_log.btn_close; //取消按钮 
		var top = dia_log.top;
		var marginTop = dia_log.marginTop;
		//定义按钮显示文字
		var btn_title = dia_log.btn_title;
		/*定义弹出框*/
		var dialog_max = $('<div class="alert-dialog-max" id="dialog-max">'
							+'<div class="alert-dialog-bg"></div>'/*阴影背景显示*/
								+'<div class="alert-dialog-content">'
									+'<div class="alert-dialog-title">'
										+'<div class="alert-title-l"></div>'
										+'<div class="alert-title-c">'
											+'<div class="alert-title-title">'
												+'<span class="img"></span>'+titile
											+'</div>'
											+'<span class="alert-close"></span>'
										+'</div>'
										+'<div class="alert-title-r"></div>'
									+'</div>'
									+'<div class="alert-dialog-show">'/*内容显示区域*/
										+'<iframe class="index-iframe" id="dialog-iframe" frameborder="0" src=""></iframe>'
									+'</div>'
									+'<div class="alert-btm-button">'/*底部按钮区域*/
										+'<div class="alert-btm-btn">'
											+'<span class="btn btn-preserve"><span class="btn-img"></span><span class="btn-title btn-title1">确定</span></span>'
											+'<span class="btn btn-close"><span class="btn-img"></span><span class="btn-title">取消</span></span>'
										+'</div>'
									+'</div>'
									+'<div class="alert-btm-img">'/*弹出框底部样式*/
										+'<div class="alert-btm-l"></div>'
										+'<div class="alert-btm-c"></div>'
										+'<div class="alert-btm-r"></div>'
									+'</div>'
								+'</div>'
							+'</div>');
		/*定义宽度和高度*/	
		$("body").append(dialog_max);
		if(btn_title){
			$(".btn-title1").text(btn_title);
		}
		$("#dialog-iframe").attr("src",url);
		var dialogIframe = $("#dialog-iframe")[0];
		if (!/*@cc_on!@*/0) { //if not IE
			dialogIframe.onload = function(){
				dia_log.onload();
			};
		} else {
			dialogIframe.onreadystatechange = function(){
				if (dialogIframe.readyState == "complete"){
					dia_log.onload();
				}
			};
		}

		//定义宽度、高度、title
		$(".alert-dialog-content").css({"width":width,"height":height,"margin-left":-(width/2),"margin-top":(-height/2)});	
		if(top!=undefined&&marginTop!=undefined){
			$(".alert-dialog-content").css({"top":top,"margin-top":marginTop});		
		}
		var moveId = $(".alert-title-c");
		//判断是否显示确定和取消按钮
		if(save_btn ==false){
			$(".btn-preserve").hide();	
		}
		if(clos==false){
			$(".btn-close").hide();	
		}
		//事件集合
		dialog_cancle();
		dialog_close();
		dialog_save();
		function dialog_cancle(){
			$(".btn-close").live("click",function(){
				$("#dialog-max").remove();
			});
		}	
		function dialog_close(){
			$(".alert-close").live("click",function(){
				$("#dialog-max").remove();
			}); 
		}	
		function dialog_save(){
			$(".btn-preserve").live("click",function(){
				try {
					if(dia_log.save != null && dia_log.save instanceof Function) {
						try {
							dia_log.save();
						} catch(e){}
					} else {
						$("#dialog-max").remove();
					}
				} catch(e){}
				
			});
		}	
		//弹出框拖动
		function move_dialog(){
			var clicX,clicY;
			var left,top;
			var moveLeft,moveTop;
			var fla = false; //是否在拖动
			var cont = $(".alert-dialog-content");
			var clic = $(document);
			//得到屏幕可用区域的宽度和高度
			var clicWidth = document.documentElement.clientWidth;
			var clicHeight = document.documentElement.clientHeight;
			//移动，核心事件
			function move(event){
				event = event ? event : window.event;
				var target = event.target || event.srcElement;
				if(fla){
					/*sTop = document.documentElement.scrollTop || document.body.scrollTop; //当有滚动条的时候卷去页面的高度
                    dragging.style.left = (event.clientX - box.offsetLeft - dragBox.offsetWidth/2) + "px";
                    dragging.style.top = (event.clientY + sTop - box.offsetTop  - dragBox.offsetHeight/2 ) + "px";
                    var left = parseInt(dragging.style.left);
                    var top = parseInt(dragging.style.top);
                    //console.log("left:"+left+"-----top:"+top + "-------sTop:"+sTop);
                    // 比较坐标是否超出外围的BOX
                    if(left < 0){
                        dragging.style.left = 0 +"px";
                    }
                    if(top < 0){
                        dragging.style.top = 0+"px";
                    }
                    if(left > box.offsetWidth - dragBox.offsetWidth){
                        dragging.style.left = (box.offsetWidth - dragBox.offsetWidth - 2 )+"px";
                    }
                    if(top >  box.offsetHeight - dragBox.offsetHeight){
                        dragging.style.top =( box.offsetHeight - dragBox.offsetHeight  - 2 )+"px";
                    }*/
					
					//计算当前的左上顶点坐标
					var nowLeft = parseInt(left)+ parseInt(event.clientX-clicX);
					var nowTop = parseInt(top) + parseInt(event.clientY-clicY);
					if(nowLeft < 0){
						nowLeft = 0;	
					}
					if(nowLeft > (clicWidth - width)){
						nowLeft = clicWidth - width;	
					}
					if(nowTop < 0){
						nowTop = 0;	
					}
					if(nowTop > (clicHeight - height -20)){
						nowTop = clicHeight - height -20;
					} 
					cont.offset({left:nowLeft,top:nowTop});	
				}	
			}
			clic.live("mousedown",function(e){
				clic.css("cursor","move");
				left = $(cont)[0].offsetLeft;
				top = $(cont)[0].offsetTop;
				clicX = e.clientX;
				clicY = e.clientY;
				var event = e ? e : window.event;
				var target = event.target || event.srcElement;
				if ($(target).hasClass("alert-title-c")) {
					fla = true;
				}
				
				//move(e);
			});
			clic.live("mousemove",function(e){
				move(e);			
			});
			clic.live("mouseup",function(e){
				clic.css("cursor","inherit")
				fla = false;
				//alert(fla);
				//move(e);
			});
		}
		move_dialog();
		var curIframe = $("#dialog-iframe")[0];
		if (!/*@cc_on!@*/0) {
			curIframe.onload = function() {
				if(dia_log.onload && dia_log.onload instanceof Function) {
					try {
						dia_log.onload();
					} catch(e){}
				}
			}
		} else {
			curIframe.onreadystatechange=function(){
				if (curIframe.readyState == "complete") {
					if(dia_log.onload && dia_log.onload instanceof Function) {
					try {
						dia_log.onload();
					} catch(e){}
					}
				}	
			}
		}
		return {
			iframe:$("#dialog-iframe")[0],
			close:function() {
				dia_log = null;
				$("#dialog-max").remove();
				
			}
		};
	}

/*计算宽度*/
function list_width(div1,div2,num){
	var width = jQuery("."+div1).width();
	var width2 = width - num;
	jQuery("."+div2).width(width2);
}

function twoList_width(){
	/*ie浏览器*/
	if (!!window.ActiveXObject || "ActiveXObject" in window){
		jQuery(".two-table").each(function(i,v){
			var th1 = jQuery(v).find("tr th:eq(1)").width();
			var td1 = jQuery(v).find("tr td:eq(0)").width();
			var ipt = jQuery(v).find("tr td:eq(0)").find(".two-ipt").width();
			var width = th1 + td1 + ipt;
			var ipt2 = ipt+4;
			jQuery(v).find(".txt_max").width(width);
			/*选清按钮长度*/
			jQuery(v).find(".has_choose").width(ipt2);
			/*时间段长度*/
			var time = jQuery(v).find("tr td:eq(0)").find(".two-ipt").width();
			var line = jQuery(v).find(".ipt-time-jian").width();
			var time2 = (time-line)/2-1;
			jQuery(v).find(".ipt-time-more").width(time2);
		});	
	}else{
		jQuery(".two-table").each(function(i,v){
			var th1 = jQuery(v).find("tr th:eq(1)").width();
			var td1 = jQuery(v).find("tr td:eq(0)").width();
			var ipt = jQuery(v).find("tr td:eq(0)").find(".two-ipt").width();
			var width = th1 + td1 + ipt;
			jQuery(v).find(".txt_max").width(width);
			var ipt2 = ipt+4;
			/*选清按钮长度*/
			jQuery(v).find(".has_choose").width(ipt2);
			/*时间段长度*/
			var time = jQuery(v).find("tr td:eq(0)").find(".two-ipt").width();
			var line = jQuery(v).find(".ipt-time-jian").width();
			var time2 = (time-line)/2-1;
			jQuery(v).find(".ipt-time-more").width(time2);
		});	
	}         
}

/*视频多画面展现*/
function video_show(){ 
	jQuery(".video-hand .video_test").click(function(){
		var show = jQuery(".video-show"); 
		var count = jQuery(this).attr("count");
		var length = show.find("ul").find("li").length;
		var num = length - count;
		if(num<=0){
			for(var i=0;i<(-num);i++){
				show.find("ul").append($("<li>"));
			}
			jQuery(".video-show").attr("class","").addClass("video-show");
			jQuery(".video-show").addClass("video-show"+count);	
			$(".player").css("width",$("#video-show li").width());
			$(".player").css("height",$("#video-show li").height()-40);
		}else{
			jQuery(".video-show").attr("class","").addClass("video-show");
			jQuery(".video-show").addClass("video-show"+count);		
			$(".player").css("width",$("#video-show li").width());
			$(".player").css("height",$("#video-show li").height()-40);
		}
	});
}

/*窗口大小改变事件*/
window.onresize=function(){
	index_frame();
	list_height();	
	lock_tab();
	twoList_width();
	list_width("list-max-div","list-search",20);//计算宽度,第一个值为外层宽度，第二个层为需要计算的层宽度，第三个值为需要减得margin总和
	list_width("list-max-div","list-list",20);//计算宽度,第一个值为外层宽度，第二个层为需要计算的层宽度，第三个值为需要减得margin
}

function sure_show(message){
	var div = $('<span class="alert-sure-show">'+message+'</span>');
   $(window.top.document).find("body").append(div);
   try {
	 setTimeout(function(){
			$(div).animate({"opacity" : 0}, 0.3);
			setTimeout(function(){
				$(div).remove();
			}, 600);
		}, 1000);
	} catch(e){alert(e)} 
}


/***********列表收缩**********/
function list_cick(){
	jQuery(".list-crimp").each(function(i,v){
		jQuery(v).find(".crimp-top-title").click(function(){
			if(jQuery(v).find(".crimp-content").hasClass("hide")){
				jQuery(v).find(".crimp-content").removeClass("hide");
				jQuery(v).find(".crimp-top-title").find(".txt").text("隐藏");
				jQuery(v).find(".crimp-top-title").find("strong").removeClass("nomore");
			}else{
				jQuery(v).find(".crimp-content").addClass("hide");
				jQuery(v).find(".crimp-top-title").find(".txt").text("展开");
				jQuery(v).find(".crimp-top-title").find("strong").addClass("nomore");
			}
		});
	});
}
/*视频容器高度*/
function analyse_video_height(){
			var	$height=$(".analyse-top").height()-$(".video-System").height();	
			$(".analyse-video").height($height);
		};
		
jQuery(function(){
	analyse_video_height();/*视频容器高度*/
	twoList_width();//双列表单宽度
	index_menu();  //导航菜单选中效果
	menu_left();   //左侧菜单点击收折
	index_frame(); //主体框架
	index_click(); //点击事件
	search_top_more();
	/*list页面*/
	list_height();
	list_cick();	
	lock_tab(); /*锁定表头*/
	check();    /*check 选中*/
	click_selected("top-tab");//点击变色，颜色切换selected
	list_width("list-max-div","list-search",20);//计算宽度,第一个值为外层宽度，第二个层为需要计算的层宽度，第三个值为需要减得margin总和
	list_width("list-max-div","list-list",20);//计算宽度,第一个值为外层宽度，第二个层为需要计算的层宽度，第三个值为需要减得margin总和
	video_show();//地图多画面设计
});


