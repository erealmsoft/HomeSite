/**
 *Copyright 2014 Erealm Info & Tech.
 *
 * Created by ken on 12/13/2014.
 */

'use strict';

angular.module('erealm').controller('AdminController' , ['$scope','$rootScope','$sce','$spMenu' , 'client' , function($scope, $rootScope, $sce, $spMenu, client) {
    var config = {
        'index': {tpl: "/templates/index.html"},
        'reports': {tpl: "/templates/report.html"},
        'receiveGoods':{tpl: "/templates/receiveGoods.html"},
        'priceCalendar':{tpl: "/templates/priceCalendar.html"},
        'createuser': {tpl: "/templates/user.html"},
        'logs': {tpl: "/templates/logs.html", action: 'getLogList'},
        'modifyPassword': {tpl: "/templates/modifyPassword.html"},
        'dailyRecommend': {tpl: "/templates/dailyRecommend.html"},
        'flowerPotImg': {tpl: "/templates/flowerPotImg.html"},
        'receivePayment': {tpl: "/templates/receivePayment.html"},
        'release': {tpl: "/templates/development.html"}
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

}]);
