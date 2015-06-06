/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Twitter = require('twitter');

var twitter = new Twitter({
	consumer_key: sails.config.secrets.twitter.consumer_key,
	consumer_secret: sails.config.secrets.twitter.consumer_secret,
	access_token_key: sails.config.secrets.twitter.access_token_key,
	access_token_secret: sails.config.secrets.twitter.access_token_secret
});

module.exports = {

	search: function(req, res){

		var params = req.params.all();

		if(params.terms){

			Tweet.find({
				text: {
					'contains': params.terms
				}
			}, function(err, tweets){
				if(err){
					return res.json({
						error: err
					});
				}
				if(tweets){
					return res.json({
						tweets: tweets
					});
				}
			})

		} else {

			return res.badRequest({
				error: 'No Search Terms'
			});

		}


	},

	stream: function(req, res){

		res.ok();

		twitter.stream('statuses/filter', {track: 'bird,cardinal,blue jay,hummingbird,robin'},  function(stream){
			console.log('stream running');
    	stream.on('data', function(status) {

				if(status.coordinates || status.geo || status.place){

					Tweet.create(status, function(err, done){
						if(err){
							console.log(err);
							false;
						}
						if(done){
							console.log(done.user.screen_name);
							false;
						}
					});

				}

    	});

    	stream.on('error', function(error) {
      	console.log(error);
    	});

  });
	}

};
