/**
 * Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 1/11/15
 */

angular.module('erealm').controller('UserController' , ['$scope', '$modal', 'client' , function($scope,$modal, client) {

    'use strict';

    var refresh = function(){
        client.getUsers().then(function(result){
            if (!result.data) {
                return;
            }
            $scope.users = result.data;
        });
    };

    refresh();

    $scope.showCreateModal = function(){
        var modalInstance = $modal.open({
            templateUrl: 'cheateUser.html',
            controller: 'UserModalController',
            //windowClass: 'login-form',
            backdrop:'static'
        });
        modalInstance.result.then(function (user) {
            client.signup(user).then(function () {
//                if (!result.data) return;
//                $rootScope.showMessage('200', 'success');
                refresh();
            });
        });
    };
    $scope.signup = function() {

    };
}]);

angular.module('erealm').controller('UserModalController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
    'use strict';

    $scope.signup = function () {
        $modalInstance.close($scope.user);
    };
}]);
