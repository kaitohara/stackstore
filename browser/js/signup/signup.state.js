app.config(function($stateProvider){

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignUpCtrl'
    });

    $stateProvider.state('signup/success', {
        url: '/signup/success',
        tempateUrl: 'js/signup/signup.confirm.html',
        controller: 'SignUpSuccessCtrl'
    });
});
