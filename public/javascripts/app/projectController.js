/**
 *Copyright 2014 Erealm Info & Tech.
 *
 * Created by Ken on 8/08/2014
 */

angular.module('erealm').controller('ProjectController', ['$scope','client','$translate',function($scope, client, $translate) {

    'use strict';

    angular.extend($scope,{subTitle: "PROJECT", mainTitle: "submit your project", currentPage: "project-page"});

    $scope.sendMessage = function() {
        if(!$scope.form.$invalid){
            $scope.loading = true;
            client.submitProjectplan($scope.name, $scope.email, $scope.company,$scope.message,$scope.start,$scope.type,$scope.deadline,$scope.telephone,$scope.budget).then(function(){
                $scope.errorMessage = "Your message has be sent successfully";
            }, function(){
                $scope.loading = false;
                $scope.errorMessage = "Your message could not be sent";
            });
        }
    };

    var types_en =  [
        {name:'Website'},
        {name:'Mobile'},
        {name:'Application'  },
        {name:'Illustration' },
        {name:'Other'}
    ];
    var types_cn =  [
        {name:'网站'},
        {name:'移动应用'},
        {name:'应用程序'  },
        {name:'项目说明' },
        {name:'其它'}
    ];

    $scope.loadData = function(language) {
        if (!language){
            language = $translate.proposedLanguage();
        }
        if (language === 'en') {
            $scope.types =  types_en;
        } else {
            $scope.types = types_cn;
        }
    };
    $scope.loadData();


}]);
