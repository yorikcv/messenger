'use strict';

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
