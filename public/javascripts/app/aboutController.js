/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 8/08/2014
 */

angular.module('erealm').controller('AboutController', ['$scope','client', function($scope, client) {

    'use strict';

    $scope.subTitle = "about",
        $scope.mainTitle = "working with you",
        $scope.currentPage = "about-page";
}]);
