/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

angular.module('erealm').factory('client', ['$http', function ($http) {
    return {
        getWorks: function() {
            return $http.get('/data/works.json');
        }
    }
}]);
