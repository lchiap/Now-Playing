app.factory('TweetsRESTService', function ($http, $q) {
	var canceller = $q.defer();
	return {
		getTweets: function() {
			return $http.get('http://localhost:8888/now-playing/backend/get_tweets.php', { timeout: canceller.promise });
		}
	}
});