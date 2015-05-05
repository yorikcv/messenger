'use strict';

/**
 * @ngdoc filter
 * @name messengerApp.filter:getRecipientMessages
 * @function
 * @description
 * # getRecipientMessages
 * Filter in the messengerApp.
 */
angular.module('messengerApp')
    .filter('getRecipientMessages', function() {
        return function(conversations, recipientId) {

            var result = [];

            angular.forEach(conversations, function(val, key) {
                if (val.recipient.id === recipientId) {
                    result = val;
                }
            });

            return result;
        };
    });
