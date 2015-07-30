app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
<<<<<<< HEAD
        link: function (scope) {
            scope.categories = [
                { label: 'Albums', state: 'albums' },
                { label: 'Artists', state: 'albums' },
                { label: 'Genres', state: 'genres' },
                { label: 'Orders', state: 'orders' },
                { label: 'Users', state: 'reviews' }
            ];
=======



        link: function(scope, Search) {
>>>>>>> dcef9cdfde21bcf0ba5d5e81f6284c224c79fe6e

            scope.items = [{
                label: 'Discover',
                state: 'discover'
            }, {
                label: 'Collection',
                state: 'collection',
                auth: true
            }, {
                label: 'Upload',
                state: 'upload',
                auth: true
            }];
<<<<<<< HEAD


            scope.setSearchCategory = function(category){
                scope.searchCategory = category;
            };
            scope.showSearchBar = true;
            scope.user = null;

=======
>>>>>>> dcef9cdfde21bcf0ba5d5e81f6284c224c79fe6e
            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.isAdmin = function() {
                return AuthService.isAdmin();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                });
            };

            var removeUser = function() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
