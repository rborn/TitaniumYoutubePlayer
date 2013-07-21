var get_yt_clip = require('/get_yt_clip');


var win = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});

var btn = Ti.UI.createButton({
	top:20,
	title:'Show me ArtistBox!'
});

var videoPlayer = Titanium.Media.createVideoPlayer({
	autoplay: false,
	mediaControlStyle: Titanium.Media.VIDEO_CONTROL_DEFAULT,
	scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
	bottom:20,
	height:240,
	width:320,
	backgroundColor:'#f00'
});

videoPlayer.addEventListener('complete', function(){
	btn.title = 'Show me ArtistBox!';
});

btn.addEventListener('click', function(){
	btn.title = 'Loading...';
	get_yt_clip('8CX82uT7A9Y', function(err, clip_url) {

		if (!err && clip_url) {
			videoPlayer.url = clip_url;
			videoPlayer.play();
		}
		else {
			console.error(err);
		}
	});
});

win.add(videoPlayer);
win.add(btn);

win.open();