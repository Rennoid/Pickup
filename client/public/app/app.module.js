var app = angular.module('app', [
  'app.users',
  'app.courts',
  'app.auth',
  'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider) {

  // if the path doesn't match any of the urls configured below,
  // otherwise will take care of routing the user to the specified url
  $urlRouterProvider.otherwise('/');

  $stateProvider

    // create a home state with two partial views
    .state('home', {
      url: '/',
      views: {
        // userInfo view would display basic info about the current user 
        'userInfo@home': {
          templateUrl: 'users/userPartial.html',
          controller: 'UserController'
        }, 
        // courtInfo view would only be displayed if a court was selected from the map - 
        // might contain court name, rating, and schedule for the day 
        'courtInfo@home': {
          templateUrl: 'courts/courtPartial.html',
          controller: 'CourtController'
        }
      }
    })

    // create a login state with a single view for the login form  
    .state('login', {
      url: '/login',
      templateUrl: 'auth/loginPartial.hmtl' 
      controller: 'AuthController'
    })

    // create a signup state with a single view for the signup form  
    .state('signup', {
      url: '/signup',
      templateUrl: 'auth/signupPartial.hmtl' 
      controller: 'AuthController'
    })
});