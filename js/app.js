var app = angular.module('EasyURLApp', ['ngRoute','ngAnimate']);

app.component('home', {
  templateUrl: 'views/home.html'
});
app.component('customize', {
  templateUrl: 'views/customize.html'
});
app.component('introduction', {
  templateUrl: 'views/introduction.html'
});


app.config(function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      //controller: 'HomeController', 
      template: '<home></home><introduction></introduction>',
      animation: 'first'
    }) 
    .when('/customize', { 
      //controller: 'HomeController', 
      template: '<customize></customize><introduction></introduction>',
      animation: 'second'
    })
    .when('/analyze', { 
      //controller: 'HomeController', 
      template: '<customize></customize>',
      animation: 'third'
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