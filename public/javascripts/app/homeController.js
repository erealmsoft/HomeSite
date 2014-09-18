/**
 *Copyright 2014 Erealm Info & Tech.
 *
 * Created by Ken on2/08/2014
 */

angular.module('erealm').controller('HomeController', ['$scope','client', '$translate',function($scope, client, $translate) {

    'use strict';

    angular.extend($scope,{subTitle: "Hello, We are", mainTitle: "Erealm Info & Tech", currentPage: "home-page"});
    $scope.myInterval = 5000;

    $scope.loadData = function(language) {
        if (!language){
            language = $translate.proposedLanguage();
        }
        client.getProjectsInfo(language,'2').then(function(response){  //2 presents the top 5 projects
            var projects = response.data;
            $scope.projects = projects;
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
