/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 8/08/2014
 */

angular.module('erealm').controller('AboutController', ['$scope','client','$translate',function($scope, client,$translate) {

    'use strict';

    $scope.subTitle = "ABOUT";
    $scope.mainTitle = "working with you";
    $scope.currentPage = "about-page";
    $scope.isCollapsed = true;
    $scope.homeBack = 'back' + (Math.floor(Math.random() * 4) + 1);

    client.getFlickrPhotos().then(function(response){
        var photos = response.data.items;
        angular.forEach(photos, function(item) {
            item.media.m = item.media.m.replace('_m', '_q');
        });
        $scope.photos = photos;
    });
    client.getEmployeeInfo().then(function(response){
        var person = response.data;

        $scope.person = person;
    });
    $scope.collapsed=function(ite)
    {
        $scope.isCollapsed=!( $scope.isCollapsed);
        $scope.item=ite;
    };
}]);
