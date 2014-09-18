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

    $scope.loadData = function(language) {
        if (!language){
            language = $translate.proposedLanguage();
        }
        client.getEmployeeInfo(language).then(function(response){
            var person = response.data;
            $scope.person = person;
        });
        client.getPartnersInfo(language).then(function(response){
            var partner = response.data;
            $scope.partner = partner;
        });
    };
    $scope.loadData();
    client.getFlickrPhotos().then(function(response){
        var photos = response.data.items;
        angular.forEach(photos, function(item) {
            item.media.m = item.media.m.replace('_m', '_q');
        });
        $scope.photos = photos;
    });

    $scope.collapsed=function(ite)
    {
        $scope.isCollapsed=!( $scope.isCollapsed);
        $scope.item=ite;
    };
}]);
