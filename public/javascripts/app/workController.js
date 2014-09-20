/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by Ken on 8/08/2014
 */

angular.module('erealm').controller('WorkController', ['$scope','client','$translate', function($scope, client, $translate) {

    'use strict';

    angular.extend($scope,{subTitle: "WORK", mainTitle: "what we did", currentPage: "work-page"});
    $scope.loadData = function(language) {
        if (!language){
            language = $translate.uses();
        }
        client.getProjectsInfo(language,'wholePro').then(function(response){  //wholePro presents the whole projects
            var project = response.data;
            $scope.project = project;
        });
    };
    $scope.loadData();
}]);
