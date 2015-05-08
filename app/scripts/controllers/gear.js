'use strict';

angular.module('messengerApp')
    .controller('GearCtrl', ['$scope', '$filter', 'gear', function($scope, $filter, gear) {

        var Manufacturers, Lenses;

        gear.loadGear().then(
            function(promise) {
                $scope.lenses = promise.data.Lenses;
            });

        gear.loadManufacturers().then(
            function(promise) {
                Manufacturers = promise.data.Manufacturer;
            });
        gear.loadLenses().then(
            function(promise) {
                Lenses = promise.data.Lenses;
            });

        $scope.editLens = function(lens) {
            $scope.editedLens = lens;
            var indexM = $filter('getIndexByName')(Manufacturers, lens.ManufacturerName),
                linsesFiltered = $filter('getLensesByManufacturer')(Lenses, Manufacturers[indexM].Id),
                indexL = $filter('getIndexByName')(linsesFiltered, lens.Name);

            $scope.optionsEditManufacturers = Manufacturers;
            $scope.optionsEditLenses = linsesFiltered;
            $scope.selectedEditManufacturer = Manufacturers[indexM];
            $scope.selectedEditLenses = linsesFiltered[indexL];
        };

        $scope.cancelEdits = function(lens) {
            $scope.selectedEditManufacturer = null;
            $scope.selectedEditLenses = null;
            $scope.editedLens = null;
        };

        $scope.saveEdits = function(lens) {
            //send put ajax to save

            // $scope.editedLens = null;
        };

        $scope.showFormAddLens = function() {
            $scope.addingLens = true;
            $scope.optionsManufacturers = Manufacturers;
        };

        $scope.loadLens = function(manufacturer, type) {
            var options = $filter('getLensesByManufacturer')(Lenses, manufacturer.Id);
            if (type === 'edit') {
                $scope.optionsEditLenses = options;
                $scope.selectedEditLenses = options[0];
                console.log($scope.optionsEditLenses);
                console.log($scope.selectedEditLenses);
            } else {
                $scope.optionsLenses = options;
            }
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
