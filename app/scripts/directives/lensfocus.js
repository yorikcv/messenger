'use strict';

angular.module('messengerApp')
    .directive('lensFocus', function lensFocus($timeout) {

        return function(scope, elem, attrs) {
            scope.$watch(attrs.lensFocus, function(newVal) {
                if (newVal) {
                    $timeout(function() {
                        elem[0].focus();
                    }, 0, false);
                }
            });
        };
    });
