Titanium Youtube Player
=====================

####Play YouTube videoclips directly in your app



This simple module allows you to play the youtube clips directly in your app, without having to switch to Safari or the YouTube app (if installed).

From the performance point of view this means an extra XHR call, but the time to retrieve it is similar to the time lost in switching apps. You will have to add visual elements (like an activityIndicator) to let the user know the app is fetching data.
 

The module makes an XHR call to the mobile version of the YouTube site and finds the link to the stream. Because this happens asynchronously you will have to pass it to your player in the callback.

The [app.js](https://github.com/rborn/TitaniumYoutubePlayer/blob/master/app.js) file has a full example on how to implement it.

####Usage

Require the get_yt_clip.js module:

~~~
	var get_yt_clip = require('/get_yt_clip');
~~~

Than call it with clip ID and the callback function:

~~~
get_yt_clip('8CX82uT7A9Y', function(err, clip_url) {
		if (!err && clip_url) {
			videoPlayer.url = clip_url;
			videoPlayer.play();
		}
		else {
			console.error(err);
		}
	});
~~~

I didn't include the videoPlayer in the module because this way it can be implemented however your needs are.

###Very important!

This module displays the videoclip directly (no YouTube mention or anything else) so you **HAVE TO** be sure you specify very clear in your app that is a YouTube videoclip.


Another thing would be that you need to be sure that the clip is allowed to run on mobile and in the user's country.

More info on [YouTube APIs site](https://developers.google.com/youtube/2.0/developers_guide_protocol_api_query_parameters)

#### License
**I am not responsible if Google comes after you because you used the module without giving the proper credits to Youtube. ** 

Otherwise is MIT, so just have fun :)
##### Final word

We used this approach in our music discovery iPhone app [ArtistBox](http://artistboxapp.com).

##### Update 17.07.2013

Youtube changed the layout of the page so the old code is not working anymore.
Part of the code used from [Bob Sims' ytPlayer](https://github.com/bob-sims/ytPlayer) to fix it.

