/**
 * Created by root on 8/27/2014.
 */

angular.module('erealm').controller('DBController', ['$scope','client',function($scope, client) {

    'use strict';

    client.getDbCollections().then(function(response){
        var collections = response.data;
        $scope.collections = collections;
    });

    $scope.queryCollection = function() {
        if(!$scope.queryForm.$invalid){
            $scope.loading = true;
            client.queryCollection($scope.collectionName.name).then(function(response){
                $scope.loading = false;
                var collectionContent = response.data;
                $scope.collectionContent = JSON.stringify(collectionContent);
                $scope.message = "qurey successfully";
            }, function(){
                $scope.loading = false;
                $scope.message = "query failure";
            });
        }
    };

    $scope.saveCollection = function() {
        if(!$scope.saveForm.$invalid) {
            $scope.loading = true;
            //Before delivery the params,shall transfer the variable type from String to JSON.
            client.saveCollection($scope.collectionName.name,JSON.parse($scope.collectionContent)).then(function(){
                $scope.saveMessage = "saved successfully";
            }, function(){
                $scope.loading = false;
                $scope.saveMessage = "saved failure";
            });
        }
    };

}]);
