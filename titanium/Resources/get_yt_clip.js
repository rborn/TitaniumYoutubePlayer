/*
Copyright Daniel Tamas -  http://dan-tamas.me 
License MIT.

This is a version of the code used in the ArtistBox app for iPhone - http://artistboxapp.com

Update 17.07.2013 - Youtube changed the layout of the apge so the old code is not working anymore.
Part of the code from Bob Sims https://github.com/bob-sims/ytPlayer


*/

module.exports = function(videoId, callback) {

	var url = 'http://m.youtube.com/watch?ajax=1&layout=mobile&tsp=1&utcoffset=330&v=' + videoId;
	var referer = 'http://www.youtube.com/watch?v=' + videoId;

	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {

			// console.log(this.responseText);

			try {
				var json = this.responseText.substring(4, this.responseText.length);
				var response = JSON.parse(json);
				
				// console.log(response);
				
				var video = response.content.video;

				if (videoId == video.encrypted_id) {
					var streamUrl = response.content.player_data.fmt_stream_map ? response.content.player_data.fmt_stream_map[0].url : response.content.player_data.stream_url;
				} else {
					callback('wrong video return');
					return;
				}
			}
			catch(err) {
				callback('cannot retrieve video');
				return;
			}

			callback(null, streamUrl);
		},
		onerror: function(e) {
			callback(e.error);
		},
		timeout: 20000 // in milliseconds
	});

	xhr.open("GET", url);
	
	if (Ti.Platform.name == 'iPhone OS') {
		xhr.setRequestHeader('Referer', referer);
		xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14');
	}
	if (Ti.Platform.name == 'android') {
		xhr.setRequestHeader('Referer', referer);
		xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Linux; U; Android 2.2.1; en-gb; GT-I9003 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1');
	}

	xhr.send();

};
