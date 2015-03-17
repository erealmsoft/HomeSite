/**
 *Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 12/13/2014.
 */

angular.module('erealm').controller('developmentController' , ['$scope', 'client' , function($scope, client) {
    'use strict';

    $scope.releaseProject = function(){
        client.buildProject().then();
    };
    $scope.restoreDB = function(){
        client.restoreDB($scope.selectedDB).then();
    };

    $scope.backupDB = function(){
        client.backupDB().then();
    };

    client.getDBList().then(function(response) {
        $scope.DBList = response.data;
    });
}]);
