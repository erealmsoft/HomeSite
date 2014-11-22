/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 8/08/2014
 */

angular.module('erealm').controller('BlogController', ['$scope','$sce','$filter', 'client','$translate', function($scope, $sce, $filter, client, $translate) {

    'use strict';

    angular.extend($scope,{subTitle: "BLOGS", mainTitle: "what we did", currentPage: "blog-page"});
    var mockDates = [
        '2014-05-03 11:17:00 GMT',
        '2014-06-17 18:31:00 GMT',
        '2014-07-01 13:03:00 GMT',
        '2014-08-22 18:21:00 GMT',
        '2014-09-30 14:29:00 GMT'
    ];
    $scope.loadData = function(language) {
        if (!language){
            language = $translate.uses();
        }

        client.getPosts(language).then(function(response){
            var blogs = response.data;
            var len = blogs.length;
            for(var i=0;i<len && i < mockDates.length; i++) {
                blogs[len-i-1].date = mockDates[i];
            }
            $scope.blogs = blogs;
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
        return moment(date, 'YYYY-MM-DD HH:mm:ss').format('lll');
    };
}]);
