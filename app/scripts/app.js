'use strict';

angular
    .module('messengerApp', [
        'ngAnimate',
        'ngRoute',
        'angularMoment'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/messenges/:recipientId', {
                templateUrl: 'views/messenges.html',
                controller: 'MessagesCtrl'
            })
            .when('/gear', {
                templateUrl: 'views/gear.html',
                controller: 'GearCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
