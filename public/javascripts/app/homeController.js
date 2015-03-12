/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on2/08/2014
 */

angular.module('erealm').controller('HomeController', ['$scope','client', '$translate', '$timeout',function($scope, client, $translate, $timeout) {

    'use strict';

    angular.extend($scope,{subTitle: "Hello, We are", mainTitle: "eRealm Info & Tech", currentPage: "home-page"});
    $scope.myInterval = 5000;

    $scope.loadData = function(language) {
        if (!language){
            language = $translate.uses();
        }

        client.getManagement(language).then(function(response) {
            $scope.roles = response.data.roles;
            $scope.skills = response.data.skills;
            $scope.management = response.data.management;
        });

        $timeout(function(){
            client.checkPosts(language).then(function(response){
                $scope.postsNotification = response.data.result;
            })
        }, 2000);
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
