####Titanium

[Readme](https://github.com/rborn/TitaniumYoutubePlayer/tree/master/titanium)

####Node.js


**get_clip** accepts an object of options as in the example. If **os** is anything but **android** is defaulted to iOs.

~~~
get_clip({
		videoId:'8CX82uT7A9Y', 
		os:'android'
	}, function(err,res) {
	console.log(arguments);
});
~~~