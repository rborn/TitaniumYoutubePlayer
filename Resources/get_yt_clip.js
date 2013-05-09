/*
Copyright Daniel Tamas -  http://dan-tamas.me 
License MIT.

This is a version of the code used in the ArtistBox app for iPhone - http://artistboxapp.com

*/


exports = function(videoId, callback) {

	var url = 'http://www.youtube.com/watch?v=' + videoId;

	var xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			
			var res = this.responseText;


			var reg = /ls.setItem\('PIGGYBACK_DATA', "\)]}'(.*)\"\);/gmi;
			var a = reg.exec(res)[1].replace(/\\\"/gim, '\"').replace(/\\\\\\\//gim, '/').replace(/\\\\/gim, '\\');

			try {
				var data = JSON.parse(a);


				if (videoId == data.content.video.encrypted_id) {
					var clip_url = data.content.video.fmt_stream_map[0].url;
					console.warn(clip_url);
				} else {
					callback('wrong video return');
					return;
				}

			}
			catch(err) {
				callback('cannot retrieve video');
				return;
			}
			
			callback(null, clip_url);
		},
		onerror: function(e) {
			callback(e.error);
		},
		timeout: 20000 // in milliseconds
	});

	xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3');

	xhr.open("GET", url);
	xhr.send();

};
