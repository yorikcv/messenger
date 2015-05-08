'use strict';

angular.module('messengerApp')
    .filter('getIndexByName', function() {
        return function(manufacturers, nameManufacturer) {

            var result = null;

            angular.forEach(manufacturers, function(val, key) {
                if (val.Name === nameManufacturer) {
                    result = key;
                }
            });

            return result;
        };
    });
