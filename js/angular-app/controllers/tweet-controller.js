app.controller('tweet-controller', ['$scope', 'TweetsRESTService', '$window', function($scope, TweetsRESTService, $window) {
		
		$scope.content = "";
		$scope.url = "";
		$scope.title = "Example title";
		
		$scope.tweets = [];
		$scope.loadingTweets = false;
		$scope.newTweet = {};
		
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
		
		var share_window = null;
		$scope.tweetIt = function() {
			
			var urlData = "https://twitter.com/intent/tweet?text="+encodeURIComponent($scope.content + ' ' +$scope.url + ' #nowPlaying')+"&via=BInowplaying";
			share_window = window.open(urlData, '', 'width=650, height=500');
		}
        
        $(window).bind("message", function(event) {
          event = event.originalEvent
          if(event.source == share_window && event.data != "__ready__") {
            $scope.newTweet = { 
				entities: {
					urls: [{ expanded_url: $scope.url}]
				},
				isYoutubeLink: true,
				youtubeLink: $scope.parseURL($scope.url),
				text: $scope.content,
				id: Math.random()
			}
			$scope.tweets.unshift($scope.newTweet);
			$scope.$apply();
          }
        });
		
		
		$scope.parseURL = function(url) {
			if (url.indexOf("watch?v=") != -1) {
				var url = url.split("watch?v=");
				console.log(url);
				var url = url[0]+url[1];
			}
		
		
			var parts = url.split("/");
			var protocol = parts[0];
			var videoId = parts[parts.length-1];
			return protocol+"//youtube.com/embed/"+videoId;
			
		}
		
	
	
	$scope.loadTweets();

		
}]);