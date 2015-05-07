'use strict';

angular.module('messengerApp')
    .controller('GearCtrl', ['$scope', '$filter', 'gear', function($scope, $filter, gear) {

        gear.loadGear().then(
            function(promise) {
                $scope.lenses = promise.data.Lenses;
            });

        $scope.editLens = function(lens) {
            $scope.editedLens = lens;

            $scope.originalLens = angular.extend({}, lens);
        };

        $scope.cancelEdits = function(lens) {
            $scope.editedLens = null;

            $scope.lenses[$scope.lenses.indexOf(lens)] = $scope.originalLens;
            $scope.editedLens = null;
            $scope.originalLens = null;
        };

        $scope.saveEdits = function(lens) {
            //send put ajax to save

            $scope.editedLens = null;
        };

        $scope.showFormAddLens = function() {

            if (!$scope.optionsManufacturers) {
                gear.loadManufacturers().then(
                    function(promise) {
                        $scope.optionsManufacturers = promise.data.Manufacturer;
                    });
            }

            $scope.addingLens = true;
        };

        $scope.loadLens = function(manufacturer) {

            gear.loadLenses().then(
                function(promise) {
                    $scope.optionsLenses = $filter('getLensesByManufacturer')(promise.data.Lenses, manufacturer.Id);
                });

        };

        $scope.saveAdds = function() {
            if ($scope.selectedLenses && $scope.selectedManufacturer) {
                var newLens = {
                    "Name": $scope.selectedLenses.Name,
                    "ManufacturerName": $scope.selectedManufacturer.Name,
                    "Condition": $scope.selectedCondition
                };
                $scope.lenses.push(newLens);
                //send post ajax to save
                $scope.optionsManufacturers = null;
                $scope.optionsLenses = null;
                $scope.selectedLenses = null;
                $scope.selectedManufacturer = null;
                $scope.selectedCondition = null;
                $scope.addingLens = false;
            }
        };

    }]);
