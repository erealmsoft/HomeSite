/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 8/08/2014
 */

angular.module('erealm').controller('BlogController', ['$scope','$sce','$filter', 'client','$translate', function($scope, $sce, $filter, client, $translate) {

    'use strict';

    angular.extend($scope,{subTitle: "BLOGS", mainTitle: "what we did", currentPage: "blog-page"});

    client.getPosts().then(function(response){
        $scope.blogs = response.data;
    });

    $scope.trustHtml = function(html) {
        return $sce.trustAsHtml(html);
    };

    $scope.formatDate = function(date) {
        return $filter('date')(new Date(date),'medium');
    }
}]);
