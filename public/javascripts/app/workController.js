/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 8/08/2014
 */

angular.module('erealm').controller('WorkController', ['$scope','client','$translate', function($scope, client,$translate) {

    'use strict';

    $scope.subTitle = "WORK",
        $scope.mainTitle = "what we did",
        $scope.currentPage = "work-page";

    $scope.changeLanguage = function (key) {
        $translate.uses(key);
    };
}]);
