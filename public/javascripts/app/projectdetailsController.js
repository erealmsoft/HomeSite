angular.module('erealm').controller('ProjectdetailsController', ['$scope','client','$translate', function($scope, client, $translate) {

    'use strict';
    var hash = location.hash.substring(1);  //remove the '#' from the ID

    client.getProjectsInfo().then(function(response){
        var project = response.data;
        $scope.project = project;
    });



    client.getProjectsDetailsInfo(hash).then(function(response){
        var projectDetails = response.data;
//        console.log(projectDetails);
        $scope.projectDetails = projectDetails;
    });
}]);
