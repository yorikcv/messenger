'use strict';

/**
 * @ngdoc function
 * @name messengerApp.controller:GearctrlCtrl
 * @description
 * # GearctrlCtrl
 * Controller of the messengerApp
 */
angular.module('messengerApp')
    .controller('GearCtrl', ['$scope', 'gear', function($scope, gear) {

        gear.loadGear().then(
            function(promise) {
                $scope.lenses = promise.data.Lenses;
            });

        function preLoadSelectsOptions() {
        	gear.loadManufacturers().then(
            function(promise) {
                $scope.optionsManufacturers = promise.data.Manufacturer;
            });

            gear.loadLenses().then(
            function(promise) {
                $scope.optionsLenses = promise.data.Lenses;
            });
        }

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
            //send ajax to save

            $scope.editedLens = null;
        };

        $scope.showFormAddLens = function() {
        	preLoadSelectsOptions();
        	$scope.addingLens = true;


        };


    }]);
