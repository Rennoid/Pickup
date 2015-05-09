var app = angular.module('app', [
  'app.users',
  'app.courts',
  'app.auth',
  'app.services',
  'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // if the path doesn't match any of the urls configured below,
  // otherwise will take care of routing the user to the specified url
  $urlRouterProvider.otherwise('/');

  $stateProvider

    // create a home state with two partial views
    .state('home', {
      url: '/',
      views: {
        // userInfo view would display basic info about the current user 
        'userInfo@': {
          templateUrl: 'app/users/userPartial.html',
          controller: 'UserController'
        }, 
        // courtInfo view would only be displayed if a court was selected from the map - 
        // might contain court name, rating, and schedule for the day 
        'courtInfo@': {
          templateUrl: 'app/courts/courtPartial.html',
          controller: 'CourtController'
        }
      }
    })

    // create a login state with a single view for the login form  
    .state('login', {
      url: '/login',
      templateUrl: 'app/auth/loginPartial.html', 
      controller: 'AuthController'
    })

    // create a signup state with a single view for the signup form  
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signupPartial.html', 
      controller: 'AuthController'
    })

    // Add $httpInterceptor into the array of interceptors. 
    // like middleware for ajax calls 
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.app');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/login');
    }
  });
});

;