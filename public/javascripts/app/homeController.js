/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

angular.module('erealm').controller('HomeController', ['$scope','client', function($scope, client) {

    'use strict';

    $scope.myInterval = 5000;

    client.getWorks().then(function(response) {
        $scope.works = response.data;
    })

}]);
