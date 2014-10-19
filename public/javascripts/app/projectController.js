/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 8/08/2014
 */

angular.module('erealm').controller('ProjectController', ['$scope','client','$translate',function($scope, client, $translate) {

    'use strict';

    angular.extend($scope,{subTitle: "PROJECT", mainTitle: "submit your project", currentPage: "plan-page"});
    $scope.sendMessage = function() {
        if(!$scope.form.$invalid){
            $scope.loading = true;
            client.submitProjectplan($scope.name, $scope.email, $scope.company,$scope.message,$scope.type,$scope.telephone,$scope.budget).then(function(){
                $scope.errorMessage = $translate('sent_successfully');
            }, function(){
                $scope.loading = false;
                $scope.errorMessage = $translate('sent_fault');
            });
        }
    };


    $scope.reloading = function(){
        $scope.loading = false;
        $scope.project_form.$setPristine();
        $scope.errorMessage = $translate('make_sure');
    };

    var types_en =  [
        {name:'Website'},
        {name:'Mobile'},
        {name:'Application'  },
        {name:'Other'}
    ];

    var budgets_en = [
        {"name" : "< $50,000"},
        {"name" : "$50,000 - $100,000"},
        {"name" : "$100,000 - $150,000"},
        {"name" : "$150,000 - $200,000"},
        {"name" : "> $200,000"}
    ];
    var types_cn =  [
        {name:'网站'},
        {name:'移动应用'},
        {name:'应用程序'  },
        {name:'其它'}
    ];
    var budgets_cn = [
        {"name" : "< ￥50,000"},
        {"name" : "￥50,000 - ￥100,000"},
        {"name" : "￥100,000 - ￥150,000"},
        {"name" : "￥150,000 - ￥200,000"},
        {"name" : "> ￥200,000"}
    ];

    $scope.loadData = function(language) {
        if (!language){
            language = $translate.uses();
        }
        $scope.errorMessage = $translate('make_sure');
        if (language === 'en') {
            $scope.types =  types_en;
            $scope.budgets =  budgets_en;
        } else {
            $scope.types = types_cn;
            $scope.budgets =  budgets_cn;
        }
    };
    $scope.loadData();


}]);
