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

        function addOption(options, type) {
            if (type === 'manufacturer') {
                options.push({
                    Name: "--add Manufacturer--",
                    type: 'manufacturer'
                });
                return options;
            }

            if (type === 'lens') {
                options.push({
                    Name: "--add Lens--",
                    type: 'lens'
                });
                return options;
            }
        }

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
            var arrayLastElem = $scope.newLenses.length - 1,
                options = angular.copy(Manufacturers);
            addOption(options, 'manufacturer');
            $scope.newLenses[arrayLastElem].optionsManufacturers = options;
        };

        $scope.loadSelectLens = function(lens, type) {
            if (lens.selectedEditManufacturer) {
                var manufacturerId = lens.selectedEditManufacturer.Id,
                    options = $filter('getLensesByManufacturer')(Lenses, manufacturerId);
                if (type === 'edit') {
                    lens.optionsEditLenses = options;
                    lens.selectedEditLenses = options[0];
                } else {
                    options = addOption(options, 'lens');
                    lens.optionsLenses = options;
                }
            }
        };

        $scope.saveAdds = function(newLens) {
            if (newLens.selectedEditLenses && newLens.selectedEditManufacturer &&
                !newLens.selectedEditLenses.type && !newLens.selectedEditManufacturer.type) {
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

        $scope.checkToShowAddInput = function(newLens, type) {
            if (type === 'manufacturer') {
                newLens.showAddInputManufacturer = false;
                newLens.showAddInputLens = false;
                if (newLens.selectedEditManufacturer.type) newLens.showAddInputManufacturer = true;
            }
            if (type === 'lens') {
                newLens.showAddInputLens = false;
                if (newLens.selectedEditLenses.type) newLens.showAddInputLens = true;
            }


        }

    }]);
