'use strict';

/**
 * @ngdoc filter
 * @name messengerApp.filter:getLensesByManufacturer
 * @function
 * @description
 * # getLensesByManufacturer
 * Filter in the messengerApp.
 */
angular.module('messengerApp')
    .filter('getLensesByManufacturer', function() {
        return function(lenses, manufacturerId) {

            var result = [];

            angular.forEach(lenses, function(val, key) {
                if (val.ManufacturerId === manufacturerId) {

                    result.push(val);
                }
            });

            return result;
        };
    });
