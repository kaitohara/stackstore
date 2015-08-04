app.config(function ($stateProvider) {

    $stateProvider.state('additional', {
        url: '/additional',
        templateUrl: 'js/login/additional-info/additional-info.html',
        controller: 'AdditionalInfoCtrl'
    });

});

app.controller('AdditionalInfoCtrl', function ($scope, AuthService) {

    $scope.additional = {};
    $scope.error = null;

    $scope.sendInfo = function (additionalInfo) {

        $scope.error = null;

        console.log('signing up');
        console.log('info', additionalInfo);

        AuthService.submit(additionalInfo)
            .then(function (user) {
                console.log(additionalInfo);
                console.log(user);
                // $state.go('home');
            }).catch(function () {
                $scope.error = 'Invalid signup credentials.';
            });

    };

});