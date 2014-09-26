/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on2/08/2014
 */

angular.module('erealm').controller('HomeController', ['$scope','client', '$translate',function($scope, client, $translate) {

    'use strict';

    angular.extend($scope,{subTitle: "Hello, We are", mainTitle: "eRealm Info & Tech", currentPage: "home-page"});
    $scope.myInterval = 5000;

    $scope.loadData = function(language) {
        if (!language){
            language = $translate.uses();
        }
//        client.getProjectsInfo(language,'top5Pro').then(function(response){
//            var projects = response.data;
//            $scope.projects = projects;
//        });
        client.getManagement().then(function(response) {
            $scope.roles = response.data[language].roles;
            $scope.skills = response.data[language].skills;
            $scope.management = response.data[language].management;
        });
    };
    $scope.loadData();

    client.getTechnologies().then(function(response) {
        $scope.technologies = response.data.technologies;
        $scope.languages = response.data.languages;

    });
    $scope.getTechClass = function(familiarity) {
        return "tech-" + Math.ceil(familiarity/2);
    };
}]);
