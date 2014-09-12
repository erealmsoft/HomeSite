/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

angular.module('erealm').factory('client', ['$http', function ($http) {
    return {
//        getWorks: function() {                         instead by the 'getProjectsInfo' below
//            return $http.get('/data/works.json');
//        },
        getTechnologies: function() {
            return $http.get('/data/technology.json');
        },
        getFlickrPhotos: function() {
            return $http.jsonp('http://api.flickr.com/services/feeds/groups_pool.gne?id=2678732@N20&lang=en-us&format=json&jsoncallback=JSON_CALLBACK');
        },
        submitMessage: function(name, email, message) {
            return $http.post('/app/message', {name: name, email:email, message: message});
        },
        submitProjectplan: function(name, email,company,message,start,type,deadline,telephone,budget) {
            return $http.post('/app/projectplan', {name: name, email:email, message: message,company:company,start:start,type:type,deadline:deadline,telephone:telephone,budget:budget});
        },
        getEmployeeInfo:function(language){
            return $http.get('/app/personnel/'+language);
        },
        getProjectsInfo:function(language,flag){
            return $http.get('/app/projects/' + language + '/' + flag);
        },
        getProjectsDetailsInfo:function(hash,language){
            return $http.get('/app/projectDetails' + '/' + hash + '/' + language);
        },
        getContactsInfo:function(language){
            return $http.get('/app/contact/'+language);
        }
    };
}]);
