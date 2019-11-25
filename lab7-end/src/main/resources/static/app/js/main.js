var wafepaApp = angular.module("wafepaApp", ["ngRoute"]);

wafepaApp.controller("HomeCtrl",function($scope){
	$scope.message = "Hello JWD39!";
});

wafepaApp.controller("ActivitiesCtrl", function($scope, $http, $location){
	
	var url = "/api/activities";
	
	$scope.activities = [];
	
	var getActivities = function(){
		
		var promise = $http.get(url);
		promise.then(
			function success(res){
				$scope.activities = res.data;
				//console.log("test1");
				//console.log(res);
			},
			function error(res){
				
			}
		);
		
		//console.log("test2");
	}
	
	getActivities();
	
	$scope.goToEdit = function(id){
		$location.path("/activities/edit/" + id);
	}
	
	$scope.goToAdd = function(){
		$location.path("/activities/add");
	}
	
});


wafepaApp.controller("EditActivityCtrl", function($scope, $routeParams, $http, $location){
	console.log($routeParams);
	
	var url = "/api/activities/" + $routeParams.aid;
	
	$scope.activity = {};
	$scope.activity.name = "";
	
	var getActivity = function(){
		var p = $http.get(url);
		p.then(
			function uspeh(odg){
				$scope.activity = odg.data;
			},
			function neuspeh(odg){
				alert("Couldn't fetch the activity");
			}
		);
	}
	
	getActivity();
	
	$scope.doEdit = function(){
		$http.put(url, $scope.activity).then(
			function success(){
				$location.path("/activities");
			},
			function error(){
				alert("Couldn't save the activity");
			}
		);
	}
	
	
});


wafepaApp.controller("AddActivityCtrl", function($scope, $http, $location){
	
	var url = "/api/activities";
	
	$scope.activity = {};
	$scope.activity.name = "";
	
	$scope.doAdd = function(){
		$http.post(url, $scope.activity).then(
			function success(){
				$location.path("/activities");
			},
			function error(){
				alert("Couldn't save the activity");
			}
		);
	}
	
});


wafepaApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : '/app/html/home.html',
			controller: 'HomeCtrl'
		})
		.when('/activities', {
			templateUrl : '/app/html/activities.html'
		})
		.when('/activities/add', {
			templateUrl : '/app/html/add-activity.html'
		})
		.when('/activities/edit/:aid', {
			templateUrl : '/app/html/edit-activity.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);