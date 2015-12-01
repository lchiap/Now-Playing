app.controller('tweet-controller', ['$scope', 'TweetsRESTService', function($scope, TweetsRESTService) {
		
		$scope.content = "";
		$scope.url = "";
		$scope.title = "Example title";
		
		$scope.tweets = [];
		$scope.loadingTweets = false;
		
		$scope.add = function() {
			document.getElementById("yt").setAttribute("src", $scope.url);
		}
		
		
		$scope.loadTweets = function() {
			$scope.loadingTweets = true;
			TweetsRESTService.getTweets().success(function(data) {
				$scope.tweets = data.statuses;
				$scope.loadingTweets = false;

				
				for (var twit in $scope.tweets) {
					console.log($scope.tweets[twit]);
					if ($scope.tweets[twit].entities.urls.length > 0) {
						for (var url in $scope.tweets[twit].entities.urls) {
							if ($scope.tweets[twit].entities.urls[url].expanded_url.indexOf("youtu.be") !== -1) {
								$scope.tweets[twit].isYoutubeLink = true;
								$scope.tweets[twit].youtubeLink = $scope.parseURL($scope.tweets[twit].entities.urls[url].expanded_url);
								$scope.tweets[twit].avatar = $scope.tweets[twit].user.profile_image_url;
								$scope.tweets[twit].title = $scope.tweets[twit].user.name;
								$scope.tweets[twit].userName = $scope.tweets[twit].user.screen_name;
					
							};
						}
					}
					
				}
			});
		}
		
		$scope.parseURL = function(url) {
			var parts = url.split("/");
			var protocol = parts[0];
			var videoId = parts[parts.length-1];
			return protocol+"//youtube.com/embed/"+videoId;
		}
		$scope.loadTweets();

		
}]);