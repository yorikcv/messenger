'use strict';

angular.module('messengerApp')
    .controller('MainCtrl', ['$rootScope', '$scope', '$filter', '$location', 'user', 'conversations',
        function($rootScope, $scope, $filter, $location, user, conversations) {

            if (!user.login) {
                user.id = '1';
                user.login = 'yorik';
            }

            $rootScope.user = user;

            conversations.get().then(
                function(promise) {
                    var conversations = $filter('getUsersConversations')(promise.data, user.id).conversations;
                    $scope.conversations = $filter('sortMessagesByDate')(conversations);
                });


            $scope.showConversation = function(recipientId) {
                $location.path('/messenges/' + recipientId);
            }
        }
    ]);
