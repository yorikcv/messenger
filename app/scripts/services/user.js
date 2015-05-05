'use strict';

angular.module('messengerApp')
    .factory('user',['$rootScope', function($rootScope) {
        var userString = localStorage['user'];

        var user = userString ? JSON.parse(userString) : {
            id: undefined,
            login: undefined
        };

        $rootScope.$watch(function() {
            return user;
        }, function() {
            localStorage['user'] = JSON.stringify(user);
        }, true);

        return user;
    }]);
