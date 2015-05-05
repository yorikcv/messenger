'use strict';

angular.module('messengerApp')
    .controller('MessagesCtrl', ['$scope', '$filter', '$routeParams', 'conversations', 'user',
        function($scope, $filter, $routeParams, conversations, user) {

            conversations.get().then(
                function(promise) {
                    var conversations = $filter('getUsersConversations')(promise.data, user.id).conversations;
                    conversations = $filter('sortMessagesByDate')(conversations);
                    var messages = $filter('getRecipientMessages')(conversations, $routeParams.recipientId)
                    $scope.messages = messages.messages;
                });


        }
    ]);
