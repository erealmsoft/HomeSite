/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 2/08/2014
 */

var erealm = angular.module('erealm', ['ui.bootstrap','pascalprecht.translate','ngCookies','shoppinpal.mobile-menu']);
erealm.factory('errorHttpInterceptor', ['$q', '$rootScope', '$injector',
    function ($q, $rootScope, $injector) {
        $rootScope.mainLoading = false;
        $rootScope.http = null;
        return {
            'request': function (config) {
                $rootScope.mainLoading = true;
                return config || $q.when(config);
            },
            'requestError': function (rejection) {
                $rootScope.http = $rootScope.http || $injector.get('$http');
                if ($rootScope.http.pendingRequests.length < 1) {
                    $rootScope.mainLoading = false;
                }

                return $q.reject(rejection);
            },
            'response': function (response) {
                $rootScope.http = $rootScope.http || $injector.get('$http');
                $rootScope.mainLoading = false;

                return response || $q.when(response);
            },
            'responseError': function (rejection) {
                $rootScope.http = $rootScope.http || $injector.get('$http');
                if ($rootScope.http.pendingRequests.length < 1) {
                    $rootScope.mainLoading = false;
                }

                var message = 'Please try again later';

                if (rejection.status === '400') {
                    message = "Invalid request parameters";
                }

                $rootScope.errorMessage = {text: message};
                return $q.reject(rejection);
            }
        };
    }
])
// window scroll event.
.directive("language", ['$translate', '$spMenu', function ($translate, $spMenu) {
    return function(scope, element, attrs) {
        angular.element(element).bind("click", function() {
            $translate.uses(attrs.key);
            $spMenu.hide();
            if (scope.loadData){
                scope.loadData(attrs.key);
            }
            scope.$apply();
        });
    };
}])

// window scroll event.
.directive("scroll", ['$window', function ($window) {
    return function(scope) {
        angular.element($window).bind("scroll", function() {
            scope.showFixedHeader = ($window.document.body.scrollTop > 280);
            scope.$apply();
        });
    };
}])
.directive("backtop",  ['$window',function () {
    return function(scope, element) {
        angular.element(element).bind("click", function() {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            scope.$apply();
            return false;
        });
    };
}])
.config(['$httpProvider', function($httpProvider){
    // Tell the module to store the language in the cookie
    $httpProvider.interceptors.push('errorHttpInterceptor');
}]);