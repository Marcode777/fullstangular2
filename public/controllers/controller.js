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

    var refresh = function() {
        $http.get('/contactlist').success(function(response){
          console.log("I got the data I requested in json");
        $scope.contactlist = response;
        $scope.contact = "";
      });
    }

    refresh();

    $scope.addContact = function(){
      console.log($scope.contact);
      $http.post('/contactlist', $scope.contact).success(function(response){
        console.log(response);
        refresh();
      })
    };

    $scope.remove = function(id){
      console.log(id);
      $http.delete('/contactlist/' + id).success(function(response){
          refresh();
      });
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
// finally solved and functional, it was because of a syntax error and now it's fixed:  $http.post('/contactlist', $scope.contact).success(function(response){ console.log(response); })
// since the syntax error was finally solved, after clicking on the add contact button, now we see that we have received the data from the server and there is an additional id tag that mongodb has attached to the object (when viewed in inspector), which means we have successfully inserted the data into our mongodb database
// now, even though the data is entered into the database, the view is not being updated unless we refresh it, so now the next step is to have the page automatically refresh when addContact() is clicked
// to do this, a new function called refresh is created, which, when called, will perform a new get request for all of our contactlist data in our mongodb database
// to do this, we will surround the $http.get request, with this refresh function var = refresh function() etc., and also add $scope.contact = ""; which will clear the infoboxes after the refresh function is called
// then the refresh ();  function is called again so that it will get the data right when we load the page
// also the refresh(); is called yet again at the end of the addContact function to immediately refresh the page after the addContact function is called when the addContact button is clicked
// $scope.remove, etc., is remove function which has the id of the contact we want to remove, this will sent to the console, the id of the contact we want to remove
// now to send the $http.delete request and test to make sure that it's received. the '/contactlist/' is going to be a specific url, and the specific contact we want to delete, which is what the + id is for, because we want to be abel to send the url of the id we want to delete
// .success after $http.delete, etc, is to immediately refresh the browser page after the remove button is clicked, so after a remove button next to an entry is clicked, it also disappears from the view, so our code is working and have successfully enabled deleting contacts from our contact list
//
//