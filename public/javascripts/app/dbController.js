/**
 * Created by root on 8/27/2014.
 */

angular.module('erealm').controller('DBController', ['$scope','client','$translate',function($scope, client,$translate) {

    'use strict';

    client.getDbCollections().then(function(response){
        var collections = response.data;
        $scope.collections = collections;
    });

    $scope.queryCollection = function() {
        if(!$scope.form.$invalid){
            $scope.loading = true;
            client.queryCollection().then(function(response){
                var collectionContent = response.data;
                $scope.collectionContent = collectionContent;
                $scope.message = "qurey successfully";
            }, function(){
                $scope.loading = false;
                $scope.message = "query failure";
            });
        }
    };

}]);
