/**
 * @author Yaohaixiao
 */
(function($){
    var PLAYER_PATH = 'http://www.yaohaixiao.com/swf/flvplayer.swf', 
	    FLASH_VER = '11';
    
    $.FlvPlayer = function(config){
        this.setting = {
			player: null,
            playerZone: null,
            playerId: 'jsflvplayer',
			videoWidth: 480,
			videoHeight: 400,
            width: 480,
            height: 400,
            file: '',
			isThumbsInPlaylist: true,
            isAllowFullScreen: true,
            isShowStop: true,
            isDownload: true,
            isAutoPlay: true,
            isFullScreen: true,
            isAutoScroll: true,
			isShowEq: false,
			isShowVolume: true, 
			isShowWdigits: true,
            backColor: '0xCCCC66',
            frontColor: '0xFFFFFF',
            screenColor: '0x000000',
            lightColor: '0x000000'
        };
        
        $.extend(this.setting, config);
        
        this.setup();
        
        return this;
    };
    
    $.FlvPlayer.prototype = {
        setup: function(){
            var setting = this.setting, 
			    playerId = setting.playerId;
				 
			setting.player = new SWFObject(PLAYER_PATH, playerId, setting.width, setting.height, FLASH_VER);
            setting.player.addParam('wmode', 'transparent');
            setting.player.addParam('allowfullscreen', setting.isAllowFullScreen);
            setting.player.addParam('allowscriptaccess', 'always');
			setting.player.addVariable('image', setting.image);
            setting.player.addVariable('displaywidth', setting.videoWidth);
            setting.player.addVariable('displayheight', setting.videoHeight);
            setting.player.addVariable('file', setting.file);
            setting.player.addVariable('autostart', setting.isAutoPlay);
            setting.player.addVariable('overstretch', 'fit');
            setting.player.addVariable('usefullscreen', setting.isFullScreen);
            setting.player.addVariable('showstop', setting.isShowStop);
            setting.player.addVariable('showdownload', setting.isDownload);
            setting.player.addVariable('screencolor', setting.screenColor);
            setting.player.addVariable('backcolor', setting.backColor);
            setting.player.addVariable('frontcolor ', setting.frontColor);
            setting.player.addVariable('lightcolor', setting.lightColor);
			setting.player.addVariable('thumbsinplaylist', setting.isThumbsInPlaylist);
            setting.player.addVariable('autoscroll', setting.isAutoScroll);
			setting.player.addVariable('logo', setting.logo);
			setting.player.addVariable('showeq', setting.isShowEq);
			setting.player.addVariable('showvolume', setting.isShowVolume);
			setting.player.addVariable('showdigits', setting.isShowWdigits);
            setting.player.addVariable('shuffle', 'true');
            setting.player.addVariable("enablejs", "true");
            setting.player.addVariable("javascriptid", playerId);
            setting.player.write(setting.playerZone);
			
			return this;
        }
    };
    
    $.fn.extend({
        flvPlayer: function(options){
            options.playerZone = $(this).attr('id');
            
            new $.FlvPlayer(options);
        }
    });
})(jQuery);