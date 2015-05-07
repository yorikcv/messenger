'use strict';

angular.module('messengerApp')
    .factory('conversations', ['$http', '$q', function($http, $q) {

        var deferred = $q.defer();
        
        //потім можна використати $resource або ajax
        $http.get('json/users.json').then(function(data) {
            deferred.resolve(data);
        });

        return {
            get: function() {
                return deferred.promise;
            }
        }
    }]);
