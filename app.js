"use strict"

////////////////JQUERY/////////////////

$( document ).ready(function() {

 	$("a").css({
		"text-decoration": "none",
		"color": "green"
	});

	$("h1").on("click", function() {
		
		$("a h1").css({
			"color": "red",
			"text-decoration": "line-through"
		});
		
		console.log($("h1").attr("reply"));
		alert($("h1").attr("reply"));
		
		$("a h1").css({
			"color": "green",
			"text-decoration": "none"
		});
		$(".alert").fadeOut(750).delay(2000).fadeIn(2000);
		//or 
		// $(".test").hide(750).delay(2000).show(2000);
		
	});

});

///////////////ANGULAR////////////////

var app = angular.module("myApp", ['ui.router']);

      /////////////ROUTES///////////////

app.config(function($stateProvider, $urlRouterProvider) {
  
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/page1");
  
  $stateProvider
    
    .state('page1', {
      url: "/page1",
      templateUrl: "html-templates/page1.html",
      controller: "myController"
    })
    
    .state('page2', {
      url: "/page2",
      templateUrl: "html-templates/page2.html",
      controller: "otherController"
	})

});


    ///////////CONTROLLERS//////////////

app.controller("myController", ["$scope", "$log", "service", function($scope, $log, service) {

	var getArrs = function() {
		$scope.arrs = service.arrsFunc();
	}

	getArrs();

	$scope.test = "This is a test from the controller!"
	
	$scope.characters = 5;

	$scope.upperCase = function(name) {
		name = name.toUpperCase();
		service.upperCase(name);
		$scope.name = "";
		getArrs();
	}

}]);


app.controller("otherController", ["$scope", function($scope) {
  
  $scope.hey = "HEY!!!!!!! this is the test to see if it is connected to the controller."

}]);


//////////SERVICE/////////////

app.service("service", [function() {

	var arrs = [];

	this.upperCase = function(name) {
		 arrs.push(name);
		 console.log("console.log arrs in service upperCase function ",arrs)
	} 

	this.arrsFunc = function() {
		return arrs;
	}
}]);