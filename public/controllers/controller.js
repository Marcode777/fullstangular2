var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope','$http', 
function($scope, $http){
  console.log("Hello World from controller!");

  // $http.get('/contactlist')
  //   person1= {
  //   name: "Tim",
  //   email: "tim@email.com",
  //   number: "(111) 111 1111"
  //   };
  //   person2= {
  //   name:"Emily",
  //   email:"emily@email.com",
  //   number:"(222) 222 2222"
  //   };
  //   person3= {
  //   name:"John",
  //   email:"john@email.com",
  //   number:"(333) 333 3333"
  //   };

  // var contactlist = [person1, person2, person3];
  // $scope.contactlist = contactlist; //$scope is the glue between application controller and the view

    $http.get('/contactlist').success(function(response){
      console.log("I got the data I requested in json");
    $scope.contactlist = response;
  });

    $scope.addContact = function(){
      console.log($scope.contact);
      $http.post('/contactlist', $scope.contact)
      console.log("also still works here")
    };



}]);



    // $scope.addContact = function(){
    //   console.log($scope.contact);
    //   $http.post('/contactlist', $scope.contact)
    // };
// $scope is the glue between application controller and the view
//now to get data from the server instead of from the controller, we use $http.get from the controller side, which will send a request to the server in the app, and we'll use app.get from the server side which will respond by sending the data we want
// '/contactlist' is the route created to get our data from
// the get request and the objects are commented out because now we have transferred it into server.js, all starting from person1 to var contactlist, but not $scope.contactlist
// console.log("I got data requested in json") will tell us that we succesfully got the data we requested 
// the $scope.contactlist = response will put the data into the html file 
//  $scope.addContact = function() is going to send the information from the input boxes in index.html to the console, whatever was typed in the input boxes in html and after clicking the add contact button was console.logged into the inspect, so it was successful!
//now $http.post('/contactlist', $scope.contact) will send the input data from our boxes to the server and make sure that it's received correctly $scope.contact is the actual data that we're sending to the server
// the .success, etc. after $http.post, tests to makes sure that the controller receives the new data from the database 
//
//