angular.module('erealm').controller('ProjectdetailsController', ['$scope','client','$translate', function($scope, client, $translate) {

    'use strict';
    var hash = location.hash.substring(1);  //remove the '#' from the ID

    $scope.loadData = function(language){
        if (!language) language = $translate.proposedLanguage();

        client.getProjectsDetailsInfo(hash,language).then(function(response){
            var projectDetails = response.data;
            $scope.projectDetails = projectDetails;
        });
    };
    $scope.loadData();
}]);
