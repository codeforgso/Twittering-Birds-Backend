/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Twitter = require('twitter')

console.log(sails.config.secrets.consumer_key);
var twitter = new Twitter({
	consumer_key: sails.config.secrets.twitter.consumer_key,
	consumer_secret: sails.config.secrets.twitter.consumer_secret,
	access_token_key: sails.config.secrets.twitter.access_token_key,
	access_token_secret: sails.config.secrets.twitter.access_token_secret
});

module.exports = {

	search: function(req, res){

		var params = req.params.all();


		twitter.get('search/tweets', {q: params.terms}, function(err, tweets, response){
			if(err){
				return res.json(err);
			}

			if(tweets){
				return res.json(tweets);
			}

		});


	}

};
