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

			twitter.get('search/tweets', {q: params.terms, count: 100}, function(err, tweets, response){
				if(err){
					return res.badRequest(err);
				}

				if(tweets){
					return res.ok(tweets);
				}

			});

		} else {

			return res.badRequest({
				error: 'No Search Terms'
			});

		}


	}

};
