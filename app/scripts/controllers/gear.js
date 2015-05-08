'use strict';

angular.module('messengerApp')
    .controller('GearCtrl', ['$scope', '$filter', 'gear', function($scope, $filter, gear) {

        var Manufacturers, Lenses;
        $scope.newLenses = [];

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
            lens.editedLens = lens;
            var indexM = $filter('getIndexByName')(Manufacturers, lens.ManufacturerName),
                linsesFiltered = $filter('getLensesByManufacturer')(Lenses, Manufacturers[indexM].Id),
                indexL = $filter('getIndexByName')(linsesFiltered, lens.Name);

            lens.optionsEditManufacturers = Manufacturers;
            lens.optionsEditLenses = linsesFiltered;
            lens.selectedEditManufacturer = Manufacturers[indexM];
            lens.selectedEditLenses = linsesFiltered[indexL];
        };

        $scope.saveEdits = function(lens) {
            //send put ajax to save

            lens.editedLens = null;
            lens.Name = lens.selectedEditLenses.Name;
            lens.ManufacturerName = lens.selectedEditManufacturer.Name;

        };

        $scope.deleteEdits = function(lens) {
            if (confirm("gdgdfgd")) {
                var index = $scope.lenses.indexOf(lens);
                $scope.lenses.splice(index, 1);
                //send delete ajax
            }
        };

        $scope.cancelEdits = function(lens) {
            lens.selectedEditManufacturer = null;
            lens.selectedEditLenses = null;
            lens.editedLens = null;
        };

        $scope.addLens = function() {
            $scope.newLenses.push({});

            var arrayLastElem = $scope.newLenses.length - 1;
            $scope.newLenses[arrayLastElem].optionsManufacturers = Manufacturers;
        };

        $scope.loadSelectLens = function(lens, type) {
            if (lens.selectedEditManufacturer) {
                var options = $filter('getLensesByManufacturer')(Lenses, lens.selectedEditManufacturer.Id);
                if (type === 'edit') {
                    lens.optionsEditLenses = options;
                    lens.selectedEditLenses = options[0];
                } else {
                    lens.optionsLenses = options;
                }
            }
        };

        $scope.saveAdds = function(newLens) {
            if (newLens.selectedEditLenses && newLens.selectedEditManufacturer) {
                var newLensObject = {
                    "Name": newLens.selectedEditLenses.Name,
                    "ManufacturerName": newLens.selectedEditManufacturer.Name,
                    "Condition": newLens.selectedCondition
                };

                $scope.lenses.push(newLensObject);

                var index = $scope.newLenses.indexOf(newLens);
                $scope.newLenses.splice(index, 1);
                //send post ajax to save
            }
        };

        $scope.deleteAdds = function(newLens) {
            var index = $scope.newLenses.indexOf(newLens);
            $scope.newLenses.splice(index, 1);
        };

    }]);
