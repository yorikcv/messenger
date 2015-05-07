'use strict';

angular.module('messengerApp')
    .factory('gear', ['$http', '$q', function($http, $q) {

        var deferred = $q.defer();

        return {
            loadLenses: function() {
                $http.get('json/lenses.json').then(function(data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            },
            loadManufacturers: function() {
                $http.get('json/manufacturer.json').then(function(data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            },
            loadGear: function() {
                $http.get('json/gear.json').then(function(data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            }
        }
    }]);
