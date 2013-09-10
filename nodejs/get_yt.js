var http = require('http');

var get_clip = function(params, callback) {


	if (params.os == 'android') {
		var headers = {
			'User-Agent': 'Mozilla/5.0 (Linux; U; Android 2.2.1; en-gb; GT-I9003 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
			'Referer': 'http://www.youtube.com/watch?v=' + params.videoId
		}
	}
	else {
		var headers = {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14',
			'Referer': 'http://www.youtube.com/watch?v=' + params.videoId
		}
	}

	var options = {
		hostname: 'm.youtube.com',
		path: '/watch?ajax=1&layout=mobile&tsp=1&utcoffset=330&v=' + params.videoId,
		method: 'GET',
		headers: headers
	};

	var out = '';

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			out += chunk;
		});

		res.on('end', function() {
			try {
				var data = JSON.parse(out.substring(4, out.length));
				if (data && data.content && data.content.video) {
					
				var streamUrl = data.content.player_data.fmt_stream_map ? response.content.player_data.fmt_stream_map[0].url : response.content.player_data.stream_url;

					callback(null, streamUrl);
				} else {
					callback('wrong_reply');
				}
			}
			catch(err) {
				callback(err);
			}

		})
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
		console.log(e.stack);
	});

	req.end();
}

exports.get_clip = get_clip;