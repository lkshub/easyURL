var app = angular.module('EasyURLApp', ['ngRoute','ngAnimate']);

app.config(function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      //controller: 'HomeController', 
      templateUrl: 'views/home.html',
      animation: 'first'
    }) 
    .when('/customize', { 
      //controller: 'HomeController', 
      templateUrl: 'views/customize.html',
      animation: 'second'
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});


app.controller('ctrl', function($scope, $rootScope){
	  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
		$rootScope.animation = currRoute.animation;
	  });
	});