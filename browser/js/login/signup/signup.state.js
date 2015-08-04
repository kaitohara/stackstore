app.config(function($stateProvider){

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/login/signup/views/signup.html',
        controller: 'SignUpCtrl'
    })
    .state('signup.success', {
        url: '/success',
        templateUrl: 'js/login/signup/views/signup.success.html',
        controller: 'SignUpSuccessCtrl'
    })
    .state('signup.confirmed', {
        url: '/confirmed/:id',
        templateUrl: 'js/login/signup/views/signup.confirmed.html',
        controller: 'SignUpConfirmedCtrl'
    });
});
