/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 8/08/2014
 */

angular.module('erealm').controller('BlogController', ['$scope','$sce','$filter', 'client','$translate', function($scope, $sce, $filter, client, $translate) {

    'use strict';

    angular.extend($scope,{subTitle: "BLOGS", mainTitle: "what we did", currentPage: "blog-page"});
    $scope.loadData = function(language) {
        if (!language){
            language = $translate.uses();
        }

        client.getPosts(language).then(function(response){
            $scope.blogs = response.data;
        });
    };
    $scope.loadData();


    $scope.trustHtml = function(html) {
        return $sce.trustAsHtml(html);
    };

    $scope.formatDate = function(date) {
        if ($translate.uses() === 'cn') {
            moment.lang('zh-cn');
        } else {
            moment.lang('en');
        }
        return moment(date, 'yyyy-mm-dd').format('lll')
    };
}]);
