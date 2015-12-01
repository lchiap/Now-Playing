app.factory('TweetsRESTService', function ($http, $q) {
	var canceller = $q.defer();
	return {
		getTweets: function() {
			return $http.get('http://localhost:8888/now-playing/backend/get_tweets.php', { timeout: canceller.promise });
		},
		postTweet: function(tweet) {
			return $http.post("http://localhost:8888/now-playing/backend/post_tweet.php", { tweet: tweet }, { timeout: canceller.promise });
		}
	}
});