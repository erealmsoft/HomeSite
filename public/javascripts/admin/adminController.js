/**
 *Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 12/13/2014.
 */

'use strict';

angular.module('erealm').controller('AdminController' , ['$scope','$rootScope','$sce','$spMenu' , 'client' , function($scope, $rootScope, $sce, $spMenu, client) {
    var config = {
        'index': {tpl: "/templates/index.html"},
        'createuser': {tpl: "/templates/user.html"},
        'logs': {tpl: "/templates/logs.html", action: 'getLogList'},
        'modifyPassword': {tpl: "/templates/modifyPassword.html"},
        'release': {tpl: "/templates/development.html"},
        'message': {tpl: "/templates/message.html", action: 'getMessageList'}
    };
    $scope.currentTemplate = config['index'].tpl;
    $scope.loadTemplate = function(type) {
        $spMenu.hide();
        var current = config[type];
        if (current) {
            $scope.currentAction = type;
            $scope.currentTemplate = current.tpl;
            current.action && $scope[current.action]();
        }
    };

    $scope.getLogList = function() {
        client.getLogList().then(function(response) {
            $scope.logList = response.data;
        });
    };

    $scope.selectedLog = "";
    $scope.getLogText = function() {
        client.getLogText($scope.selectedLog).then(function(response) {
            $scope.selectedLogText = JSON.stringify(response.data);
        });
    };
    $scope.trustHtml = function(html) {
        return $sce.trustAsHtml(html);
    };

    $scope.passwords = {};
    $scope.changePassword = function(){
        client.changePassword($scope.passwords).then(function(response){});
    };

    $scope.getMessageList = function() {
        client.getMessageList($scope.selectedLog).then(function(response) {
            if (!response.data) return;
            $scope.messages = response.data;
        });
    }
}]);
