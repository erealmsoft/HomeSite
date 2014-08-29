/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

angular.module('erealm').controller('HomeController', ['$scope','client', '$translate',function($scope, client, $translate) {

    'use strict';

    $scope.subTitle = "Hello, We are",
    $scope.mainTitle = "Erealm Info & Tech",
    $scope.currentPage = "home-page",
    $scope.myInterval = 5000;

    $scope.homeBack = 'back' + (Math.floor(Math.random() * 4) + 1);

    client.getWorks().then(function(response) {
        $scope.works = response.data;
    });
}]);
