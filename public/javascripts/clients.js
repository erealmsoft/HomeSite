/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

angular.module('erealm').factory('client', ['$http', function ($http) {
    return {
        getWorks: function() {
            return $http.get('/data/works.json');
        },
        getTechnologies: function() {
            return $http.get('/data/technology.json');
        },
        getFlickrPhotos: function() {
            return $http.jsonp('http://api.flickr.com/services/feeds/groups_pool.gne?id=2678732@N20&lang=en-us&format=json&jsoncallback=JSON_CALLBACK');
        },
        submitMessage: function(name, email, message) {
            return $http.post('/app/message', {name: name, email:email, message: message});
        },
        getEmployeeInfo:function(language){
            return $http.get('/app/personnel/'+language);
        },
        getProjectsInfo:function(language){
            return $http.get('/app/projects/'+language);
        },
        getProjectsDetailsInfo:function(hash){
            return $http.get('/app/projectDetails' + '/' + hash);
        },
        getContactsInfo:function(language){
            return $http.get('/app/contact/'+language);
        }
    };
}]);
