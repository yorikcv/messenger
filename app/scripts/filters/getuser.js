'use strict';

angular.module('messengerApp')
    .filter('getUsersConversations', function() {
        return function(users, userId) {

            var result = [];

            angular.forEach(users, function(val, key) {
                if (val.id === userId) {
                    result = val;
                }
            });

            return result;
        }
    });
