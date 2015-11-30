(function(){
	
	app.controller('tweet-controller', ['$scope', function($scope) {
		
		$scope.content = "";
		$scope.url = "";
		$scope.title = "Ejemplo de titulo";
		$scope.add = function() {
			document.getElementById("yt").setAttribute("src", $scope.url);
		}
		
	}]);
	
})();