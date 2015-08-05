app.config(function ($stateProvider) {

    $stateProvider.state('additional', {
        url: '/additional',
        templateUrl: 'js/login/additional-info/additional-info.html',
        controller: 'AdditionalInfoCtrl'
    });

});

app.controller('AdditionalInfoCtrl', function ($scope, AuthService, $state, Session) {

    $scope.info = {};
    $scope.error = null;

    $scope.sendInfo = function (additionalInfo) {

        $scope.error = null;

        console.log('signing up');
        console.log('info', additionalInfo);

        AuthService.getLoggedInUser()
            .then(user => {
                return AuthService.updateUser(user._id, additionalInfo);
            }).then((user) => {
                console.log('new seller', user);
                // Session.updateUser(user);
                $state.go('home');
            }).catch(function () {
                $scope.error = 'Invalid signup credentials.';
            });
    };

});