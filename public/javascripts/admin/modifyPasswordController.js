/**
 * Created by root on 19.12.2014.
 */
angular.module('erealm').controller('modifyPasswordController' , ['$scope' , 'client' , function($scope, client) {
    $scope.passwords = {};
    $scope.changePassword = function(){
        client.changePassword($scope.passwords).then(function(response){});
    };
}]);
