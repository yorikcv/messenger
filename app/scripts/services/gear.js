'use strict';

angular.module('messengerApp')
    .factory('gear', ['$http', '$q', function($http, $q) {

        

        return {
            loadLenses: function() {
                var deferred = $q.defer();
                $http.get('json/lenses.json').then(function(data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            },
            loadManufacturers: function() {
                var deferred = $q.defer();
                $http.get('json/manufacturer.json').then(function(data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            },
            loadGear: function() {
                var deferred = $q.defer();
                $http.get('json/gear.json').then(function(data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            }
        }
    }]);
