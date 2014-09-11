/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 8/08/2014
 */

angular.module('erealm').controller('ProjectController', ['$scope','client','$translate',function($scope, client, $translate) {

    'use strict';

    $scope.subTitle = "PROJECT",
        $scope.mainTitle = "submit your project",
        $scope.currentPage = "project-page";

    $scope.sendMessage = function() {
        if(!$scope.form.$invalid){
            $scope.loading = true;
            client.submitMessage($scope.name, $scope.email, $scope.message).then(function(){
                $scope.errorMessage = "Your message has be sent successfully";
            }, function(){
                $scope.loading = false;
                $scope.errorMessage = "Your message could not be sent";
            });
        }
    };
}]);
