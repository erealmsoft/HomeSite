/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 8/08/2014
 */

angular.module('erealm').controller('AboutController', ['$scope','client', function($scope, client) {

    'use strict';

    $scope.subTitle = "ABOUT",
        $scope.mainTitle = "working with you",
        $scope.currentPage = "about-page";

    client.getFlickrPhotos().then(function(response){
        var photos = response.data.items
        angular.forEach(photos, function(item) {
            item.media.m = item.media.m.replace('_m', '_q');
        });
        $scope.photos = photos;
    });
}]);
