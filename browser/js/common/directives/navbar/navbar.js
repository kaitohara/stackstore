app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',

        link: function(scope) {
            scope.categories = [{
                label: 'Albums',
                state: 'albums'
            }, {
                label: 'Artists',
                state: 'albums'
            }, {
                label: 'Genres',
                state: 'genres'
            }, {
                label: 'Orders',
                state: 'orders'
            }, {
                label: 'Users',
                state: 'reviews'
            }];

            scope.items = [{
                label: 'Discover',
                state: 'discover.list'
            }, {
                label: 'Collection',
                state: 'collection',
                auth: true
                    // }, {
                    // label: 'Upload',
                    // state: 'upload',
                    // auth: false
            }];


            scope.setSearchCategory = function(category) {
                scope.searchCategory = category;
            };
            scope.showSearchBar = true;
            scope.user = null;

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

            var updateUser = function(user) {
                console.log('responding to broadcast', user);
                scope.user = user;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
            $rootScope.$on(AUTH_EVENTS.statusChange, updateUser);

        }

    };

});