var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// Load Youtube video ifram
var player;
function onYouTubePlayerAPIReady() {
player = new YT.Player('player', {
playerVars: {
	'autoplay': 1, // change the video to manual play 
	'controls': 1, // more info. please read youtube api
	'autohide': 1,
	'wmode':'opaque',
	'controls': 0,
	'showinfo': 0,
	'modestbranding': 1},
videoId: 'y6Sadk2EI40', // change this id for different video
events: {
	'onReady': onPlayerReady,
	'onStateChange': onPlayerStateChange,
	'onError': onPlayerError
	}
	});
}
// mute the video when it starts play
function onPlayerReady(event) {
	event.target.mute();
}

// hide none use button when playing video
$(function() {
	$("#btn2").hide();
	$("#btn1").hide();
	$("#btn3").hide();
});


// check the video is mute or not -- for sound button control
var isMute = 1;

$("#sound").click(function(event){
	if (isMute == 1) {
		player.unMute();
		isMute = 0;
	}else{
		player.mute();
		isMute = 1;
	}
    
 });

// skip button for mobile deveice, mobile device canont automatically play the video 

$("#skip").click(function(event) {
	afterPlay();
});


// after player state changes (play -> pause, play -> end) show content 
function onPlayerStateChange(event) {
if (event.data == YT.PlayerState.ENDED || event.data == YT.PlayerState.PAUSED ){
  afterPlay();
}
}
// when player is erro, self destory!
function onPlayerError(event) {
  player.destroy();
  afterPlay();

}

//animaiton for elements 
function afterPlay(){
	player.destroy();
	$("#content" ).fadeIn( "1800" );
	$("#content").css("z-index",99);
	$("#player").css({"background":"none","z-index":-99}); //push the player to very end
	$("#ani1").animate({"right":"15%"}, "700");
	$("#ani2").animate({"left":"18%"}, "700");
	$("#btn2").show();
	$("#sound").hide();
	$("#btn1").show();
	$("#btn3").show();
	$("#skip").hide();
	$('.fancybox').fancybox();
	resizeWindow();
}
// foo bar location, when window height is larger than 800, relocated the foo bar 
function resizeWindow(event){
	current_h = $(window).height();
	if (current_h < 600) {
		$(".foo").css({
				"bottom": 0,
				"top": "auto"
		});
	}
	if (current_h > 800) {
		$(".foo").css({
				"bottom": "auto",
				"top": "600px"
		});
	}

	$(window).resize(function(event) {
		window_h = $(window).height();
		if (window_h>800) {
			$(".foo").css({
				"bottom": "auto",
				"top": "600px"
			});
		}else{
			$(".foo").css({
				"bottom": 0,
				"top": "auto"
			});
		}
	});
}
