// inject ngRoute for all our routing needs
angular.module('routerRoutes', ['ngRoute'])
// configure our routerRoutes
    .config(
        ['$controllerProvider', function($controllerProvider) {
            $controllerProvider.allowGlobals();
        }],


        function($routeProvider, $locationProvider) {
            $controllerProvider.allowGlobals();
            $routeProvider
            // route for the home page
                .when('/', {
                    templateUrl     : 'views/pages/home.html',
                    controller  : 'homeController',
                    controllerAs: 'home'
                })

            // route for the about page
                .when('/about', {
                    templateUrl     : 'views/pages/about.html',
                    controller  : 'aboutController',
                    controllerAs: 'about'
                })

            // route for the contact page
                .when('/contact', {
                    templateUrl     : 'views/pages/contact.html',
                    controller  : 'contactController',
                    controllerAs: 'contact'
                });

            // set out app to have pretty URLs
            $locationProvider.html5Mode(true);
        }
    );
