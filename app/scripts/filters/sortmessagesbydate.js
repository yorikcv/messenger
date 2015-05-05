'use strict';

angular.module('messengerApp')
    .filter('sortMessagesByDate',['$filter', function($filter) {
        return function(conversations) {

            angular.forEach(conversations, function(conversation) {
                conversation.messages = $filter('orderBy')(conversation.messages, '-senddate');
            });

            return conversations;
        };
    }]);
