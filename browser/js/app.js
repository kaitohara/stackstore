'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'ui.bootstrap', 'fsaPreBuilt', 'ng-slide-down']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);

    $urlRouterProvider
        // User router's redirect work around for signup/confirm route
        .when('signup/confirmed/:id', function($state){
            $state.go('signup.confirmed');
        })
        // User router's redirect work around for already activated users
        .when('login', function($state){
            $state.go('login');
        })
        //.when('reset', function($state){
        //    $state.go('reset');
        //})
        //.when('reset/success', function($state){
        //    $state.go('reset.success');
        //})
        .when('reset/confirmed/:id', function($state){
            $state.go('reset.confirmed');
        })// for oauth
        .when('/auth/:provider', function() {
            window.location.reload();
        })

});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {

    // The given state requires an authenticated views.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The views is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a views is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no views is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });

    });

});
