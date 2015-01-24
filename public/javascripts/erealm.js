/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 2/08/2014
 */

var erealm = angular.module('erealm', ['ui.bootstrap','pascalprecht.translate','ngCookies','shoppinpal.mobile-menu']);
erealm.run(['$rootScope','$modal', '$translate', function($rootScope, $modal, $translate) {

    $rootScope.showMessage = function(code) {
        $rootScope.mainMessage = $translate(code) || $translate(500);
        var type = code.split('_')[0];
        if (['info', 'error', 'warning', 'confirm', 'success'].indexOf(type) < 0) {
            type = 'error';
        }
        $modal.open({
            templateUrl: 'main_message.html',
            backdrop: 'static',
            windowClass: 'message-modal ' + type
        });
    };
}]);
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
                if ($rootScope.http.pendingRequests.length < 1) {
                    $rootScope.mainLoading = false;
                }

                if (response.data.code){
                    if (response.data.code === 'success') {
                        response.data = response.data.data;
                    }else {
                        $rootScope.showMessage(response.data.code);
                        response.data = null;
                    }
                }

                return response || $q.when(response);
            },
            'responseError': function (rejection) {
                $rootScope.http = $rootScope.http || $injector.get('$http');
                if ($rootScope.http.pendingRequests.length < 1) {
                    $rootScope.mainLoading = false;
                }

                var message = 'Please try again later';

                $rootScope.showMessage(rejection.status);

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

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    var csrfToken = $('meta[name="csrf-token"]').attr('content');
    if(csrfToken){
        ($httpProvider.defaults.headers.common['X-CSRF-Token'] = csrfToken);
    }
}]);