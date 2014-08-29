/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

var erealm = angular.module('erealm', ['ui.bootstrap','pascalprecht.translate','ngCookies','shoppinpal.mobile-menu']);
erealm.config(['$translateProvider', function($translateProvider){

    $translateProvider.useUrlLoader('/app/language');
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
    // Tell the module to store the language in the cookie
    $translateProvider.useCookieStorage();
}]);

// window scroll event.
erealm.directive("language", ['$translate', function ($translate) {
    return function(scope, element, attrs) {
        angular.element(element).bind("click", function() {
            $translate.uses(attrs['key']);
            scope.$apply();
        });
    };
}]);

// window scroll event.
erealm.directive("scroll", function ($window) {
    return function(scope) {
        angular.element($window).bind("scroll", function() {
            scope.showFixedHeader = ($window.document.body.scrollTop > 280);
            scope.$apply();
        });
    };
});

