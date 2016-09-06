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
		// $(".alert").hide(750).delay(2000).show(2000);
		
	});

});

///////////////ANGULAR////////////////

var app = angular.module("myApp", ['ui.router']);

      /////////////ROUTES///////////////

app.config(function($stateProvider, $urlRouterProvider) {
  
  // For any unmatched url, redirect to /home
  // $urlRouterProvider.otherwise("/page1");
  
  $stateProvider
    
    .state('page1', {
      url: "/page1",
      templateUrl: "html-templates/page1.html",
      controller: "myController as vm"
    })
    
    .state('page2', {
      url: "/page2",
      templateUrl: "html-templates/page2.html",
      controller: "otherController"
	})

});

// app.config(["$compileProvider", function ($compileProvider) {
//     $compileProvider.aHrefSanitizationWhitelist(/^\s*(file|https?|ftp|mailto|app):/);
// }])


    ///////////CONTROLLERS//////////////

app.controller("myController", ["$scope", "$log", "service", "$state", "$stateParams", "$timeout",
	function($scope, $log, service, $state, $stateParams, $timeout) {
console.log("this is the this ", this);
	var vm = this;

	$scope.getArrs = function() {
		$scope.arrs = service.arrsFunc();
	}

	$scope.getArrs();
	

	// The following function with timeout allowed the landing page to go to the second page in a set time using $state.go();
	// $scope.page2 = function() {
	// 	$timeout(function() {
	// 		$state.go("page2");
	// 	}, 4000)
	// }

	//$scope.page2();
	
	// $scope.page2();

	$scope.test = "This is a test from the controller!"
	
	$scope.characters = 5;

	$scope.name = "";

	vm.upperCase = function(name) {
		if (name) {
			name = name.toUpperCase();
			service.upperCase(name);
			$scope.name = "";
			$scope.getArrs();
		} 
	}


}]);


app.controller("otherController", ["$scope", function($scope) {
  
  $scope.hey = "HEY!!!!!!! this is the test to see if it is connected to the controller."

  	$scope.people = [ //in order for both directives and ng-repeats to work the way it is this must be an array and not an object.
	  
	  $scope.nisha = {
	  	name: "Nisha Williams",
	  	address: "4567 Millrock Dr, Ditterville, OR 76543",
	  	link: "http://www.nishamwilliams.com",
	  },

	  $scope.randy = {
	  	name: "Randy Williams",
	  	address: "7338 S. State Street, Homertown, OH 93939",
	  	link: "http://www.randy-williams.branded.me"
	  },

	  $scope.connor = {
	  	name: "Connor Williams",
	  	address: "993 N. Trump Speach Rd, Bombastic, NY 30048",
	  	link: "http://www.google.com"
	  },

	  $scope.kyler = {
	  	name: "Kyler Williams",
	  	address: "2663 Chilton Circle, Washington, AK 94858",
	  	link: "http://www.yahoo.com"
	  },

	  $scope.corbin = {
	  	name: "Corbin Williams",
	  	address: "4567 Millrock Dr, Ditterville, OR 76543",
	  	link: "http://www.bing.com"
	  }
	];

	

	

	//below is a function to be used in a directive.  It can be done but it is not a very neat way of doing things.
	$scope.formattedPerson = function(people) {
		console.log(people);
		return "My name is " + people.name + ", and I live at " + people.address + ".  If you want to get to know me, visit my website at " + people.link;
	}


}]);




//////////SERVICE/////////////

app.service("service", [function() {

	var arrs = [];

	this.upperCase = function(name) {
		if (name) {
		 arrs.push(name);
		 console.log("console.log arrs in service upperCase function ",arrs)
		}
	} 

	this.arrsFunc = function() {
		return arrs;
	}
}]);


/////////DIRECTIVE///////////

app.directive("myDirective", function() {

	return {

		restrict: "AECM", 
		templateUrl: "html-templates/directiveTemplate.html",
		
		/*or
		template: "<dir class="alert2">
			<p>My address is 4567 Millrock Dr.</p><a href="http://www.google.com" target="blank">Go To Google</a></p></dir>",   */
		
		replace: true,
		scope: {
			// personName: "@",
			// personAddress: "@",
			personObject: "=",
			formattedPersonFunction: "&"
		},
		transclude: true
		
		
	}
})